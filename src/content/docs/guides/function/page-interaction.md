---
title: 'Function: Page interaction'
description: 'Use Puppeteer helpers to interact with the page, understand the two execution contexts, and know when to reach for page.evaluate.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Your function receives the full [Puppeteer Page](https://pptr.dev/api/puppeteer.page) object. 

Start with the high-level helpers before reaching for lower-level APIs:

```js
const microlink = require('@microlink/function')

const scrape = ({ page }) =>
  page.$eval('h1', el => el.textContent.trim())

const fn = microlink(scrape)
const result = await fn('https://example.com')
console.log(result.value) // 'Example Domain'
```

Other useful page helpers, easier to read and debug than `page.evaluate()`:

- `page.title()` — get the document title.
- `page.$eval(selector, fn)` — run a function on the first matching element.
- `page.$$eval(selector, fn)` — run a function on all matching elements.
- `page.url()` — get the current URL.
- `page.content()` — get the full page HTML.

## What your function receives

| Property            | Type                                                                  | Description                                                          |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `page`              | [Page](https://pptr.dev/api/puppeteer.page)                           | Full Puppeteer access for clicks, waits, evaluation, and navigation. When the function references `page`, Microlink navigates to the URL in a browser before calling your function |
| `response`          | [HTTPResponse](https://pptr.dev/api/puppeteer.httpresponse)           | The response returned by the implicit navigation. Only available when the function uses `page` |
| `headers`           | `object`                                                              | The request headers used to fetch the target URL                     |
| any extra parameter | depends on what you pass                                              | Custom inputs forwarded from the request                             |

## Two execution contexts

There are two different places your code can run:

| Code runs in             | Good for                                                                    | Can access                                                          |
| ------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| The outer `function` body | Orchestration, Puppeteer calls, `require()`, and response shaping          | `page`, `response`, forwarded params, and npm packages              |
| `page.evaluate(...)`     | Reading or computing values from the live DOM when page helpers are not enough | `window`, `document`, `performance`, and page state              |

Start with Puppeteer helpers such as `page.title()`, `page.$eval()`, and `page.$$eval()`. Reach for `page.evaluate(...)` only when the logic truly belongs inside the page context:

```js
const microlink = require('@microlink/function')

const getPageInfo = ({ page }) =>
  page.evaluate(() => ({
    heading: document.querySelector('h1')?.textContent?.trim(),
    linkCount: document.querySelectorAll('a').length
  }))

const fn = microlink(getPageInfo)
const result = await fn('https://example.com')
console.log(result.value) // { heading: 'Example Domain', linkCount: 1 }
```

<Figcaption><code>page.evaluate</code> runs inside the browser page context. You cannot use <code>require()</code> or access outer-function variables inside it.</Figcaption>

## Click, wait, and navigate

Puppeteer helpers let you interact with the page before extracting data:

```js
const microlink = require('@microlink/function')

const scrapeAfterClick = ({ page }) =>
  page.click('button.load-more')
    .then(() => page.waitForSelector('.results'))
    .then(() => page.$$eval('.results li', items =>
      items.map(el => el.textContent.trim())
    ))

const fn = microlink(scrapeAfterClick)
const result = await fn('https://example.com')
```

Replace fixed waits like `page.waitForTimeout(3000)` with `page.waitForSelector()` or `page.waitForNavigation()` whenever possible — they are faster and more reliable.

## Combine with other parameters

Because [function](/docs/api/parameters/function) is just another Microlink parameter, you can prepare the page before your function runs using `scripts`, `modules`, `click`, or `waitForSelector`:

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://microlink.io',
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
  scripts: ['https://code.jquery.com/jquery-3.5.0.min.js'],
  meta: false
}} />

<Figcaption>The <code>scripts</code> parameter injects jQuery before the function runs, making it available inside <code>page.evaluate</code>.</Figcaption>

## See also

- <Link href='/docs/guides/function/npm-packages' children='NPM packages' /> — use any npm dependency inside your function.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand where time is spent and how to optimize.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
