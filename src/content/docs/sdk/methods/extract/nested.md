---
title: Nested rules definition
description: 'Organize your scraped data using nested rules. Map complex DOM structures into clean JSON objects by nesting selectors and attributes within a single parent property.'
---

In case you need, you can use [attr](/docs/sdk/methods/extract/attr) for mapping data structures over the same property key:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const github = username =>
  microlink.extract(`https://github.com/${username}`, {
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
  })

const username = 'kikobeats'
const { stats } = await github(username)

console.log(`GitHub stats for @${username}:`, stats)
```

Each nested rule is evaluated relative to the element matched by the parent `selector`, so the same structure applies to every item of a list when the parent uses [selectorAll](/docs/sdk/methods/extract/selectorAll):

```js
const { stories } = await microlink.extract('https://news.ycombinator.com', {
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      url: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})

console.log(stories[0]) // => { title: '…', url: 'https://…' }
```
