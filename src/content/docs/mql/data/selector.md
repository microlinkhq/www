---
title: 'selector'
description: 'Define CSS selectors to target and extract specific HTML elements from any URL. Support for IDs, classes, pseudo-classes, and fallback logic for resilient scraping.'
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It defines the [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) you want to pick from the HTML markup over the [url](/docs/api/parameters/url):

```js
const mql = require('@microlink/mql')

const github = username => 
  mql(`https://github.com/${username}`, {
    data: {
      avatar: {
        selector: 'meta[property="og:image"]:not([content=""])',
        attr: 'content',
        type: 'image'
      }
    }
  })

const username = 'kikobeats'
const { response, data } = await github(username)

console.log(`GitHub avatar for @${username}: ${data.avatar.url} (${data.avatar.size_pretty})`)
```

It's equivalent to [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and any [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be specified, such as:

- An HTML tag (e.g., <Type children="'img'"/>).
- A CSS class or pseudo class, id or data-attribute (e.g., <Type children="'#avatar'"/>).
- A combination of both (e.g., <Type children="'img:first'"/>).

When `selector` is omitted, the [attr](/docs/mql/data/attr) operates on the entire page. This is useful for whole-page serialization (including formats like <Type children="'markdown'"/>):

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://example.com', {
  data: {
    content: {
      attr: 'markdown'
    }
  }
})

console.log(data.content)
// => '# Example Domain\n\nThis domain is for use in…'
```

<Figcaption children='Omitting selector with attr is useful for LLM pipelines, content indexing, or feeding page content into downstream processing. Unsupported attr values fall back to HTML.' />

## Fallback selectors

If you pass a collection of selectors, they are considered as fallback values:

```jsx
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

<Figcaption children='Using multiple selectors makes the data rule more generic.' />

The position into the collection matters: The first data rule that returns a truthy value after applying type will be used, discarding the rest of the selectors.
