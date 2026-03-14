---
title: 'Custom functions'
description: 'Run arbitrary JavaScript inside a headless browser with full Puppeteer access. Use custom functions when none of the built-in parameters cover your workflow.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The `function` parameter lets you run JavaScript code inside the headless browser that Microlink uses to render pages. This gives you full access to the browser page via Puppeteer, allowing you to do things that no combination of built-in parameters can achieve.

## Your first custom function

Pass a JavaScript function as a string. It receives `page` (a Puppeteer [Page](https://pptr.dev/api/puppeteer.page) object) and `html` (the page markup):

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ page }) => page.title()',
  meta: false
}} />

<Figcaption>The function runs inside the headless browser after the page loads. The return value appears under <code>data.function</code>.</Figcaption>

The response includes the returned value:

```json
{
  "status": "success",
  "data": {
    "function": "Example Domain"
  }
}
```

## What the function receives

Your function is called with an object containing:

| Property | Type | Description |
|----------|------|-------------|
| `page` | [Page](https://pptr.dev/api/puppeteer.page) | The Puppeteer page object — full browser control |
| `response` | [HTTPResponse](https://pptr.dev/api/puppeteer.httpresponse) | The result of the implicit `page.goto` |
| `html` | `string` | The target URL's HTML markup |

Plus any query parameter you include in the request.

## Evaluate code in the browser context

The most common pattern is using `page.evaluate` to run code inside the page's JavaScript context:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://news.ycombinator.com',
  function: '({ page }) => page.evaluate(() => document.querySelectorAll(".titleline > a").length)',
  meta: false
}} />

<Figcaption>Count the number of story links on the page. <code>page.evaluate</code> runs inside the browser, not in Node.js.</Figcaption>

## Return structured data

Functions can return objects, arrays, or any JSON-serializable value:

<MultiCodeEditorInteractive height={280} mqlCode={{
  url: 'https://news.ycombinator.com',
  function: `({ page }) => page.evaluate(() => {
  const stories = [...document.querySelectorAll('.athing')]
  return stories.slice(0, 3).map(el => ({
    title: el.querySelector('.titleline > a')?.textContent,
    href: el.querySelector('.titleline > a')?.href
  }))
})`,
  meta: false
}} />

<Figcaption>Extract the first 3 stories as structured objects.</Figcaption>

## Inject scripts before running

Use `scripts` to load libraries before your function runs:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://microlink.io',
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
  scripts: ['https://code.jquery.com/jquery-3.5.0.min.js'],
  meta: false
}} />

<Figcaption>Load jQuery into the page, then use it inside the function.</Figcaption>

## Use npm packages

You can `require()` a curated set of npm packages at runtime:

```js
const mql = require('@microlink/mql')

const code = ({ response }) => {
  const { result } = require('lodash')
  return result(response, 'status')
}

const { data } = await mql('https://example.com', {
  function: code.toString(),
  meta: false
})
```

Supported packages include `cheerio`, `lodash`, `got`, `jsdom`, `@mozilla/readability`, `ioredis`, `@aws-sdk/client-s3`, and others. See the <Link href='/docs/api/parameters/function' children='function reference' /> for the full list.

## Compress large functions

When the function body is large, compress it to keep the URL short:

```js
const { compressToURI } = require('lz-ts')

const code = ({ page }) => page.evaluate(() => {
  // ... large extraction logic ...
})

const { data } = await mql('https://example.com', {
  function: `lz#${compressToURI(code.toString())}`,
  meta: false
})
```

Prefix the compressed string with the algorithm alias: `lz#` (lz-string), `br#` (brotli), or `gz#` (gzip).

## Pass custom parameters

Any extra query parameter you include in the request is passed to your function:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://example.com',
  function: '({ page, selector }) => page.evaluate((sel) => document.querySelector(sel)?.textContent, selector)',
  selector: 'h1',
  meta: false
}} />

<Figcaption>The <code>selector</code> parameter is forwarded to the function as a property.</Figcaption>

## When to use custom functions

Use `function` when:

- You need Puppeteer-level browser control (navigation, clicks, form fills, multi-step flows).
- The data you need requires JavaScript execution or DOM manipulation that `data` rules cannot express.
- You want to combine extraction with external npm packages.
- You need to interact with APIs or perform computations inside the browser context.

For simpler extractions, prefer `data` rules — they are easier to write, cache better, and are more maintainable. See the <Link href='/docs/guides/data-extraction' children='data extraction guide' />.

## Caching and performance

Custom functions follow the same <Link href='/docs/guides/common/caching' children='caching patterns' /> as all other workflows. The key speedup is `meta: false` since most function workflows do not need normalized metadata.

## Error handling

- `EINVALFUNCTION` — the function has a JavaScript syntax error. Check brackets, quotes, and arrow function formatting.
- `EINVALEVAL` — the function executed but threw a runtime error. Check for undefined variables, incorrect DOM queries, or unsupported operations.

See the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> and <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for other errors.
