---
title: 'Caching and performance'
description: 'Optimize metadata extraction for speed and freshness. Limit detection work, avoid unnecessary enrichments, and apply the right cache strategy.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The fastest metadata requests are the ones that detect only the fields you need, avoid unnecessary browser work, and reuse cache whenever possible.

## Metadata-specific speedups

If you only need a few metadata fields, request only those:

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      title: true,
      description: true
    }
  }}
/>

<Figcaption>Selective metadata detection is usually the biggest speed and payload win for metadata workflows.</Figcaption>

The most effective metadata-specific optimizations are:

1. **Use a `meta` object** to request only the fields you need.
2. **Skip enrichments** — avoid `palette`, `iframe`, `insights`, or custom `data` fields unless they matter.
3. **Use `prerender: false`** when the initial HTML already contains the metadata.
4. **Prefer `waitForSelector`** over `waitForTimeout`.
5. **Disable `javascript`** when the page does not need it.

## Cache strategy

For the cache controls that apply to all workflows — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

A recommended production setup for metadata:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      title: true,
      description: true
    },
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>Cache for a day, serve stale instantly while refreshing in the background. Requires a <ProBadge /> plan.</Figcaption>

## Next step

Learn how to extract metadata from authenticated and header-dependent pages in [private pages](/docs/guides/metadata/private-pages).
