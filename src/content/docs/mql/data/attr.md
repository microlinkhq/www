---
title: attr
description: Learn how to extract specific HTML attributes and node properties from any URL using the Microlink Query Language (MQL) attr parameter.
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link/base'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName">tagName</Link></Type> | <Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName">nodeName</Link></Type> | <Type children="'html'"/> | <Type children="'innerHTML'"/> | <Type children="'outerHTML'"/> | <Type children="'text'"/> | <Type children="'textContent'"/> | <Type children="'innerText'"/> | <Type children="'val'"/></TypeContainer>

It specifies which attribute should be picked over the matched [selector](/docs/mql/data/selector):

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

- <Type children="'text'"/>: Returns the combined text content, including its descendants, by removing leading, trailing, and repeated whitespace from a string.
- <Type children="'html'"/>: Get the HTML content of the matched selector. (Same as <Type children="'innerHTML'"/>).
- <Type children="'val'"/>: Get the current value of the matched selector, oriented for select or input fields.

If you specifiy more than one value, they will be used as fallback values:

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

<Figcaption children="The first attribute that resolve the value will be used." />

