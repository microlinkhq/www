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

![](/images/1627043352452-webcookiespiecelede-1.jpeg)

If you take [screenshots](/docs/api/parameters/screenshot), generate [PDFs](/docs/api/parameters/pdf), or extract [metadata](/docs/api/parameters/meta), you eventually hit the same problem: the page loads, but a consent popup covers the content.

Today, we’re announcing a major upgrade to Microlink adblock, powered by [browserless](https://browserless.js.org/), our own headless browser runner behind the [Microlink API](/docs/api/getting-started/overview).

## What's new

From today, when Microlink’s [adblock](/docs/api/parameters/adblock) is enabled, cookie consent banners are handled automatically.

<SliderCompare before={{src: 'https://private-user-images.githubusercontent.com/2096101/549871757-8f392626-6c18-4e56-adcb-fc2e48d18011.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzEyNjUyNjAsIm5iZiI6MTc3MTI2NDk2MCwicGF0aCI6Ii8yMDk2MTAxLzU0OTg3MTc1Ny04ZjM5MjYyNi02YzE4LTRlNTYtYWRjYi1mYzJlNDhkMTgwMTEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTZUMTgwMjQwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZmUyMjY0NTkyYmM1OGZlZjQwMjE5NmIyNTQ3ZDY4YTJhN2FiYThhOGZlNDMyZmEzMWNkMGM5ZmM3ZTcyZGY0MSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.bdHnWaALJPX-tT1Nc-NlkRIWGBvJQaWZxcDZ6vrAJI8'}} after={{ src: 'https://private-user-images.githubusercontent.com/2096101/549871756-58706259-54e9-4f59-a2b7-d3e2fcc5548a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzEyNjUyNjAsIm5iZiI6MTc3MTI2NDk2MCwicGF0aCI6Ii8yMDk2MTAxLzU0OTg3MTc1Ni01ODcwNjI1OS01NGU5LTRmNTktYTJiNy1kM2UyZmNjNTU0OGEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTZUMTgwMjQwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MTRlN2M3NmI1NTFmYWEyNzYwY2E3ZjBjZjg4NmVmZmRjM2NkMDI5OTk0ZmY1NmE1YzQ0MzQ4M2M4N2E2ZWM1YyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.YW8-vGLwnUGeVTX4F-QNeEhp4Z0wwC0Z0GcMBr_TBmA'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

With this release, one parameter now covers both:

- ad and tracker request blocking.
- automatic cookie banner handling for supported CMPs.  

For common cases, you no longer need custom Puppeteer scripts. This also speed up response resolution.

## Why this matters

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

<SliderCompare before={{src: 'https://private-user-images.githubusercontent.com/2096101/549871752-bd9c4d9e-1ca6-4406-9f12-0bcbcf4d0487.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzEyNzg1MDIsIm5iZiI6MTc3MTI3ODIwMiwicGF0aCI6Ii8yMDk2MTAxLzU0OTg3MTc1Mi1iZDljNGQ5ZS0xY2E2LTQ0MDYtOWYxMi0wYmNiY2Y0ZDA0ODcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTZUMjE0MzIyWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZDU0MDhkMGQzNGI3MTkxMzFiNGVjY2M0OTAwZTVkMGUxNmE3NjhhNzUzZjMwYzkwMzhlMmJjMWI3NTdhYWEyNCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.bJn0abG06C3u0cqDaBq4ktUUk3LMQgwEWWrvaZKx-Mc'}} after={{ src: 'https://private-user-images.githubusercontent.com/2096101/549871751-3fa6b84c-ff12-444f-8680-e75085b8fd38.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzEyNzg1MDIsIm5iZiI6MTc3MTI3ODIwMiwicGF0aCI6Ii8yMDk2MTAxLzU0OTg3MTc1MS0zZmE2Yjg0Yy1mZjEyLTQ0NGYtODY4MC1lNzUwODViOGZkMzgucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTZUMjE0MzIyWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9Mjg1M2RmNTg5NzVkMDg5ZjU3YWU2MGI5ODZmOWQ3OTA0ZWE5YmI0OWIyY2M1MmRjM2FjY2ZlZDhhOTc0OGM0ZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.Dc-aGQeui4DebXSYbZWMvWXYC0iLKCPqT4HEu8CHAUc'}} />

<Figcaption>The same request with adblock disabled and enabled</Figcaption>

Still, for complicated or corner cases you can continue use query parameters, but that should be less common than before.

## How to use it

The [adblock](/docs/api/parameters/adblock) capabilities are enabled by default, so you don't need to do nothing special, just continue using [Microlink API](/docs/api/getting-started/overview) as normal:

<MultiCodeEditorInteractive 
  mqlCode={{ 
    url: 'https://example.com', 
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

<MultiCodeEditorInteractive mqlCode={{ url: 'https://example.com', adblock: false }} />

## Final notes

No cookie-banner strategy is perfect for every page on the internet.

But this release moves Microlink closer to what most teams need in production: cleaner captures, less custom code, and fewer brittle fixes.

If you want more context around the stack, read:

- [Microlink API: Browser automation](/blog/browser-automation)
- [What is a headless browser?](/blog/what-is-a-headless-browser)
- [Antibot detection at scale](/blog/antibot-detection-at-scale)
- [Microlink Proxy: How it works](/blog/microlink-proxy-how-it-works)
