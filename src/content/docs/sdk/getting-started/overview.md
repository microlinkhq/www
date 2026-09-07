---
title: 'Overview'
description: 'Get started with the Microlink SDK. The microlink.io package exposes every Microlink product as a method for Node.js, browsers, and Deno, with MQL underneath.'
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
- [run](/docs/sdk/methods/run) — your own JavaScript executed against a live page, with full Puppeteer access.
- [search](/docs/sdk/methods/search) — Google results as structured data, with pagination and per-result expansion.
- [media](/docs/sdk/methods/media) — the primary [video](/docs/sdk/methods/media/video) or [audio](/docs/sdk/methods/media/audio) of a page as a direct, playable asset.
- [collections](/docs/sdk/methods/collections) — every [link](/docs/sdk/methods/collections/links), [image](/docs/sdk/methods/collections/images), [video](/docs/sdk/methods/collections/videos), [audio](/docs/sdk/methods/collections/audios), or [email](/docs/sdk/methods/collections/emails) found on a page, as an array.
- [insights](/docs/sdk/methods/insights) — the [technologies](/docs/sdk/methods/insights/technologies) powering a site and a full [Lighthouse](/docs/sdk/methods/insights/lighthouse) report.

Every method throws a typed [`MicrolinkError`](/docs/sdk/getting-started/errors) when the API call fails, so one `try/catch` covers the whole client.

## How it fits together

The SDK is a thin semantic layer over [MQL](/docs/sdk/mql/getting-started/overview), the HTTP client for Microlink API: HTTP, authentication, retries, errors, and binary handling are already solved there. Each method sets the right API parameters and unwraps the result for you.

Reach for MQL directly, through the [@microlink/mql](https://www.npmjs.com/package/@microlink/mql) package the SDK depends on, when you need the raw API response — the `status`, `data`, and `response` envelope — or a [stream or buffer](/docs/sdk/mql/getting-started/api) instead of a hosted URL. The [MQL section](/docs/sdk/mql/getting-started/overview) of these docs covers the client and the [rules grammar](/docs/sdk/mql/rules/basic) shared by [extract](/docs/sdk/methods/extract), the content methods, and the collections.

Installing the package also ships a [`microlink` binary](/docs/sdk/getting-started/cli) where every product is a subcommand.

Looking for the drop-in link preview component for React, Vue, and vanilla JavaScript? That's a different product: see [link preview](/link-preview).
