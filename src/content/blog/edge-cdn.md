---
title: 'Microlink CDN: Global Edge Cache'
date: '2020-03-31'
---

import { Figcaption } from 'components/markdown/Figcaption'

From the beginning, [Microlink API](/docs/api/getting-started/overview) shipped with a built-in cache layer for speeding up consecutive API calls, aiming to improve response times for the same resource.

## How cache works

When you query against [Microlink API](/docs/api/getting-started/overview), the first time you query for a resource that wasn't previously served it will be created, what is known as a cache *MISS*.

The successive requests for the resource will consume the cached version, what is known as a cache *HIT*.

## What's new

We revisited the cache layer and implemented some improvements, making it more powerful than ever.

### Cache saves your API quota

```bash
npx @microlink/cli https://example.com&screenshot&embed=screenshot.url
```

Starting from today, any response served from the cache won't count towards your API quota.

This drastically changes how users consume the API. Let me clarify with an example.

One of the [Microlink API](/docs/api/getting-started/overview) use cases is to [embed](/docs/api/parameters/embed) it directly in your HTML markup:

```html
<meta name="og:image" content="https://api.microlink.io?url=https://example.com&screenshot&embed=screenshot.url">
```

<Figcaption>A screenshot generated on the fly, always up to date.</Figcaption>

In the past, if you did this and your website had *1000 pageviews*, it meant you consumed *1000 requests* from your API quota.

Now, you only consume \*one request\*, serving the rest from the cache and **not counting them in your API quota plan**.

### Cache is served around the world

![](/images/image1-3.png)

<Figcaption>The CloudFlare Network has more than 240 edge servers in over 90 countries.</Figcaption>

The first time you hit [Microlink API](/docs/api/getting-started/overview), the response will come from one of the servers located somewhere.

Once cached, the successive requests to the same resource will be served using the [CloudFlare Network](https://www.cloudflare.com/network), meaning the cached response will come from the nearest edge server in the world (and they're a lot, more than 240 edge servers in over 90 countries).

![](/images/VsS5RwW.png)

<Figcaption>Cached response (blue) vs. Uncached response (gray).</Figcaption>

You can see how cached resources **always** have the lowest response time associated, **no matter where you are**.

### Cache optimizes screenshots on the fly

![](/images/webp.png)

<Figcaption>WebP browser adoption.</Figcaption>

[Microlink screenshot](/screenshot) is one of the most used product features these days: we’re serving around 100K fresh screenshots every day, generated in an average of ~1.5 seconds.

When you take a screenshot the image generated is hosted by us, additionally taking some special cache considerations into account.

First, **the image will apply lossless compression on the fly**. The image will be the same as the original but the size will be smaller, saving some bytes there.

Second, **WebP will be served if the browser supports it**. Most modern browsers support WebP and it can [decrease up to 42% in average image size](https://www.keycdn.com/support/png-to-webp).
