---
title: 'Cached API responses are now free and edge-served'
description: 'Learn how Microlink CDN uses Global Edge Caching to speed up API responses, optimize images with WebP, and save your API quota by serving cached requests for free.'
authors:
  - kiko
date: '2020-03-31'
---

import { Figcaption } from 'components/markdown/Figcaption'

Starting today, any [Microlink API](/docs/api/getting-started/overview) response served from the cache no longer counts toward your API quota. Cached responses are also served from the [CloudFlare Network](https://www.cloudflare.com/network), and screenshots get lossless compression and WebP on the fly.

Microlink API has shipped with a built-in cache layer from the beginning, to speed up consecutive calls for the same resource. This release reworks that layer in three ways: what it costs, where it is served from, and what it does to images.

The first time you query a resource that was not served before, such as a screenshot of `https://example.com`, the API generates it. That is a cache *MISS*. Every successive request for the same resource returns the cached version, a cache *HIT*, and hits are the part this release changes.

## Cache hits no longer count toward your quota

```bash
npx microlink.io screenshot https://example.com
```

Any response served from the cache won't count towards your API quota. That changes how you can use the API, and the clearest case is [embed](/docs/api/parameters/embed): pointing your HTML markup straight at an API URL.

```html
<meta name="og:image" content="https://api.microlink.io?url=https://example.com&screenshot&embed=screenshot.url">
```

<Figcaption>A screenshot generated on the fly, always up to date.</Figcaption>

Before, if your website had *1000 pageviews* with this tag, you consumed *1000 requests* from your API quota.

Now you consume \*one request\*. The rest are served from the cache and **don't count toward your API quota plan**.

## Cached responses come from the nearest edge server

![](/images/image1-3.png)

<Figcaption>The CloudFlare Network has more than 240 edge servers in over 90 countries.</Figcaption>

The first request for a resource is answered by one of our origin servers, wherever it is located. Once cached, every successive request for that resource is served through the CloudFlare Network, from the nearest of more than 240 edge servers in over 90 countries.

![](/images/VsS5RwW.png)

<Figcaption>Cached response (blue) vs. Uncached response (gray).</Figcaption>

In the chart, the cached response (blue) **always** has a lower response time than the uncached one (gray), **no matter where you are**, because it never leaves the CloudFlare edge.

## Screenshots are compressed and served as WebP

![](/images/webp.png)

<Figcaption>WebP browser adoption.</Figcaption>

[Microlink screenshot](/screenshot) is one of the most used features: we serve around 100K fresh screenshots every day, generated in an average of ~1.5 seconds. We host every image generated, and the cache now optimizes it on the way out:

- **Lossless compression on the fly:** the image is identical to the original, with fewer bytes.
- **WebP when the browser supports it:** most modern browsers do, and WebP can [decrease up to 42% in average image size](https://www.keycdn.com/support/png-to-webp).

## Try it

Run `npx microlink.io screenshot https://example.com` twice. The first call is a *MISS* and counts toward your quota. The second is a *HIT* from the nearest edge server and is free. Read the [embed](/docs/api/parameters/embed) docs to put the same screenshot URL in your `og:image` tag.
