---
title: Cache
description: 'Optimize API performance with Microlink built-in cache layer. Understand unified vs. edge node caching, x-cache-status headers, and how to use ttl or force for cache invalidation.'
---

import { Type } from 'components/markdown/Type'

Microlink API has a built-in cache layer to speed up consecutive requests over the same resource.

The cache layer is enabled for any request under the following workflow:

- The first time a resource is requested, a cache copy will be created.
- Sucessive access over the resource will consume the cache copy.

The cache layer is a combination of a unified cache and edge node cache. The combination provides [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency).

**Unified cache**

When you query for a resource against Microlink API for the first time, the request will generate a shallow cache copy.

That known as <Type children="'MISS'"/> and it's reflect as `x-cache-status` on response headers.

Any successive API access based on the same URL will consume the shallow copy created, reflecting a <Type children="'HIT'"/> at `x-cache-status` response headers.

**Edge node cache**

Since Microlink relies on [CloudFlare CDN](https://microlink.io/blog/edge-cdn/), after the unified cache is warm, any successive API access based on the sam URL will be served from the nearest edge node over [CloudFlare Network](https://www.cloudflare.com/network).

That means not only response will be served from cache, also it will be served from the nearest distance relative to the request origin. That's reflected under `cf-cache-status` response header as <Type children="'HIT'"/>.

Edge nodes cache is per edge location, meaning every edge node as their own cache, causing a <Type children="'MISS'"/> reflected at `cf-cache-status` response header when the access comes from a different location.

When this happen, the edge node cache will fallback automatically into the unified cache, creating a new edge cache copy.

**Cache invalidation**

The cached request will be considered as valid until it reached the expiration time, reflected at the cache-control response header.

There is two ways to setup the expiration:

- [ttl](/docs/api/parameters/ttl): It sets the maximum quantity of time the value is considered valid.
- [force](/docs/api/parameters/force): It invalidates the cache immediately, generating a new fresh cache copy.

