---
title: Cache
---

Microlink API has a builtin cache layer to speed up consecutive API calls based on the URL, meaning:

- The same request performed over the time will be consumed from the same cache copy.
- A different request or a request variation will create different cache copies.

The cache layer offers [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) based on three concepts:

**Unified Cache**

When you query for a resource against Microlink API for the first time, the request will generate a shallow cache copy.

That known as **MISS** and it's reflect as `x-cache-status` on response headers.

Any successive API access based on the same URL will consume the shallow copy created, reflecting a **HIT** at `x-cache-status` response headers.

**Edge Node Cache**

Since Microlink relies on [CloudFlare CDN](https://microlink.io/blog/edge-cdn/), after the unified cache is warm, any successive API access based on the sam URL will be served from the nearest edge node over [CloudFlare Network](https://www.cloudflare.com/network).

That means not only response will be served from cache, also it will be served from the nearest distance relative to the request origin. That's reflected under `cf-cache-status` response header as **HIT**.

Edge nodes cache is per edge location, meaning every edge node as their own cache, causing a **MISS** reflected at `cf-cache-status` response header when the access comes from a different location.

When this happen, the edge node cache will fallback automatically into the unified cache, creating a new edge cache copy.

**Cache Invalidation**

The cached request will be considered as valid until it reached the expiration time, reflected at the cache-control response header.

There is two ways to setup the expiration:

- [ttl](/docs/api/parameters/ttl): It sets the maximum quantity of time the value is considered valid.
- [force](/docs/api/parameters/force): It invalidates the cache immediately, generating a new fresh cache copy.

