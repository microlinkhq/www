---
title: 'Microlink adblock now dismisses cookie banners automatically'
description: 'Microlink adblock now combines network-level blocking with automatic cookie consent handling, so you get cleaner screenshots and metadata without custom scripts.'
authors:
  - kiko
date: '2026-02-16'
---

import { Link } from 'components/elements/Link'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { SliderCompare } from 'components/markdown/SliderCompare'
import { Figcaption } from 'components/markdown/Figcaption'

When [adblock](/docs/api/parameters/adblock) is enabled, the Microlink API now handles cookie consent banners automatically, on top of blocking ads and trackers. Adblock is on by default, so every request gets it without a code change.

![](/images/cookies.jpeg)

**TL;DR**

- When adblock is enabled, the Microlink API now handles cookie consent banners automatically, on top of blocking ads and trackers.
- Adblock is on by default, so every request gets it without a code change.
- For common cases, that replaces a custom Puppeteer script.
- Inside browserless, three layers do the work: ad and tracker blocking, autoconsent-based opt-out, and cosmetic prehide rules.
- Set `adblock=false` when your workflow needs to load ads and trackers, or when you are validating the site's default consent UX.

A consent popup is the usual reason a [screenshot](/docs/api/parameters/screenshot), [PDF](/docs/api/parameters/pdf), or [metadata](/docs/api/parameters/meta) request comes back wrong: the page loads, and the banner covers the content. The upgrade runs inside [browserless](https://browserless.js.org/), our own headless browser runner behind the [Microlink API](/docs/api/getting-started/overview).

## One parameter blocks trackers and consent popups

<SliderCompare before={{src: '/images/M4jeZNS.png'}} after={{ src: '/images/FrmIQOj.png'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

With this release, `adblock` covers two jobs:

- **Request blocking:** ad and tracker requests are blocked before they load.
- **Consent handling:** cookie banners from supported CMPs (consent management platforms) are dismissed automatically.

For common cases, that replaces a custom Puppeteer script.

![](/images/cookies2.jpeg)

Until now, hiding a cookie banner meant site-specific work: hardcoded selectors per site, generic "click accept" scripts, filter lists, CMP-specific logic, or browser extensions. Each one breaks as soon as the target URL's markup changes.

The API now detects the common cookie banner cases itself. You stop writing domain-specific one-offs, and the rest of your request flow (the `url`, `screenshot`, and other parameters) stays the same.

<SliderCompare before={{src: '/images/dsGYcxo.png'}} after={{ src: '/images/2afO5FJ.png'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

For complicated or corner cases, the existing query parameters still work, and you should need them less often than before: [click](/docs/api/parameters/click) to interact with selectors, [styles](/docs/api/parameters/styles) to inject CSS overrides, [scripts](/docs/api/parameters/scripts) to inject JavaScript, [modules](/docs/api/parameters/modules) to load module-based logic, and [waitForSelector](/docs/api/parameters/waitForSelector) to wait for a stable state before capture.

## How browserless removes the banner

For broader context on the runner itself, see [what is a headless browser?](/blog/what-is-a-headless-browser). Inside browserless, [@browserless/goto](https://github.com/microlinkhq/browserless/tree/master/packages/goto) now combines three layers:

- **Blocking:** an ad and tracker engine for abusive third-party requests, powered by [ghostery/adblocker](https://github.com/ghostery/adblocker).
- **Opt-out:** autoconsent-based cookie handling, configured for automatic opt-out and powered by [DuckDuckGo’s autoconsent](https://github.com/duckduckgo/autoconsent).
- **Prehide:** cosmetic rules that reduce visual cookie overlays before capture.

## No configuration, and adblock=false to opt out

The adblock capabilities are enabled by default, so there is nothing to configure. A screenshot of `https://www.nytimes.com/` with `adblock: true` looks like this:

<MultiCodeEditorInteractive 
  mqlCode={{ 
    url: 'https://www.nytimes.com/', 
    screenshot: true, 
    adblock: true
  }} 
/>

No cookie-banner strategy is perfect for every page on the internet. Set [adblock=false](/docs/api/parameters/adblock) when your workflow needs to load ads and trackers, or when you are validating the site's default consent UX:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.nytimes.com/', adblock: false }} />

## Try it on the New York Times

Run the first snippet above against `https://www.nytimes.com/`, then the same URL with `adblock: false`, and compare the two screenshots. For the rest of the stack behind that request, read [Microlink API: Browser automation](/blog/browser-automation), [Antibot detection at scale](/blog/antibot-detection-at-scale), and [Microlink Proxy: How it works](/blog/microlink-proxy-how-it-works).
