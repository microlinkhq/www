---
title: 'Installation'
description: 'Install and set up the Microlink Query Language (MQL) client. Support for Node.js, Edge Functions (Vercel/Cloudflare), and direct Browser integration via ESM.'
---

**MQL** is available as [npm package](https://www.npmjs.com/package/@microlink/react):

```bash
npm install @microlink/mql --save
```

The package is fully typed, and it has been designed for being consumed in different environments and ways.

<H3 titleize={false}>From Node.js</H3>

Any Node.js above v16.14 is supported. We recommend running it using the active TLS. Check [Node.js releases](https://nodejs.dev/en/about/releases/) to know more.

Just require `@microlink/mql` dependency from your code:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
})

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

The same build is available for CommonJS and ESM.

<H3 titleize={false}>From Edge</H3>

If you are using [CloudFlare Workers](https://workers.cloudflare.com/), [Vercel Edge Functions](https://vercel.com/features/edge-functions), [Deno](https://deno.com/), or any other provider that supports [WinterCG](https://wintercg.org/), the Node.js ESM build is implemented on top of Web Standard APIs, nothing extra should be done.

Just import `@microlink/mql/lightweight` from your code:

```js
import mql from '@microlink/mql/lightweight'

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
})

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

The same build is available for CommonJS and ESM.

<H3 titleize={false}>From Browser</H3>

Last but not least, MQL can be loaded from any browser directly from HTML markup:

```html
<script type="module">
  import mql from 'https://esm.sh/@microlink/mql'

  const { data } = await mql('https://kikobeats.com', {
    data: {
      avatar: {
        selector: '#avatar',
        type: 'image',
        attr: 'src',
      }
    }
  })

  console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
</script>
