---
title: 'Function'
description: "Run custom JavaScript remotely inside Microlink's headless browser, return exactly the result you need, and know when to reach for functions over simpler workflows."
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The `function` parameter is Microlink's escape hatch. When `data`, `metadata`, `screenshot`, or `pdf` gets you close but not all the way, you can send JavaScript that Microlink executes remotely inside the same headless Chromium request.

You keep the no-infrastructure model: no Lambda bundle, no browser fleet, and no server to maintain. Microlink executes the code in a safe remote runtime with Puppeteer access and wraps the result under `data.function`, with the resolved value at `data.function.value`.

## Your first function

Pass a JavaScript function as a string. This example uses a public MDN page and the simplest reliable Puppeteer helper, `page.title()`:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: '({ page }) => page.title()',
  meta: false
}} />

<Figcaption>The function runs remotely after the page loads. On success, Microlink returns the result at <code>data.function.value</code>. The examples in this guide use fully public pages and <code>meta: false</code> to keep them friendly to the free plan.</Figcaption>

The response contains the returned value:

```json
{
  "status": "success",
  "data": {
    "function": {
      "isFulfilled": true,
      "value": "Document: title property - Web APIs | MDN"
    }
  }
}
```

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. You can still call the API from any HTTP client, but MQL is usually the easiest option once your function needs serialization or compression.

If you prefer a higher-level wrapper, [`@microlink/function`](https://www.npmjs.com/package/@microlink/function) decorates a local function and sends it to the same remote runtime described in this guide. It is useful when you want to author reusable "serverless-style" helpers instead of managing `code.toString()` yourself.

## How function execution works

Every function request follows the same flow:

1. Microlink opens the target `url` in headless Chromium.
2. The request can also include page-preparation parameters such as `scripts`, `modules`, `click`, or `waitForSelector`.
3. Microlink calls your function with `page`, `response`, `html`, and any extra parameters you passed in the request.
4. Whatever your function returns or resolves to is wrapped into `data.function`, and the actual result is available at `data.function.value`.

Because `function` is just another Microlink parameter, you can also combine it with other workflows in the same request, such as `screenshot: true` or `pdf: true`, when you need custom page preparation before generating the final output.

## Choose the lightest tool

Use `function` when the built-in parameters stop being expressive enough, not as the default for every workflow.

| If you need | Best option | Why |
|-------------|-------------|-----|
| Simple field extraction from the DOM | `data` | Declarative rules are shorter, easier to maintain, and easier to reuse |
| Inject CSS or JavaScript before another workflow | `styles`, `modules`, or `scripts` | Lighter than full browser automation |
| Click, wait, compute, reshape, or orchestrate custom logic | `function` | You get Puppeteer access plus a curated `require()` allowlist |

For simpler extraction flows, start with <Link href='/docs/guides/data-extraction' children='data extraction' /> and only escalate to `function` when the declarative approach becomes limiting.

## What your function receives

Your function is called with an object containing:

| Property | Type | Description |
|----------|------|-------------|
| `page` | [Page](https://pptr.dev/api/puppeteer.page) | Full Puppeteer access for clicks, waits, evaluation, navigation, and page inspection |
| `response` | [HTTPResponse](https://pptr.dev/api/puppeteer.httpresponse) | The response returned by the implicit navigation |
| `html` | `string` | Page markup when available. If you disable metadata and still need HTML, prefer `page.content()` |
| any extra parameter | depends on what you pass | Custom inputs such as selectors, flags, thresholds, or field names |

That last point is important: any extra parameter you include in the request is forwarded to the function as a property on the first argument.

In practice, most first implementations should start with `page` helpers such as `page.title()`, `page.$eval()`, or `page.$$eval()`. They are easier to read and easier to debug than reaching for a large `page.evaluate(...)` block immediately.

## Pass your own parameters

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: `({ page, label }) =>
  page.title().then(title => ({ label, title }))`,
  label: 'Current page title',
  meta: false
}} />

<Figcaption>The custom <code>label</code> parameter is forwarded into the function. This is the simplest way to make one function reusable across different requests.</Figcaption>

## Two execution contexts

There are two different places your code can run, and it helps to keep them separate in your head:

| Code runs in | Good for | Can access |
|--------------|----------|------------|
| The outer `function` body | Orchestration, Puppeteer calls, `require()`, and response shaping | `page`, `response`, forwarded params, and allowed npm packages |
| `page.evaluate(...)` | Reading or computing values from the live DOM when page helpers are not enough | `window`, `document`, `performance`, and page state |

A good rule of thumb: start with Puppeteer helpers such as `page.title()`, `page.$eval()`, and `page.$$eval()`. Reach for `page.evaluate(...)` only when the logic truly belongs inside the page context. Do not rely on `require()` inside `page.evaluate`.

## Return structured data

Functions can return strings, numbers, booleans, arrays, or plain objects, so they are a good fit when the result shape is unique to your application:

<MultiCodeEditorInteractive height={300} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: `({ page }) =>
  page.title().then(title => ({
    title,
    titleLength: title.length,
    words: title.split(/\\s+/)
  }))`,
  meta: false
}} />

<Figcaption>Returning an object is often more useful than returning a single string. Here the function shapes the page title into a small JSON payload your application can consume directly.</Figcaption>

## When you really need page.evaluate

Use `page.evaluate(...)` when the information only exists inside the live browser page:

```js
const { data } = await mql('https://developer.mozilla.org/en-US/docs/Web/API/Document/title', {
  function: `({ page }) => page.evaluate(() => ({
    heading: document.querySelector('main h1')?.textContent?.trim(),
    codeExamples: document.querySelectorAll('pre').length
  }))`,
  meta: false
})

console.log(data.function.value)
```

That pattern is powerful, but it is also more fragile than `page.title()` or `page.$eval()`. Start with the page helpers first, then move into `page.evaluate(...)` when you need direct access to `document`, `window`, or browser-only APIs.

## Use npm packages

The function runtime can `require()` a curated allowlist of packages. That makes it useful for parsing, retries, HTML processing, HTTP calls, and response shaping without running your own serverless infrastructure.

<MultiCodeEditorInteractive height={310} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: `({ page }) =>
  page.title().then(title => {
    const { words, kebabCase } = require('lodash')
    return {
      title,
      words: words(title),
      slug: kebabCase(title)
    }
  })`,
  meta: false
}} />

<Figcaption>The outer function can use allowed packages such as <code>lodash</code>. Here it turns the page title into both an array of words and a slug-like string.</Figcaption>

Common choices include `cheerio`, `lodash`, `got`, `jsdom`, `@mozilla/readability`, `ioredis`, and `metascraper`. See the <Link href='/docs/api/parameters/function' children='function reference' /> for the documented allowlist.

## Skip metadata for faster runs

Most function-only workflows do not need normalized metadata such as title, description, image, or logo. In those cases, set `meta: false`:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: '({ page }) => page.title()',
  meta: false
}} />

<Figcaption>Disabling metadata is usually the biggest speedup for function requests. If you still need the rendered markup, call <code>page.content()</code> inside the function instead of enabling metadata just to read the page HTML.</Figcaption>

## Compress large functions

When the function body gets too large for a comfortable query string, compress it before sending it:

```js
const { compressToURI } = require('lz-ts')
const mql = require('@microlink/mql')

const code = ({ page }) => page.title()

const { data } = await mql('https://developer.mozilla.org/en-US/docs/Web/API/Document/title', {
  function: `lz#${compressToURI(code.toString())}`,
  meta: false
})

console.log(data.function.value)
```

Prefix the compressed payload with the algorithm alias:

- `lz#` for lz-string
- `br#` for brotli
- `gz#` for gzip

## Free tier, API key, and local testing

The free endpoint is enough to prototype function workflows and run the examples in this guide. If the same request also needs parameters such as `headers`, `proxy`, `ttl`, or `staleTtl`, those controls require a <ProBadge /> plan.

To authenticate, pass your API key as `x-api-key`:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: '({ page }) => page.title()',
  meta: false,
  apiKey: 'YOUR_API_TOKEN'
}} />

<Figcaption>You can enter your API key in interactive examples by clicking the key icon in the terminal toolbar.</Figcaption>

For local development, test the same function logic with [@microlink/local](https://github.com/microlinkhq/local). It is useful when you want to iterate on browser automation locally before sending the request to the hosted API.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for the exact endpoint and quota details.

## Common failure modes

These are the two function-specific errors you will hit most often:

- `EINVALFUNCTION` — the function string has invalid JavaScript syntax. Check quotes, brackets, template strings, and arrow function formatting.
- `EINVALEVAL` — the function executed but threw at runtime. Check undefined variables, DOM queries that return `null`, or mistakes inside `page.evaluate`.

If a function request starts getting slow or flaky:

1. Reduce it to a trivial check such as `({ page }) => page.title()`.
2. Set `meta: false` unless metadata is part of the requirement.
3. Replace fixed waits with `waitForSelector` whenever possible.
4. Move DOM-only code into `page.evaluate`, and keep orchestration in the outer function.

For timeouts, blocked sites, auth issues, and debug headers that apply to every workflow, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

## What's next

Pick the next page based on what is blocking you now:

- **[Common troubleshooting](/docs/guides/common/troubleshooting)** — debug timeouts, blocked sites, and plan/auth problems.
- **[Common caching patterns](/docs/guides/common/caching)** — reduce cost and improve response speed once the function logic is stable.
- **[Common private pages](/docs/guides/common/private-pages)** — run functions against logged-in, session-based, or personalized pages safely.
- **[Production patterns](/docs/guides/common/production-patterns)** — add retries, endpoint selection, and monitoring for real integrations.

## See also

- <Link href='/docs/guides/data-extraction' children='Data extraction' /> — if declarative rules are enough and you want the simplest possible extraction workflow.
- <Link href='/docs/guides/screenshot/page-interaction' children='Screenshot: page interaction' /> — if you mainly need to prepare a page before taking a screenshot.
- <Link href='/docs/guides/pdf/page-preparation' children='PDF: page preparation' /> — if your real goal is to clean up or wait for the page before printing to PDF.
