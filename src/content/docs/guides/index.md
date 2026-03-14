---
title: 'Guides'
description: 'Step-by-step guides for common Microlink workflows. Learn how to capture screenshots, extract custom data, generate PDFs, extract metadata, and more with practical, runnable examples.'
---

import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink Guides are practical, step-by-step walkthroughs that show you how to accomplish real tasks using the Microlink API. While the <Link href='/docs/api/getting-started/overview' children='API reference' /> documents every parameter individually, these guides focus on **workflows** — combining parameters to solve specific problems from start to finish.

Every guide includes live, runnable examples you can modify and test directly.

## Before you start

The Microlink API works **without an API key** — you get **50 free requests per day**, no signup required. No API key is required to implement your code or to run the examples directly in your browser.

Some features are marked with <ProBadge /> and require a paid plan. Everything else works on the free tier. See <Link href='/docs/api/basics/rate-limit' children='rate limit' /> and <Link href='/docs/api/basics/authentication' children='authentication' /> for details.

## Which guide do I need?

| I want to… | Start here |
|-------------|------------|
| Get an image of a website | <Link href='/docs/guides/screenshot' children='Screenshot' /> |
| Scrape structured data from a page | <Link href='/docs/guides/data-extraction' children='Data extraction' /> |
| Get link preview data (title, image, description) | <Link href='/docs/guides/metadata' children='Metadata' /> |
| Turn a page into a PDF | <Link href='/docs/guides/pdf' children='PDF' /> |
| Convert a page to Markdown | <Link href='/docs/guides/markdown' children='Markdown' /> |
| Detect what tech a site uses or run a Lighthouse audit | <Link href='/docs/guides/insights' children='Insights' /> |
| Run custom JavaScript in a headless browser | <Link href='/docs/guides/function' children='Custom functions' /> |

Caching, private-page access, and general troubleshooting are shared across all workflows. See <Link href='/docs/guides/common/caching' children='common patterns' />.

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

## Data extraction

Extract exactly the fields you need from any page with Microlink API, shape the response for your application, and handle dynamic or private targets reliably.

- <Link href='/docs/guides/data-extraction' children='Quickstart' /> — your first custom data extractor in under a minute.
- <Link href='/docs/guides/data-extraction/defining-rules' children='Defining rules' /> — model single fields, collections, nested objects, fallbacks, and computed values.
- <Link href='/docs/guides/data-extraction/page-preparation' children='Page preparation' /> — choose fetch mode, wait for dynamic content, and mutate the DOM before extraction.
- <Link href='/docs/guides/data-extraction/delivery-and-response' children='Delivery and response shaping' /> — choose between full JSON, filtered payloads, and direct field responses.
- <Link href='/docs/guides/data-extraction/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and extraction speed tips.
- <Link href='/docs/guides/data-extraction/private-pages' children='Private pages' /> — extract data from authenticated or session-based pages safely.
- <Link href='/docs/guides/data-extraction/troubleshooting' children='Troubleshooting' /> — fix empty fields, wrong selectors, timeouts, and blocked sites.

## Markdown

Convert full pages or scoped sections to Markdown. This guide is intentionally smaller than Data extraction: it covers the `attr: 'markdown'` workflow, then sends you to the deeper Data extraction pages whenever the topic becomes shared.

- <Link href='/docs/guides/markdown' children='Quickstart' /> — your first Markdown extraction, plus the mental model that connects it to Data extraction.
- <Link href='/docs/guides/markdown/choosing-scope' children='Choosing scope' /> — choose the right wrapper, prepare the page state, and fix noisy or incomplete Markdown.
- <Link href='/docs/guides/markdown/delivery-and-response' children='Delivery and response shaping' /> — choose between JSON and direct Markdown responses, then apply the right performance and auth patterns.

## Custom functions

Run arbitrary JavaScript inside a headless browser with full Puppeteer access. Use it when none of the built-in parameters cover your workflow.

- <Link href='/docs/guides/function' children='Quickstart' /> — your first custom function in under a minute.

## PDF

Generate production-ready PDFs of any website with full control over paper size, layout, delivery, caching, and private-page access.

- <Link href='/docs/guides/pdf' children='Quickstart' /> — your first PDF in under a minute.
- <Link href='/docs/guides/pdf/page-size-and-layout' children='Page size and layout' /> — paper format, custom dimensions, margins, orientation, scale, and page ranges.
- <Link href='/docs/guides/pdf/page-preparation' children='Page preparation' /> — print vs screen CSS, waits, clicks, and CSS cleanup before printing.
- <Link href='/docs/guides/pdf/embedding' children='Delivery and embedding' /> — choose between JSON + CDN URLs and direct PDF responses.
- <Link href='/docs/guides/pdf/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and optimization tips.
- <Link href='/docs/guides/pdf/private-pages' children='Private pages' /> — generate PDFs from authenticated or session-based pages safely.
- <Link href='/docs/guides/pdf/troubleshooting' children='Troubleshooting' /> — debug missing content, wrong layout, blocked sites, and plan errors.

## Metadata

Extract normalized metadata from any URL, narrow the field set to what you actually need, enrich the result when necessary, and handle dynamic or private targets reliably.

- <Link href='/docs/guides/metadata' children='Quickstart' /> — your first metadata extraction in under a minute.
- <Link href='/docs/guides/metadata/choosing-fields' children='Choosing fields' /> — request only the normalized metadata fields you actually need.
- <Link href='/docs/guides/metadata/extending-results' children='Extending results' /> — add custom fields, oEmbed HTML, color palettes, or site analysis.
- <Link href='/docs/guides/metadata/delivery-and-response' children='Delivery and response shaping' /> — choose between full JSON, filtered payloads, and direct field responses.
- <Link href='/docs/guides/metadata/page-preparation' children='Page preparation' /> — handle SPAs, waits, and browser-rendered metadata.
- <Link href='/docs/guides/metadata/caching-and-performance' children='Caching and performance' /> — cache control, stale-while-revalidate, and metadata performance tips.
- <Link href='/docs/guides/metadata/private-pages' children='Private pages' /> — extract metadata from authenticated or session-based pages safely.
- <Link href='/docs/guides/metadata/troubleshooting' children='Troubleshooting' /> — fix missing fields, wrong variants, timeouts, and blocked sites.

## Insights

Analyze any site with Microlink Insights, choose between technology detection and Lighthouse audits, and troubleshoot slow or blocked runs.

- <Link href='/docs/guides/insights' children='Quickstart' /> — your first Insights analysis in under a minute.
- <Link href='/docs/guides/insights/technology-detection' children='Technology detection' /> — identify frameworks, CDNs, analytics tools, and other technologies behind a site.
- <Link href='/docs/guides/insights/lighthouse-reports' children='Lighthouse reports' /> — generate JSON, HTML, or CSV audit reports and tune report settings.
- <Link href='/docs/guides/insights/caching-and-performance' children='Caching and performance' /> — cache expensive runs, skip unnecessary work, and verify response behavior.
- <Link href='/docs/guides/insights/troubleshooting' children='Troubleshooting' /> — fix missing results, timeouts, wrong variants, and blocked sites.

## Common patterns

Caching, private-page access, and troubleshooting patterns that apply to every workflow above.

- <Link href='/docs/guides/common/caching' children='Caching patterns' /> — control TTL, stale-while-revalidate, cache bypass, and verify behavior.
- <Link href='/docs/guides/common/private-pages' children='Private pages' /> — headers, secrets, endpoint selection, proxy, and credential safety.
- <Link href='/docs/guides/common/troubleshooting' children='Troubleshooting' /> — timeouts, blocked sites, auth/plan errors, and debug headers.
- <Link href='/docs/guides/common/production-patterns' children='Production patterns' /> — rate limits, endpoint selection, credential safety, retries, and monitoring.
