---
title: 'function'
--- 

Type: <TypeContainer><Type children='<string>'/></TypeContainer>

It runs JavaScript code with runtime access to a headless browser.

<MultiCodeEditor 
  languages={mqlCode('https://microlink.io', {
    function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  }, { output: 'data.function' })}
/>

The function will receive any query parameter provided, plus:

- `html`: The target [url](/docs/api/parameters/url) HTML markup.
- `page`: The [puppeteer#page](https://pptr.dev/api/puppeteer.page/) to interact with the headless browser.
- `response`: The [puppeteer#response](https://pptr.dev/api/puppeteer.httpresponse/) as result of the implicit [page.goto](https://pptr.dev/api/puppeteer.page.goto/).

## Compression

Since the function body can be large, you can compress it:

```js
const { compressToURI } = require('lz-ts') 
const mql = require('@microlink/mql')

const code = ({ page }) => page.evaluate("jQuery.fn.jquery")

const { status, data } = await mql('https://microlink.io', {
  function: `lz#${compressToURI(code.toString())}`,
  meta: false,
  scripts: 'https://code.jquery.com/jquery-3.5.0.min.js'
})

mql.render(data.function)
```

<Figcaption>You should to prefix the compressed data with the compressor alias.</Figcaption>

The following compression algorithms are supported:

- brotli (br)
- gzip (gz)
- lz-string (lz)

Read [how to compress](/blog/compress) to know more.

## NPM packages

Require NPM packages on runtime is supported.

```js
const mql = require('@microlink/mql')

const code = ({ statusCode, response }) => {
  const { result } = require('lodash')
  return result(
    response,
    statusCode ? 'status' : 'statusText'
  )
}

const ping = (url, props) => 
  mql(url, { function: code.toString(), meta: false, ...props })
  .then(({ data }) => data.function)

// try passing `statusCode: false`
await ping('https://example.com', { statusCode: true })
```

The list of allowed NPM packages are:

- [@aws-sdk/client-s3](https://npm.im/@aws-sdk/client-s3)
- [@mozilla/readability](https://npm.im/@mozilla/readability)
- [cheerio](https://npm.im/cheerio)
- [extract-email-address](https://npm.im/extract-email-address)
- [got](https://npm.im/got)
- [ioredis](https://npm.im/ioredis)
- [jsdom](https://npm.im/jsdom)
- [lodash](https://npm.im/lodash)
- [metascraper](https://npm.im/metascraper)
- [p-reflect](https://npm.im/p-reflect)
- [p-retry](https://npm.im/p-retry)
- [p-timeout](https://npm.im/p-timeout)
- [path](https://nodejs.org/api/path.html)
- [url](https://nodejs.org/api/url.html)
- [youtube-dl-exec](https://npm.im/youtube-dl-exec)

If you want to request a npm package, please feel free to [reach us](mailto:hello@microlink.io).
