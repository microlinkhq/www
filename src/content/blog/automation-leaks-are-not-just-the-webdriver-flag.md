---
title: 'Isolated Worlds Hide Headless Work'
subtitle: 'Visible automation cut by 99%'
description: 'Before a screenshot, browserless walked the DOM inside the page, where any site could watch. Isolated worlds cut those calls from 1.7M to 14.6K across ten live sites, made captures cheaper, and surfaced three emulation bugs along the way.'
authors:
  - kiko
date: '2026-09-13'
---

A [screenshot](/docs/api/parameters/screenshot) is never just a screenshot. Before the shutter, [browserless](https://browserless.js.org) dismisses cookie banners, hides ads, and closes newsletter modals. Until last week, the page could watch every one of those calls.

**TL;DR**

- The leak was never `navigator.webdriver`. It was our own DOM work running inside the page.
- Isolated worlds cut page-visible automation calls from **1,716,830 to 14,658** across ten live sites (−99.1%). Five of the ten now sit at zero.
- The same change made captures cheaper: a Guardian viewport screenshot went from 645 DevTools commands to 162.
- Detector scores barely moved. Reading how they failed found three emulation bugs instead.

## What we wanted to improve

Taking a screenshot means cleaning the page first. A handful of helpers walk the DOM before we capture, and every one of them was doing it in public:

- **Cookie banners.** Consent dialogs have to be found, measured, and clicked. This helper accounted for most of the old volume.
- **Ads.** The ad-block engine scans the document to decide what to hide.
- **Overlays.** Newsletter modals and paywalls get scanned and closed the same way.
- **Text.** The extraction helper queried the page's own DOM.
- **Shadow DOM.** Components inside shadow roots get inlined so the screenshot includes them.
- **Positioning.** The screenshot helpers measured elements through page APIs.

Each one had a reason to touch the DOM. None of them had a reason to do it where the page could watch. The goal was the same capture, without the trail.

## Why we needed to improve

Every guide on undetectable headless browsing starts and ends with the same property:

```js
navigator.webdriver // false, and everyone knows how to hide it
```

We pass that check. We have passed it for years. It does not matter. Any site can install one line of JavaScript and watch the work that actually happens:

```js
const original = document.querySelectorAll
document.querySelectorAll = function () {
  console.log(new Error().stack)
  return original.apply(this, arguments)
}
```

On [The Guardian](https://www.theguardian.com), a single viewport screenshot tripped that hook **14,537 times**. The stack frames named us: `pptr:evaluate`, `extractFeatures`, `detectCmp`. Not one of those calls came from the page.

Detector sites cannot see this, so passing them cannot prove it is fixed. On [bot-detector.rebrowser.net](https://bot-detector.rebrowser.net) the check reports `not-triggered` both before and after, because it only fires when a client calls its trigger function. A real site does not wait to be asked. It hooks its own DOM and reads whatever we do next.

## What we found

Chrome already had the hiding place. Every frame has a **main world** (the page's scripts and prototypes) and an **isolated world** (the same DOM, a private stack). If the page patches `document.querySelectorAll`, the isolated world still calls the real one. Puppeteer exposes it as `isolatedRealm()`:

```js
const isolatedRealm = page.mainFrame().isolatedRealm()
await isolatedRealm.evaluate(() => {
  /* the page cannot see this run */
})
```

We were calling the patch. Everywhere. Each helper moved into an isolated world, one at a time.

To prove it, we measured from the page's point of view. A hook wraps the page's own DOM APIs before navigation. Calls that come from the site's own scripts are discarded. Everything else is us. Then we take an ordinary screenshot: ten live sites, viewport and fullPage, identical Chrome 152.0.7977.75 and Puppeteer 25.10.0 on both sides.

The page could observe **1,716,830** automation calls across those ten sites. After the move: **14,658**. That is 99.1% less.

| Automation calls the page could observe | before | after |
| --- | --- | --- |
| viewport screenshots | 288,659 | **7,082** |
| fullPage screenshots | 1,428,171 | **7,576** |
| total | 1,716,830 | **14,658** (−99.1%) |

Le Monde's fullPage capture alone was 299,113 of the old calls. It is now 0.

The cookie-banner engine was most of it. By API:

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

Almost none of the remaining 14,658 is helper code. **14,517** of them are [uBlock-style scriptlets](https://github.com/gorhill/uBlock/wiki/Resources-Library) the ad-block engine injects as page scripts on purpose: a snippet that disables an anti-adblock check has to run *in* the page. Bild (11,068) and AliExpress (3,077) hold nearly all of it. The last **141** the harness could not attribute to anyone, so they stay in `other` rather than a flattering bucket.

Two zeros need a caveat. Stack Overflow's new fullPage navigation landed on a Cloudflare interstitial instead of the question list, so that particular 0 proves nothing. The viewport run is the honest comparison for that site: **29,562 calls before, 0 after**, the real question list both times.

**Hiding the work made it cheaper.** Reaching into a page for a node through Puppeteer is not one message. The protocol resolves the node, describes it, releases it, then cleans up the handle. One isolated-world `evaluate` is a single message. A Guardian viewport screenshot went from 645 commands to 162, CNN from 518 to 186, GitHub from 322 to 209. Viewport captures issue 35% to 75% fewer commands, fullPage 11% to 59%.

The same collapse shows up per frame during navigation. On a page with a cookie banner, DevTools commands per navigation fall from 40 to 27 with no iframes, 240 to 167 with twenty, and 540 to 377 with fifty. `Runtime.callFunctionOn` accounts for most of that drop, because the banner logic stops reaching into every frame's main world one call at a time.

Memory follows the same shape, conditionally. Cookie-banner handling used to run in the main world of every frame. On a 50-iframe page that is now a single isolated world, and JS heap went from 24.14&nbsp;MB to 22.08&nbsp;MB. An isolated world costs about 0.2&nbsp;MB per document, so at 20 iframes the same harness measured slightly worse. The win appears once frames multiply enough for one world to beat fifty-one.

None of this made captures faster on the clock. Every timing landed between −3.8% and +0.7%, inside run-to-run noise. Resident memory moved between −0.2% and +4.8%. Fewer messages bought headroom, not latency. Titles, extracted text, and cookie-banner outcomes stayed equivalent site by site.

**Three bugs we only saw by reading the output.** None of these had anything to do with isolated worlds. They surfaced because we started reading detector output instead of reading its score.

**We were deleting standard Web APIs.** Launch flags stripped `Notification`, `speechSynthesis`, `webkitSpeechRecognition`, `PushManager`, and `PaymentRequest` from every page. Stock Chrome exposes all five. `permissions.query('notifications')` still answered `prompt`, so a page could read the contradiction: permission to send notifications, no API to send them with.

That was fatal to the detectors themselves. On [bot.sannysoft.com](https://bot.sannysoft.com) the `fp-collect` section never rendered: **0 checks completed** before, 20 after. On [bot.incolumitas.com](https://bot.incolumitas.com), `fpscanner` returned **0 keys** before and 21 after. Their scripts were throwing on a missing global. A fingerprinting script that dies is itself an anomaly. We were failing tests by being too strange to test.

**The screen was smaller than the window.** `window.innerWidth` reported 1280 while `screen.width` reported Chrome's headless default of 800×600. No desktop exists where the window is wider than the screen. Sites using `matchMedia('(max-device-width: 1024px)')` were serving tablet CSS. `screen` now reads 1440×900 for the default device, so the window fits on the screen it claims.

**Client Hints were missing.** We set a Chrome user agent string, then sent no `Sec-CH-UA` headers, and `navigator.userAgentData` came back empty. Desktop Chrome on HTTPS sends the default low-entropy hints; we were sending none. The request headers and the JS API now both match the user agent we claim.

Measured across those detectors, 3 runs per side, 24 runs, zero errors:

| Detector | before | after |
| --- | --- | --- |
| [fingerprint-scan.com](https://fingerprint-scan.com) bot score | 100/100 | **90/100** |
| [CreepJS](https://abrahamjuliot.github.io/creepjs/) "like headless" | 38% | **31%** |
| sannysoft `fp-collect` checks | 0 | 20 |
| incolumitas `fpscanner` keys | 0 | 21 |

## The honest limit

**`Runtime.enable` is still detectable.** Rebrowser's check passes, but `Error.prepareStackTrace` and console timing still reveal that a debugger is attached. Closing that means patching `puppeteer-core` itself.

**Web Workers still say HeadlessChrome.** The page reports Chrome; spawn a worker and its `navigator.userAgent` reports `HeadlessChrome`. CreepJS flags exactly that, before and after.

**Notification overlays now show up in screenshots.** Restoring `Notification` means sites that gate an opt-in prompt on the API existing now render it. AliExpress does this, and denying the permission does not help: the site reads `denied` and renders anyway. The overlay was absent before only because the API was missing. Exposing the API is the right call. This is its visible cost.

The scoreboard barely moved, and that is expected. 100/100 to 90/100, 38% to 31%. Those numbers are dominated by signals we are not pretending about: real headless Chrome, a datacenter IP, no GPU. What changed is not the score on a detector page. It is that a real site watching its own DOM sees 99% less of us.

That is the part no detector site was ever going to tell us.
