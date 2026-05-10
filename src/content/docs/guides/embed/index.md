---
title: 'Embed'
description: 'Turn any URL into a rich preview, an interactive iframe, or a custom-styled card. Choose between the SDK, the oEmbed iframe, and metadata-driven HTML/CSS, and learn the right tool for each workflow.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Embedding with Microlink means turning a plain URL into something a reader can preview, play, or click — a card, an interactive iframe, or a hand-styled HTML block. Every approach starts from the same API call.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.youtube.com/watch?v=9P6rdqiybaw' }} />

<Figcaption>The default response already returns the normalized fields — <code>title</code>, <code>description</code>, <code>image</code>, <code>logo</code>, <code>publisher</code> — needed to render any kind of preview.</Figcaption>

You can stop there and render previews yourself, ask the API for a ready-to-paste oEmbed iframe, or drop in the SDK component and let it handle the rest.

## Three ways to embed

| When you need | Use | Result |
|---------------|-----|--------|
| A drop-in component that handles fetching, caching, and rendering | <Link href='/docs/guides/embed/sdk' children='SDK' /> | One React/Vue/Vanilla component, themeable via CSS |
| The provider's native interactive player (YouTube, Spotify, X, Vimeo) | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> | Ready-to-inject `html` + `scripts` from oEmbed |
| Full control over markup and styling | <Link href='/docs/guides/embed/metadata-api' children='Metadata API + custom HTML' /> | Custom card built from `data.title`, `data.image.url`, `data.logo.url`… |

Each approach is documented as its own guide below. They are not mutually exclusive — a single page can use the SDK for some links, custom HTML for hero blocks, and `iframe` for media that needs the original player.

## The response

The free metadata response is the foundation for every embed:

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

Add `iframe: true` to get an `iframe` field with the provider's interactive embed. Add `palette: true` to get brand colors alongside every image. Add `screenshot: true` when the page has no usable `og:image` and you want a real capture instead.

## Pick a delivery shape

The `embed` parameter changes the *shape* of the response, not what the API extracts. It is independent of the SDK and the iframe parameter:

| You want | Set |
|----------|-----|
| JSON with every field — your code reads `data.image.url` | Default — no `embed` |
| The asset itself returned as the response body (HTML/CSS/Markdown `<img>`) | `embed=image.url`, `embed=screenshot.url`, `embed=logo.url`… |

Direct embed turns the API URL into a usable image src. Useful for `<meta property="og:image">`, README files, and CMS markdown. See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for the full field list.

## MQL installation

To run the JavaScript examples, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for environment-specific setup.

If you call the API directly with `fetch`, `curl`, or any HTTP client, you do not need to install anything — every example here also works as a plain HTTPS GET to `https://api.microlink.io`.

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to build and ship a real embed integration.

For production, a <ProBadge /> plan unlocks features that matter for embeds specifically: <Link href='/docs/api/parameters/ttl' children='configurable TTL' />, <Link href='/docs/api/parameters/staleTtl' children='stale-while-revalidate caching' />, <Link href='/docs/api/parameters/headers' children='custom headers' /> for private pages, and <Link href='/docs/api/parameters/proxy' children='proxy' /> for blocked or geofenced URLs.

To authenticate, pass your API key as `x-api-key`:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
  apiKey: 'YOUR_API_TOKEN'
}} />

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

See <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> for the full details.

## What's next

Pick the next step based on how you plan to ship embeds:

- **<Link href='/docs/guides/embed/sdk' children='SDK' />** — drop a React, Vue, or Vanilla component into your app and let it handle fetching, lazy-loading, and rendering.
- **<Link href='/docs/guides/embed/iframe' children='iframe parameter' />** — return ready-to-inject HTML and scripts from oEmbed providers (YouTube, Spotify, X, Vimeo, and 280+ more).
- **<Link href='/docs/guides/embed/metadata-api' children='Metadata API with custom HTML/CSS' />** — render previews entirely in your own markup, with full control over layout, animation, and accessibility.
- **<Link href='/docs/guides/embed/custom-previews-with-ai' children='Generate custom previews with AI' />** — paste prompts into Cursor, Claude Code, or your IDE assistant to generate previews styled to your project, no SDK required.
- **<Link href='/docs/guides/embed/caching-and-performance' children='Caching and performance' />** — keep embeds fast at scale with TTL, stale-while-revalidate, and hot-cache patterns.
- **<Link href='/docs/guides/embed/private-pages-and-proxy' children='Private pages and proxy' />** — embed authenticated dashboards, geofenced content, and pages protected by antibot systems.
- **<Link href='/docs/guides/embed/troubleshooting' children='Troubleshooting' />** — debug missing iframes, broken images, hot-linking issues, and provider-specific quirks.

## See also

- <Link href='/docs/guides/metadata' children='Metadata' /> — when you only need the data (titles, descriptions, images) and have your own renderer.
- <Link href='/docs/guides/screenshot' children='Screenshot' /> — when the page has no usable `og:image` and you want a real capture as the preview.
- <Link href='/docs/sdk/getting-started/overview' children='SDK reference' /> — the full SDK reference with every prop and integration.
- <Link href='/docs/api/parameters/iframe' children='iframe parameter reference' /> — the authoritative parameter docs and provider list.
