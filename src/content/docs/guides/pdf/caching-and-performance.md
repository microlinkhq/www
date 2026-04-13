---
title: 'PDF: Caching and performance'
description: 'Optimize Microlink PDF generation for speed and cost. Skip unnecessary metadata, reduce rendering work, and apply the right cache strategy.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

PDF generation is heavier than a normal metadata request because Microlink has to render the page and print it as a document. The fastest workflows skip unnecessary extraction and reduce rendering work.

## PDF-specific speedups

If you only need the PDF, disable metadata extraction:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false }} />

<Figcaption>Skipping metadata is usually the single biggest speedup for PDF-only requests.</Figcaption>

The most effective PDF-specific optimizations are:

1. **Set `meta: false`** for PDF-only requests.
2. **Stay on `mediaType: 'print'`** (default for PDFs) unless the page genuinely needs screen CSS.
3. **Prefer `waitForSelector`** over `waitForTimeout`.
4. **Keep `adblock: true`** — reduces page noise and third-party overhead.
5. **Disable `javascript`** when the page does not rely on client-side rendering.
6. **Use `filter: 'pdf'`** when you want a smaller JSON payload.

## Cache strategy

For the cache controls that apply to all workflows — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

A recommended production setup for generated PDFs:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, ttl: '1d', staleTtl: 0 }} />

<Figcaption>Cache for a day, serve stale instantly while refreshing in the background. Requires a <ProBadge /> plan.</Figcaption>

## Next step

Learn how to generate PDFs from authenticated and session-based pages safely in [private pages](/docs/guides/pdf/private-pages).
