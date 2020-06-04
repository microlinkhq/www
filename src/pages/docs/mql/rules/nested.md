---
title: Nested rules definition
---

In case you need, you can use [attr](/docs/mql/data/attr) for mapping data structures over the same property key:

```js
const mql = require('@microlink/mql')

const github = (username) =>
  mql(`https://github.com/${username}`, {
    data: {
      stats: {
        selector: '.user-profile-nav nav',
        attr: {
          repositories: {
            selector: 'a:nth-child(2) > span',
            type: 'number'
          },
          followers: {
            selector: 'a:nth-child(4) > span',
            type: 'number'
          },
          followings: {
            selector: 'a:nth-child(5) > span',
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
