---
title: 'Overview'
description: 'Get started with the Microlink SDK. The microlink.io package exposes every Microlink product as a semantic method for Node.js, browsers, and Deno.'
---

**Microlink SDK** is the official way to consume [Microlink API](/docs/api/getting-started/overview) programmatically. It's published on npm as [microlink.io](https://www.npmjs.com/package/microlink.io) and organizes the API into semantic products — one method per product — so you call `microlink.screenshot(url)` instead of composing query strings by hand.

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

The same code runs in Node.js, browsers, and Deno, returning the same responses everywhere.

## Authentication

`createClient()` works without an API key on the [free plan](/pricing) out of the box. Pass an `apiKey` to unlock pro quotas — it travels as the [`x-api-key`](/docs/api/basics/authentication) header:

```js
const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})
```

Any other option passed to `createClient` is merged into every API call, which makes it the right place for defaults such as [`ttl`](/docs/api/parameters/ttl) or [`prerender`](/docs/api/parameters/prerender).

## Methods

Every product is a method on the client:

- [Content](/docs/sdk/methods/content) — `metadata`, `markdown`, `html`, `text`, `screenshot`, `pdf`, `logo`, `embed`.
- [Collections](/docs/sdk/methods/collections) — `links`, `images`, `videos`, `audios`, `emails`.
- [Specialized](/docs/sdk/methods/specialized) — `video`, `audio`, `extract`, `technologies`, `lighthouse`, `search`, `run`.

## How it fits together

The SDK is a thin semantic layer over [@microlink/mql](/docs/mql/getting-started/overview): HTTP, authentication, retries, errors, and binary handling are already solved there. Each method sets the right API parameters and unwraps the result for you. Installing the package also ships a [`microlink` binary](/docs/sdk/getting-started/cli) where every product is a subcommand.

Looking for the previous Microlink SDK, the drop-in link preview component for React, Vue, and vanilla JavaScript? Its documentation lives at [SDK legacy](/docs/sdk-legacy/getting-started/overview/). It keeps working, but it's no longer maintained.
