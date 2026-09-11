---
title: 'function'
description: 'Execute your own JavaScript against a live page with the Microlink SDK: full Puppeteer access, npm packages, named arguments, profiling, and automatic compression, with no browser fleet to manage.'
---

Execute your own JavaScript remotely and get the value back. The function runs in a sandboxed Node.js runtime on Microlink's side; code that never touches `page` runs faster and cheaper:

```js
const { value } = await microlink.function('https://example.com', () => 40 + 2)

console.log(value) // 42
```

`run` is an alias of `function`, so `microlink.run(url, code)` is the same call.

## Browser access

Ask for `page` and Microlink starts a headless browser, navigates to the URL, and hands you the full [Puppeteer Page](https://pptr.dev/api/puppeteer.page) object:

```js
const { value } = await microlink.function('https://example.com', async ({ page }) => {
  await page.waitForSelector('h1')
  return page.$eval('h1', el => el.textContent)
})
```

Besides `page`, the function receives `response`, the Puppeteer response of the implicit navigation, and `headers`, the request headers used to fetch the target URL. Any npm package can be required from inside the function; dependencies are detected, installed on the fly, and cached. See [browser interaction](/docs/guides/function/browser-interaction) and [writing functions](/docs/guides/function/writing-functions) for the patterns.

## Result

It resolves to the [function response](/docs/api/parameters/function#response) object:

- **`isFulfilled`** — `true` when the function completed without throwing.
- **`value`** — the return value on success, or `{ name, message }` describing the error on failure.
- **`profiling`** — execution metrics: phase durations, CPU time, memory breakdown, and code size.
- **`logging`** — the console output captured from the function runtime.

A throwing function does not reject the promise; check `isFulfilled` instead:

```js
const result = await microlink.function('https://example.com', () => {
  throw new Error('boom')
})

console.log(result.isFulfilled) // false
console.log(result.value.name, result.value.message) // 'Error' 'boom'
```

## Options

The third argument takes the [shared options](/docs/sdk/getting-started/options), so [scripts](/docs/api/parameters/scripts), [click](/docs/api/parameters/click), [waitForSelector](/docs/api/parameters/waitForSelector), or [headers](/docs/api/parameters/headers) can prepare the page before your code runs:

```js
const { value } = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.evaluate('jQuery.fn.jquery'),
  { scripts: 'https://code.jquery.com/jquery-3.5.0.min.js' }
)
```

Normalized metadata is skipped by default (`meta: false`) so the request only pays for the function; pass `meta: true` to get it back in the API response.

### Custom parameters

Any option that isn't an API parameter is forwarded to the function as a named argument, which makes one function reusable across requests without changing its code:

```js
const { value } = await microlink.function(
  'https://example.com',
  ({ page, selector }) => page.$eval(selector, el => el.textContent),
  { selector: 'h1' }
)
```

## Compression

Large function bodies are compressed before they're sent, so the free plan's code size limit applies to the compressed payload. The SDK picks the compressor for the runtime — brotli in Node.js, lz-string in browsers — and prefixes the payload accordingly; nothing changes in the call. The code can also be passed as a string of JavaScript source.

## Limits

The free plan allows 10 seconds, 32 MB of heap, 1024 bytes of code, one in-flight function per IP, and same-origin outgoing requests only; the pro plan lifts those to 60 seconds, 64 MB, unlimited code size and concurrency, and unrestricted requests. Exceeding a limit returns `isFulfilled: false` with a plan-aware error such as `TimeoutError`; see [plan limits](/docs/api/parameters/function#plan-limits) and [troubleshooting](/docs/guides/function/troubleshooting).

See the [function guide](/docs/guides/function) for writing patterns, package dependencies, and profiling.
