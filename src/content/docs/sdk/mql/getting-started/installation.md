---
title: 'Installation'
description: 'Install and set up the Microlink Query Language (MQL) client. Support for Node.js, Edge Functions (Vercel/Cloudflare), Deno, and direct browser integration via ESM.'
---

**MQL** is available as an [npm package](https://www.npmjs.com/package/@microlink/mql):

```bash
npm install @microlink/mql --save
```

The package is fully typed, and it has been designed for being consumed in different environments and ways. It's built on top of Web Standard APIs — `fetch`, `URL`, `URLSearchParams` — so one build runs everywhere.

If you already installed the [SDK](/docs/sdk/getting-started/overview), `@microlink/mql` is one of its dependencies and can be imported directly without adding it to your `package.json`.

<H3 titleize={false}>From Node.js</H3>

Any Node.js above v22 is supported. We recommend running it using the active LTS. Check [Node.js releases](https://nodejs.dev/en/about/releases/) to know more.

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

The same build is available for CommonJS and ESM:

```js
import mql from '@microlink/mql'
```

<H3 titleize={false}>From Edge</H3>

If you are using [Cloudflare Workers](https://workers.cloudflare.com/), [Vercel Edge Functions](https://vercel.com/features/edge-functions), [Deno](https://deno.com/), or any other provider that supports [WinterCG](https://wintercg.org/), nothing extra should be done — the ESM build only relies on Web Standard APIs:

```js
import mql from '@microlink/mql'

export default {
  async fetch (request) {
    const { data } = await mql('https://kikobeats.com', {
      data: {
        avatar: {
          selector: '#avatar',
          type: 'image',
          attr: 'src'
        }
      }
    })

    return Response.json(data)
  }
}
```

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
```

Keep your `apiKey` out of browser code: requests from a page run on the free tier of the API, and the [`x-api-key`](/docs/api/basics/authentication) header belongs on a server you control.
