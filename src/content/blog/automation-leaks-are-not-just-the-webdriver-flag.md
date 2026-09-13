---
title: 'Automation Leaks Are Not Just the WebDriver Flag'
subtitle: 'Cutting page-visible automation calls by 99% with isolated worlds'
description: 'Before taking a screenshot, browserless was running its own DOM work inside the page, where any site can watch it. Moving that work into isolated worlds cut page-visible automation calls from 1.7M to 14.6K across ten live sites, and made captures cheaper. The measurements, the mechanism, and what still leaks.'
authors:
  - kiko
date: '2026-09-13'
---

Every guide on undetectable headless browsing starts and ends with the same property:

```js
navigator.webdriver // false, and everyone knows how to hide it
```

We pass that check. We have passed it for years. Yet until last week, any site could install one line of JavaScript and watch us work:

```js
const original = document.querySelectorAll
document.querySelectorAll = function () {
  console.log(new Error().stack)
  return original.apply(this, arguments)
}
```

On [The Guardian](https://www.theguardian.com), a single viewport screenshot tripped that hook **14,537 times**. The stack frames named us: `pptr:evaluate`, `extractFeatures`, `detectCmp`. Not one of those calls came from the page.

**TL;DR**

- The leak was never a property to spoof. It was that [browserless](https://browserless.js.org) did its own DOM work inside the page, where the page can hook it.
- Moving that work into Chrome's isolated worlds took page-visible automation calls across ten live sites from **1,716,830 to 14,658**, a 99.1% reduction. Five of ten sites now sit at exactly zero.
- Hiding it also made it **cheaper**. A Guardian viewport screenshot went from 645 protocol commands to 162.
- Reading detector output closely was worth more than passing it. Three emulation bugs turned up, one bad enough that the detectors' own fingerprinting scripts were crashing partway through.

## Two worlds, one DOM

Chrome gives every frame more than one JavaScript world. The **main world** is the page's own: its scripts, its globals, its prototypes. An **isolated world** shares the same DOM but gets a private globals object and a private stack.

Same `document`. Different observers.

If the page patched `document.querySelectorAll`, the main world calls the patch. The isolated world calls the real one. The page never learns a thing. Puppeteer exposes it as `isolatedRealm()`, and the switch is about that small:

```js
const isolatedRealm = page.mainFrame().isolatedRealm()
await isolatedRealm.evaluate(() => {
  /* the page cannot see this run */
})
```

We were calling the patch. Everywhere.

## What we wanted to improve

Taking a screenshot is never just a screenshot. Before the shutter, a handful of helpers walk the DOM, and every one of them was doing it in public:

- **Handling cookie banners.** Consent dialogs have to be found, measured and clicked, which is exactly the shape of activity a bot detector watches for. This one helper accounts for most of the old volume.
- **Blocking ads.** The ad-block engine scans the document to decide what to hide.
- **Dismissing overlays.** Newsletter modals and paywall interstitials get scanned and closed the same way.
- **Reading a page's text.** The helper behind text extraction queried the page's own DOM to do it.
- **Flattening shadow DOM.** Components hidden inside shadow roots get inlined so a screenshot captures them.
- **Positioning the shot.** The screenshot helpers measured elements through page APIs.

Each one had a legitimate reason to touch the DOM and no reason at all to do it where the page could watch. So each moved into an isolated world, one at a time, with the cookie-banner engine reduced to a single flag telling it to stop running in the main world.

## Why the detector score was not the target

Detector sites cannot see this problem, so passing them cannot prove it fixed. On [bot-detector.rebrowser.net](https://bot-detector.rebrowser.net) the main-world check reports `not-triggered` both before and after our change, because it only fires when a client calls its trigger function. A real site does not wait to be asked. It hooks its own DOM and reads whatever we do next.

So we measured from the page's point of view. Before navigation, a hook wraps the page's own DOM APIs (`querySelectorAll`, `getComputedStyle`, `getAttribute`, `classList`, `innerText`, `getBoundingClientRect` and friends). Each call walks `new Error().stack`. Frames pointing at an `http://` or `https://` source are the page's own work and get discarded. Everything else is us, attributed by stack signature.

Then we take an ordinary screenshot. Ten live sites (Guardian, El País, Bild, Le Monde, CNN, NYT, AliExpress, Booking, Stack Overflow, GitHub), viewport and fullPage, identical Chrome 152.0.7977.75 and Puppeteer 25.10.0 on both sides. Every table below is labelled before and after; the two measurement campaigns ran at different points in the release range, so the exact builds differ between tables, but each pair is a true A/B.

## What we found: 99% of the DOM calls were ours

| Automation calls the page could observe | before | after |
| --- | --- | --- |
| viewport screenshots | 288,659 | **7,082** |
| fullPage screenshots | 1,428,171 | **7,576** |
| total | 1,716,830 | **14,658** (−99.1%) |

Le Monde's fullPage capture alone accounted for 299,113 of the old calls. It is now 0.

By API, summed over every site and mode:

| API | before | after |
| --- | --- | --- |
| `getComputedStyle` | 769,473 | **0** |
| `getAttribute` | 554,655 | 2,908 |
| `nodeName` | 202,117 | 11,113 |
| `classList` | 184,427 | **0** |
| `innerText` | 2,910 | **0** |
| `querySelectorAll` | 2,116 | 608 |
| `getBoundingClientRect` | 735 | **0** |
| other APIs | 397 | 29 |

`getComputedStyle` going from 769,473 to zero is the cookie-banner engine leaving the room.

Two caveats belong next to those zeros. Stack Overflow's new fullPage navigation landed on a Cloudflare interstitial, 265 characters of "Just a moment" and 88&nbsp;KB, instead of the question list the old run captured at 1.8&nbsp;MB. There was hardly a page there to touch, so that particular 0 proves nothing; the viewport run is the honest comparison for that site, the real question list both times, **29,562 calls before and 0 after**. Interstitials like that are order-dependent rather than version-dependent, and reversing the run order blocked both sides equally.

And almost none of the remaining 14,658 is helper code. 14,517 of them are [uBlock-style scriptlets](https://github.com/gorhill/uBlock/wiki/Resources-Library) shipped inside the ad-block engine's filter lists and injected as page scripts against specific domains. Those run in the main world on purpose: a scriptlet that neutralizes an anti-adblock check has to be *in* the page to do it, and it looks like the filter-list resource it is. Bild and AliExpress are the heaviest filtered sites in the set and hold nearly all of it, 11,068 and 3,077 calls.

The last 141 the harness could not attribute to anyone, so they stay in an `other` bucket rather than a flattering one. Read them at their worst and the bound still holds: 141 calls we have not proven innocent, against 1,716,830 before.

## Hiding the work made it cheaper

The part we did not expect. Reaching into a page for a node through Puppeteer is not one message, it is a conversation: the protocol resolves the node into a remote object, describes it, releases it, and the handle gets cleaned up afterwards. Do that per element, per capture, and most of the traffic is bookkeeping about objects rather than work on the page. One isolated-world `evaluate` is a single message.

Per-method counts for one Guardian capture, median of five runs:

| DevTools protocol method | before | after |
| --- | --- | --- |
| `Runtime.releaseObject` | 484 | **22** |
| `DOM.describeNode` | 248 | **22** |
| `DOM.resolveNode` | 248 | **22** |
| `Page.createIsolatedWorld` | 0 | 11 |

Three hundred round trips of object lifecycle collapse into eleven world creations and a handful of evaluations. The totals follow: The Guardian's viewport capture went from 645 commands to 162, CNN from 518 to 186, GitHub from 322 to 209. Viewport screenshots issue 35% to 75% fewer commands, fullPage 11% to 59% (The Guardian: 843 to 344). Measured inside the screenshot package alone, commands per capture fell from 35 to 11 for a viewport shot, 42 to 18 for fullPage, and 49 to 29 for an element clip.

The same collapse shows up per frame during navigation. On a page with a cookie banner, protocol commands per navigation fall from 40 to 27 with no iframes, 240 to 167 with twenty, and 540 to 377 with fifty. `Runtime.callFunctionOn` accounts for most of the reduction, 21 to 9, 141 to 69, and 321 to 159, because the banner logic stops reaching into every frame's main world one call at a time.

Memory follows the same shape, conditionally. Cookie-banner handling used to run in the main world of every frame; on a 50-iframe page that was all 51 frames, and it is now a single isolated world, taking JS heap from 24.14&nbsp;MB to 22.08&nbsp;MB. But an isolated world costs about 0.2&nbsp;MB per document, so at 20 iframes the same harness measured slightly worse, 11.10&nbsp;MB to 11.77&nbsp;MB. The win only appears once frames multiply enough for one world to beat fifty-one.

None of this made captures faster on the clock. Every timing landed between −3.8% and +0.7%, inside run-to-run noise, and resident memory moved between −0.2% and +4.8%. Fewer messages bought headroom, not latency: the work was never protocol-bound. Titles, extracted text and cookie-banner outcomes stayed equivalent site by site.

## Three bugs we only saw by reading the output

None of these had anything to do with isolated worlds. They surfaced because we started reading detector output carefully instead of reading its score.

**We were deleting standard Web APIs.** Our launch flags stripped `Notification`, `speechSynthesis`, `webkitSpeechRecognition`, `PushManager` and `PaymentRequest` from every page. Stock Chrome exposes all five. Worse, `permissions.query('notifications')` still answered `prompt`, so a page could read the contradiction: permission to send notifications, no API to send them with.

That was not a subtle signal, it was fatal to the detectors themselves. On [bot.sannysoft.com](https://bot.sannysoft.com) the `fp-collect` section never rendered: **0 checks completed** before, 20 after. On [bot.incolumitas.com](https://bot.incolumitas.com), `fpscanner` returned **0 keys** before and 21 after. Their scripts were throwing partway through on a missing global, and a fingerprinting script that dies is itself an anomaly. We were failing tests by being too strange to test.

**The screen was smaller than the window.** `window.innerWidth` reported 1280 while `screen.width` reported Chrome's headless default of 800x600. No desktop exists where the window is wider than the screen. The consequence was not only a fingerprint:

```js
matchMedia('(max-device-width: 1024px)').matches
// before: true   ← the site serves tablet CSS
// after:  false
```

Desktop pages were getting their tablet layout. `screen` now reads 1440x900 for the default device, and the screenshots come back pixel-identical, so the fix changed what sites decide and not what we render.

**Client Hints were missing.** We set a Chrome user agent string and then sent no `Sec-CH-UA` headers at all, and `navigator.userAgentData` came back empty. Modern Chrome always sends them, so the combination was self-contradicting. Both now match the user agent we claim.

Measured across those detectors, 3 runs per side, 24 runs, zero errors:

| Detector | before | after |
| --- | --- | --- |
| [fingerprint-scan.com](https://fingerprint-scan.com) bot score | 100/100 | **90/100** |
| [CreepJS](https://abrahamjuliot.github.io/creepjs/) "like headless" | 38% | **31%** |
| sannysoft `fp-collect` checks | 0 | 20 |
| incolumitas `fpscanner` keys | 0 | 21 |

## The honest limits

**`Runtime.enable` is still detectable.** Rebrowser's check passes, but the general technique does not care: `Error.prepareStackTrace` and console timing still reveal that a debugger is attached. Closing that means patching `puppeteer-core` itself.

**Web Workers still say HeadlessChrome.** The page reports Chrome; spawn a worker and its `navigator.userAgent` reports `HeadlessChrome`. CreepJS flags exactly that, before and after.

**Notification overlays now show up in screenshots.** Restoring `Notification` means sites that gate an opt-in prompt on the API existing now render it, and it lands in the capture. AliExpress does this, and denying the permission does not help: the site reads `denied` and renders its overlay anyway. The overlay was absent before only because the API was missing entirely, so the site's feature detection never ran. Exposing the API is the right call, and this is its visible cost.

**The scoreboard barely moved, and that is expected.** 100/100 to 90/100, 38% to 31%. Those numbers are dominated by signals we are not pretending about: real headless Chrome, a datacenter IP, no GPU. What changed is not the score on a detector page. It is that a real site watching its own DOM sees 99% less of us.

That is the part no detector site was ever going to tell us, which is why we had to hook ten real sites and count.
