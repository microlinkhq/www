---
title: 'API'
description: Technical documentation for the mql function. Learn how to configure URL targets, API keys, Node.js caching, and retry logic for high-performance web scraping and automation.
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'

### mql(&lt;url&gt;, [options], [httpOptions])

<H4 titleize={false}>url</H4>

**required**<br/>

Type: <Type children='<string>'/>

The target URL for getting content.

<H4 titleize={false}>options</H4>

Type: <Type children='<object>'/>

You can pass any API Parameters from [Microlink API](/docs/api/getting-started/overview) as an option.

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql('https://kikobeats.com', {
  screenshot: true,
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

<H5 titleize={false}>cache</H5>

Type: <Type children='<object>'/>

> **Note**: this feature is only available for Node.js.

When you pass an object that follows Map API, you can enable serve response from your storage cache in order to save API if they have been previously done.

```js
const mql = require('@microlink/mql')
const cache = new Map()

let data

data = await mql('https://example.com', { cache })
console.log(data.response.fromCache)
// => false

data = await mql('https://example.com', { cache })
console.log(data.response.fromCache)
// => true
```

<Figcaption children='Caching feature is only available in the Node.js bundle.' />

Consider to pass [keyv](https://www.npmjs.com/package/keyv) for supporting [most popular databases storages](https://github.com/lukechilds/keyv#official-storage-adapters)

See [got#cache](https://www.npmjs.com/package/got#cache) to know more.

<H5 titleize={false}>retry</H5>

Type: <Type children='<number>'/><br/>
Default: <Type children='2'/>

Defines how many retries can be done before an API call is considered failed.

See [got#retry](https://www.npmjs.com/package/got#retry) to know more.

<H4 titleize={false}>httpOptions</H4>

Type: <Type children='<object>'/>

Any additional option will be passed to [got](https://ghub.io/got) or [ky](https://github.com/sindresorhus/ky) that are the internal HTTP clients used for Node.js and browser respectively.

That's necessary for some user workflow, e.g., passing [authentication](/docs/api/parameters/headers) headers without exposing credentials.

### mql.stream(&lt;url&gt;, [options], [httpOptions])

Returns a [Stream](https://nodejs.org/api/stream.html) instead of a Promise.

### mql.buffer(&lt;url&gt;, [options], [httpOptions])

Returns a [Buffer](https://nodejs.org/api/buffer.html) instead of a Promise.

