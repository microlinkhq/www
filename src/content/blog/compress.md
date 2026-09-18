---
title: 'Compress Microlink functions with brotli, gzip, or lz-string'
subtitle: 'Three compression formats for the function parameter'
description: 'Learn how to use the `function` parameter to execute remote JavaScript code. Optimize your API requests by compressing functions using Brotli, Gzip, or lz-string.'
authors:
  - kiko
date: '2022-09-03'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

The [function](/docs/api/parameters/function) query parameter accepts its code compressed with brotli, gzip, or lz-string, not only as plain text. You prefix the compressed body with `br#`, `gz#`, or `lz#`, and we decompress it on our side before running it.

## Code that runs in a remote browser

The `function` parameter runs your code at request time, with access to a remote headless browser. This example injects jQuery from `code.jquery.com` through `scripts`, then reads `jQuery.fn.jquery` from the page with `page.evaluate`:

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://microlink.io',
    function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
    meta: false,
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  }}
/>

The function travels inside the request, as the value of a query parameter. You can send it as plain text, or compress it first with any of the three algorithms below. Each example sends the same function, `({ page }) => page.evaluate("jQuery.fn.jquery")`, and prints the result with `mql.render(data.function)`.

## brotli: good ratio, built into Node.js

[brotli](https://en.wikipedia.org/wiki/Brotli) is a modern, general-purpose compression algorithm with a good compression ratio. Node.js ships it in `zlib`, so the helper is `zlib.brotliCompress` wrapped with `promisify`, and the output buffer is encoded as `base64url` so it is safe inside a URL:

```js
const mql = require('@microlink/mql')
const { promisify } = require('util')
const zlib = require('zlib')

const brotli = promisify(zlib.brotliCompress)

const toBrotli = async code => {
  const buffer = await brotli(code)
  return buffer.toString('base64url')
}

const code = '({ page }) => page.evaluate("jQuery.fn.jquery")'

const { status, data } = await mql('https://microlink.io', {
  function: `br#${await toBrotli(code)}`,
  meta: false,
  scripts: 'https://code.jquery.com/jquery-3.5.0.min.js'
})

mql.render(data.function)
```

<Figcaption>brotli has a good compression ratio & speed.</Figcaption>

## lz-string: small enough for the browser

[lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) is designed to compress text efficiently. The example uses `compressToURI` from `lz-ts`, which returns a string you can put in a URL directly, with no extra encoding step:

```js
const { compressToURI } = require('lz-ts')
const mql = require('@microlink/mql')

const code = compressToURI('({ page }) => page.evaluate("jQuery.fn.jquery")')

const { status, data } = await mql('https://microlink.io', {
  function: `lz#${code}`,
  meta: false,
  scripts: 'https://code.jquery.com/jquery-3.5.0.min.js'
})

mql.render(data.function)
```

<Figcaption>lz-string is lightweight enough to be used for client-side apps.</Figcaption>

## gzip: the widely supported predecessor

gzip is the predecessor of brotli and it's widely supported. The code is the brotli example with `zlib.gzip` in place of `zlib.brotliCompress`, and `gz#` in place of `br#`:

```js
const mql = require('@microlink/mql')
const { promisify } = require('util')
const zlib = require('zlib')

const gzip = promisify(zlib.gzip)

const toGzip = async code => {
  const buffer = await gzip(code)
  return buffer.toString('base64url')
}

const code = '({ page }) => page.evaluate("jQuery.fn.jquery")'

const { status, data } = await mql('https://microlink.io', {
  function: `gz#${await toGzip(code)}`,
  meta: false,
  scripts: 'https://code.jquery.com/jquery-3.5.0.min.js'
})

mql.render(data.function)
```

To compress with gzip in the browser instead of Node.js, use the [Compression Streams API](https://developer.chrome.com/blog/compression-streams-api/). `CompressionStream` supports gzip natively, so you can build the `gz#` value client-side without adding a dependency.
