---
title: 'Microlink Function: How to compress'
date: '2022-09-03'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'

The query parameter [function](/docs/api/parameters/function) allows you dynamic code execution with remote headless browser access on runtime:

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://microlink.io', {
    function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
    meta: false,
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  })}
/>

The function body can be pass in plain text, but also multiple compression algorithms are supported.

## brotli

[brotli](https://en.wikipedia.org/wiki/Brotli) is a modern and general purpose compression algorithm with a well compression ratio.

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

## lz-string

[lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) is designed to be efficient for compressing text.

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

## gzip

gzip is the predecessor of brotli and it's widely supported.

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

It's possible to compress using gzip directly in the browser, using [Compression Streams API](https://developer.chrome.com/blog/compression-streams-api/).
