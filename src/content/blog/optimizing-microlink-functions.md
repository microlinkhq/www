---
title: 'Optimizing Microlink Functions'
subtitle: 'A walkthrough of making Microlink Functions faster: skipping the pages nobody reads, and the slow tail we found along the way.'
description: 'Microlink Functions now fetch the page only when your code reads it, through an IPC channel into the isolate, and find their own page without touching other requests. How each speedup was built, and the three wrong guesses before the second one.'
authors:
  - kiko
date: '2026-10-01'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { ServerTiming, Stats } from 'components/markdown/Timing'
import { EditorCard } from 'components/markdown/EditorCard'
import { sitemapCardCode } from 'helpers/get-sitemap-urls'
import { IpcDiagram } from 'components/pages/blog/optimizing-microlink-functions'

![Microlink Functions dashboard: usage by plan, error reasons, profiling, and total duration over the past month](/images/microlink-functions-dashboard.png)

<Figcaption>The Microlink Functions dashboard over the past month.</Figcaption>

We iterate [Microlink Functions](/docs/api/parameters/function) to speed up the process in certain situations. A function that never reads the page no longer needs to fetch it. Similarly, a browser-driving function no longer waits for pages belonging to other requests. The first iteration took a month of work. The second took three attempts and one measurement.

**TL;DR**

- A Function used to fetch the page whether your code read it or not. For code that never reads it, that was **79% of the request**.
- Now the page is fetched when your code asks for it, through a channel from the isolate to the host. A function that never reads the page is **3.76x faster**.
- Every request on that channel is treated as untrusted, and the host only answers ones that grant nothing new.
- With the fetch gone, a slow tail showed up: `browser.pages()` touched every page on the browser. Matching our own page instead made the slowest requests **26x faster** at p90.

## Every Function paid for a page it might never read

When the snippet of code is sent to Microlink Function, it will be executed in an isolated subprocess, winimal permission model and limited filesystem and network acess.

<EditorCard
  template='extract-list'
  title='Extract a collection'
  code={`const { value } = await microlink.function(
  'https://news.ycombinator.com',
  ({ page }) => page.extract({
    stories: {
      selectorAll: '.athing',
      attr: {
        title: { selector: '.titleline > a', attr: 'text' },
        href: { selector: '.titleline > a', attr: 'href', type: 'url' }
      }
    }
  })
)`}
/>


Your function gets the full [Puppeteer page](/docs/api/parameters/function#page) API, plus two methods of ours: [page.metadata](/docs/api/parameters/function#pagemetadata) and [page.extract](/docs/api/parameters/function#pageextract). 

These methods require a browser. But what if a function doesn't require one at all?

<EditorCard
  template='sitemap'
  title='List sitemap URLs'
  code={sitemapCardCode('https://microlink.io')}
/>

That function reads `robots.txt` and walks the sitemaps it lists. It never touches `page`, yet it still paid for the fetch, the metadata extraction, and the image and logo probing that runs over that metadata. For code like this, that was 79% of the request.

**Improved:** Now we detect when a function needs the page, and skip the fetch, the metadata and the image probing when it does not.

## Letting your function ask for the page

The sitemap function above never references the `page` variable.

Rather than fetching the page every time, we wanted to skip the fetch phase if there was no page reference in the function.

In order to do this, we first need to establish whether a function reads the page. Our initial approach was to examine the code before executing it. However, this solution has limitations: it cannot take code branches into account until they are executed.

```js
async ({ page }) => (shouldRead ? await page.content() : 'skipped')
```

We moved the decision to runtime: the page is fetched at the moment your code calls `page.content()`, and not before. 

For that, your function needs a way to ask our API for the page while it runs, and we built it as an inter-process communication (IPC) channel. Here is why it had to be one.

Your function runs in an isolated subprocess: a separate Node.js process, with no network access unless granted. The page, and everything needed to fetch it (our proxies and antibot handling), lives in our API, a different process.

To fetch on the call instead, `page.content()` has to reach our API at the moment it runs, and it cannot do that by itself:

- **It cannot fetch the page itself.** The subprocess has no network, and even with network it would skip our proxies and antibot handling.
- **It cannot read the page from our API.** Two processes share no memory, so nothing our API holds is visible to your code.

That leaves one way across: send a message and wait for the reply. When your code calls `page.content()`, the subprocess sends a request over the IPC channel, our API fetches the page, and the reply becomes the return value.

<IpcDiagram />

<Figcaption>Your function never touches the network. It asks our API for the page, and our API fetches it through our proxies and antibot handling.</Figcaption>

The first working version answered a request and then hung until it was killed at its timeout. An open channel keeps the subprocess alive, so it has to close before the result is written.

That channel reaches into a process running code we did not write, so every message on it is treated as untrusted input:

- **Unknown methods are refused without being reached.**
- **Malformed messages are ignored.**
- **Repeats resolve once.** The same method and arguments cost one call per run, however many times they are asked.
- **Every method only does what your code could already do:** fetch this request's own URL.

The last rule is the one that matters. Checking messages limits what a forged one can do. Limiting every method to this request's own URL means there is nothing to gain from forging one.

The same channel fixed a double load. Until now, fetching the page happened in its own browser tab, separate from the tab your function ran in, so a function like `({ page }) => page.title()` loaded the same URL twice. Now the fetch and your function share one tab, and on `example.com` that took the function from 1461ms to 868ms. Because that one tab is loaded through our proxies and antibot handling, your code no longer gets a challenge page from a second, unprotected load.

That is the first speedup: `() => 1` went from 1542ms to 410ms on `news.ycombinator.com`, **3.76x faster**, and a branch that is not taken fetches nothing at all. Metadata is now off by default when a function is the only thing you ask for, so `?function=` no longer returns `data.title` unless you add [meta](/docs/api/parameters/meta).

**Improved:** Your function gets the page only when it asks for it, loaded once in a shared tab, and no request it sends grants anything new.

## A fast median hid a slow tail

With the fetch gone from the fast path, the remaining cost of a browser-driving Function was the isolate. In the week before the fix, 28 production requests ran a function whose entire body is `page.title()`. This is their `fn.run`, the phase that runs your function:

<Stats
  items={[
    { label: 'Median', value: '358ms' },
    { label: 'p90', value: '9715ms' },
    { label: 'Max', value: '15055ms' }
  ]}
/>

The median was fine, but nearly half of them were slow, and the slowest spent 15 seconds in `fn.run`. Averages hid them.

Here is that slowest request, as our metrics reported it:

<ServerTiming header='total;dur=16589, fetch;dur=960, fn.install;dur=0, fn.build;dur=1, fn.spawn;dur=205, fn.run;dur=15055' />

<Figcaption>Every phase had a metric. fn.run held 15.1 of the 16.6 seconds, and nothing said what was inside it.</Figcaption>

Almost all of the request was inside `fn.run`, and `fn.run` covered four operations. That is why it took three tries.

### Guess one: the page scan

A Function connects to the browser over a WebSocket and has to find its own page, because one Chrome instance serves many requests at once. It did that by scanning every page and asking each one who it was:

```js
for (const candidate of pages) {
  const session = await candidate.createCDPSession()
  const { targetInfo } = await session.send('Target.getTargetInfo')
  if (targetInfo.targetId === targetId) return candidate
}
```

Slow requests lined up with a second page being open. The target id was available locally, so we read it locally and shipped the fix.

**The tail did not move.** A browser with a second page open is serving a second request, so every call on it waits longer, however you look up the target. We had measured a marker and called it the mechanism, on two samples.

### Guess two: the WebSocket connect

Timing the snippet from inside itself showed its own work was a few milliseconds whether the request was fast or slow. The delay happened before the snippet body ran, where the snippet cannot see.

By elimination the suspect became `puppeteer.connect`, the WebSocket handshake. It was the step that should get slower as Chrome got busier. It was also wrong, but we could not know yet, because there was still nothing measuring it.

**Learned:** `fn.run` covered four operations, so no guess about it could be confirmed or ruled out.

## We stopped guessing and named every step

Three plausible diagnoses and one shipped fix that changed nothing. The reasoning was fine. The input was one number for four operations.

So the isolate learned to name spans inside its own run, one for every step before the snippet starts:

```js
const puppeteer = await timed('require', () => require('@cloudflare/puppeteer'))
const browser   = await timed('connect', () => puppeteer.connect({ browserWSEndpoint }))
const pages     = await timed('pages',   () => browser.pages())
const page      = await timed('resolve', () => resolvePage(pages, targetId))
```

Each span becomes a `Server-Timing` entry and a metric. The customer's snippet can name spans too, since the recorder is on `globalThis`, so the API only publishes names it chose. Without that allowlist, a snippet in a loop could mint endless metric names in our monitoring.

With the spans in production, one slow request answered what three guesses could not. Here is one from the same `page.title()` function, 10.7 seconds long:

<ServerTiming header='total;dur=10680, fetch;dur=3857, fn.install;dur=0, fn.build;dur=2, fn.spawn;dur=243, fn.require;dur=31, fn.connect;dur=31, fn.pages;dur=6402, fn.resolve;dur=0, fn.run;dur=5' />

<Figcaption>fn.run, opened up. fn.pages, the call to browser.pages(), took 6.4 seconds. page.title() itself, now the only thing in fn.run, ran for 5ms.</Figcaption>

Now it's crystal-clear as water: What is `pages` phase doing? That's the thing we have to figure out.

**Improved:** Every step before the snippet has its own `Server-Timing` span, so a slow request names its own cause.

## browser.pages() is not a listing

The name suggests reading a list. Following it through Puppeteer, it builds a page for every tab on the browser:

```text
browser.pages()
├─ context A
│  ├─ tab 1 → CDP session (yours)
│  └─ tab 2 → CDP session (other)
└─ context B
   └─ tab 3 → CDP session (other)
```

`Target.page()` opens a CDP session and runs the full page setup. So `browser.pages()` sets up a session for every page on the browser, including pages that belong to other requests and may be in the middle of loading. One busy neighbour is enough.

It was the same bug as guess one, one layer deeper. We had removed the round trips from the scan, but the call that built the list the scan walked still paid for every page.

The fix was to stop asking for every page. We already knew which page we wanted, because the request hands its target id to the isolate. Puppeteer keeps a local registry of targets, so the id can be matched without a round trip, and only our page gets built:

```js
const target = browser.targets().find(t => t._targetId === targetId && t.type() === 'page')
return target ? await target.page() : undefined
```

`_targetId` is private, so a miss falls back to the old scan rather than failing, and a request without a target id keeps the old path.

Here is the 10.7-second request from above with the fix applied:

<ServerTiming header='total;dur=4303, fetch;dur=3857, fn.install;dur=0, fn.build;dur=2, fn.spawn;dur=243, fn.require;dur=31, fn.connect;dur=31, fn.target;dur=25, fn.run;dur=5' />

<Figcaption>The 6.4 seconds of fn.pages become 25ms of fn.target, its median in production after the fix. Every other phase is unchanged.</Figcaption>

That is the second speedup. In a 30-sample benchmark of the same function, before and after the fix, p90 went from 761ms to 29ms, **26x faster**, and `fn.run` finally meant what it said: the snippet's own time. What we are not claiming: the median request barely moved, because the fetch and process spawn dominate it. And a rare outlier survives, because building our own page can still block. You can stop touching other people's pages. You cannot stop waiting for your own.

**Improved:** A function builds only its own page, and the slowest requests are 26x faster at p90.

## Conclusions

Here is everything that changed in Microlink Functions, and what each change improved:

- **Functions skip the page they never read.** We read the code before running it, so a function that never mentions `page`, like the sitemap one, skips the fetch, the metadata and the image probing.
- **The page is fetched only when your code asks.** An IPC channel lets `page.content()`, `page.metadata()` and `page.extract()` request it at runtime, so a branch that is not taken fetches nothing. A function that never reads the page is **3.76x faster**.
- **One tab, loaded once.** The fetch and your function share the same tab, loaded through our proxies and antibot handling.
- **Every phase has a name.** `Server-Timing` now reports each step before your code runs as its own span, so a slow request shows its own cause.
- **A function builds only its own page.** Matching the target id instead of calling `browser.pages()` made the slowest requests **26x faster** at p90.

The bug hunt taught us more than the fix. Three plausible guesses failed because `fn.run` covered four operations and none of them was measured. The instrumentation that settled it was about forty lines, and we could have written it first. If a number you cannot explain covers more than one operation, split it before forming a hypothesis.

To try it, run a snippet with the [function parameter](/docs/api/parameters/function). The [profiling and performance guide](/docs/guides/function/profiling-and-performance) covers when the page is fetched and what each phase means. For another case where the obvious suspect was innocent, read [How one Chrome flag made GPU-less WebGL screenshots 4× faster](/blog/webgl-without-a-gpu).
