---
title: 'Guides'
description: 'Step-by-step guides for common Microlink workflows. Learn how to capture screenshots, generate PDFs, extract metadata, and more with practical, runnable examples.'
---

import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink Guides are practical, step-by-step walkthroughs that show you how to accomplish real tasks using the Microlink API. While the <Link href='/docs/api/getting-started/overview' children='API reference' /> documents every parameter individually, these guides focus on **workflows** — combining parameters to solve specific problems from start to finish.

Every guide includes live, runnable examples you can modify and test directly.

## Before you start

The Microlink API works **without an API key** — you get **50 free requests per day**, no signup required. That's enough to follow every example in these guides.

Some features are marked with <ProBadge /> and require a paid plan. Everything else works on the free tier. See <Link href='/docs/api/basics/rate-limit' children='rate limit' /> and <Link href='/docs/api/basics/authentication' children='authentication' /> for details.

## Screenshot

Capture high-quality screenshots of any website with a single API call. This guide now covers the full workflow, from your first screenshot to advanced output control, embedding, private-page capture, and troubleshooting.

- <Link href='/docs/guides/screenshot' children='Quickstart' /> — your first screenshot in under a minute.
- <Link href='/docs/guides/screenshot/customizing-output' children='Customizing output' /> — full-page, element targeting, format, overlays, and code themes.
- <Link href='/docs/guides/screenshot/browser-settings' children='Browser settings' /> — viewport, device emulation, dark mode, and animations.
- <Link href='/docs/guides/screenshot/page-interaction' children='Page interaction' /> — click, scroll, wait, inject CSS/JS, block ads and cookie banners.
- <Link href='/docs/guides/screenshot/embedding' children='Delivery and embedding' /> — choose between JSON + CDN URLs and direct image responses.
- <Link href='/docs/guides/screenshot/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and optimization tips.
- <Link href='/docs/guides/screenshot/private-pages' children='Private pages' /> — handle login, sessions, and header-based personalization safely.
- <Link href='/docs/guides/screenshot/troubleshooting' children='Troubleshooting' /> — debug timing issues, blocked sites, wrong captures, and plan errors.

## PDF

Generate production-ready PDFs of any website with full control over paper size, layout, delivery, caching, and private-page access.

- <Link href='/docs/guides/pdf' children='Quickstart' /> — your first PDF in under a minute.
- <Link href='/docs/guides/pdf/page-size-and-layout' children='Page size and layout' /> — paper format, custom dimensions, margins, orientation, scale, and page ranges.
- <Link href='/docs/guides/pdf/page-preparation' children='Page preparation' /> — print vs screen CSS, waits, clicks, and CSS cleanup before printing.
- <Link href='/docs/guides/pdf/embedding' children='Delivery and embedding' /> — choose between JSON + CDN URLs and direct PDF responses.
- <Link href='/docs/guides/pdf/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and optimization tips.
- <Link href='/docs/guides/pdf/private-pages' children='Private pages' /> — generate PDFs from authenticated or session-based pages safely.
- <Link href='/docs/guides/pdf/troubleshooting' children='Troubleshooting' /> — debug missing content, wrong layout, blocked sites, and plan errors.

## Markdown

Extract whole pages or targeted sections as Markdown, shape the response for LLM or CMS workflows, and handle dynamic or private pages reliably.

- <Link href='/docs/guides/markdown' children='Quickstart' /> — your first Markdown extraction in under a minute.
- <Link href='/docs/guides/markdown/defining-extraction-rules' children='Defining extraction rules' /> — whole-page conversion, scoped selectors, supporting fields, and fallback logic.
- <Link href='/docs/guides/markdown/page-preparation' children='Page preparation' /> — prerendering, waits, device emulation, and DOM cleanup before conversion.
- <Link href='/docs/guides/markdown/delivery-and-response' children='Delivery and response shaping' /> — choose between full JSON, filtered payloads, and direct Markdown responses.
- <Link href='/docs/guides/markdown/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and extraction speed tips.
- <Link href='/docs/guides/markdown/private-pages' children='Private pages' /> — extract Markdown from authenticated or session-based pages safely.
- <Link href='/docs/guides/markdown/troubleshooting' children='Troubleshooting' /> — fix empty output, wrong selectors, timeouts, and blocked sites.
