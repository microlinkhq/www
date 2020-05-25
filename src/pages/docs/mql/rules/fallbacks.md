---
title: 'Fallbacks rules definition'
---

A [data field](/docs/api/getting-started/data-fields) can be defined by more than one [rule](/docs/mql/rules/basic) that will be used as fallback rules:

```js
const mql = require('@microlink/mql')

const meetup = url =>
  mql(url, {
    prerender: true,

    data: {
      description: [
        {
          selector: 'meta[name="description"]:not([content=""])',
          attr: 'content',
          type: 'description'
        },
        {
          selector: 'meta[property="og:description"]:not([content=""])',
          attr: 'content',
          type: 'description'
        },
        {
          selector: 'meta[name="twitter:description"]:not([content=""])',
          attr: 'content',
          type: 'description'
        },
        {
          selector: '.event-description',
          attr: 'text',
          type: 'description'
        }
      ]
    }
  })

const url = 'https://www.meetup.com/Marin-Mountain-Biking/events/268362491/' 
const { data } = await meetup(url)

console.log(`meetup for ${data.title}`, data.description)
```

The rules provided under the same data value will be evaluated respecting the order:

- If the first rule fails, then it fallback in the second rule.
- If the second rule fails, time to fallback in the third rule.
- etc

Being the value obtained the first rule that satisfies the condition successfully, if that's possible.


