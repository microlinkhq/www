---
title: 'function'
description: 'Execute custom JavaScript code inside a headless browser to perform advanced scraping or automation tasks. Gain full control over the page lifecycle with Puppeteer access.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/>

It runs JavaScript code with runtime access to a headless browser.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://microlink.io',
    function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  }}
/>

The function will receive any extra query parameter provided, plus:

### page

The full [puppeteer#page](https://pptr.dev/api/puppeteer.page) object. When the function references `page`, Microlink navigates to the URL in a browser before calling your function. Any Puppeteer page method is available:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ page }) => page.title()',
  meta: false
}} />

<Figcaption>Get the document title.</Figcaption>

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: `({ page }) => page.$eval('h1', el => el.textContent)`,
  meta: false
}} />

<Figcaption>Extract text from a DOM element.</Figcaption>

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://example.com',
  function: `({ page }) => page.$$eval('a', links => links.map(a => a.href))`,
  meta: false
}} />

<Figcaption>Collect all links on the page.</Figcaption>

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://example.com',
  function: `({ page }) => page.evaluate(() => ({
  viewport: { width: window.innerWidth, height: window.innerHeight },
  cookies: document.cookie.length,
  resources: performance.getEntriesByType('resource').length
}))`,
  meta: false
}} />

<Figcaption>Run arbitrary JavaScript in the browser page context via <code>page.evaluate</code>.</Figcaption>

### response

The [puppeteer#response](https://pptr.dev/api/puppeteer.httpresponse) as result of the implicit [page.goto](https://pptr.dev/api/puppeteer.page.goto). Only available when the function uses `page`:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://edge-ping.vercel.app',
  function: '({ page, response }) => response.status()',
  meta: false
}} />

### headers

The request headers used to fetch the target URL:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ headers }) => headers["user-agent"]',
  meta: false
}} />

### Custom parameters

Any extra query parameter is forwarded to the function:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://example.com',
  function: '({ greetings }) => greetings',
  greetings: 'hello world',
  meta: false
}} />

## Response

The result is wrapped under `data.function`:

```json
{
  "status": "success",
  "data": {
    "function": {
      "isFulfilled": true,
      "value": "3.5.0",
      "profiling": {
        "phases": { "install": 0, "build": 120, "spawn": 45, "run": 890, "total": 1055 },
        "cpu": 234,
        "memory": 8,
        "size": 156
      },
      "logging": {}
    }
  }
}
```

| Field         | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `isFulfilled` | `true` when the function completed without errors                                               |
| `value`       | The return value on success, or `{ name, message }` on failure                                  |
| `profiling`   | Execution metrics: phase durations (ms), peak CPU time (ms), memory (MB), and code size (bytes) |
| `logging`     | Captured console output from the function runtime                                               |

The profiling phases are:

| Phase     | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `install` | Time spent installing npm dependencies detected in your code |
| `build`   | Time spent bundling the function code                        |
| `spawn`   | Time spent starting the isolated runtime process             |
| `run`     | Time spent executing the function itself                     |
| `total`   | Wall-clock time from start to finish                         |

## Plan limits

The function parameter is available on both free and pro plans with different resource limits:

|                      | Free       | Pro              |
| -------------------- | ---------- | ---------------- |
| Timeout              | 5 seconds  | Up to 28 seconds |
| Memory               | 16 MB      | 32 MB            |
| Code size            | 1024 bytes | Unlimited        |
| Concurrency          | 1 per IP   | Unlimited        |
| Outgoing requests    | Same-origin only | Unrestricted |

When a limit is exceeded, the function returns `isFulfilled: false` with a descriptive error instead of failing the entire request:

```json
{
  "data": {
    "function": {
      "isFulfilled": false,
      "value": {
        "name": "TimeoutError",
        "message": "Function exceeded the 5s free plan timeout. Upgrade to pro for up to 28s."
      },
      "profiling": {},
      "logging": {}
    }
  }
}
```

The resource error types are:

| Error                  | Trigger                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `TimeoutError`         | Function wall-clock time exceeded the plan limit                     |
| `CpuTimeError`         | Function CPU time exceeded the plan limit                            |
| `MemoryError`          | Function memory usage exceeded the plan limit                        |
| `CodeSizeError`        | Function code exceeds the 1024 bytes free plan limit                 |
| `ConcurrencyError`     | Too many concurrent function executions for the free plan (1 per IP) |
| `OutgoingRequestError` | Function made a cross-origin network request on the free plan        |

Each error message is plan-aware and tells you the exact limit that was hit.

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

<Figcaption>Prefix the compressed data with the compressor alias.</Figcaption>

The following compression algorithms are supported:

- brotli (`br`)
- gzip (`gz`)
- lz-string (`lz`)

If you use the [@microlink/function](https://www.npmjs.com/package/@microlink/function) library, compression is handled automatically.

Read [how to compress](/blog/compress) to know more.

## NPM packages

The function runtime supports `require()` for any npm package. Dependencies are detected automatically from your code and installed on-the-fly during the install phase.

```js
const mql = require('@microlink/mql')

const code = () => {
  const cheerio = require('cheerio')
  const $ = cheerio.load('<h1>Hello world</h1>')
  return $('h1').text()
}

const { data } = await mql('https://example.com', {
  function: code.toString(),
  meta: false
})
```

<Figcaption>Dependencies are parsed from your function code, installed in a sandbox, and cached for subsequent runs.</Figcaption>

The runtime restricts certain system capabilities for security. Operations such as spawning child processes or writing to the filesystem outside the sandbox are not permitted.

## Function constructor

The most convenient way to use `function` is through the [@microlink/function](https://www.npmjs.com/package/@microlink/function) library:

```js
const microlink = require('@microlink/function')

const getTitle = microlink(({ page }) => page.title())

const result = await getTitle('https://example.com')
console.log(result.value) // 'Example Domain'
```

It lets you write normal JavaScript functions instead of managing string serialization and compression yourself:

See the [function guide](/docs/guides/function) for practical examples covering page interaction, npm packages, error handling, and profiling.
