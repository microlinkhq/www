---
title: 'Function: NPM packages'
description: 'Use any npm dependency inside your function. Dependencies are detected automatically, installed on-the-fly, and cached for subsequent runs.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link'

The function runtime can `require()` any npm package. Dependencies are detected automatically from your code and installed on-the-fly during execution.

```js
const microlink = require('@microlink/function')

const parse = ({ page }) =>
  page.content().then(html => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
    return {
      title: $('h1').text(),
      links: $('a').map((_, el) => $(el).attr('href')).get()
    }
  })

const fn = microlink(parse)
const result = await fn('https://example.com')
console.log(result.value)
```

<Figcaption>Dependencies are parsed from your function code, installed in a sandbox, and cached for subsequent runs.</Figcaption>

## How it works

When your function contains a `require()` call, the runtime:

1. Parses your code to detect all dependency names.
2. Installs them into an isolated sandbox during the install phase.
3. Bundles everything during the build phase.
4. Caches the result so subsequent runs with the same dependencies skip installation.

You can see how long each step takes in `result.profiling.phases`. A high install value on the first run is normal — it drops to zero once cached.

## Specify a version

You can pin a specific version by appending it to the package name:

```js
const cheerio = require('cheerio@1.0.0')
```

When no version is specified, the latest version is installed.

## Security restrictions

The runtime restricts certain system capabilities for security. Operations such as spawning child processes or writing to the filesystem outside the sandbox are not permitted. If a package tries to use a restricted capability, the function will return an error:

```json
{
  "isFulfilled": false,
  "value": {
    "name": "Error",
    "code": "ERR_ACCESS_DENIED",
    "permission": "ChildProcess",
    "message": "Access to this API has been restricted."
  }
}
```

## require() vs page.evaluate

Remember that `require()` only works in the outer function body, not inside `page.evaluate(...)`. The outer function runs in Node.js; `page.evaluate` runs in the browser page context.

```js
// ✓ correct — require in the outer function
const fn = ({ page }) => {
  const cheerio = require('cheerio')
  return page.content().then(html => cheerio.load(html)('h1').text())
}

// ✗ wrong — require inside page.evaluate will fail
const fn = ({ page }) =>
  page.evaluate(() => {
    const cheerio = require('cheerio') // ReferenceError
    return cheerio.load(document.body.innerHTML)('h1').text()
  })
```

## See also

- <Link href='/docs/guides/function/page-interaction' children='Page interaction' /> — Puppeteer helpers and execution contexts.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand install times and optimization.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape and compression.
