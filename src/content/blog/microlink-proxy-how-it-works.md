---
title: 'Microlink Proxy resolves blocked URLs on every Pro plan'
subtitle: 'Automatic proxy rotation for the top 500 websites'
description: 'Bypass geographic restrictions and IP blacklists with Microlink Proxy. Learn how our automatic rotation layer ensures successful data extraction.'
authors:
  - kiko
date: '2021-06-07'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

All [Microlink Pro](/pricing) plans come with **Microlink Proxy**, a built-in proxy layer that resolves and rotates proxies automatically based on the input URL. It is enabled by default, needs no setup, and works across every Microlink product.

**TL;DR**

- Every Microlink Pro plan includes Microlink Proxy, enabled by default with no setup.
- It handles geographic restrictions, blacklisted IP addresses, and identity checks transparently for the **Top 500** most popular websites.
- The `x-fetch-mode` response header shows whether a request went through the proxy layer, for example `prerender-proxy`.
- It is a cross-feature: available for all the Microlink products, not only the API.

## Popular sites block requests at scale

Every URL behaves differently, and the difference shows once you send enough traffic. Popular sites like Instagram or Bloomberg start answering some requests and refusing others, so getting a successful response becomes inconsistent.

![](/images/pVPDpao.png)

<Figcaption>
  {'A '}
  <Link href='https://github.com/microlinkhq/metascraper/issues/417' children='metascraper issue' /> facing with fetching problems.
</Figcaption>

Visiting a URL, from a browser or from a server, can fail in three ways a client cannot handle on its own:

- **Geographic restrictions:** the site is not reachable from your location, for example from China.
- **Blacklisted IP addresses:** the site refuses traffic from your IP, for example a request from a data center.
- **Identity checks:** the site asks you to prove you are human, for example with a CAPTCHA.

## The proxy layer handles those failures for you

With Microlink Proxy, the [Microlink API](/docs/api/getting-started/overview) returns the data for the URL you asked for and handles any of the problems above transparently. There is nothing to configure and nothing to maintain.

![](/images/8uvahxZ.png)

<Figcaption>No additional setup needed, just a Microlink Pro plan.</Figcaption>

The proxy is enabled by default for all [Microlink Pro](/pricing) plans. It handles these situations transparently for the [Top 500](https://github.com/Kikobeats/top-sites) most popular websites worldwide.

## The x-fetch-mode header shows when the proxy was used

To check whether a specific request went through the proxy layer, read the `x-fetch-mode` response header. The [Microlink CLI](/docs/api/getting-started/cli) prints it as `mode`. Here, a Bloomberg article resolved with `prerender-proxy` and was then served from cache in 329ms:

```bash
microlink https://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance

 SUCCESS  3.64 kB in 329ms

 cache HIT (19h 20m 54.8s left)
  mode prerender-proxy (8.5s)
   uri https://pro.microlink.io/?url=https://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance&filter=statusCode
    id iad:paw98q36bHEIlAgsFBzy5
```

<Figcaption>
  If the value there is prefixed by <code children='`proxy`'/> then it was handled by the proxy layer.
</Figcaption>

`x-fetch-mode` is there for informational purposes only: a `prerender-proxy` value needs no change to your request.

## The proxy works with the rest of the API

The proxy layer respects the other query parameters of the request, such as [prerender](/docs/api/parameters/prerender) or [ttl](/docs/api/parameters/ttl). The request above combines `prerender` with the proxy, which is why the mode reads `prerender-proxy`.

When you need to route traffic through your own infrastructure, you can always provide your own [proxy](/docs/api/parameters/proxy) parameter instead.

Microlink Proxy is a **cross-feature**: it is available for all the Microlink products, not only the API. To use it, send your requests on a [Microlink Pro](/pricing) plan and check `x-fetch-mode` on the responses that used to fail.
