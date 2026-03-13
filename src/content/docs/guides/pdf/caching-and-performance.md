---
title: 'Caching and performance'
description: 'Optimize Microlink PDF generation for speed and cost. Control cache TTL, use stale-while-revalidate, bypass cache when needed, and avoid unnecessary rendering work.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

PDF generation is heavier than a normal metadata request because Microlink has to render the page and print it as a document. The fastest workflows are the ones that skip unnecessary extraction, reuse cache intelligently, and avoid extra rendering work.

## Start with the biggest speedup

If you only need the PDF, disable metadata extraction:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false }} />

<Figcaption>Skipping metadata is usually the single biggest speedup for PDF-only requests.</Figcaption>

## Cache TTL <ProBadge />

Every response is cached for **24 hours** by default. Use `ttl` to control how long a generated PDF can be reused before expiring:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, ttl: '1d' }} />

<Figcaption>Choose a longer TTL for static PDFs and a shorter TTL for documents generated from frequently changing pages.</Figcaption>

The value must be between 1 minute and 31 days. It accepts milliseconds or humanized strings such as `'1h'`, `'1d'`, or `'7d'`.

| Scenario | Recommended TTL |
|----------|-----------------|
| Invoices, dashboards, frequently updated pages | `'1h'` or less |
| Blog posts, knowledge base pages, reports | `'1d'` to `'7d'` |
| Rarely changing documents | `'max'` (31 days) |

The TTL is reflected in the `x-cache-ttl` response header. Configurable TTL requires a <ProBadge /> plan. See the <Link href='/docs/api/parameters/ttl' children='ttl reference' /> and <Link href='/docs/api/basics/cache' children='cache docs' />.

## Stale-while-revalidate <ProBadge />

Use `staleTtl` when you want instant responses while Microlink refreshes the PDF in the background:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, ttl: '1d', staleTtl: 0 }} />

<Figcaption>With <code>staleTtl: 0</code>, each request serves the cached copy immediately and triggers a background refresh.</Figcaption>

This is a strong production pattern for generated documents that should stay reasonably fresh without making users wait.

## Bypass cache when you need a fresh PDF now

Use `force: true` when the next request must generate a fresh copy immediately:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, force: true }} />

<Figcaption>Use <code>force</code> sparingly. It always bypasses the cache and triggers a new render.</Figcaption>

## Reduce rendering work

Beyond caching, the biggest performance gains come from reducing what the browser has to do before the PDF is printed:

- Use `mediaType: 'print'` unless you specifically need on-screen styles.
- Prefer `waitForSelector` over `waitForTimeout`.
- Disable `javascript` when the page is already useful without client-side execution.
- Keep `adblock: true` so third-party scripts and ads do not slow rendering.
- Use `filter: 'pdf'` if you still want JSON but only need the PDF field.

## Performance checklist

1. **Set `meta: false`** — usually the biggest speedup for PDF-only requests.
2. **Choose the right `ttl`** <ProBadge /> — longer cache means fewer fresh renders.
3. **Use `staleTtl: 0`** <ProBadge /> when you want instant responses and background refresh.
4. **Keep `adblock: true`** (default) — it reduces page noise and third-party overhead.
5. **Prefer `waitForSelector`** over `waitForTimeout` — it is faster and more reliable.
6. **Stay on `mediaType: 'print'`** unless the page genuinely needs screen CSS.
7. **Disable `javascript`** when the page does not rely on client-side rendering.
8. **Use `filter: 'pdf'`** if you want a smaller JSON payload.

If the request still fails after these optimizations, continue with [private pages](/docs/guides/pdf/private-pages) for auth-related setups or [troubleshooting](/docs/guides/pdf/troubleshooting) for layout problems, timeouts, and blocked sites.

## Next step

Learn how to generate PDFs from authenticated and session-based pages safely in [private pages](/docs/guides/pdf/private-pages).
