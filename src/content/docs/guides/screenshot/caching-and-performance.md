---
title: 'Caching and performance'
description: 'Optimize Microlink screenshot requests for speed and cost. Disable unnecessary metadata, tune browser settings, and apply the right cache strategy.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Every new screenshot request requires browser work. The fastest captures are the ones that skip unnecessary extraction and avoid expensive rendering.

## Screenshot-specific speedups

The single biggest speedup for screenshot-only requests is disabling metadata extraction:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false }} />

<Figcaption>Skipping metadata avoids extra processing and is usually the single biggest speedup for screenshot-only requests.</Figcaption>

Beyond that, the most effective screenshot-specific optimizations are:

1. **Keep `animations: false`** (default) — avoids waiting for CSS animations to settle.
2. **Keep `adblock: true`** (default) — blocks slow third-party requests before the page renders.
3. **Lower `deviceScaleFactor`** — a 1x screenshot is faster and lighter than 2x.
4. **Prefer `waitForSelector`** over `waitForTimeout` — finishes as soon as the element appears.
5. **Avoid `fullPage`** when a viewport or element capture is enough.
6. **Disable `javascript`** when the page does not need client-side execution.

## Cache strategy

For the cache controls that apply to all workflows — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

A recommended production setup for screenshots:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, ttl: '1d', staleTtl: 0 }} />

<Figcaption>Cache for a day, serve stale instantly while refreshing in the background. Requires a <ProBadge /> plan.</Figcaption>

## Next step

Learn how to capture logged-in and header-dependent pages safely in [private pages](/docs/guides/screenshot/private-pages).
