---
title: 'Overview'
---

**Microlink Query Language** (*MQL*) is the official client for interacting with [Microlink API](/docs/api/getting-started/overview).

Any API parameter there is supported:

```js
const mql = require('@microlink/mql')
const { data } = await mql('https://kikobeats.com')

console.log(data.description)
```

Also, it provides you a convenient way for getting data from any website:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      type: 'image',
      attr: 'src',
      selector: '#avatar'
    }
  }
})

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

<Figcaption children='The only thing you need to do is declare the data you wish to obtain.' />
