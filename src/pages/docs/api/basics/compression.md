---
title: 'Compression'
---

import { mqlCode } from 'helpers/mql-code'

The compression algorithms **brotli** and **gzip** are supported.

If you are performing the API requests using [SDK](/docs/sdk/getting-started/overview/) or [MQL](/docs/mql/getting-started/overview/), compression will be enabled by default.

Otherwise, ensure to specify what compression you want to use using [Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header.

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://github.com/microlinkhq')} 
/>

You can check what compression algorithm has been used after the HTTP negotiation seeing `content-encoding` response header.

```headers{2}
content-type: application/json; charset=utf-8
content-encoding: br
x-timestamp: 1750986229308
x-response-time: 51ms
x-rate-limit-reset: 1751097111
x-pricing-plan: free
x-region: iad
x-fetch-mode: fetch
x-rate-limit-remaining: 45
x-cache-ttl: 86400000
x-request-id: iad:2af5a47c-d15f-47a7-938e-6551fc81bf9c
x-rate-limit-limit: 50
x-cache-status: HIT
x-content-type-options: nosniff
x-client-ip: 88.20.23.25
x-fetch-time: 305ms
```
