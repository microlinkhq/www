---
title: 'Caching and performance'
description: 'Optimize Markdown extraction for speed and cost. Control cache TTL, use stale-while-revalidate, skip unnecessary browser work, and keep responses small.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The fastest Markdown requests are the ones that skip unnecessary extraction work, avoid full browser rendering when it is not needed, and reuse cache whenever possible.

## Start with the biggest speedups

If you only need the extracted Markdown, disable metadata extraction:

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Skipping the extra metadata pass is usually the single biggest speedup for Markdown-only workflows.</Figcaption>

If you also want to reduce response size, combine it with `filter: 'content'`. That keeps the response JSON but trims the payload down to the field you actually consume.

## Skip browser work when HTML is already enough

When the content is already present in the initial HTML, avoid a browser render:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    prerender: false
  }}
/>

<Figcaption>Use <code>prerender: false</code> for static or server-rendered pages where the initial HTML already contains the content you need.</Figcaption>

Other common performance levers:

- `javascript: false` when the page is still useful without client-side execution.
- `adblock: true` (default) to block slow third-party requests.
- `waitForSelector` instead of `waitForTimeout` when a stable selector exists.

## Cache TTL <ProBadge />

Every response is cached for **24 hours** by default. Set `ttl` to control how long an extracted Markdown result can be reused before expiring:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    ttl: '1d'
  }}
/>

<Figcaption>Cache this extraction for 1 day. After that, the next request triggers a fresh fetch and conversion.</Figcaption>

Choose a TTL based on how often the target content changes:

| Scenario | Recommended TTL |
|----------|-----------------|
| Frequently updated feeds or dashboards | `'1h'` or less |
| Blog posts, documentation, marketing pages | `'1d'` to `'7d'` |
| Very stable pages | `'max'` (31 days) |

The TTL is reflected in the `x-cache-ttl` response header. Configurable TTL requires a <ProBadge /> plan. See the <Link href='/docs/api/parameters/ttl' children='ttl reference' /> and <Link href='/docs/api/basics/cache' children='cache docs' />.

## Stale-while-revalidate <ProBadge />

The `staleTtl` parameter serves the cached result immediately while refreshing it in the background:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>With <code>staleTtl: 0</code>, every request serves cache instantly and triggers a background refresh.</Figcaption>

This is a strong production default when the content should feel fast but you still want it to stay reasonably fresh. The `staleTtl` value cannot exceed the `ttl` value.

## Bypassing the cache

Use `force: true` when you explicitly need a fresh extraction right now:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    force: true
  }}
/>

<Figcaption>The response header <code>x-cache-status</code> will be <code>BYPASS</code>. Use this sparingly because it always triggers fresh work.</Figcaption>

## Performance checklist

1. Set `meta: false` when you only need custom Markdown fields.
2. Add `filter` when you want minimal JSON payloads.
3. Use `prerender: false` when the initial HTML already contains the content.
4. Choose the right `ttl` <ProBadge /> so repeated requests reuse cache.
5. Use `staleTtl: 0` <ProBadge /> when you want instant responses plus background refresh.
6. Keep `adblock: true` unless you explicitly need ad or consent markup.
7. Prefer `waitForSelector` over `waitForTimeout`.
8. Disable `javascript` when the page does not need it.

If the request still fails after these optimizations, continue with [private pages](/docs/guides/markdown/private-pages) for auth-related setups or [troubleshooting](/docs/guides/markdown/troubleshooting) for selector, timeout, and antibot issues.

## Next step

Learn how to extract Markdown from authenticated and header-dependent pages in [private pages](/docs/guides/markdown/private-pages).
