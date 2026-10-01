---
title: 'The 15-second function that ran your code for 5 milliseconds'
subtitle: 'Three wrong diagnoses, one measurement, and a call that was never a listing'
description: 'A Microlink Function reading nothing but a page title occasionally took 15 seconds. We guessed wrong three times and shipped a fix for the wrong step, then instrumented the isolate and found it in one run: browser.pages() builds a Page over CDP for every page on the browser.'
authors:
  - kiko
date: '2026-10-01'
---

A [Microlink Function](/docs/api/parameters/function) whose entire body is `page.title()` occasionally took 15 seconds. The customer's code ran for 5 milliseconds. We spent three rounds guessing where the other 14,995 went, and every guess was plausible and wrong.

**TL;DR**

- `fn.run` reported reaching the page and running the snippet as **one number**, so a slow setup looked like slow customer code.
- We narrowed by elimination three times: the page scan, then `connect`, then the page scan again. All wrong.
- Instrumenting the isolate settled it in **one 30-sample run**: `browser.pages()`, from 15ms to **7483ms**.
- `browser.pages()` is not a listing. It constructs a `Page` object over CDP for **every page target on the browser**, including pages other requests own and may be mid-navigation.
- Tail p90 went from **761ms to 29ms**, and the fix was to stop asking a question we already knew the answer to.

## What a Function actually does

When your snippet touches `page`, we hand it a real Chrome page. The request fetches the target through our proxy and antibot ladder, keeps that page open, and the snippet runs on it instead of navigating a second time.

Your code runs in an isolated subprocess, which connects back to the browser over a WebSocket. That subprocess has to find *its* page among whatever else that browser is doing, because one Chrome instance serves many concurrent requests.

That last sentence is the whole bug, and it took us three tries to read it properly.

## The symptom

Benchmarking production, 30 samples of the same trivial snippet:

```
fn.run  104ms   median
fn.run  761ms   p90
fn.run 3261ms   max
```

Nearly a quarter of requests were above 400ms for a call that should be instant. The median was fine, which is why it had gone unnoticed: a tail problem is invisible to anyone watching averages.

## Guess one: the page scan

To find its page, the subprocess scanned the browser's pages and asked each one over CDP which target it was:

```js
for (const candidate of pages) {
  const session = await candidate.createCDPSession()
  const { targetInfo } = await session.send('Target.getTargetInfo')
  if (targetInfo.targetId === targetId) return candidate
}
```

Three round trips per candidate, against pages belonging to other requests. We correlated the page count the subprocess saw against the time it took:

```
pages=1   80-118ms   (12 samples)
pages=2   473ms
pages=2   1747ms
```

That looked conclusive. The id is available locally without any round trip, so we read it locally and shipped it.

**The tail did not move.** Worse, the next run looked slightly worse, which on a shared cluster at a different hour means nothing either way.

The correlation was real and the causation was not. A browser with a second page open is a *busy* browser, and busy browsers are slow for reasons that have nothing to do with how you look up a target. We had measured the marker and called it the mechanism.

## Guess two: the WebSocket connect

So we timed the snippet from inside itself:

```js
async ({ page }) => {
  const t0 = Date.now()
  const pages = await page.browser().pages()
  const t1 = Date.now()
  const title = await page.title()
  return { pages: t1 - t0, title: Date.now() - t1 }
}
```

```
fn.run=3536   inside=10   (pages=2  title=8)
fn.run=6466   inside=5    (pages=0  title=5)
fn.run=117    inside=5    (pages=0  title=5)
```

The snippet's own work was 5-10ms whether the request was fast or slow. All the variance happened **before the snippet body ran**, and the snippet cannot observe that.

By elimination, the remaining suspect was `puppeteer.connect` — the WebSocket handshake to the browser. It was the one step whose cost should scale with how busy Chrome is, and we could not see it.

That was guess two, and it was also wrong. We did not know yet, because there was still nothing to measure.

## Stop guessing

Three plausible diagnoses, one shipped fix that changed nothing. The problem was not the reasoning, it was that `fn.run` was a single opaque number covering four distinct operations.

So we made the subprocess able to name spans inside its own execution, and named every step it takes before the snippet starts:

```js
const puppeteer = await timed('require', () => require('@cloudflare/puppeteer'))
const browser   = await timed('connect', () => puppeteer.connect({ browserWSEndpoint }))
const pages     = await timed('pages',   () => browser.pages())
const page      = await timed('resolve', () => resolvePage(pages, targetId))
```

Each span becomes a `Server-Timing` entry and a metric, so it is sliceable over a window rather than something you catch one slow request at a time. That mattered: our earlier evidence had been two samples on the slow side, which is not enough to support a causal claim about anything.

One run of 30 samples answered it:

```
require=45  connect=109  pages=7483  resolve=0  run=32  total=9385
require=34  connect=31   pages=1327  resolve=0  run=4   total=2869
require=29  connect=38   pages=335   resolve=0  run=8   total=3069
---
require=32  connect=32   pages=19    resolve=0  run=5   total=1550   (24 of 30)
```

Every slow request was `pages`. `connect` held 26-109ms throughout, **including the 9.4-second one**, so guess two was dead. And `resolve` was 0 on all 30, which was the first proof that the fix from guess one had worked — it had simply fixed something that was never the bottleneck.

## `browser.pages()` is not a listing

The name suggests reading a list. Following it through Puppeteer:

```
Browser.pages()        -> every browserContext
BrowserContext.pages() -> targets().filter(type === 'page').map(t => t.page())
Target.page()          -> this._sessionFactory()(…) then CdpPage._create(…)
```

`Target.page()` opens a **CDP session** and runs the full page initialisation handshake. So `browser.pages()` costs one session setup per page target on that browser — including pages owned by other requests, which may be mid-navigation and slow to answer.

One busy neighbour is enough. That is why the cost never tracked the page count, and why `pages=2` looked like a scan problem.

It is also the same mistake one layer deeper than we first fixed it. Guess one removed the round trip from the *scan*; the enumeration that built the array the scan walked still paid a session per page. Right neighbourhood, wrong call.

## The fix is to not ask

We already knew which page we wanted — the request handed its target id to the subprocess. Puppeteer keeps a local target registry maintained from target events, so the id can be matched with no round trip, and only *our* page gets constructed:

```js
const target = browser.targets().find(t => t._targetId === targetId && t.type() === 'page')
return target ? await target.page() : undefined
```

Measured against a browser with four contexts and five pages open:

```
pages()=8.6ms (n=5)      targets().find().page()=1.4ms
```

The local ratio understates it, because locally every page is warm and idle. The cost in production came from a *stranger's* page being busy, which does not reproduce on a laptop. What is directly observable is that the expensive call is gone.

`_targetId` is private, so a miss falls through to the old enumerate-and-scan rather than failing outright, and a request that never supplied a target id keeps the previous path untouched.

## Three runs, 90 samples

```
                 median   p75    p90    p95    max
before (fn.run)    104     166    761    831   3261
after  (run 1)      20      23     41     42   1202
after  (run 2)      23      25     29     33     45
after  (run 3)      20      22     29     39    404
```

**p90: 761ms to 29ms.** `fn.pages` was absent in all 90 samples, so the lookup never fell through. And `fn.run` — now genuinely the snippet's own time — reads a median of 5ms for `page.title()`, down from 104ms, because it is no longer absorbing the setup.

Two things we are not claiming. The median request barely moved: `fetch` at ~1000ms and process spawn at ~215ms dominate, and this was a tail fix, not a throughput one. And a 404ms outlier survives at roughly 1-in-30 — constructing *our own* page can still occasionally block. You can stop touching other people's pages; you cannot stop waiting for your own.

## What we would do differently

Nothing about the three wrong guesses was careless. Each one was the most plausible explanation given what we could see, and two of them were supported by real correlations. The failure was accepting narrowing-by-elimination as evidence when the thing being eliminated was unmeasured.

The cost of that was one shipped fix that did nothing, two rounds of analysis, and a tail that stayed in production longer than it needed to. The instrumentation that settled it was about forty lines.

If a number you cannot explain is covering more than one operation, split the number before forming the hypothesis. The hypothesis is cheap and the data is cheap, but a wrong hypothesis you can act on is expensive.

## See also

- [function](/docs/api/parameters/function) — run JavaScript against any URL
- [Profiling and performance](/docs/guides/function/profiling-and-performance) — when the page is fetched, and what the phases mean
- [How one Chrome flag made GPU-less WebGL screenshots 4× faster](/blog/webgl-without-a-gpu) — another case where the obvious suspect was not the cause
