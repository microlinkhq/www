---
title: 'Function: Browser interaction'
description: 'Use Puppeteer to interact with a headless browser — click, wait, navigate, extract data, and combine with other Microlink parameters.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Microlink functions can interact with a browser. 

`page` is a [Puppeteer Page](https://pptr.dev/api/puppeteer.page) for the URL you asked for:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const scrape = ({ page }) =>
  page.$eval('h1', el => el.textContent.trim())

const result = await microlink.function('https://example.com', scrape)

console.log(result.value) // 'Example Domain'
```

Start with the high-level helpers before reaching for lower-level APIs:

- [page.title](https://pptr.dev/api/puppeteer.page.title): Get the document title.
- [page.$eval](https://pptr.dev/api/puppeteer.page._eval): Run a function on the first matching element.
- [page.$$eval](https://pptr.dev/api/puppeteer.page.__eval): Run a function on all matching elements.
- [page.url](https://pptr.dev/api/puppeteer.page.url): Get the URL the page settled on.
- [page.content](https://pptr.dev/api/puppeteer.page.content): Get the full page HTML.

Any [Puppeteer Page method](https://pptr.dev/api/puppeteer.page) is available.

Two methods extend `page`:

- [page.extract](/docs/api/parameters/function#pageextract): the same rules as [data](/docs/api/parameters/data).
- [page.metadata](/docs/api/parameters/function#pagemetadata): the same normalized metadata as [meta](/docs/api/parameters/meta).

## What your function receives

| Property            | Type                                                        | Description                                                                                                                                                                        |
| ------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | `string`                                                    | The URL you asked for, not the one a redirect settles on. Available without a browser. `page.url()` is the settled one                                                             |
| `page`              | [Page](https://pptr.dev/api/puppeteer.page)                 | The Puppeteer Page for that URL. The page API is supported. [page.extract](/docs/api/parameters/function#pageextract) and [page.metadata](/docs/api/parameters/function#pagemetadata) extend it |
| `response`          | [HTTPResponse](https://pptr.dev/api/puppeteer.httpresponse) | The response from the implicit [page.goto](https://pptr.dev/api/puppeteer.page.goto). Only available when the function loads the page in a browser                                 |
| `headers`           | `object`                                                    | The request headers used to fetch the target URL                                                                                                                                   |
| any extra parameter | depends on what you pass                                    | Custom inputs forwarded from the request                                                                                                                                           |

## Click, wait, and navigate

Puppeteer helpers let you interact with the page before extracting data:

```js
const scrapeAfterClick = ({ page }) =>
  page.click('button.load-more')
    .then(() => page.waitForSelector('.results'))
    .then(() => page.$$eval('.results li', items =>
      items.map(el => el.textContent.trim())
    ))

const result = await microlink.function('https://example.com', scrapeAfterClick)
```

Replace fixed waits like `page.waitForTimeout(3000)` with [page.waitForSelector](https://pptr.dev/api/puppeteer.page.waitforselector) or [page.waitForNavigation](https://pptr.dev/api/puppeteer.page.waitfornavigation) whenever possible — they are faster and more reliable.

## Combine with other parameters

Because [function](/docs/api/parameters/function) is just another Microlink parameter, you can prepare the page before your function runs using [scripts](/docs/api/parameters/scripts), [modules](/docs/api/parameters/modules), [click](/docs/api/parameters/click), or [waitForSelector](/docs/api/parameters/waitForSelector). In the SDK they travel as the third argument of `run`:

```js
const { value } = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.evaluate('jQuery.fn.jquery'),
  { scripts: 'https://code.jquery.com/jquery-3.5.0.min.js' }
)
```

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://microlink.io',
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
  scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
}} />

<Figcaption>The <code>scripts</code> parameter injects jQuery before the function runs, making it available inside <code>page.evaluate</code>.</Figcaption>

## See also

- <Link href='/docs/guides/function/writing-functions' children='Writing functions' /> — return values, custom parameters, and npm packages.
- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand where time is spent and how to optimize.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
