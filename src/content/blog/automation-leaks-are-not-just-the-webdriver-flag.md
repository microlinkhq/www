---
title: 'Automation Leaks Are Not Just the WebDriver Flag'
subtitle: 'Cutting page-visible automation calls by 99% with isolated worlds'
description: 'Before taking a screenshot, browserless was running its own DOM work inside the page, where any site can watch it. Moving that work into isolated worlds cut page-visible automation calls from 1.7M to 14.6K across ten live sites. The measurements, the cost, and what still leaks.'
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

On [The Guardian](https://www.theguardian.com), a single viewport screenshot tripped that hook **14,537 times**, and the stack frames named us: `pptr:evaluate`, `extractFeatures`, `detectCmp`. Not one of those calls came from the page. They were ours.

**TL;DR**

- Nine PRs in [browserless](https://browserless.js.org) ([#920](https://github.com/microlinkhq/browserless/pull/920) through [#929](https://github.com/microlinkhq/browserless/pull/929), v13.9.15 to v13.9.21) moved our DOM work out of the page's JavaScript world.
- Page-visible automation calls across ten live sites dropped from **1,716,830 to 14,658**, a 99.1% reduction. Five of ten sites now sit at exactly zero, one of them with a caveat I flag below.
- Three of those PRs were not about hiding at all. They fixed emulation bugs so bad that the detectors' own fingerprinting scripts were crashing partway through.
- Screenshots come out pixel-identical, wall clock is unchanged, and DevTools protocol traffic went down, not up.

## Two worlds, one DOM

Chrome gives every frame more than one JavaScript world. The **main world** is the page's own: its scripts, its globals, its prototypes. An **isolated world** shares the same DOM but gets a private globals object and a private stack.

Same `document`. Different observers.

Puppeteer exposes it as `isolatedRealm()`, and the switch is about that small:

```js
const isolatedRealm = page.mainFrame().isolatedRealm()
await isolatedRealm.evaluate(() => {
  /* the page cannot see this run */
})
```

If the page patched `document.querySelectorAll`, the main world calls the patch. The isolated world calls the real one. The page never learns a thing.

We were calling the patch. Everywhere.

## Where we were standing in the page

Six of the nine PRs are the same fix applied to a different caller. Each one was a helper that had a legitimate reason to touch the DOM and no reason at all to do it in public:

| PR | What moved into an isolated world |
| --- | --- |
| [#920](https://github.com/microlinkhq/browserless/pull/920) | `browserless.text()` reading page text |
| [#921](https://github.com/microlinkhq/browserless/pull/921) | shadow DOM flattening (`flattenShadowDOM`) |
| [#924](https://github.com/microlinkhq/browserless/pull/924) | the `screenshot` page helpers |
| [#925](https://github.com/microlinkhq/browserless/pull/925) | overlay dismissal |
| [#926](https://github.com/microlinkhq/browserless/pull/926) | [autoconsent](https://github.com/duckduckgo/autoconsent) cookie-banner handling |
| [#927](https://github.com/microlinkhq/browserless/pull/927) | Ghostery DOM scans (`extractFeatures`) |

The cookie-banner one is the clearest case. Handling consent dialogs means querying, reading computed styles, and clicking, which is exactly the shape of activity a bot detector is looking for. In `packages/goto/src/adblock.js` it is now one flag:

```js
isMainWorld: false
```

## How we measured what a site can see

Detector sites were no help here. On [bot-detector.rebrowser.net](https://bot-detector.rebrowser.net) the main-world check reports `not-triggered` both before and after our change, because it only fires when a client calls its trigger function. A passing grade there proves nothing about what a real page observes while we work.

So we measured the page's point of view directly. Before navigation, a hook wraps the page's own DOM APIs (`querySelectorAll`, `getComputedStyle`, `getAttribute`, `classList`, `innerText`, `getBoundingClientRect` and friends). Each call walks `new Error().stack`. Frames pointing at an `http://` or `https://` source are the page's own work and get discarded. Everything else is us, attributed to a source by stack signature.

Then we take an ordinary screenshot. Ten live sites (Guardian, El País, Bild, Le Monde, CNN, NYT, AliExpress, Booking, Stack Overflow, GitHub), viewport and fullPage, with identical Chrome 152.0.7977.75 and Puppeteer 25.10.0 on both sides.

## The numbers

| Automation calls the page could observe | v13.9.15 | v13.9.21 |
| --- | --- | --- |
| viewport screenshots | 288,659 | **7,082** |
| fullPage screenshots | 1,428,171 | **7,576** |
| total | 1,716,830 | **14,658** (−99.1%) |

Le Monde's fullPage capture alone accounted for 299,113 of the old calls. It is now 0.

One zero in that table has an asterisk. Stack Overflow's new fullPage navigation landed on a Cloudflare interstitial, 265 characters of "Just a moment" and 88&nbsp;KB, instead of the question list the old run captured at 1.8&nbsp;MB. There was hardly a page there to touch, so that particular 0 proves nothing. The viewport run is the honest comparison for that site: the real question list both times (9,622 and 9,662 characters, 604&nbsp;KB and 606&nbsp;KB), **29,562 calls before and 0 after**. Interstitials like that are order-dependent rather than version-dependent, and reversing the run order blocked both sides equally.

By API, summed over every site and mode:

| API | v13.9.15 | v13.9.21 |
| --- | --- | --- |
| `getComputedStyle` | 769,473 | **0** |
| `getAttribute` | 554,655 | 2,908 |
| `nodeName` | 202,117 | 11,113 |
| `classList` | 184,427 | **0** |
| `innerText` | 2,910 | **0** |
| `querySelectorAll` | 2,116 | 608 |
| `getBoundingClientRect` | 735 | **0** |

`getComputedStyle` going from 769,473 to zero is the cookie-banner engine leaving the room.

## What the remaining 14,658 are

Almost none of it is helper code. 14,517 of the 14,658 classify as `adblock/scriptlet`: [uBlock-style scriptlets](https://github.com/gorhill/uBlock/wiki/Resources-Library) shipped inside the ad-block engine's `engine.bin`, injected as page scripts against specific domains.

Those run in the main world on purpose. A scriptlet that neutralizes an anti-adblock check has to be *in* the page to do it, and it looks like the filter-list resource it is, not like automation. Bild and AliExpress are the heaviest filtered sites in the set, and they hold nearly all of the residue: 11,068 and 3,077 calls.

The last 141 the harness could not attribute to anyone, so they stay in an `other` bucket rather than a flattering one. 139 of them are on AliExpress, and their stack frames name the page's own ad tracking (`spm_getParamForAD`) running from a script with no URL in its stack, which is exactly the case the "is this frame the page's own?" test cannot decide. The remaining two are a single `click` each on El País and the NYT. Read them at their worst and the bound still holds: 141 calls we have not proven innocent, against 1,716,830 before.

## The bugs we found by looking

Three PRs had nothing to do with isolated worlds. They surfaced because once we started reading detector output carefully, the output was obviously broken.

**[#922](https://github.com/microlinkhq/browserless/pull/922) stopped disabling standard Web APIs.** Our launch flags carried `--disable-notifications`, `--disable-speech-api`, and the `PushMessaging` and `WebPayments` feature switches. Those delete `Notification`, `speechSynthesis`, `webkitSpeechRecognition`, `PushManager` and `PaymentRequest` from every page. Stock Chrome exposes all five. Worse, `permissions.query('notifications')` still answered `prompt`, so a page could read the contradiction: permission to send notifications, no API to send them with.

That missing API was not a subtle signal, it was fatal to the detectors themselves. On [bot.sannysoft.com](https://bot.sannysoft.com), the `fp-collect` section never rendered: **0 checks completed** before, 20 after. On [bot.incolumitas.com](https://bot.incolumitas.com), `fpscanner` returned **0 keys** before and 21 after. Their scripts were throwing partway through on a missing global, and a fingerprinting script that dies is itself an anomaly. We were failing tests by being too strange to test.

**[#923](https://github.com/microlinkhq/browserless/pull/923) emulated a screen consistent with the viewport.** `window.innerWidth` reported 1280, while `screen.width` reported Chrome's headless default of 800x600. No desktop exists where the window is wider than the screen. The consequence was not only a fingerprint:

```js
matchMedia('(max-device-width: 1024px)').matches
// before: true   ← the site serves tablet CSS
// after:  false
```

Desktop pages were getting their tablet layout. `screen` now reads 1440x900 for the default device, and the screenshots come back pixel-identical, so the fix changed what sites decide and not what we render.

**[#929](https://github.com/microlinkhq/browserless/pull/929) sent UA Client Hints matching the user agent.** We set a Chrome user agent string and then sent no `Sec-CH-UA` headers at all, and `navigator.userAgentData` came back empty. Modern Chrome always sends them.

| Signal | Before | After |
| --- | --- | --- |
| `Sec-CH-UA` request header | absent | `"Google Chrome";v="149", …` |
| `Sec-CH-UA-Mobile` / `-Platform` | absent | `?0` / `"macOS"` |
| `navigator.userAgentData` | empty | Google Chrome 149 |

Measured across those detectors, 3 runs per side, 36 runs, zero errors:

| Detector | v13.9.14 | v13.9.20 |
| --- | --- | --- |
| [fingerprint-scan.com](https://fingerprint-scan.com) bot score | 100/100 | **90/100** |
| [CreepJS](https://abrahamjuliot.github.io/creepjs/) "like headless" | 38% | **31%** |
| sannysoft `fp-collect` checks | 0 | 20 |
| incolumitas `fpscanner` keys | 0 | 21 |

## The cost

Cheaper, which was not the plan. An element handle round trip is several protocol messages; one isolated-world `evaluate` is one. DevTools protocol commands per capture, median of five runs:

| | viewport CDP commands | fullPage CDP commands |
| --- | --- | --- |
| theguardian.com | 645 → **162** (−74.9%) | 843 → 344 (−59.2%) |
| cnn.com | 518 → **186** (−64.1%) | 1455 → 1299 (−10.7%) |
| github.com | 322 → **209** (−35.1%) | 383 → 257 (−32.9%) |

Wall clock did not move: every timing landed between −3.8% and +0.7%, inside run-to-run noise. Resident memory moved between −0.2% and +4.8%, the top of that range being GitHub's fullPage capture. Titles, extracted text and cookie-banner outcomes stayed equivalent site by site.

## What still leaks

Four things, none of them fixed by this work.

**`Runtime.enable` is still detectable.** Rebrowser's check passes, but the general technique does not care: `Error.prepareStackTrace` and console timing still reveal that a debugger is attached. Closing that requires patching `puppeteer-core` itself, which was out of scope here.

**Web Workers still say HeadlessChrome.** The page reports Chrome; spawn a worker and its `navigator.userAgent` reports `HeadlessChrome`. CreepJS flags exactly that, before and after. A fix is being investigated.

**One real regression.** Re-enabling `Notification` in #922 means sites that gate a notification opt-in overlay on the API existing now render that overlay, and it lands in the screenshot. AliExpress does this. Being more honest about Chrome's API surface made us look more like Chrome and made one class of screenshot worse. A fix is in progress.

**The scoreboard barely moved, and that is expected.** 100/100 to 90/100 on fingerprint-scan, 38% to 31% on CreepJS. These numbers are dominated by signals we are not pretending about: real headless Chrome, a datacenter IP, no GPU. What changed is not the score on a detector page, it is that a real site watching its own DOM sees 99% less of us.

That is the part no detector site was ever going to tell us, which is why we had to hook ten real sites and count.
