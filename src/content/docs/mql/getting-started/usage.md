---
title: 'Usage'
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
  - `response`: The Node.js response object.

Under non succesful response it will throw a <Type children='MicrolinkError'/>:

```js
const mql = require('@microlink/mql')

// The library exposes `MicrolinkError` constructor
const { MicrolinkError } = mql

try {
  const { data } = await mql('https://example.com', { screenshot: true, waitFor: 1000 })
  console.log(data)
} catch(error) {
  console.log(error instanceof MicrolinkError) // => true
  console.log(error.name) // => RequestError
  console.log(error.hostname) // => api.microlink.io
  console.log(error.status) // => fail
  console.log(error.url) // => 'https://api.microlink.io/?url=https%3A%2F%2Fkikobeats.com&screenshot=true&video=true&waitFor=40000&force=true'
  console.log(error.code) // => EFAILED
  console.log(error.message) // => EFAILED, Request timed out
  console.log(error.statusCode) // => 500
}
```

<Figcaption children="A `MicrolinkError` always has an associated `status`, `message` and `code`." />
