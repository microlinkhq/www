---
title: 'Usage'
---

For using MQL, you need to provide at least a target [url](/docs/api/parameters/url).

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql('https://microlink.io')
```

It will return an `object` with the following properties:
  
  - `status`: The [status](/docs/api/basics/format#status) associated with the response.
  - `data`: The [data](/docs/api/basics/format#data) response from the API. 
  - `response`: The Node.js response object.

If something does not go as expected (that means API returns a [status](/docs/api/basics/format#status) different to `success`) it will throw a `MicrolinkError`.

```js
const mql = require('@microlink/mql')

// The library exposes `MicrolinkError` constructor
const { MicrolinkError } = mql

;(async () => {
  try {
    mql('https://kikobeats.com', {
      screenshot: true,
      waitFor: 30000
    })
  } catch (error) {
    console.log(error instanceof MicrolinkError) // => true
    console.log(error.name) // => RequestError
    console.log(error.hostname) // => api.microlink.io
    console.log(error.status) // => fail
    console.log(error.url) // => 'https://api.microlink.io/?url=https%3A%2F%2Fkikobeats.com&screenshot=true&video=true&waitFor=40000&force=true'
    console.log(error.code) // => EFAILED
    console.log(error.message) // => EFAILED, Request timed out
    console.log(error.statusCode) // => 500
  }
})()
```

<Figcaption children="A `MicrolinkError` always has an associated `status`, `message` and `code`." />

## API

```js

const mql = require('@microlink/mql')

const { status, data,response } = mql(url, [options])
```

### url

**Required**<br/>

Type: `string`

The target URL for getting content.

### options

Type: `object`<br/>

You can pass any API Parameters from [Microlink API](/docs/api/getting-started/overview) as an option.

```js
const { status, data, response } = await mql('https://kikobeats.com', {
  screenshot: 'iPad',
  palette: true,
  waitFor: 3000
})

console.log(`My screenshot at ${data.screenshot.url}`)
```

<br/>

Additionally, you can configure:

#### apiKey

Type: `string`

The API Key used for [authenticating](/docs/api/basics/authentication) your requests as `x-api-key` header.

When the `apiKey` is provided, the `pro.microlink.io` endpoint will used.

#### cache

Type: `object`

When you pass an object that follows Map API, you can enable serve response from your storage cache in order to save API if they have been previously done.

```js
const mql = require('@microlink/mql')
const cache = new Map()

;(async () => {
  let data

  data = await mql('https://kikobeats.com', { cache })
  console.log(data.response.fromCache)
  // => false

  data = await mql('https://kikobeats.com', { cache })
  console.log(data.response.fromCache)
  // => true
})()
```

<Figcaption children='Caching feature is only available in the Node.js bundle.' />

Consider to pass [keyv](https://www.npmjs.com/package/keyv) for supporting [most popular databases storages](https://github.com/lukechilds/keyv#official-storage-adapters)

See [got#cache](https://www.npmjs.com/package/got#cache) to know more.

#### retry

Type: `number`<br/>
Default: `3`

Defines how many retries can be done before an API call is considered failed.

See [got#retry](https://www.npmjs.com/package/got#retry) to know more.

#### timeout

Type: `number`<br/>
Default: `30000`

Defines the maximum milliseconds to wait until an API call is considered failed.

See [got#timeout](https://www.npmjs.com/package/got#timeout) to know more.
