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

Every example on this page assumes the `microlink` client above. See [`function`](/docs/sdk/methods/function) for the method reference.

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
  greetings: 'hello world',
  meta: false
}} />

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

## When to add page

When your function references `page`, Microlink starts a headless browser and navigates to the URL before calling your function. This gives you full Puppeteer access but takes more time:

```js
const getTitle = ({ page }) => page.title()

const result = await microlink.function('https://example.com', getTitle)

console.log(result.value) // 'Example Domain'
```

If you only need to compute a value or call an external API, skip `page` entirely — your function will run faster.

See <Link href='/docs/guides/function/browser-interaction' children='Browser interaction' /> for Puppeteer helpers, execution contexts, and browser automation.

## See also

- <Link href='/docs/guides/function/browser-interaction' children='Browser interaction' /> — Puppeteer helpers and browser automation.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand execution phases and optimization.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
