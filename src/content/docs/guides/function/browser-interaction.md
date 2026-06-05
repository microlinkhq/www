---
title: 'Function: Browser interaction'
description: 'Use Puppeteer to interact with a headless browser — click, wait, navigate, extract data, and combine with other Microlink parameters.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Microlink functions can interact with a browser. 

When your function references `page`, you get the full [Puppeteer Page](https://pptr.dev/api/puppeteer.page) object:

```js
const microlink = require('@microlink/function')

const scrape = ({ page }) =>
  page.$eval('h1', el => el.textContent.trim())

const fn = microlink(scrape)
const result = await fn('https://example.com')
console.log(result.value) // 'Example Domain'
```

Start with the high-level helpers before reaching for lower-level APIs:

- [page.title](https://pptr.dev/api/puppeteer.page.title): Get the document title.
- [page.$eval](https://pptr.dev/api/puppeteer.page._eval): Run a function on the first matching element.
- [page.$$eval](https://pptr.dev/api/puppeteer.page.__eval): Run a function on all matching elements.
- [page.url](https://pptr.dev/api/puppeteer.page.url): Get the current URL.
- [page.content](https://pptr.dev/api/puppeteer.page.content): Get the full page HTML.

Any [Puppeteer Page method](https://pptr.dev/api/puppeteer.page) is available.

## What your function receives

| Property            | Type                                                        | Description                                                                                                                                                                        |
| ------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`              | [Page](https://pptr.dev/api/puppeteer.page)                 | Full Puppeteer access for clicks, waits, evaluation, and navigation. When the function references `page`, Microlink navigates to the URL in a browser before calling your function |
| `response`          | [HTTPResponse](https://pptr.dev/api/puppeteer.httpresponse) | The response returned by the implicit navigation. Only available when the function uses `page`                                                                                     |
| `headers`           | `object`                                                    | The request headers used to fetch the target URL                                                                                                                                   |
| any extra parameter | depends on what you pass                                    | Custom inputs forwarded from the request                                                                                                                                           |

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

Replace fixed waits like `page.waitForTimeout(3000)` with [page.waitForSelector](https://pptr.dev/api/puppeteer.page.waitforselector) or [page.waitForNavigation](https://pptr.dev/api/puppeteer.page.waitfornavigation) whenever possible — they are faster and more reliable.

## Combine with other parameters

Because [function](/docs/api/parameters/function) is just another Microlink parameter, you can prepare the page before your function runs using [scripts](/docs/api/parameters/scripts), [modules](/docs/api/parameters/modules), [click](/docs/api/parameters/click), or [waitForSelector](/docs/api/parameters/wait-for-selector):

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://microlink.io',
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
  scripts: ['https://code.jquery.com/jquery-3.5.0.min.js'],
  meta: false
}} />

<Figcaption>The <code>scripts</code> parameter injects jQuery before the function runs, making it available inside <code>page.evaluate</code>.</Figcaption>

## See also

- <Link href='/docs/guides/function/writing-functions' children='Writing functions' /> — return values, custom parameters, and npm packages.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand where time is spent and how to optimize.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
