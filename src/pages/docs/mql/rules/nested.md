---
title: Nested rules definition
---

In case you need, you can use [attr](/docs/mql/data/attr) for mapping data structures over the same property key:

```js
const mql = require('@microlink/mql')
 
const twitter = username =>
  mql(`https://twitter.com/${username}`, {
    data: {
      stats: {
        selector: ".ProfileNav-list",
        attr: {
          tweets: {
            selector: ".ProfileNav-item--tweets .ProfileNav-value",
            attr: "data-count",
          },
          followings: {
            selector: ".ProfileNav-item--following .ProfileNav-value",
            attr: "data-count",
          },
          followers: {
            selector: ".ProfileNav-item--followers .ProfileNav-value",
            attr: "data-count",
          }
        }
      }
    }
  })

const username = 'microlinkhq'
const { data } = await twitter(username)

console.log(`stats for @${username}:`, data.stats)
```
