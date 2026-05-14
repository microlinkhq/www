---
title: 'Embed: Caching and performance'
description: 'Keep embeds fast at scale. Cache embed responses, avoid hot-linking issues, prefer direct embed for static markup, and tune TTL for the right freshness.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Embeds are read-mostly. The same URL renders the same card thousands of times. Lean into that — cache aggressively and serve from the edge.

This page covers embed-specific performance tactics. For the universal caching controls (`ttl`, `staleTtl`, `force`, and how to read cache headers), see <Link href='/docs/guides/common/caching' children='caching patterns' />.

## Embed-specific speedups

The single biggest win for embed-only requests is matching the response shape to your renderer. Three patterns:

1. **Static markup with direct `embed`** — for `<img>` and `<meta og:image>`, return the asset itself. The CDN serves bytes directly with no JSON parsing in your stack.

   ```html
   <img src="https://api.microlink.io?url=https://stripe.com&embed=image.url" />
   ```

2. **Filter the JSON when you only need a few fields** — `filter=title,description,image.url` shrinks the payload and keeps your renderer's hot path tight.

   <MultiCodeEditorInteractive height={210} mqlCode={{
     url: 'https://stripe.com',
     filter: 'title,description,image.url,logo.url'
   }} />

3. **Disable metadata extraction when you only want a screenshot or iframe** — `meta=false` skips the metadata stage entirely.

   <MultiCodeEditorInteractive height={210} mqlCode={{
     url: 'https://stripe.com',
     screenshot: true,
     meta: false,
     embed: 'screenshot.url'
   }} />

   <Figcaption>Useful for OG images and dynamic banners — no metadata work, just the capture.</Figcaption>

## Cache strategy

For the controls that apply to every workflow — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

A recommended production setup for embeds:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://stripe.com',
  ttl: '1d',
  staleTtl: 0
}} />

<Figcaption>Cache for a day, serve stale instantly while refreshing in the background. Requires a <ProBadge /> plan.</Figcaption>

For high-traffic embed surfaces — comment widgets, RSS readers, AI search results — pair `staleTtl: 0` with a long `ttl` so users always hit cache and only the background refresh touches the origin.

## Hot-linking and the embed URL

The `embed=...` URL is itself a CDN-cacheable asset. Browsers and downstream proxies (Slack, Discord, email clients) cache it by URL. Two consequences:

- **Stable URLs cache best.** Avoid appending random query parameters or session IDs.
- **`force=true` defeats this.** Use `force` only when you intentionally want a regeneration — never as a default.

If you need the URL to change when source content changes (cache busting), append a content hash you control:

```html
<img src="https://api.microlink.io?url=https://your-site.com/post&screenshot&embed=screenshot.url&v=42" />
```

Bumping `v` invalidates downstream caches without touching Microlink's behavior.

## SDK lazy-loading

The SDK uses `IntersectionObserver` and only fires its API call when each preview enters the viewport. Pages with hundreds of embedded links still hit a fast first paint. To preload above-the-fold cards, tighten the lazy options:

```jsx
<Microlink url='...' lazy={{ rootMargin: '400px' }} />
```

See <Link href='/docs/sdk/parameters/lazy' children='lazy reference' />.

## When you don't need fresh data

Static sites and SSR builds often have the metadata at build time. Skip the runtime call:

```jsx
<Microlink
  url='https://example.com/post'
  fetchData={false}
  setData={prefetchedData}
/>
```

That removes the API call entirely. Combined with build-time crawling, you ship zero-API-call embeds. See <Link href='/docs/sdk/parameters/set-data' children='setData reference' />.

## Verify caching is working

Check the response headers when you suspect a slow embed:

| Header | What it tells you |
|--------|-------------------|
| `x-cache-status` | `HIT` (cache), `MISS` (fresh), `BYPASS` (forced) |
| `x-cache-ttl` | Effective cache lifetime in milliseconds |
| `x-response-time` | A short value (under ~50ms) usually means a cache hit |

For the full pattern, see <Link href='/docs/guides/common/caching#verify-caching-behavior' children='verify caching behavior' />.

## Next step

Learn how to embed authenticated dashboards and pages protected by antibot systems in <Link href='/docs/guides/embed/private-pages-and-proxy' children='private pages and proxy' />.
