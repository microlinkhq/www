---
title: 'Caching and performance'
description: 'Optimize Microlink screenshot requests for speed and cost. Control cache TTL, use stale-while-revalidate, bypass cache, and tune browser settings for faster responses.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Every new screenshot request requires browser work. The fastest captures are the ones that reuse cache, skip unnecessary extraction, and avoid waiting longer than necessary.

The biggest wins usually come from three decisions: disable metadata when you do not need it, choose a sensible cache policy, and avoid expensive rendering work such as unnecessary full-page captures or fixed waits.

## Start with the biggest speedup

If you only need the screenshot, disable metadata extraction:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false }} />

<Figcaption>Skipping metadata avoids extra processing and is usually the single biggest speedup for screenshot-only requests.</Figcaption>

## Cache TTL <ProBadge />

Every response is cached for **24 hours** by default. Set `ttl` to control how long a generated screenshot can be reused before expiring:

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

The TTL is reflected in the `x-cache-ttl` response header. Configurable TTL requires a <ProBadge /> plan. See the <Link href='/docs/api/parameters/ttl' children='ttl reference' /> for all supported formats and the <Link href='/docs/api/basics/cache' children='cache docs' /> for how caching works.

## Stale-while-revalidate <ProBadge />

The `staleTtl` parameter serves the cached screenshot immediately while refreshing it in the background:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, ttl: '1d', staleTtl: 0 }} />

<Figcaption>With <code>staleTtl: 0</code>, every request serves the cached copy instantly and triggers a background refresh.</Figcaption>

This is the recommended pattern for production use. Your users always get an instant response, and the screenshot stays reasonably fresh. The `staleTtl` value can't exceed the `ttl` value.

| Pattern | Behavior |
|---------|----------|
| `staleTtl: 0` | Always serve cache, always revalidate |
| `staleTtl: '12h'` | Serve cache for 12h, then revalidate |
| `staleTtl: false` | Disabled (default) — no stale serving |

See the <Link href='/docs/api/parameters/staleTtl' children='staleTtl reference' /> for all supported formats.

## Bypassing the cache

Use `force: true` to skip the cache entirely and get a fresh screenshot:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, meta: false, force: true }} />

<Figcaption>The response header <code>x-cache-status</code> will be <code>BYPASS</code>. Use sparingly — this always triggers a full browser render.</Figcaption>

## Performance checklist

A summary of the best practices for fast screenshot requests:

1. **Set `meta: false`** — the single biggest speedup for screenshot-only requests.
2. **Choose the right `ttl`** <ProBadge /> — longer cache means fewer browser renders.
3. **Use `staleTtl: 0`** <ProBadge /> when freshness matters but you still want instant responses.
4. **Keep `adblock: true`** (default) — blocks slow third-party requests.
5. **Keep `animations: false`** (default) — avoids waiting for CSS animations.
6. **Prefer `waitForSelector`** over `waitForTimeout` — it's faster and more reliable.
7. **Lower `deviceScaleFactor`** — a 1x screenshot is faster and lighter than 2x.
8. **Disable `javascript`** when the page does not need client-side execution.
9. **Avoid `fullPage`** when a viewport or element capture is enough.

If the request still fails after these optimizations, continue with [private pages](/docs/guides/screenshot/private-pages) for auth-related setups or [troubleshooting](/docs/guides/screenshot/troubleshooting) for timeouts, antibot protections, and capture issues.

## Next step

Learn how to capture logged-in and header-dependent pages safely in [private pages](/docs/guides/screenshot/private-pages).
