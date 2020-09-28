---
title: 'Fallbacks rules definition'
---

A [data field](/docs/api/getting-started/data-fields) can be defined by more than one [rule](/docs/mql/rules/basic) that will be used as fallback rules:

```js
const mql = require('@microlink/mql')

const github = username =>
  mql(`https://github.com/${username}`, {
    data: {
      avatar: [
        {
          selector: 'meta[name="twitter:image:src"]:not([content=""])',
          attr: 'content',
          type: 'image'
        },
        {
          selector: 'meta[property="og:image"]:not([content=""])',
          attr: 'content',
          type: 'image'
        }
      ]
    }
  })

const username = 'kikobeats'
const { response, data } = await github(username)

console.log(`GitHub avatar for @${username}: ${data.avatar.url} (${data.avatar.size_pretty})`)
```

The rules provided under the same data value will be evaluated respecting the order:

- If the first rule fails, then it fallback in the second rule.
- If the second rule fails, time to fallback in the third rule.
- etc

Being the value obtained the first rule that satisfies the condition successfully, if that's possible.


