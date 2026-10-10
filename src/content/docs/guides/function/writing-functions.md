---
title: 'Function: Writing functions'
description: 'Write simple JavaScript functions that run remotely in a Node.js sandbox. Return any value, pass custom parameters, and use npm packages — no browser needed.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Your function runs remotely in a Node.js sandbox. The simplest function is just plain JavaScript — no browser, no page, no Puppeteer:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const result = await microlink.function('https://example.com', () => 40 + 2)

console.log(result.isFulfilled) // true
console.log(result.value)       // 42
```

Every example on this page assumes the `microlink` client above. See [function](/docs/sdk/methods/function) for the method reference.

<Figcaption>When your function does not reference <code>page</code>, no browser is started. This makes execution faster and cheaper.</Figcaption>

## Return any value

Functions can return strings, numbers, booleans, arrays, or plain objects:

```js
const result = await microlink.function('https://example.com', () => ({
  greeting: 'Hello',
  items: [1, 2, 3],
  nested: { works: true }
}))

console.log(result.value)
// { greeting: 'Hello', items: [1, 2, 3], nested: { works: true } }
```

The return value is always available at `result.value`. If the function throws, `result.isFulfilled` is `false` and `result.value` contains the error details instead.

## Custom parameters

Any extra option you include in the request is forwarded to the function as a named argument:

```js
const greet = ({ name, greeting }) => `${greeting}, ${name}!`

const result = await microlink.function('https://example.com', greet, {
  name: 'Kiko',
  greeting: 'Hello'
})

console.log(result.value) // 'Hello, Kiko!'
```

<Figcaption>This is the simplest way to make one function reusable across different requests without changing the function code.</Figcaption>

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://example.com',
  function: '({ greetings }) => greetings',
  greetings: 'hello world'
}} />

## The target URL

The function always receives `url`, the target of the request. You do not need `page` — or a browser — just to resolve paths against that origin:

```js
const result = await microlink.function(
  'https://example.com',
  ({ url }) => new URL('/robots.txt', url).href
)

console.log(result.value) // 'https://example.com/robots.txt'
```

`url` is the URL you requested, not the one a redirect settles on. Use `page.url()` when you need the settled one. See [url](/docs/api/parameters/function#url).

## Using npm packages

You can `require()` any npm package inside your function. Dependencies are detected automatically and installed on-the-fly:

```js
const result = await microlink.function('https://example.com', () => {
  const { kebabCase } = require('lodash')
  return kebabCase('Hello World')
})

console.log(result.value) // 'hello-world'
```

When your function contains a `require()` call, the runtime:

1. Parses your code to detect all dependency names.
2. Installs them into an isolated sandbox during the install phase.
3. Bundles everything during the build phase.
4. Caches the result so subsequent runs with the same dependencies skip installation.

You can see how long each step takes in `result.profiling.phases`. A high install value on the first run is normal — it drops to zero once cached.

### Pin a version

Append the version to the package name:

```js
const cheerio = require('cheerio@1.0.0')
```

When no version is specified, the latest version is installed.

### Security restrictions

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

The browser is restricted the same way. Your function drives its own page, and any page it opens, but it cannot reach the machine or other requests through Chrome DevTools Protocol:

- Local files are out of reach: `elementHandle.uploadFile()`, `file://` and `chrome://` navigation, and custom download paths are refused.
- `page.browser()` only lists the pages your function owns.
- Browser-wide commands such as tracing or creating browser contexts are not available. `browser.close()` ends your function's connection and nothing else.

A refused command rejects like any other Puppeteer error, so you can catch it. If it is left uncaught, the function settles with a `SandboxError` naming the command:

```json
{
  "isFulfilled": false,
  "value": {
    "name": "SandboxError",
    "message": "'DOM.setFileInputFiles' is not available to functions"
  }
}
```

## When to add page

Add `page` when you need the page for the URL you asked for. It is a [Puppeteer Page](https://pptr.dev/api/puppeteer.page), and the [page API](https://pptr.dev/api/puppeteer.page) is supported:

```js
const getTitle = ({ page }) => page.title()

const result = await microlink.function('https://example.com', getTitle)

console.log(result.value) // 'Example Domain'
```

Two methods extend it: [page.extract](/docs/api/parameters/function#pageextract) takes the same rules as [data](/docs/api/parameters/data), and [page.metadata](/docs/api/parameters/function#pagemetadata) returns the same normalized metadata as [meta](/docs/api/parameters/meta).

If you only need to compute a value, skip `page`. Your function will run faster.

See <Link href='/docs/guides/function/browser-interaction' children='Browser interaction' /> for Puppeteer helpers, execution contexts, and browser automation.

## See also

- <Link href='/docs/guides/function/browser-interaction' children='Browser interaction' /> — Puppeteer helpers and browser automation.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand execution phases and optimization.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
