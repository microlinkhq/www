---
title: 'Microlink adblock now handles cookie banners'
description: 'Microlink adblock now combines network-level blocking with automatic cookie consent handling, so you get cleaner screenshots and metadata without custom scripts.'
date: '2026-02-16'
---

import { Link } from 'components/elements/Link'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { SliderCompare } from 'components/markdown/SliderCompare'
import { Figcaption } from 'components/markdown/Figcaption'

Cookie banners are one of the most annoying things on today’s internet.

![](/images/cookies.jpeg)

If you take [screenshots](/docs/api/parameters/screenshot), generate [PDFs](/docs/api/parameters/pdf), or extract [metadata](/docs/api/parameters/meta), you eventually hit the same problem: the page loads, but a consent popup covers the content.

Today, we’re announcing a major upgrade to Microlink adblock, powered by [browserless](https://browserless.js.org/), our own headless browser runner behind the [Microlink API](/docs/api/getting-started/overview).

## What's new

From today, when Microlink’s [adblock](/docs/api/parameters/adblock) is enabled, cookie consent banners are handled automatically.

<SliderCompare before={{src: '/images/M4jeZNS.png'}} after={{ src: '/images/FrmIQOj.png'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

With this release, one parameter now covers both:

- ad and tracker request blocking.
- automatic cookie banner handling for supported CMPs.  

For common cases, you no longer need custom Puppeteer scripts. This also speed up response resolution.

## Why this matters

![](/images/static/images/cookies-2.jpeg)

Historically, hide cookie banners popup require site-specific scripts, brittle selectors, and constant maintenance. This could be achieved in many ways:

- hardcoded selectors per site.
- generic "click accept" scripts.
- filter lists only.
- CMP-specific logic.
- browser extensions.

In fact we ways for doing that:

- [click](/docs/api/parameters/click) to interact with selectors.
- [styles](/docs/api/parameters/styles) to inject CSS overrides.
- [scripts](/docs/api/parameters/scripts) to inject JavaScript.
- [modules](/docs/api/parameters/modules) to load module-based logic.
- [waitForSelector](/docs/api/parameters/waitForSelector) to wait for stable states before capture

However, the issue is always there: as soon as the target URL markup changes, the approaches needed to be updated.

Now [Microlink API](/docs/api/getting-started/overview) is enough smart to detect cookies banners common case, avoid you to write domain-specific one-offs while keeping the rest of your request flow unchanged.

<SliderCompare before={{src: '/images/dsGYcxo.png'}} after={{ src: '/images/2afO5FJ.png'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

Still, for complicated or corner cases you can continue use query parameters, but that should be less common than before.

## How to use it

The [adblock](/docs/api/parameters/adblock) capabilities are enabled by default, so you don't need to do nothing special, just continue using [Microlink API](/docs/api/getting-started/overview) as normal:

<MultiCodeEditorInteractive 
  mqlCode={{ 
    url: 'https://www.nytimes.com/', 
    screenshot: true, 
    adblock: true
  }} 
/>

## Under the hood

Microlink uses [browserless](https://browserless.js.org/), our own headless browser runner. For broader context, see [what is a headless browser?](/blog/what-is-a-headless-browser).

Inside that runner, [@browserless/goto](https://github.com/microlinkhq/browserless/tree/master/packages/goto) now combines:

- ad/tracker blocking engine for third-party abusive requests, powered by [ghostery/adblocker](https://github.com/ghostery/adblocker).
- autoconsent-based cookie handling configured for automatic opt-out powered by [DuckDuckGo’s autoconsent](https://github.com/duckduckgo/autoconsent).
- prehide/cosmetic behavior to reduce visual cookie overlays before capture.

## When to disable it

You can set [adblock=false](/docs/api/parameters/adblock) if your workflow requires loading ads/trackers or validating the default consent UX.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.nytimes.com/', adblock: false }} />

## Final notes

No cookie-banner strategy is perfect for every page on the internet.

But this release moves Microlink closer to what most teams need in production: cleaner captures, less custom code, and fewer brittle fixes.

If you want more context around the stack, read:

- [Microlink API: Browser automation](/blog/browser-automation)
- [What is a headless browser?](/blog/what-is-a-headless-browser)
- [Antibot detection at scale](/blog/antibot-detection-at-scale)
- [Microlink Proxy: How it works](/blog/microlink-proxy-how-it-works)
