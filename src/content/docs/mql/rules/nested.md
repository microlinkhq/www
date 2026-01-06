---
title: Nested rules definition
---

In case you need, you can use [attr](/docs/mql/data/attr) for mapping data structures over the same property key:

```js
const mql = require('@microlink/mql')

const github = username =>
  mql(`https://github.com/${username}`, {
    data: {
      stats: {
        selector: '.application-main',
        attr: {
          followers: {
            selector: '.js-profile-editable-area a[href*="tab=followers"] span',
            type: 'number'
          },
          following: {
            selector: '.js-profile-editable-area a[href*="tab=following"] span',
            type: 'number'
          },
          stars: {
            selector: '.js-responsive-underlinenav a[data-tab-item="stars"] span',
            type: 'number'
          }
        }
      }
    }
  })

const username = 'kikobeats'
const { response, data } = await github(username)

console.log(`GitHub stats for @${username}:`, data.stats)
```
