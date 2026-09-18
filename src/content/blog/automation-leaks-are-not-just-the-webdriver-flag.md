---
title: 'Isolated worlds cut visible automation by 99%'
subtitle: 'Cutting automation fingerprint by 99%'
description: 'Before a screenshot, browserless walked the DOM inside the page, where any site could watch. Isolated worlds cut those calls from 1.7M to 14.6K across ten live sites, made captures cheaper, and surfaced three emulation bugs along the way.'
authors:
  - kiko
date: '2026-09-13'
---

[Browserless](https://browserless.js.org) now runs its page-cleaning work in a Chrome isolated world, where the page cannot observe it. Before every [screenshot](/docs/api/parameters/screenshot), it dismisses cookie banners, hides ads, and closes newsletter modals, and until last week each of those DOM calls ran where the page could watch.

Across ten live sites, the calls a page could observe fell from **1,716,830 to 14,658** (−99.1%), and five of the ten now sit at zero. The same change made captures cheaper: a Guardian viewport screenshot went from 645 DevTools commands to 162. Detector scores barely moved, but reading how the detectors failed exposed three emulation bugs.

## Cleaning the page happened in public

Taking a screenshot means cleaning the page first. Six browserless helpers walk the DOM before the capture, and every one of them ran through `page.evaluate` in the page's main world:

- **Cookie banners.** Consent dialogs have to be found, measured, and clicked. This helper accounted for most of the old volume.
- **Ads.** The ad-block engine scans the document to decide what to hide.
- **Overlays.** Newsletter modals and paywalls get scanned and closed the same way.
- **Text.** The extraction helper queried the page's own DOM.
- **Shadow DOM.** Components inside shadow roots get inlined so the screenshot includes them.
- **Positioning.** The screenshot helpers measured elements through page APIs.

Each helper had a reason to call `querySelectorAll` or `getComputedStyle`, but none had a reason to do it where the page's own scripts could see the calls. The goal was the same capture without that trail.

## Hiding navigator.webdriver was never the problem

Every guide on undetectable headless browsing starts and ends with `navigator.webdriver`:

```js
navigator.webdriver // false, and everyone knows how to hide it
```

Browserless has passed the `navigator.webdriver` check for years, and it does not matter. Any site can wrap its own `document.querySelectorAll` and log the stack of every caller:

```js
const original = document.querySelectorAll
document.querySelectorAll = function () {
  console.log(new Error().stack)
  return original.apply(this, arguments)
}
```

On [The Guardian](https://www.theguardian.com), a single viewport screenshot tripped that hook **14,537 times**. The stack frames named us, with `pptr:evaluate`, `extractFeatures`, and `detectCmp`, and not one of those calls came from the page.

Detector sites cannot see this, so passing them cannot prove it is fixed. On [bot-detector.rebrowser.net](https://bot-detector.rebrowser.net), the check reports `not-triggered` both before and after, because it only fires when a client calls its trigger function. A real site does not wait to be asked: it hooks its own DOM and reads whatever the automation does next.

## Chrome already had the hiding place

Every frame in Chrome has a **main world**, which holds the page's scripts and prototypes, and an **isolated world**, which shares the same DOM with a private JavaScript stack. If the page patches `document.querySelectorAll`, code in the isolated world still calls the real one. Puppeteer exposes that world as `isolatedRealm()`:

```js
const isolatedRealm = page.mainFrame().isolatedRealm()
await isolatedRealm.evaluate(() => {
  /* the page cannot see this run */
})
```

Every helper had been calling the page's patched APIs. We moved them into the isolated world one at a time.

## Measured from the page's side

To prove the move worked, we measured from the page's point of view. A hook wraps the page's own DOM APIs before navigation, discards calls that come from the site's own scripts, and counts everything else as ours. We then took ordinary screenshots of ten live sites, viewport and fullPage, with identical Chrome 152.0.7977.75 and Puppeteer 25.10.0 on both sides.

The page could observe **1,716,830** automation calls across those ten sites before the move and **14,658** after, 99.1% less.

| Automation calls the page could observe | before | after |
| --- | --- | --- |
| viewport screenshots | 288,659 | **7,082** |
| fullPage screenshots | 1,428,171 | **7,576** |
| total | 1,716,830 | **14,658** (−99.1%) |

Le Monde's fullPage capture alone accounted for 299,113 of the old calls, and it is now at 0. The cookie-banner engine produced most of the volume, as the breakdown by API shows:

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

Almost none of the remaining 14,658 calls is helper code. **14,517** of them come from [uBlock-style scriptlets](https://github.com/gorhill/uBlock/wiki/Resources-Library) that the ad-block engine injects as page scripts on purpose, because a snippet that disables an anti-adblock check has to run *in* the page. Bild (11,068) and AliExpress (3,077) account for nearly all of them. The harness could not attribute the last **141** calls, so they stay in `other` rather than in a more flattering bucket.

Two of the zeros need a caveat. Stack Overflow's new fullPage navigation landed on a Cloudflare interstitial instead of the question list, so that 0 proves nothing. The viewport run is the honest comparison for that site: **29,562 calls before and 0 after**, with the real question list both times.

## Hiding the work made captures cheaper

Reaching into a page for a node through Puppeteer is not one message: the protocol resolves the node, describes it, releases it, and then cleans up the handle. One isolated-world `evaluate` is a single message. A Guardian viewport screenshot went from 645 commands to 162, CNN from 518 to 186, and GitHub from 322 to 209. Viewport captures now issue 35% to 75% fewer commands, and fullPage captures 11% to 59% fewer.

The same drop shows up per frame during navigation. On a page with a cookie banner, DevTools commands per navigation fall from 40 to 27 with no iframes, from 240 to 167 with twenty, and from 540 to 377 with fifty. `Runtime.callFunctionOn` accounts for most of that drop, because the banner logic no longer reaches into every frame's main world one call at a time.

Memory follows the same shape once a page has enough frames. Cookie-banner handling used to run in the main world of every frame, and on a 50-iframe page it now runs in a single isolated world, which took the JS heap from 24.14&nbsp;MB to 22.08&nbsp;MB. An isolated world costs about 0.2&nbsp;MB per document, so at 20 iframes the same harness measured slightly worse. The win appears once there are enough frames for one world to beat fifty-one.

Captures did not get faster on the clock. Every timing landed between −3.8% and +0.7%, inside run-to-run noise, and resident memory moved between −0.2% and +4.8%. Fewer messages bought headroom, not latency. Titles, extracted text, and cookie-banner outcomes stayed equivalent site by site.

## Three emulation bugs the detectors exposed

None of these bugs had anything to do with isolated worlds. They surfaced because we started reading detector output instead of only its score.

**Launch flags deleted standard Web APIs.** They stripped `Notification`, `speechSynthesis`, `webkitSpeechRecognition`, `PushManager`, and `PaymentRequest` from every page, although stock Chrome exposes all five. Since `permissions.query('notifications')` still answered `prompt`, a page could read the contradiction: permission to send notifications, and no API to send them with.

The missing globals broke the detectors themselves. On [bot.sannysoft.com](https://bot.sannysoft.com), the `fp-collect` section never rendered, with **0 checks completed** before the fix and 20 after. On [bot.incolumitas.com](https://bot.incolumitas.com), `fpscanner` returned **0 keys** before and 21 after, because its scripts threw on a missing global. A fingerprinting script that dies is itself an anomaly, so we were failing tests by being too strange to test.

**The screen was smaller than the window.** `window.innerWidth` reported 1280 while `screen.width` reported Chrome's headless default of 800×600, a combination no desktop can produce. Sites using `matchMedia('(max-device-width: 1024px)')` served tablet CSS as a result. The `screen` object now reads 1440×900 for the default device, so the window fits on the screen it claims.

**Client Hints were missing.** We set a Chrome user agent string but sent no `Sec-CH-UA` headers, and `navigator.userAgentData` came back empty. Desktop Chrome on HTTPS sends the default low-entropy hints, and now the request headers and the JavaScript API both match the user agent we claim.

Measured across those detectors with 3 runs per side, 24 runs in total, and zero errors:

| Detector | before | after |
| --- | --- | --- |
| [fingerprint-scan.com](https://fingerprint-scan.com) bot score | 100/100 | **90/100** |
| [CreepJS](https://abrahamjuliot.github.io/creepjs/) "like headless" | 38% | **31%** |
| sannysoft `fp-collect` checks | 0 | 20 |
| incolumitas `fpscanner` keys | 0 | 21 |

## What still gives us away

**`Runtime.enable` is still detectable.** Rebrowser's check passes, but `Error.prepareStackTrace` and console timing still reveal that a debugger is attached. Closing that gap means patching `puppeteer-core` itself.

**Web Workers still report HeadlessChrome.** The page reports Chrome, but a worker's `navigator.userAgent` reports `HeadlessChrome`, and CreepJS flags exactly that before and after.

**Notification overlays now appear in screenshots.** With `Notification` restored, sites that gate an opt-in prompt on the API existing now render it. AliExpress does this, and denying the permission does not help, because the site reads `denied` and renders the prompt anyway. The overlay was absent before only because the API was missing, so this is the visible cost of exposing it.

The detector scores barely moved, from 100/100 to 90/100 and from 38% to 31%, because they are dominated by signals we do not hide: real headless Chrome, a datacenter IP, and no GPU. No detector site was ever going to show you the part that changed.

A real site watching its own DOM now sees 99% less of us.
