---
title: 'force'
description: 'Bypass the Microlink CDN cache to fetch a fresh version of the target URL. Use the force parameter to invalidate existing cached copies and ensure the most up-to-date metadata.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It invalidates the [cache](/docs/api/basics/cache) copy associated with the resource requested, returning a new fresh copy over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://time.kikobeats.com/html', force: true }} />

When it's provided, the header `x-cache-status` on the response will return **BYPASS**.

```headers{6}
content-type: application/json; charset=utf-8
x-response-time: 1.7s
x-pricing-plan: free
x-cache-ttl: 86400000
x-request-id: iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status: BYPASS
cache-control: public, must-revalidate, max-age=0
```

You can read [cache](/docs/api/basics/cache) section to know more about that.

