---
title: Authentication
description: 'Securely authenticate your Microlink API requests using x-api-key headers. Includes best practices for production integration and protecting tokens via proxy for frontend usage.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

The authentication is done passing the API key of your [Microlink account](https://dashboard.microlink.io/signup) as `x-api-key` request header. Every account gets a free API key; a [paid plan](/pricing) adds quota and pro features to it.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://github.com/microlinkhq', apiKey: 'YOUR_API_TOKEN' }} />

You can ensure your authentication is done correctly checking the `x-pricing-plan` header on the response.

```headers{3}
content-type    : application/json; charset=utf-8
x-response-time : 1.7s
x-pricing-plan  : pro
x-cache-ttl     : 86400000
x-request-id    : iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status  : BYPASS
cache-control   : public, must-revalidate, max-age=0
x-fetch-time    : 0ms
```

If you need to consume the API from a frontend side (e.g, from a website), don't attach your API token directly in your client code: It will easy to a visitor leak it and consume your API quota without consent.

Instead, you need to setup a mechanism to just allow consume your token for a allowed list of trusted domains. 

Check our repositories [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to accomplish that, only allowing a list of well-known domains to consume your API quota.
