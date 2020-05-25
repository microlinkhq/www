---
title: 'Overview'
---

**Microlink Query Language** (*MQL*) is the official client for interacting with [Microlink API](/docs/api/getting-started/overview).

Any API parameter there is supported:

```js
const mql = require('@microlink/mql')
const { data } = await mql('https://www.instagram.com')

console.log(data.description)
```

Also, it provides you a convenient way for getting data from any website:

```js
const mql = require('@microlink/mql')

const instagram = username => 
  mql(`https://www.instagram.com/${username}`, {
    data: {
      avatar: {
        selector: 'header img',
        type: 'image',
        attr: 'src'
      }
    }
  })

const username = 'teslamotors'
const { data } = await instagram(username)

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

<Figcaption children='The only thing you need to do is declare the data you wish to obtain.' />
