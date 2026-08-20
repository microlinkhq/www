---
title: 'Options'
description: 'How the Microlink SDK routes options, plus the shared options every method accepts: browser emulation, page lifecycle, cache, and request controls.'
---

Every method accepts an options object as its last argument. Its keys are routed automatically so you never have to remember how the underlying API call is shaped:

- **Method-specific keys** — such as `fullPage` for screenshot, `format` for pdf, or `selector` for markdown — are nested under the right product parameter. Each [method page](/docs/sdk/getting-started/overview#methods) lists its own keys.
- **`headers`** — sent as HTTP request headers, never serialized into the URL.
- **Everything else** — passed through as top-level API query parameters. The useful ones are listed below.

```js
const { url } = await microlink.screenshot('https://example.com', {
  fullPage: true,
  device: 'iPhone 11'
})
```

Here `fullPage` nests under [`screenshot`](/docs/api/parameters/screenshot) while `device` stays a top-level [query parameter](/docs/api/parameters/device).

## Shared options

Any method can combine its own keys with these. They control the browser session, the page lifecycle, and the cache behind every call.

### Browser

- [device](/docs/api/parameters/device) `<string>` — emulates a device preset: viewport, user agent, and capabilities (default: `'macbook pro 13'`).
- [viewport](/docs/api/parameters/viewport) `<object>` — sets the browser visible area and device capabilities directly.
- [colorScheme](/docs/api/parameters/colorScheme) `<string>` — sets the CSS color scheme preference: `'light'`, `'dark'`, or `'no-preference'` (default).
- [mediaType](/docs/api/parameters/mediaType) `<string>` — sets the CSS media type, e.g. `'print'` (default: `'screen'`).
- [javascript](/docs/api/parameters/javascript) `<boolean>` — enables or disables JavaScript execution in the page (default: `true`).
- [animations](/docs/api/parameters/animations) `<boolean>` — enables or disables CSS animations and transitions (default: `false`).
- [adblock](/docs/api/parameters/adblock) `<boolean>` — blocks ads, trackers, and cookie consent services (default: `true`).

A retina-density mobile capture in dark mode:

```js
const { url } = await microlink.screenshot('https://example.com', {
  colorScheme: 'dark',
  viewport: {
    width: 640,
    height: 400,
    deviceScaleFactor: 2,
    isMobile: true
  }
})
```

### Page

- [prerender](/docs/api/parameters/prerender) `<boolean> | <string>` — controls whether the content is fetched with a headless browser (default: `'auto'`).
- [waitForSelector](/docs/api/parameters/waitForSelector) `<string>` — waits until the element matching the CSS selector appears.
- [waitForTimeout](/docs/api/parameters/waitForTimeout) `<string> | <number>` — waits a fixed amount of time before processing the content.
- [waitUntil](/docs/api/parameters/waitUntil) `<string> | <string[]>` — the browser lifecycle events to wait for (default: `'auto'`).
- [click](/docs/api/parameters/click) `<string> | <string[]>` — clicks the elements matching the CSS selectors.
- [scroll](/docs/api/parameters/scroll) `<string>` — scrolls to the element matching the CSS selector.
- [scripts](/docs/api/parameters/scripts) `<string> | <string[]>` — injects scripts into the page, as code or URLs.
- [styles](/docs/api/parameters/styles) `<string> | <string[]>` — injects styles into the page, as CSS rules or URLs.
- [modules](/docs/api/parameters/modules) `<string> | <string[]>` — injects ES modules into the page.

Dismiss a consent dialog, hide the promo banner, and wait for the chart to render before capturing:

```js
const { url } = await microlink.screenshot('https://example.com/dashboard', {
  click: '.cookie-accept',
  styles: ['.promo-banner { display: none }'],
  waitForSelector: '.chart'
})
```

### Cache

- [ttl](/docs/api/parameters/ttl) `<string> | <number>` — how long the response stays cached (default: `'24h'`).
- [staleTtl](/docs/api/parameters/staleTtl) `<string> | <number> | <boolean>` — serves a stale copy while a fresh one regenerates in the background (default: `false`).
- [force](/docs/api/parameters/force) `<boolean>` — bypasses the cache to get a fresh copy (default: `false`).
- [cacheKey](/docs/api/parameters/cacheKey) `<string>` — extends the cache key with a custom identifier.

Cache for a week, serving stale copies instantly while a fresh one regenerates behind the scenes:

```js
const metadata = await microlink.metadata('https://example.com', {
  ttl: '7d',
  staleTtl: '1d'
})
```

### Request

- [timeout](/docs/api/parameters/timeout) `<string> | <number>` — the maximum time allowed for the request lifecycle (default: `'28s'`).
- [retry](/docs/api/parameters/retry) `<number>` — how many retries to perform under an internal browser error (default: `2`).
- [proxy](/docs/api/parameters/proxy) `<string> | <object>` — resolves any sub-request through an HTTP proxy server.
- [filename](/docs/api/parameters/filename) `<string>` — the filename associated with a generated asset.
- [ping](/docs/api/parameters/ping) `<boolean> | <object>` — verifies every URL in the payload is publicly reachable (default: `true`).
- [palette](/docs/api/parameters/palette) `<boolean>` — adds dominant colors and accessible color pairs to every image field (default: `false`).

Give a slow page more room to render, retry harder, and name the resulting document:

```js
const { url } = await microlink.pdf('https://example.com/report', {
  timeout: '60s',
  retry: 3,
  filename: 'report.pdf'
})
```

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
