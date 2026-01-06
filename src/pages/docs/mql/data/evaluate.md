---
title: 'evaluate'
---

import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It evaluates the JavaScript stringified value provided inside the browser context over the target URL, returning the result.

It's quite similar to [selector](/docs/mql/data/selector), but designed to specify the value to be obtained in a JavaScript-like way.

```js
const mql = require('@microlink/mql')

const getNextVersion = url => 
  mql(url, {
    data: {
      version: {
        evaluate: 'window.next.version',
        type: 'string'
      }
    }
  })

const { data } = await getNextVersion('https://vercel.com')

console.log(`Next.js version is: ${data.version}`)
```

<Figcaption children='You can combine evaluate with types for data correcteness.' />

It can evaluate anything browser compatible in the JavaScript context.

```js
const mql = require('@microlink/mql')

const getExcerpt = url =>
  mql(url, {
    data: {
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
    }
  })

const { data } = await getExcerpt('https://levelup.gitconnected.com/how-to-load-external-javascript-files-from-the-browser-console-8eb97f7db778')

console.log(data.excerpt)
```
