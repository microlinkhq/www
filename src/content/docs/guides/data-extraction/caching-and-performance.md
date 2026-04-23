---
title: 'Data extraction: Caching and performance'
description: 'Speed up repeated data extraction by reducing unnecessary work, choosing the right fetch mode, and applying the right cache strategy.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Data extraction performance comes from doing less work: skip metadata when you do not need it, avoid browser rendering when plain HTML is enough, and let the cache absorb repeated requests.

## Extraction-specific speedups

The fastest successful extraction is a focused rule with no extra metadata and no browser render:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    prerender: false
  }}
/>

<Figcaption>Use <code>meta: false</code> and <code>prerender: false</code> whenever the page already ships the content in HTML.</Figcaption>

The most effective extraction-specific optimizations are:

1. **Set `meta: false`** when you only need custom fields.
2. **Use `prerender: false`** for static or server-rendered pages.
3. **Prefer `waitForSelector`** over `waitForTimeout`.
4. **Keep selectors focused** instead of extracting huge chunks of DOM.
5. **Disable `javascript`** when the page does not need client-side execution.
6. **Avoid `scripts`, `modules`, and `function`** unless the page truly needs them.

## Cache strategy

For the cache controls that apply to all workflows — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

A recommended production setup for repeated extractions:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>Cache for a day, serve stale instantly while refreshing in the background. Requires a <ProBadge /> plan.</Figcaption>

## Next step

If the target needs cookies, auth headers, or a proxy-backed request, continue with [private pages](/docs/guides/data-extraction/private-pages).
