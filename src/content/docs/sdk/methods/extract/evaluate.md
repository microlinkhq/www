---
title: 'evaluate'
description: 'Execute custom JavaScript strings or functions within the headless browser context to extract dynamic data or interact with the DOM using the evaluate primitive through the Microlink SDK.'
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<function>'/></TypeContainer><br/>

It evaluates the JavaScript provided inside the browser context over the target URL, returning the result.

It's quite similar to [selector](/docs/sdk/methods/extract/selector), but designed to specify the value to be obtained in a JavaScript-like way.

```js
import createClient from 'microlink.io'

const microlink = createClient()

const getNextVersion = url =>
  microlink.extract(url, {
    version: {
      evaluate: 'window.next.version',
      type: 'string'
    }
  })

const { version } = await getNextVersion('https://vercel.com')

console.log(`Next.js version is: ${version}`)
```

<Figcaption children='You can combine evaluate with types for data correcteness.' />

It can evaluate anything browser compatible in the JavaScript context. A function is serialized to its source before being sent, so it can be as long as you need — but it runs in the page, not in your process, so it can only reach what the page can:

```js
const getExcerpt = url =>
  microlink.extract(url, {
    excerpt: {
      evaluate: async () => {
        const response = await window.fetch(
          'https://cdn.jsdelivr.net/npm/@mozilla/readability/Readability.js'
        )
        const script = await response.text()
        window.eval(script)
        const reader = new window.Readability(window.document)
        return reader.parse().excerpt
      },
      type: 'string'
    }
  })

const { excerpt } = await getExcerpt('https://levelup.gitconnected.com/how-to-load-external-javascript-files-from-the-browser-console-8eb97f7db778')

console.log(excerpt)
```

When the logic outgrows a single expression — clicks, waits, npm packages — reach for [function](/docs/sdk/methods/function), which gives the function full Puppeteer access instead of a page-side evaluation.
