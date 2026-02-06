---
title: attr
description: 'Extract HTML attributes, text, inner HTML, or serialize content from any URL using the Microlink Query Language (MQL) attr parameter.'
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName">tagName</Link></Type> | <Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName">nodeName</Link></Type> | <Type children="'html'"/> | <Type children="'outerHTML'"/> | <Type children="'text'"/> | <Type children="'markdown'"/> | <Type children="'val'"/></TypeContainer>

It specifies how the value should be extracted from the matched [selector](/docs/mql/data/selector):

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

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) is supported, plus the following special cases:

- <Type children="'html'"/>: Get the inner HTML content of the matched selector.
- <Type children="'outerHTML'"/>: Get the outer HTML of the matched selector, including the element itself.
- <Type children="'text'"/>: Returns the combined text content, including its descendants, by removing leading, trailing, and repeated whitespace.
- <Type children="'markdown'"/>: Converts the HTML content into Markdown, preserving headings, links, and formatting.
- <Type children="'val'"/>: Get the current value of the matched selector, oriented for select or input fields.

## Whole-page serialization

When [selector](/docs/mql/data/selector) is omitted, `attr` operates on the entire page. This is useful for serializing a full page into a new output format:

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
// => '# Example Domain\n\nThis domain is for use in illustrative examples…'
```

You can also scope the conversion to a specific element by combining `selector` with `attr`:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://example.com', {
  data: {
    article: {
      selector: 'article',
      attr: 'markdown'
    }
  }
})

console.log(data.article)
// => '# Article Title\n\nArticle content as markdown…'
```

## Fallback values

If you specify more than one value, they will be used as fallback values:

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

<Figcaption children="The first attribute that resolves a value will be used." />

