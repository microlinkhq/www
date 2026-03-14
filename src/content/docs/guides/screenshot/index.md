---
title: 'Screenshot'
description: 'Take your first website screenshot with Microlink API, learn how screenshot options work, and choose the right delivery mode for your use case.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Taking a screenshot with Microlink API requires two parameters: the target `url` and `screenshot`.

Use `screenshot: true` for the default capture, or pass an object when you need screenshot-specific options such as `fullPage`, `element`, or `type`.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true }} />

<Figcaption>Hit Run to see the live result. The generated asset is returned under <code>data.screenshot.url</code>.</Figcaption>

That's the basic flow: Microlink opens a headless browser, renders the page, captures the current viewport, stores the image on the CDN, and returns the resulting asset metadata.

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for the environment-specific setup.

If you are using another language, you do not need to install MQL to follow this guide. You can use the terminal examples or call the API directly from any HTTP client.

## How screenshot options work

As soon as you want to customize the capture, switch from `true` to a `screenshot` object:

```js
{
  url: 'https://microlink.io',
  screenshot: {
    fullPage: true,
    type: 'jpeg'
  },
  meta: false
}
```

This guide uses the nested object form consistently because it's the clearest way to group screenshot-specific options. In raw query strings, the same options are expressed with dot notation such as `screenshot.fullPage=true`.

## The response

The `screenshot` field in the response contains everything you need to reuse the generated asset:

```json
{
  "status": "success",
  "data": {
    "screenshot": {
      "url": "https://microlink-cdn.s3.amazonaws.com/s/...",
      "type": "png",
      "size": 183864,
      "width": 1920,
      "height": 1080,
      "size_pretty": "184 kB"
    }
  }
}
```

Most application workflows use `data.screenshot.url` directly. It is a CDN-hosted asset you can store, cache, or pass to another service.

## Choose a delivery mode

You have two good ways to consume screenshots:

| Need | Best option | Why |
|------|-------------|-----|
| You want JSON plus screenshot metadata | Default response | You get `data.screenshot.url`, dimensions, type, and size |
| You need an image URL for HTML, CSS, Markdown, or OG tags | `embed: 'screenshot.url'` | The API URL behaves like a direct image |

If you already know you want to use the screenshot in markup, skip straight to [delivery and embedding](/docs/guides/screenshot/embedding).

## Skip metadata for faster responses

By default, the API also extracts page metadata (title, description, images, etc.). If you only need the screenshot, disable it:

<MultiCodeEditorInteractive height={200} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false }} />

<Figcaption>Setting <code>meta: false</code> skips metadata extraction, which is usually the biggest speedup for screenshot-only requests.</Figcaption>

If you still need a couple metadata fields, `meta` also accepts an object for selective extraction. See the <Link href='/docs/api/parameters/meta' children='meta reference' />.

## Using the raw URL

You can call the API directly from your browser address bar or from any HTTP client:

```bash
https://api.microlink.io?url=https://github.com/microlinkhq&screenshot=true&meta=false
```

That returns JSON. To make the API URL behave like a direct image instead, use `embed=screenshot.url` in the [delivery and embedding](/docs/guides/screenshot/embedding) guide.

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to test the full screenshot flow and most of the examples in this guide.

For production usage, you'll usually want a <ProBadge /> plan. It unlocks features such as [configurable TTL](/docs/api/parameters/ttl), [stale-while-revalidate caching](/docs/api/parameters/staleTtl), [custom filenames](/docs/api/parameters/filename), [custom headers](/docs/api/parameters/headers), and [proxy](/docs/api/parameters/proxy).

To authenticate, pass your API key as the `x-api-key` header:

<MultiCodeEditorInteractive height={200} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false, apiKey: 'YOUR_API_TOKEN' }} />

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

Throughout this guide, features that require a <ProBadge /> plan are marked inline.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

Pick the next step based on the result you want:

- **[Customizing output](/docs/guides/screenshot/customizing-output)** — change what gets captured and how the final image looks.
- **[Browser settings](/docs/guides/screenshot/browser-settings)** — control device emulation, viewport, color scheme, media type, and JavaScript.
- **[Page interaction](/docs/guides/screenshot/page-interaction)** — prepare the page before capture by waiting, clicking, scrolling, or injecting code.
- **[Delivery and embedding](/docs/guides/screenshot/embedding)** — choose between JSON + CDN URLs or direct embeddable image responses.
- **[Caching and performance](/docs/guides/screenshot/caching-and-performance)** — tune freshness, cache behavior, and request speed.
- **[Private pages](/docs/guides/screenshot/private-pages)** — capture logged-in or header-dependent pages safely.
- **[Troubleshooting](/docs/guides/screenshot/troubleshooting)** — debug timeouts, antibot protections, wrong captures, and plan-related errors.

## See also

- <Link href='/docs/guides/metadata' children='Metadata' /> — if you need link preview data (title, description, image) instead of a visual capture.
- <Link href='/docs/guides/data-extraction' children='Data extraction' /> — if you need structured data from the page, not just an image.
- <Link href='/docs/guides/pdf' children='PDF' /> — if you need a printable document instead of a screenshot.
