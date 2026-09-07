---
title: 'selectorAll'
description: 'Extract multiple elements from a URL using CSS selectors with the Microlink SDK. Similar to querySelectorAll, it returns a collection of structured data for lists, tables, or repeated patterns.'
---

import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It's the same than [selector](/docs/sdk/methods/extract/selector) but it returns your a collection of results, being equivalent to [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll):

```js
import createClient from 'microlink.io'

const microlink = createClient()

const hackerNews = () =>
  microlink.extract('https://news.ycombinator.com/', {
    posts: {
      selectorAll: '.athing',
      attr: {
        title: {
          type: 'title',
          selector: '.titleline > a',
          attr: 'text'
        },
        url: {
          type: 'url',
          selector: '.titleline > a',
          attr: 'href'
        }
      }
    }
  })

const { posts } = await hackerNews()

console.log('latest hacker news posts:', posts)
```

Without a nested `attr`, each match contributes one plain value, which is how the [collection](/docs/sdk/methods/collections) methods sweep a page:

```js
const { links } = await microlink.extract('https://news.ycombinator.com/', {
  links: {
    selectorAll: '.titleline > a',
    attr: 'href',
    type: 'url'
  }
})

console.log(links) // => ['https://…', 'https://…', …]
```
