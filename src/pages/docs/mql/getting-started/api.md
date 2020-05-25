---
title: 'API'
---

### mql(&lt;url&gt;, [options])

#### url

**required**<br/>

Type: <Type children='<string>'/>

The target URL for getting content.

#### options

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

##### apiKey

Type: <Type children='<string>'/>

The API Key used for [authenticating](/docs/api/basics/authentication) your requests as `x-api-key` header.

When the `apiKey` is provided, the [pro.microlink.io](https://pro.microlink.io/) as [endpoint](/docs/api/basics/endpoint) will be used.

##### cache

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

##### retry

Type: <Type children='<number>'/><br/>
Default: <Type children='2'/>

Defines how many retries can be done before an API call is considered failed.

See [got#retry](https://www.npmjs.com/package/got#retry) to know more.

### mql.stream(&lt;url&gt;, [options])

Returns a [Stream](https://nodejs.org/api/stream.html) instead of a Promise.

### mql.buffer(&lt;url&gt;, [options])

Returns a [Buffer](https://nodejs.org/api/buffer.html) instead of a Promise.

