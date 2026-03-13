---
title: 'Caching and performance'
description: 'Optimize metadata extraction for speed and freshness. Limit detection work, reuse cache, and choose the right refresh strategy.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The fastest metadata requests are the ones that detect only the fields you need, avoid unnecessary browser work, and reuse cache whenever possible.

## Start with the biggest speedup

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

Other common wins:

- avoid extra enrichments like `palette`, `iframe`, or `insights` unless you need them
- use `prerender: false` when the initial HTML already contains the metadata
- prefer `waitForSelector` over `waitForTimeout`
- disable `javascript` when the page does not need it

## Cache TTL <ProBadge />

Every response is cached for **24 hours** by default. Set `ttl` to control how long a metadata result can be reused before expiring:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      title: true,
      description: true
    },
    ttl: '1d'
  }}
/>

<Figcaption>Cache this response for 1 day. After that, the next request triggers a fresh fetch.</Figcaption>

Choose a TTL based on how often the target content changes:

| Scenario | Recommended TTL |
|----------|-----------------|
| Frequently changing dashboards or feeds | `'1h'` or less |
| Blogs, documentation, company pages | `'1d'` to `'7d'` |
| Very stable pages | `'max'` (31 days) |

The TTL is reflected in the `x-cache-ttl` response header. Configurable TTL requires a <ProBadge /> plan. See the <Link href='/docs/api/parameters/ttl' children='ttl reference' /> and <Link href='/docs/api/basics/cache' children='cache docs' />.

## Stale-while-revalidate <ProBadge />

The `staleTtl` parameter serves the cached result immediately while refreshing it in the background:

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

<Figcaption>With <code>staleTtl: 0</code>, users get the cached response instantly while Microlink refreshes it in the background.</Figcaption>

This is a strong production pattern when freshness matters but fast responses matter more. The `staleTtl` value cannot exceed the `ttl` value.

## Bypassing the cache

Use `force: true` when you explicitly need a fresh metadata fetch right now:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    force: true
  }}
/>

<Figcaption>The response header <code>x-cache-status</code> will be <code>BYPASS</code>. Use this sparingly because it always forces fresh work.</Figcaption>

## Performance checklist

1. Use a `meta` object to request only the fields you need.
2. Skip `palette`, `iframe`, `insights`, and custom `data` fields unless they matter for the workflow.
3. Use `prerender: false` when the page already exposes the right metadata in HTML.
4. Choose the right `ttl` <ProBadge /> so repeated requests reuse cache.
5. Use `staleTtl: 0` <ProBadge /> when you want instant responses plus background refresh.
6. Prefer `waitForSelector` over `waitForTimeout`.
7. Disable `javascript` when the page does not need it.

If the request is still wrong after these optimizations, continue with [private pages](/docs/guides/metadata/private-pages) for auth-related setups or [troubleshooting](/docs/guides/metadata/troubleshooting) for timing, selector, and antibot issues.

## Next step

Learn how to extract metadata from authenticated and header-dependent pages in [private pages](/docs/guides/metadata/private-pages).
