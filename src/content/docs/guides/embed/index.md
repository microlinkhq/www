---
title: 'Embed'
description: 'Turn any URL into a rich preview, an interactive player, or a plain asset URL. Pick the SDK, the oEmbed iframe, or metadata-driven HTML — every approach starts from the same API call.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink turns any URL into a rich preview, an interactive player, or a plain asset URL — pick how it gets rendered.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.youtube.com/watch?v=9P6rdqiybaw' }} />

<Figcaption>The default response already returns the normalized fields — <code>title</code>, <code>description</code>, <code>image</code>, <code>logo</code>, <code>publisher</code> — needed to render any kind of preview.</Figcaption>

## Shortcut: drop in the SDK

If you just want a preview rendered on the page, skip everything below and use the SDK. One component, one prop, no API call to write:

```jsx
import Microlink from '@microlink/react'

<Microlink url='https://stripe.com' />
```

The SDK handles the API call, the iframe-vs-card decision, lazy-loading, and rendering. Available for React, Vue, and Vanilla JavaScript. See the <Link href='/docs/guides/embed/sdk' children='SDK guide' />.

## Granular control: four steps

When you need the provider's native player, your own HTML, server-rendered output, or any custom delivery, walk through the workflow below. The SDK is a higher-level wrapper around these same four steps — calling them yourself unlocks the full surface.

1. **Call the API** with a `url`. Add `iframe: true`, `palette: true`, or `screenshot: true` when you also want the provider's player, brand colors, or a fresh capture.
2. **Read the response.** Microlink returns normalized JSON with `data.title`, `data.image.url`, `data.logo.url`, plus the optional fields you asked for.
3. **Pick how to render it** — the provider's native iframe, or your own HTML built from the JSON.
4. **Render it.** Inject the iframe HTML, or paste the JSON into your template.

The rest of this page walks through each step and links out to the subguide that fits the path you pick.

## "Embed" means three things

The word collides. To keep this guide unambiguous:

| Where you see it | What it means |
|------------------|---------------|
| *Embed* in prose | The product workflow: rendering a URL as a preview |
| `embed` in monospace | The API parameter that returns an asset (image, screenshot, logo, ...) as the response body |
| The SDK component | The `<Microlink>` React, Vue, or Vanilla component that wraps the four-step workflow |

Each section below states which one it means.

## Step 1 — Call the API

To run the JavaScript examples, install MQL:

```bash
npm install @microlink/mql --save
```

It works in Node.js, edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for environment-specific setup.

If you call the API directly with `fetch`, `curl`, or any HTTP client, you do not need to install anything — every example also works as a plain HTTPS GET to `https://api.microlink.io`.

Every example in this guide uses the same canonical shape:

```js
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', { /* options */ })
```

The options object is equivalent to a query string: `mql(url, { iframe: true })` is the same call as `?url=…&iframe=true`.

## Step 2 — Read the response

The base response is the foundation for every embed:

```json
{
  "status": "success",
  "data": {
    "title": "Wormholes Explained – Breaking Spacetime",
    "description": "Are wormholes real or are they just magic disguised as physics and maths?",
    "publisher": "YouTube",
    "author": "Kurzgesagt – In a Nutshell",
    "url": "https://www.youtube.com/watch?v=9P6rdqiybaw",
    "image": {
      "url": "https://img.youtube.com/vi/9P6rdqiybaw/maxresdefault.jpg",
      "width": 1280,
      "height": 720
    },
    "logo": {
      "url": "https://www.youtube.com/s/desktop/.../favicon_144x144.png"
    }
  }
}
```

Three optional flags extend this response:

| Add | You get |
|-----|---------|
| `iframe: true` | `data.iframe.html` + `data.iframe.scripts` — the provider's interactive embed (YouTube, Spotify, Twitter, ...) |
| `palette: true` | Brand colors and contrast-checked color pairs on every image and logo |
| `screenshot: true` | A fresh capture of the page under `data.screenshot.url`, useful when `og:image` is missing or bad |

## Step 3 — Pick how to render it

Two rendering approaches, same JSON underneath:

| When you need | Use | Result |
|---------------|-----|--------|
| The provider's native interactive player (YouTube, Spotify, X, Vimeo) | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> | Ready-to-inject `html` + `scripts` from oEmbed |
| Full control over markup and styling | <Link href='/docs/guides/embed/metadata-api' children='Metadata API + custom HTML' /> | Custom card built from `data.title`, `data.image.url`, `data.logo.url`… |

They are not mutually exclusive — a single page can use custom HTML for hero blocks and `iframe` for media that needs the original player.

If you want your AI coding assistant to write the custom HTML against your design system, see <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' /> — it's a flavor of the custom-HTML approach with ready-to-paste prompts.

### Choosing between the two

- **iframe parameter** when the URL has a real player (YouTube, Spotify) and you want *the provider's* widget, not a card.
- **Metadata API + custom HTML** when previews must match your design system, you need server-rendered output, or you ship to environments without client JavaScript.

(Still want the wrapper component instead? Jump back to the <Link href='/docs/guides/embed/sdk' children='SDK guide' />.)

## Step 4 — Render it

Each rendering approach has its own subguide with runnable examples — pick one and the rest of the guide is linear:

- <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> — inject `iframe.html` and load `iframe.scripts`.
- <Link href='/docs/guides/embed/metadata-api' children='Metadata API with custom HTML/CSS' /> — render your own card from `data.*`.
- <Link href='/docs/guides/embed/custom-previews-with-ai' children='Generate custom previews with AI' /> — prompt Cursor or Claude Code to write the markup.

### Direct embed — skip the JSON

If you only need a single asset URL (an image, a screenshot, a logo) in static markup, the `embed` parameter turns the API URL itself into that asset:

```html
<img
  src="https://api.microlink.io?url=https://stripe.com&embed=image.url"
  alt="Stripe"
/>
```

It is the same pipeline as before — `embed` just tells the API to return the field's content instead of wrapping it in JSON. Useful for `<meta property="og:image">`, READMEs, and CMS markdown. See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for the full field list.

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, enough to build and ship a real embed integration.

For production, a <ProBadge /> plan unlocks features that matter for embeds specifically: <Link href='/docs/api/parameters/ttl' children='configurable TTL' />, <Link href='/docs/api/parameters/staleTtl' children='stale-while-revalidate caching' />, <Link href='/docs/api/parameters/headers' children='custom headers' /> for private pages, and <Link href='/docs/api/parameters/proxy' children='proxy' /> for blocked or geofenced URLs.

To authenticate, pass your API key as `x-api-key`:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
  apiKey: 'YOUR_API_TOKEN'
}} />

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

See <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> for the full details.

## Cross-cutting concerns

These apply no matter which rendering approach you pick:

- <Link href='/docs/guides/embed/caching-and-performance' children='Caching and performance' /> — keep embeds fast at scale with TTL, stale-while-revalidate, and hot-cache patterns.
- <Link href='/docs/guides/embed/private-pages-and-proxy' children='Private pages and proxy' /> — embed authenticated dashboards, geofenced content, and pages protected by antibot systems.
- <Link href='/docs/guides/embed/troubleshooting' children='Troubleshooting' /> — debug missing iframes, broken images, hot-linking issues, and provider-specific quirks.

## See also

- <Link href='/docs/guides/metadata' children='Metadata' /> — when you only need the data (titles, descriptions, images) and have your own renderer.
- <Link href='/docs/guides/screenshot' children='Screenshot' /> — when the page has no usable `og:image` and you want a real capture as the preview.
- <Link href='/docs/sdk/getting-started/overview' children='SDK reference' /> — the full SDK reference with every prop and integration.
- <Link href='/docs/api/parameters/iframe' children='iframe parameter reference' /> — the authoritative parameter docs and provider list.
