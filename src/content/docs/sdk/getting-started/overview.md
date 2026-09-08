---
title: 'Overview'
description: 'Get started with the Microlink SDK. The microlink.io package exposes every Microlink product as a method for Node.js, browsers, and Deno, custom data extraction rules included.'
---

**Microlink SDK** is the official way to consume [Microlink API](/docs/api/getting-started/overview) programmatically. It's published on npm as [microlink.io](https://www.npmjs.com/package/microlink.io) and organizes the API into products — one method per product — so you call `microlink.screenshot(url)` instead of composing query strings by hand.

```bash
npm install microlink.io
```

Create a client once and call any product from it:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { title, description } = await microlink.metadata('https://vercel.com')
```

CommonJS is supported too:

```js
const createClient = require('microlink.io')
const microlink = createClient()
```

The same code runs in Node.js 24 or later, browsers, and Deno, returning the same responses everywhere. The package ships TypeScript definitions, so every method, option, and result is typed out of the box.

## Authentication

`createClient()` works without an API key on the [free plan](/pricing) out of the box. Pass an `apiKey` to unlock pro quotas — it travels as the [`x-api-key`](/docs/api/basics/authentication) header and switches the client to the [pro endpoint](/docs/api/basics/endpoint):

```js
const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})
```

[`search`](/docs/sdk/methods/search) is the exception: it requires an `apiKey` on every request.

Any other option passed to `createClient` is merged into every API call, which makes it the right place for defaults such as [`ttl`](/docs/api/parameters/ttl) or [`prerender`](/docs/api/parameters/prerender). See [options](/docs/sdk/getting-started/options) for the full list.

## Methods

Every product is a method on the client. All of them follow the same `method(url, options)` shape and resolve to the product's result directly, with no envelope to unwrap:

- [metadata](/docs/sdk/methods/metadata) — unified metadata from Open Graph, Twitter Cards, JSON-LD, and HTML.
- [screenshot](/docs/sdk/methods/screenshot) — any URL as a hosted image, or a short video recording.
- [pdf](/docs/sdk/methods/pdf) — any URL printed to a hosted PDF document.
- [markdown](/docs/sdk/methods/markdown) — the page as clean Markdown, ready for LLM context windows.
- [html](/docs/sdk/methods/html) — the fully rendered HTML, captured after JavaScript runs.
- [text](/docs/sdk/methods/text) — readable plain text with the markup stripped out.
- [logo](/docs/sdk/methods/logo) — the brand logo behind any URL.
- [embed](/docs/sdk/methods/embed) — oEmbed-style iframe HTML for rich cards.
- [extract](/docs/sdk/methods/extract) — typed values pulled with your own CSS selector rules.
- [function](/docs/sdk/methods/function) — your own JavaScript executed against a live page, with full Puppeteer access.
- [search](/docs/sdk/methods/search) — Google results as structured data, with pagination and per-result expansion.
- [media](/docs/sdk/methods/media) — the primary [video](/docs/sdk/methods/media/video) or [audio](/docs/sdk/methods/media/audio) of a page as a direct, playable asset.
- [collections](/docs/sdk/methods/collections) — every [link](/docs/sdk/methods/collections/links), [image](/docs/sdk/methods/collections/images), [video](/docs/sdk/methods/collections/videos), [audio](/docs/sdk/methods/collections/audios), or [email](/docs/sdk/methods/collections/emails) found on a page, as an array.
- [insights](/docs/sdk/methods/insights) — the [technologies](/docs/sdk/methods/insights/technologies) powering a site and a full [Lighthouse](/docs/sdk/methods/insights/lighthouse) report.

Every method throws a typed [`MicrolinkError`](/docs/sdk/getting-started/errors) when the API call fails, so one `try/catch` covers the whole client.

## How it fits together

Every method is a call to Microlink API with the right parameters set for you and the result unwrapped; HTTP, authentication, retries, errors, and compression are handled underneath, so the whole client behaves the same way.

Custom data extraction is part of the SDK too: write the rules and pass them to [extract](/docs/sdk/methods/extract), or as the `data` option of [metadata](/docs/sdk/methods/metadata). The `extract` pages cover the rules grammar — [selector](/docs/sdk/methods/extract/selector), [attr](/docs/sdk/methods/extract/attr), [type](/docs/sdk/methods/extract/type), [nested](/docs/sdk/methods/extract/attr#nested-rules) and [fallback](/docs/sdk/methods/extract#fallback-rules) rules — shared by `extract`, the content methods, and the collections.

Installing the package also ships a [`microlink` binary](/docs/sdk/getting-started/cli) where every product is a subcommand.

## Runtimes

The package is built on Web Standard APIs — `fetch`, `URL`, `URLSearchParams` — so one build runs everywhere, with the same import in CommonJS and ESM:

- **Node.js** — any version above v24; we recommend the active LTS.
- **Edge runtimes** — [Cloudflare Workers](https://workers.cloudflare.com/), [Vercel Edge Functions](https://vercel.com/features/edge-functions), [Deno](https://deno.com/), or any provider that supports [WinterCG](https://wintercg.org/), with nothing extra to configure.
- **Browsers** — through any bundler, with the same import.

A worker that returns extracted data as JSON:

```js
import createClient from 'microlink.io'

const microlink = createClient({ apiKey: MICROLINK_API_KEY })

export default {
  async fetch (request) {
    const { title, image } = await microlink.metadata('https://example.com')
    return Response.json({ title, image })
  }
}
```

Keep your `apiKey` out of browser code: requests from a page run on the free tier of the API, and the [`x-api-key`](/docs/api/basics/authentication) header belongs on a server you control.

Looking for the drop-in link preview component for React, Vue, and vanilla JavaScript? That's a different product: see [link preview](/link-preview).
