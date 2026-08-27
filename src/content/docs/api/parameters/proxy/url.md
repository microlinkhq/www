---
title: 'proxy › url'
description: 'Route every sub-request through your own HTTP proxy server.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Values: WHATWG URL

It sets the proxy HTTP server for resolving any internal sub-requests over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://geolocation.microlink.io',
  proxy: { url: 'https://myproxy:603f60f5@superproxy.cool:8001' }
}} />

The value must be a valid [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api). The supported format is:

```text
https://username:password@hostname:port
```

A bare `proxy` string is treated as `proxy.url`. `url` and [location](/docs/api/parameters/proxy/location) are exclusive.

An unparseable URL is rejected with [EINVALPROXY](/docs/api/basics/error-codes#einvalproxy).
