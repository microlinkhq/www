---
title: 'evaluate'
---

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It evaluates the JavaScript stringified function provided inside the browser context over the target URL, returning the result.

It's quite similar to [selector](/docs/mql/data/selector), but designed to specify the value to be obtained in a JavaScript-like way.

```js
const mql = require('@microlink/mql')

const jQuery = url => 
  mql(url, {
    data: {
      version: {
        evaluate: '() => jQuery.fn.jquery',
        type: 'string'
      }
    }
  })

const { data } = await jQuery('https://zoom.us')

console.log(`jQuery version is: ${data.version}`)
```

<Figcaption children='You can combine evaluate with types for data correcteness.' />
