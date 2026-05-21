---
title: 'cacheKey'
description: 'Take full control of cache identity to maximize hit rates and avoid redundant processing.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Default: <Type children='undefined'/>

It extends the automatic [cache](/docs/api/basics/cache) key with a custom identifier for the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', screenshot: true, cacheKey: 'microlink-home' }} />

The [cache](/docs/api/basics/cache) key is computed from the target URL and all recognized query parameters. The `cacheKey` value is appended on top, so two requests with the same parameters but different `cacheKey` values produce separate cache entries:

```bash
# Two separate cache entries despite identical parameters
https://pro.microlink.io?url=https://example.com&screenshot=true&cacheKey=variant-a
https://pro.microlink.io?url=https://example.com&screenshot=true&cacheKey=variant-b
```

This is useful when you need separate cached copies of the same request, for example when A/B testing or serving different audiences from the same URL.

You can verify the cache is working by checking the `x-cache-status` header on the response:

```headers{6}
content-type: application/json; charset=utf-8
x-response-time: 1.7s
x-pricing-plan: pro
x-cache-ttl: 86400000
x-request-id: iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status: HIT
cache-control: public, must-revalidate, max-age=0
```

You can read the [cache](/docs/api/basics/cache) section to learn more.
