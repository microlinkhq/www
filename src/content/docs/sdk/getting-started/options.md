---
title: 'Options'
description: 'Learn how the Microlink SDK routes options. Product-specific keys nest automatically, headers travel as HTTP headers, and everything else maps to API query parameters.'
---

Every method accepts an options object as its last argument. Its keys are routed automatically so you never have to remember how the underlying API call is shaped:

- **Product-specific keys** — such as `fullPage` for screenshot, `format` for pdf, or `selector` for markdown — are nested under the right product parameter.
- **`headers`** — sent as HTTP request headers, never serialized into the URL.
- **Everything else** — passed through as top-level [API query parameters](/docs/api/getting-started/overview).

```js
const { url } = await microlink.screenshot('https://example.com', {
  fullPage: true,
  device: 'iPhone 11'
})
```

Here `fullPage` nests under [`screenshot`](/docs/api/parameters/screenshot) while `device` stays a top-level [query parameter](/docs/api/parameters/device).

## Headers

Use `headers` to authenticate against the target page. Any header prefixed with `x-api-header-` is forwarded to the target site with the prefix stripped:

```js
const markdown = await microlink.markdown('https://x.com/some/article', {
  headers: {
    'x-api-header-cookie': 'auth_token=…'
  }
})
```

See [headers](/docs/api/parameters/headers) for the full behavior.

## Client-level defaults

Options passed to `createClient` apply to every call, and per-call options win over them:

```js
const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY,
  ttl: '1d'
})

await microlink.pdf('https://example.com', { ttl: '12h' })
```
