---
title: 'Caching and performance'
description: 'Speed up repeated data extraction by reducing unnecessary work, choosing the right fetch mode, and tuning Microlink cache behavior.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Data extraction performance comes from doing less work: skip metadata when you do not need it, avoid browser rendering when plain HTML is enough, and let the cache absorb repeated requests.

## Start with the cheapest successful extraction

The fastest successful request is usually a focused rule with no extra metadata and no browser render:

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

The biggest speed wins usually come from:

- Turning off `meta` when you only need custom fields.
- Using `prerender: false` for static or server-rendered pages.
- Replacing `waitForTimeout` with `waitForSelector`.
- Keeping selectors focused instead of extracting huge chunks of DOM.
- Avoiding `scripts`, `modules`, and `function` unless the page truly needs them.

## Cache TTL <ProBadge />

Use `ttl` when the extracted data changes less often than your users request it:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    ttl: '1h'
  }}
/>

<Figcaption>Longer <code>ttl</code> values improve cache hit rates and reduce repeated extraction work.</Figcaption>

Shorter TTLs are better when the target changes often. Longer TTLs are better when freshness is less important than speed.

## Serve stale while revalidating <ProBadge />

If you want fast responses even after expiration, add `staleTtl`:

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

<Figcaption>Use <code>staleTtl: 0</code> to serve the last cached copy while Microlink refreshes it in the background.</Figcaption>

This is a strong default for production extractors where latency matters more than getting the newest value on every single request.

## Force a fresh copy

When you know the target changed and want to bypass cache immediately, use `force`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    force: true
  }}
/>

<Figcaption>Use <code>force</code> sparingly. It bypasses cache and makes Microlink do the extraction work again.</Figcaption>

## Performance checklist

1. Start with `meta: false`.
2. Try `prerender: false` before assuming you need a browser.
3. Prefer `waitForSelector` over fixed waits.
4. Keep selectors specific and close to the data you need.
5. Disable `javascript` when the page does not depend on client-side execution.
6. Keep `ttl` and `staleTtl` aligned with how often the source changes <ProBadge />.
7. Use `force` only when you intentionally want a fresh uncached run.

## Next step

If the target needs cookies, auth headers, or a proxy-backed request, continue with [private pages](/docs/guides/data-extraction/private-pages).
