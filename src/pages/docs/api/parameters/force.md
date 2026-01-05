---
title: 'force'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It invalidates the [cache](/docs/api/basics/cache) copy associated with the resource requested, returning a new fresh copy over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://time.kikobeats.com/html', { force: true })} />

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

