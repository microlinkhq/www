---
title: 'evaluate'
---

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It evaluates the JavaScript code provided inside the browser context over the target URL, returning the result.

It's quite similar to [selector](/docs/mql/data/selector), but designed to specify the value to be obtained in a JavaScript-like way.

```js
const mql = require('@microlink/mql')

const vercel = username => 
  mql(`https://vercel.com`, {
    data: {
      nextVersion: {
        evaluate: 'window.next.version',
        type: 'string'
      }
    }
  })

const { data } = await vercel()

console.log(`Next.js version is: ${data.nextVersion}`)
```

<Figcaption children='You can combine evaluate with types for data correcteness.' />
