---
title: 'The 15-second function that ran your code for 5 milliseconds'
subtitle: 'Making Microlink Functions lazy, the IPC channel it needed, and three wrong diagnoses'
description: 'Microlink Functions fetched the page whether your code read it or not. Making that lazy meant letting the isolate call back into the host, which meant an IPC channel. Then a 15-second tail appeared, we guessed wrong three times, and one measurement found it.'
authors:
  - kiko
date: '2026-10-01'
---

A [Microlink Function](/docs/api/parameters/function) whose entire body is `page.title()` occasionally took 15 seconds. The customer's code ran for 5 milliseconds.

Getting to the point where we could even see that took a month of work: teaching our Functions to fetch the page only when your code actually asks for it, which required opening an IPC channel between an untrusted subprocess and our API. This post covers both halves — the feature, and the bug hunt it exposed.

**TL;DR**

- A `?function=` request always fetched the page. For code that never reads it, that was **79% of the request**.
- Static analysis of the snippet gets you most of the way, and **cannot answer a branch**. `cond ? await page.content() : 'x'` has to be resolved at runtime.
- So the isolate needed to call back into the host: an **IPC channel** into a process running untrusted customer code.
- `delete process.send` is not a security boundary. `fs.writeSync(3, …)` reaches the host even under Node's permission model.
- Result: **1542ms → 410ms** on a trivial function, and nothing fetched at all for a branch not taken.
- Then a 15s tail appeared. Three plausible diagnoses, all wrong. One measurement: `browser.pages()` is not a listing.

## What a Function is

You give us a URL and a snippet of JavaScript. We run the snippet against that page and return whatever it returns:

```js
await microlink.function('https://example.com', ({ page }) => page.title())
```

Your code runs in an isolated subprocess — `node -` with the program on stdin, Node's permission model on, no filesystem and no network unless granted. If your code touches `page`, we hand it a real Chrome page.

## The page was always fetched

Outside a Function, when metadata is enabled we fetch the target's HTML through a ladder of proxy exits and antibot detection. A Function exposes `page.content()`, `page.metadata()` and `page.extract()`, so the obvious implementation was to run that fetch up front and inject the result into the isolate as values.

Which means this fetched the page:

```js
() => 1
```

Measured on `news.ycombinator.com`, warm medians:

```
total 1400   fetch 210   meta 430   media 790   function 255
```

Two surprises in that row. The fetch is not the biggest cost — `media`, the image and logo probing we run over extracted metadata, is nearly four times larger. And `function`, the part that runs your code, is 255ms of 1400.

For `() => 1`, all of it except `function` is waste.

## First: stop loading the page twice

Before laziness, a cheaper win. A Function that drives the browser used to load the target **twice**: the fetch navigated it, then threw the page away, and the snippet's own context navigated the same URL again.

So we kept the page. The fetch renders it, holds it open, and the snippet runs on that page instead of navigating:

```
example.com            1461ms -> 868ms    1.68x
news.ycombinator.com   2429ms -> 1660ms   1.46x
```

This mattered for a reason beyond speed, and it shaped everything after. That first navigation goes through the proxy ladder; a second one from inside the isolate does not. Handing the page over means a browser-driving snippet runs on a page that was loaded *with* antibot handling, rather than a bare `goto` that gets an interstitial.

## Then: only fetch what the code reads

The interesting case is the one above — `() => 1` paying for a page nobody looks at.

Our first attempt read the snippet's AST before the fetch and decided from that. It works, and it is genuinely cheap: we already parse the code to know whether it touches `page` at all.

It also cannot answer this:

```js
async ({ page }) => (shouldRead ? await page.content() : 'skipped')
```

`page.content` is right there in the source. Any predicate reading the source has to assume the call happens. Only the runtime knows whether the branch was taken.

Worse, the naive version of that predicate is unsafe. `inspect(code).methods` reports nothing for any of these:

```js
({ page: { content } }) => content()     // destructured off page
({ page }) => page[k]()                  // computed key
({ page }) => JSON.stringify(page)       // passed around whole
```

We shipped the static version anyway, and it does remove the fetch for code that never mentions `page`. But "resolve it when the code asks" needs the isolate to be able to ask.

## The channel

The isolate is a subprocess. The host is our API. For `page.content()` to resolve on the call, the child has to make a request and wait for a reply — and the child is running code we did not write.

Node gives you this for free, if the shape fits:

```js
const spawnOpts = { env, timeout, killSignal: 'SIGKILL' }
if (hasHost) spawnOpts.stdio = ['pipe', 'pipe', 'pipe', 'ipc']
```

Three things had to hold, and all three were worth checking rather than assuming:

**It works with `node -`.** The program arrives on stdin, because arguments hit `MAX_ARG_STRLEN` for anything substantial. Adding a fourth stdio slot does not disturb that.

**It works under the permission model.** The child runs with `--permission` and, by default, zero `--allow-*` flags. Node's permission model gates `fs.open` on a path, sockets, child processes — but it does not gate an already-open descriptor, and there is no `ipc` permission. So the channel works with nothing granted.

**It survives the CPU-limit wrapper.** When a timeout is set we spawn through `sh -c 'ulimit -t N && exec node "$@"'` to get `RLIMIT_CPU`. The `exec` keeps the pid, so the descriptor survives.

One thing that did not hold on the first try: an open channel keeps the child's event loop alive. The first working prototype round-tripped a message correctly and then hung until it was SIGKILLed at its timeout. The channel has to be closed before the result is written.

## The channel cannot be hidden

The obvious hardening is to capture `process.send` and delete it, so customer code cannot reach the channel. We did that, then checked whether it worked:

```
send        undefined     <- looks contained
channel     object
fd          3
rawFdWrite  SUCCEEDED     <- fs.writeSync(3, …) under --permission
HOST GOT:   {"smuggled":true}
```

It does not work. `process.channel.fd` is 3, and writing to a descriptor you already hold is not something the permission model stops. A snippet can put arbitrary messages on the channel.

So the channel is not hidden; it is made harmless. The host treats every inbound message as untrusted input, because a message proves that *something* in the child asked, never that the snippet asked:

- a method not in the exposed set is refused **without being reached**, and inherited properties do not count as methods
- a malformed message is ignored
- the same method and arguments resolve **once** per run, so asking a thousand times costs one call
- the methods themselves only do what the snippet could already cause — fetch *this request's own URL* — so a forged message grants no new capability

That last point is the one doing the real work. Validation bounds the blast radius; the capability design is why there is no blast.

## Page methods backed by the channel

With the channel in place, page methods stop being baked-in values and become calls:

```js
page["content"] = (...args) => globalThis.__isolated_host("content", args)
```

The host side is three functions:

```js
const withHtml = {
  content: async () => (await resolvePage()).content,
  url: async () => (await resolvePage()).payload.url,
  metadata: () => pageMetadata(query, resolveForMeta)
}
```

`resolvePage` is where the laziness lives. The request's fetch is shared by every extractor; if the gate already declined it — because nothing else needed the page — `resolvePage` turns that skipped fetch into a real one. It has to, because a Function decides at runtime, which is *after* every other extractor has had its turn.

Two details that took a test failure each to get right:

A method provided through the channel still has to count as satisfying that method when we decide whether to start Chromium. Otherwise a snippet reading only `page.content()` would boot a browser it never needs. The inlined `page.extract()` reads `this.content()`, so it counts too — we found that when `extract` started failing with `this.content is not a function`.

And the eager path hydrated the parsed DOM from the raw HTML before handing it to metascraper. The lazy path has to do that wherever the payload is first read, which a test caught by returning `null` for every metadata field.

## What laziness bought

Production, `news.ycombinator.com`, medians of 5:

```
() => 1                                     410ms    nothing fetched
() => 1  &meta=true  (the old behaviour)   1542ms    fetch + metadata + media
cond ? await page.content() : 'x'  (false)  383ms    nothing fetched
```

**3.76x** on the shape that changed, and the third row is the one static analysis could never reach.

Two honest notes. Production carries ~246ms of fixed overhead — TLS, auth, cache lookup — measured by asking for no function at all. Net of that floor the function work itself is 1296ms to 164ms, about 7.9x, which is what the local benchmark showed. The number a customer actually experiences is 3.76x, and that is the one worth quoting. And metadata is now off by default when a function is the only thing you ask for, which is a visible change: `?function=` used to return `data.title` too. The reachability ping is off with it, so `data.url` is the URL you asked for rather than the one a redirect settles on.

## And then the tail

With the fetch gone from the fast path, the remaining cost of a browser-driving Function was the isolate itself. Benchmarking it in production, 30 samples of `({ page }) => page.title()`:

```
fn.run  104ms   median
fn.run  761ms   p90
fn.run 3261ms   max
```

Nearly a quarter of requests above 400ms for a call that should be instant. The median was fine, which is why nobody had noticed — a tail is invisible to anyone watching averages.

`fn.run` was one number covering four distinct operations. That is the whole reason what follows took three attempts.

## Guess one: the page scan

A Function connects to the browser over a WebSocket and has to find *its* page, because one Chrome instance serves many concurrent requests. It did that by scanning:

```js
for (const candidate of pages) {
  const session = await candidate.createCDPSession()
  const { targetInfo } = await session.send('Target.getTargetInfo')
  if (targetInfo.targetId === targetId) return candidate
}
```

Three round trips per candidate, against pages belonging to other requests. Correlating the page count the isolate saw against the time it took:

```
pages=1   80-118ms   (12 samples)
pages=2   473ms
pages=2   1747ms
```

That looked conclusive. The target id is available locally without a round trip, so we read it locally and shipped it.

**The tail did not move.**

The correlation was real and the causation was not. A browser with a second page open is a *busy* browser, and busy browsers are slow for reasons unrelated to how you look up a target. We had measured the marker and called it the mechanism — on two samples.

## Guess two: the WebSocket connect

So we timed the snippet from inside itself:

```
fn.run=3536   inside=10   (pages=2  title=8)
fn.run=6466   inside=5    (pages=0  title=5)
fn.run=117    inside=5    (pages=0  title=5)
```

The snippet's own work was 5-10ms whether the request was fast or slow. All the variance happened **before the snippet body ran** — and the snippet cannot observe that.

By elimination the suspect became `puppeteer.connect`, the WebSocket handshake. It was the one step whose cost should scale with how busy Chrome is.

That was also wrong. We did not know yet, because there was still nothing to measure.

## Stop guessing

Three plausible diagnoses, one shipped fix that changed nothing. The problem was never the reasoning; it was that `fn.run` covered four operations and we kept reasoning about which one it was.

So we taught the isolate to name spans inside its own execution, and named every step it takes before the snippet starts:

```js
const puppeteer = await timed('require', () => require('@cloudflare/puppeteer'))
const browser   = await timed('connect', () => puppeteer.connect({ browserWSEndpoint }))
const pages     = await timed('pages',   () => browser.pages())
const page      = await timed('resolve', () => resolvePage(pages, targetId))
```

Each becomes a `Server-Timing` entry and a metric, so it is sliceable over a window instead of something you catch one slow request at a time. That mattered: the earlier evidence had been two samples.

A detail that is easy to get wrong here. The customer's snippet can also name spans — the recorder is on `globalThis` inside the isolate — so the API publishes only names it chose. Without that allowlist, a snippet in a loop would mint unbounded distinct metric names in our monitoring.

One run of 30 samples answered it:

```
require=45  connect=109  pages=7483  resolve=0  run=32  total=9385
require=34  connect=31   pages=1327  resolve=0  run=4   total=2869
require=29  connect=38   pages=335   resolve=0  run=8   total=3069
---
require=32  connect=32   pages=19    resolve=0  run=5   total=1550   (24 of 30)
```

Every slow request was `pages`. `connect` held 26-109ms throughout, **including the 9.4-second one**, so guess two was dead. And `resolve` was 0 on all 30 — the first proof that the fix from guess one worked, having fixed something that was never the bottleneck.

## `browser.pages()` is not a listing

The name suggests reading a list. Following it through Puppeteer:

```
Browser.pages()        -> every browserContext
BrowserContext.pages() -> targets().filter(type === 'page').map(t => t.page())
Target.page()          -> this._sessionFactory()(…) then CdpPage._create(…)
```

`Target.page()` opens a **CDP session** and runs the full page initialisation handshake. So `browser.pages()` costs one session setup per page target on that browser — including pages owned by other requests, which may be mid-navigation and slow to answer.

One busy neighbour is enough. That is why the cost never tracked the page count, and why `pages=2` looked like a scan problem.

It is also the same bug one layer deeper than we first fixed it. Guess one removed the round trip from the *scan*; the enumeration that built the array the scan walked still paid a session per page. Right neighbourhood, wrong call.

## The fix is to not ask

We already knew which page we wanted — the request hands its target id to the isolate. Puppeteer keeps a local target registry maintained from target events, so the id can be matched with no round trip, and only *our* page gets constructed:

```js
const target = browser.targets().find(t => t._targetId === targetId && t.type() === 'page')
return target ? await target.page() : undefined
```

Against a browser with four contexts and five pages open:

```
pages()=8.6ms (n=5)      targets().find().page()=1.4ms
```

The local ratio understates it, because locally every page is warm and idle. The production cost came from a *stranger's* page being busy, which does not reproduce on a laptop. What is directly observable is that the expensive call is gone.

`_targetId` is private, so a miss falls through to the old enumerate-and-scan rather than failing, and a request that never supplied a target id keeps the previous path untouched.

## Three runs, 90 samples

```
                 median   p75    p90    p95    max
before (fn.run)    104     166    761    831   3261
after  (run 1)      20      23     41     42   1202
after  (run 2)      23      25     29     33     45
after  (run 3)      20      22     29     39    404
```

**p90: 761ms to 29ms.** `fn.pages` absent in all 90 samples, so the lookup never fell through. And `fn.run` — now genuinely the snippet's own time — reads a median of 5ms for `page.title()`, because it is no longer absorbing the setup.

Two things we are not claiming. The median request barely moved: the ladder fetch at ~1000ms and process spawn at ~215ms dominate, and this was a tail fix. And a 404ms outlier survives at roughly 1-in-30 — constructing *our own* page can still occasionally block. You can stop touching other people's pages; you cannot stop waiting for your own.

## What we would do differently

Nothing about the three wrong guesses was careless. Each was the most plausible explanation given what we could see, and two were supported by real correlations. The failure was accepting narrowing-by-elimination as evidence when the thing being eliminated was unmeasured.

That cost one shipped fix that did nothing, two rounds of analysis, and a tail that stayed in production longer than it needed to. The instrumentation that settled it was about forty lines, and we could have written it first.

If a number you cannot explain covers more than one operation, split the number before forming the hypothesis. Hypotheses are cheap and data is cheap, but a wrong hypothesis you can act on is expensive.

The same applies to the feature half. Static analysis of the snippet was the right instinct and got most of the win, and the branch it cannot answer is exactly the case that needed a different mechanism. Knowing which questions a technique cannot answer is worth as much as knowing what it does.

## See also

- [function](/docs/api/parameters/function) — run JavaScript against any URL
- [Profiling and performance](/docs/guides/function/profiling-and-performance) — when the page is fetched, and what the phases mean
- [meta](/docs/api/parameters/meta) — why metadata is off when a function is all you ask for
- [How one Chrome flag made GPU-less WebGL screenshots 4× faster](/blog/webgl-without-a-gpu) — another case where the obvious suspect was not the cause
