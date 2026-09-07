---
title: 'Usage'
description: 'Learn how to use the MQL library to fetch URL data. Detailed guide on handling API responses, objects, and MicrolinkError exceptions for robust error handling.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'

For using **MQL**, you need to provide at least a [url](/docs/api/parameters/url).

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql('https://microlink.io')
```

It returns an <Type children='<object>'/> with the following properties:

  - `status`: The [status](/docs/api/basics/format#status) associated with the response.
  - `data`: The [data](/docs/api/basics/format#data) response from the API.
  - `response`: The HTTP response, with `url`, `statusCode`, `headers`, and the parsed `body`.

The response headers carry useful information about the request, such as the cache status and the request identifier:

```js
const { response } = await mql('https://microlink.io', { ttl: '1d' })

console.log(response.headers.get('x-cache-status')) // => 'HIT'
console.log(response.headers.get('x-request-id'))
```

Under a non successful response it will throw a <Type children='MicrolinkError'/>:

```js
const mql = require('@microlink/mql')

// The library exposes `MicrolinkError` constructor
const { MicrolinkError } = mql

try {
  const { data } = await mql('https://example.com', { screenshot: true, waitForTimeout: 1000 })
  console.log(data)
} catch (error) {
  console.log(error instanceof MicrolinkError) // => true
  console.log(error.name) // => MicrolinkError
  console.log(error.status) // => fail
  console.log(error.code) // => EBRWSRTIMEOUT
  console.log(error.description) // => Browser timed out
  console.log(error.message) // => EBRWSRTIMEOUT, Browser timed out
  console.log(error.statusCode) // => 500
  console.log(error.url) // => 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com&screenshot=true&waitForTimeout=1000'
  console.log(error.headers['x-request-id'])
  console.log(error.more) // => 'https://microlink.io/ebrwsrtimeout'
}
```

<Figcaption children="A `MicrolinkError` always has an associated `status`, `message` and `code`." />

The [error codes](/docs/api/basics/error-codes) reference lists every `code` and how to recover from it. The SDK throws the very same `MicrolinkError`, so [error handling](/docs/sdk/getting-started/errors) is identical in both.
