---
title: 'Metadata'
description: 'Extract normalized metadata from any URL with Microlink API, choose the fields you need, and learn the right next step for dynamic pages, response shaping, and private targets.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Metadata extraction with Microlink API requires only one parameter: the target `url`.

Metadata detection is enabled by default, so the standard fields are returned even when you do not pass `meta` explicitly.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://github.com/microlinkhq' }} />

<Figcaption>Run the request and look for normalized fields such as <code>title</code>, <code>description</code>, <code>image</code>, <code>logo</code>, and <code>url</code> inside <code>data</code>.</Figcaption>

That is the base flow: Microlink fetches the page, detects normalized metadata from the available markup, and returns a structured JSON payload you can reuse in previews, feeds, automation, or indexing workflows.

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for the environment-specific setup.

If you are using another language, you do not need to install MQL to follow this guide. You can use the terminal examples or call the API directly from any HTTP client.

## How metadata options work

Because metadata extraction is already enabled, `meta: true` is usually unnecessary. You only need to pass `meta` when you want to customize which fields are detected:

```js
{
  url: 'https://github.com/microlinkhq',
  meta: {
    title: true,
    description: true
  }
}
```

Use the `meta` object when you want a smaller, more intentional payload. In raw query strings, the same options are expressed with dot notation such as `meta.title=true`.

## The response

The standard metadata fields are returned directly inside the response payload:

```json
{
  "status": "success",
  "data": {
    "title": "microlink.io",
    "description": "Browser as API. microlink.io has 57 repositories available. Follow their code on GitHub.",
    "lang": "en",
    "author": null,
    "publisher": "GitHub",
    "image": {
      "url": "https://avatars.githubusercontent.com/u/29799436?s=280&v=4",
      "type": "png",
      "size": 4118,
      "height": 280,
      "width": 280,
      "size_pretty": "4.12 kB"
    },
    "url": "https://github.com/microlinkhq",
    "logo": {
      "url": "https://github.com/fluidicon.png",
      "type": "png",
      "size": 597,
      "height": 32,
      "width": 32,
      "size_pretty": "597 B"
    }
  }
}
```

Most workflows read these fields directly from `data`. Text fields such as `title` or `description` are strings, while media fields such as `image`, `logo`, and `video` return richer objects with dimensions, type, and file size.

## Choose a metadata workflow

| Need | Best option | Why |
|------|-------------|-----|
| You want the standard normalized fields | Default `meta` behavior | Fastest way to get titles, descriptions, images, logos, and more |
| You only need a small subset of fields | `meta` object | Reduces unnecessary detection work and keeps the payload focused |
| You want more than the standard fields | Combine `meta` with `data`, `iframe`, or `palette` | Keeps the normalized metadata while adding custom or enriched fields |

If you already know you only need a few fields, continue with [choosing fields](/docs/guides/metadata/choosing-fields).

## Start smaller when you know what you need

If you only care about a small subset of metadata, detect just those fields:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      title: true,
      description: true
    }
  }}
/>

<Figcaption>Selective detection is the biggest speed and payload win for metadata-focused workflows.</Figcaption>

See the <Link href='/docs/api/parameters/meta' children='meta reference' /> and <Link href='/docs/api/getting-started/data-fields' children='data fields reference' /> for the full field set.

## Using the raw URL

You can call the API directly from your browser address bar or any HTTP client:

```bash
https://api.microlink.io?url=https://github.com/microlinkhq
```

That returns JSON. To return just one field directly, such as `title` or `image.url`, use `embed` in [delivery and response shaping](/docs/guides/metadata/delivery-and-response).

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to test the full metadata workflow and most of the examples in this guide.

For production usage, you'll usually want a <ProBadge /> plan. It unlocks features such as [configurable TTL](/docs/api/parameters/ttl), [stale-while-revalidate caching](/docs/api/parameters/staleTtl), [custom headers](/docs/api/parameters/headers), and [proxy](/docs/api/parameters/proxy).

To authenticate, pass your API key as the `x-api-key` header:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    apiKey: 'YOUR_API_TOKEN'
  }}
/>

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

Throughout this guide, features that require a <ProBadge /> plan are marked inline.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

Pick the next step based on the result you want:

- **[Choosing fields](/docs/guides/metadata/choosing-fields)** — request only the normalized fields you actually need.
- **[Extending results](/docs/guides/metadata/extending-results)** — add custom fields, oEmbed HTML, color palettes, or site analysis.
- **[Delivery and response shaping](/docs/guides/metadata/delivery-and-response)** — keep the full JSON payload, filter it down, or return one field directly.
- **[Page preparation](/docs/guides/metadata/page-preparation)** — handle SPAs, dynamic pages, waits, and browser rendering behavior.
- **[Caching and performance](/docs/guides/metadata/caching-and-performance)** — tune freshness, cache behavior, and request speed.
- **[Private pages](/docs/guides/metadata/private-pages)** — extract metadata from logged-in or header-dependent pages safely.
- **[Troubleshooting](/docs/guides/metadata/troubleshooting)** — fix missing fields, wrong variants, timeouts, and blocked sites.
