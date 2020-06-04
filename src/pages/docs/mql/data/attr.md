---
title: attr
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type children="'html'"/> | <Type children="'val'"/> | <Type children="'text'"/></TypeContainer> or any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)

It specifies which attribute should be picked over the matched [selector](/docs/mql/data/selector):

```js{9}
const mql = require('@microlink/mql')

const instagram = username => 
  mql(`https://www.instagram.com/${username}`, {
    data: {
      avatar: {
        selector: 'meta[property="og:image"]',
        attr: 'content',
        type: 'image'
      }
    }
  })

const username = 'teslamotors'
const { data } = await instagram(username)

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) is supported, keeping in mind three special values:

- <Type children="'text'"/>: Get the combined text content, including their descendants.
- <Type children="'val'"/>: Get the current value of the matched selector.
- <Type children="'html'"/>: Get the HTML content of the matched selector.

If you specifiy more than one value, they will be used as fallback values:

```js{9}
const mql = require('@microlink/mql')

const instagram = username => 
  mql(`https://www.instagram.com/${username}`, {
    data: {
      avatar: {
        selector: 'meta[property="og:image"]',
        attr: ['value', 'content'],
        type: 'image'
      }
    }
  })

const username = 'teslamotors'
const { data } = await instagram(username)

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

<Figcaption children="The first attribute that resolve the value will be used." />

