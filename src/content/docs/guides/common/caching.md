---
title: 'Caching patterns'
description: 'Control cache TTL, serve stale responses while revalidating, bypass cache on demand, and verify caching behavior through response headers.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

These caching patterns apply to every Microlink workflow: screenshots, PDFs, data extraction, metadata, and insights. Each guide's own caching page covers the workflow-specific speedups; this page covers the shared cache controls.

## How caching works

Every Microlink response is cached for **24 hours** by default. The cache is two-layered:

1. **Unified cache** — the first request creates a shared copy (`x-cache-status: MISS`). Subsequent requests serve that copy (`HIT`).
2. **Edge node cache** — after the unified cache is warm, responses are also served from the nearest CloudFlare edge node.

See the <Link href='/docs/api/basics/cache' children='cache docs' /> for the full architecture.

## Cache TTL <ProBadge />

Use `ttl` to control how long a response stays valid before expiring:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', ttl: '1d' }} />

<Figcaption>After the TTL expires, the next request generates a fresh response.</Figcaption>

The value must be between **1 minute** and **31 days**. It accepts milliseconds or humanized strings:

```bash
ttl=90s        # 90 seconds
ttl=1h         # 1 hour
ttl=1d         # 1 day (24 hours)
ttl=7d         # 7 days
ttl=min        # alias for 1 minute
ttl=max        # alias for 31 days
```

Choose your TTL based on how often the target content changes:

| Content type | Recommended TTL |
|--------------|-----------------|
| Rapidly changing (dashboards, feeds) | `'1h'` or less |
| Moderate changes (blogs, docs, marketing pages) | `'1d'` to `'7d'` |
| Rarely changing (static docs, stable references) | `'max'` (31 days) |

The TTL is reflected in the `x-cache-ttl` response header. See the <Link href='/docs/api/parameters/ttl' children='ttl reference' /> for all supported formats.

## Stale-while-revalidate <ProBadge />

The `staleTtl` parameter serves the cached response immediately while refreshing it in the background:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', ttl: '1d', staleTtl: 0 }} />

<Figcaption>With <code>staleTtl: 0</code>, every request serves the cached copy instantly and triggers a background refresh.</Figcaption>

This is the recommended production pattern. Your users always get an instant response, and the content stays reasonably fresh. The `staleTtl` value cannot exceed the `ttl` value.

| Pattern | Behavior |
|---------|----------|
| `staleTtl: 0` | Always serve cache, always revalidate in background |
| `staleTtl: '12h'` | Serve cache for 12 hours, then revalidate |
| `staleTtl: false` | Disabled (default) — no stale serving |

See the <Link href='/docs/api/parameters/staleTtl' children='staleTtl reference' /> for all supported formats.

## Bypassing the cache

Use `force: true` to skip the cache entirely and get a fresh response:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', force: true }} />

<Figcaption>The response header <code>x-cache-status</code> will be <code>BYPASS</code>. Use sparingly — this always triggers a fresh request.</Figcaption>

## Verify caching behavior

Check these response headers to confirm the request behaved as expected:

| Header | What it tells you |
|--------|-------------------|
| `x-cache-status` | `HIT` (served from cache), `MISS` (fresh), or `BYPASS` (forced) |
| `x-cache-ttl` | The effective cache lifetime in milliseconds |
| `cf-cache-status` | CloudFlare edge cache status |
| `x-response-time` | Total request duration — fast times usually indicate a cache hit |
