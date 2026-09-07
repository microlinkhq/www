---
title: 'API'
description: 'Technical documentation for the mql function. Learn how to configure URL targets, API keys, endpoints, retries, HTTP options, and how to get the response as a stream or buffer.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'

### mql(&lt;url&gt;, [options], [httpOptions])

<H4 titleize={false}>url</H4>

**required**<br/>

Type: <Type children='<string>'/>

The target URL for getting content. It must be an absolute `http` or `https` URL; anything else throws `EINVALURLCLIENT` before any request is made.

<H4 titleize={false}>options</H4>

Type: <Type children='<object>'/>

You can pass any API Parameters from [Microlink API](/docs/api/getting-started/overview) as an option. Nested parameters are written as objects and serialized with dot notation for you:

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql('https://kikobeats.com', {
  screenshot: { fullPage: true },
  device: 'iPad',
  palette: true
})

console.log(`My screenshot at ${data.screenshot.url}`)
```

<br/>

Additionally, you can configure:

<H5 titleize={false}>apiKey</H5>

Type: <Type children='<string>'/>

The API Key used for [authenticating](/docs/api/basics/authentication) your requests as `x-api-key` header.

When the `apiKey` is provided, the [pro.microlink.io](https://pro.microlink.io/) as [endpoint](/docs/api/basics/endpoint) will be used.

<H5 titleize={false}>endpoint</H5>

Type: <Type children='<string>'/>

Overrides the API endpoint, for example to point at a self-hosted or enterprise deployment. When omitted, the endpoint is picked from the presence of `apiKey`.

<H4 titleize={false}>httpOptions</H4>

Type: <Type children='<object>'/>

Any additional option will be passed to [ky](https://github.com/sindresorhus/ky), the internal HTTP client used under the hood.

That's necessary for some user workflow, e.g., passing [authentication](/docs/api/parameters/headers) headers without exposing credentials, or aborting the request with an `AbortSignal`:

```js
const mql = require('@microlink/mql')

const { data } = await mql(
  'https://example.com/private',
  { screenshot: true },
  {
    headers: { 'x-api-header-cookie': 'session=…' },
    signal: AbortSignal.timeout(20000)
  }
)
```

Transient HTTP failures are retried twice by default, honoring the `Retry-After` header when the API sends one; tune it with the [ky retry](https://github.com/sindresorhus/ky#retry) option. Note that [retry](/docs/api/parameters/retry) under `options` is a different thing: it's the API parameter controlling browser-level retries on Microlink's side.

### mql.stream(&lt;apiUrl&gt;, [httpOptions])

Performs a request and resolves to a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) of the response body. It takes the API URL and HTTP options as built by `mql.getApiUrl` below; pair it with the [embed](/docs/api/parameters/embed) parameter to stream a generated asset straight to your own response:

```js
const mql = require('@microlink/mql')

const [apiUrl, httpOptions] = mql.getApiUrl('https://example.com', {
  screenshot: true,
  embed: 'screenshot.url'
})

const stream = await mql.stream(apiUrl, httpOptions)
```

### mql.buffer(&lt;url&gt;, [options], [httpOptions])

Returns an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) of the response body instead of the parsed JSON, so a generated asset can be written to disk without a second request:

```js
const { writeFile } = require('fs/promises')
const mql = require('@microlink/mql')

const { body } = await mql.buffer('https://example.com', {
  pdf: true,
  embed: 'pdf.url'
})

await writeFile('example.pdf', Buffer.from(body))
```

`mql.arrayBuffer` is an alias of `mql.buffer`.

### mql.extend([httpOptions])

Creates a new `mql` function with default `httpOptions` baked in, handy for sharing headers or a signal across calls:

```js
const mql = require('@microlink/mql').extend({
  headers: { 'x-api-header-cookie': 'session=…' }
})
```

### mql.getApiUrl(&lt;url&gt;, [options], [httpOptions])

Builds the API request without performing it, returning the URL and the HTTP options as a tuple. Useful to render the request in a UI, log it, or hand it to another HTTP client:

```js
const mql = require('@microlink/mql')

const [apiUrl, httpOptions] = mql.getApiUrl('https://example.com', {
  screenshot: true,
  apiKey: process.env.MICROLINK_API_KEY
})

console.log(apiUrl) // => 'https://pro.microlink.io/?url=https%3A%2F%2Fexample.com&screenshot=true'
console.log(httpOptions.headers['x-api-key'])
```

### mql.MicrolinkError

The error class thrown on non successful responses. See [usage](/docs/sdk/mql/getting-started/usage) for the properties it carries.
