---
title: 'Caching and performance'
description: 'Optimize Microlink screenshot requests for speed and cost. Control cache TTL, use stale-while-revalidate, bypass cache, and tune browser settings for faster responses.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Every screenshot request spins up a headless browser, which takes time and resources. This section covers how to minimize that cost through caching, response optimization, and smart parameter choices.

## Cache TTL

Every response is cached for **24 hours** by default. Set `ttl` to control how long:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, ttl: '1h' }} />

<Figcaption>Cache this screenshot for 1 hour. After that, the next request triggers a fresh capture.</Figcaption>

The value must be between 1 minute and 31 days. It accepts milliseconds or humanized strings:

```bash
ttl=90s        # 90 seconds
ttl=1h         # 1 hour
ttl=1d         # 1 day (24 hours)
ttl=7d         # 7 days
ttl=min        # alias for 1 minute
ttl=max        # alias for 31 days
```

Choose your TTL based on how often the target page changes:

| Scenario | Recommended TTL |
|----------|-----------------|
| Rapidly changing content (dashboards, feeds) | `'1h'` or less |
| Marketing pages, blogs | `'1d'` to `'7d'` |
| Static documentation, rarely changing sites | `'max'` (31 days) |

The TTL is reflected in the `x-cache-ttl` response header.

## Stale-while-revalidate

The `staleTtl` parameter (pro) serves the cached screenshot immediately while refreshing it in the background:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, ttl: '1d', staleTtl: 0 }} />

<Figcaption>With <code>staleTtl: 0</code>, every request serves the cached copy instantly and triggers a background refresh.</Figcaption>

This is the recommended pattern for production use. Your users always get an instant response, and the screenshot stays reasonably fresh. The `staleTtl` value can't exceed the `ttl` value.

| Pattern | Behavior |
|---------|----------|
| `staleTtl: 0` | Always serve cache, always revalidate |
| `staleTtl: '12h'` | Serve cache for 12h, then revalidate |
| `staleTtl: false` | Disabled (default) — no stale serving |

## Bypassing the cache

Use `force: true` to skip the cache entirely and get a fresh screenshot:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, force: true }} />

<Figcaption>The response header <code>x-cache-status</code> will be <code>BYPASS</code>. Use sparingly — this always triggers a full browser render.</Figcaption>

## Skipping metadata

If you only need the screenshot, disable metadata extraction with `meta: false`:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false }} />

<Figcaption>Skipping metadata avoids extra processing and reduces response time. This is the single most impactful optimization for screenshot-only requests.</Figcaption>

## Prerender control

The `prerender` parameter controls whether a headless browser is used. For screenshots, a browser is always required — but understanding this parameter helps with debugging:

| Value | Behavior |
|-------|----------|
| `'auto'` | Let the API decide (default) |
| `true` | Force headless browser |
| `false` | Simple HTTP GET — will not produce a screenshot |

When combining screenshots with metadata extraction, the API always uses a browser regardless of this setting.

## Proxy for blocked sites

Some sites block headless browser requests. The `proxy` parameter (pro) routes the request through a proxy:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', screenshot: true, meta: false, proxy: true }} />

<Figcaption>Microlink provides automatic proxy resolution for pro plans. You can also supply your own proxy URL.</Figcaption>

## Error handling

Control retry behavior and timeouts for unreliable targets:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', screenshot: true, meta: false, retry: 3, timeout: '15s' }} />

<Figcaption>Retry up to 3 times with exponential backoff, with a 15-second timeout per attempt.</Figcaption>

| Parameter | Default | Range |
|-----------|---------|-------|
| `retry` | `2` | 0–∞ |
| `timeout` | `'28s'` | up to 28 seconds |

## Performance checklist

A summary of the best practices for fast screenshot requests:

1. **Set `meta: false`** — the single biggest speedup for screenshot-only requests.
2. **Use `staleTtl: 0`** — instant responses with background refresh.
3. **Choose the right `ttl`** — longer cache means fewer browser renders.
4. **Keep `adblock: true`** (default) — blocks slow third-party requests.
5. **Keep `animations: false`** (default) — avoids waiting for CSS animations.
6. **Prefer `waitForSelector`** over `waitForTimeout` — it's faster and more reliable.
7. **Use `filter: 'screenshot'`** — reduces response payload size.
8. **Lower `deviceScaleFactor`** — a 1× screenshot is faster and lighter than 2×.

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
