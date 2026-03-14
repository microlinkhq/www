---
title: 'Delivery and embedding'
description: 'Choose the right way to consume Microlink screenshots. Use JSON responses and CDN URLs in app workflows, or embed screenshots directly in HTML, CSS, Markdown, and OG tags.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

After a screenshot is generated, you can either consume it as structured JSON or turn the API URL into a direct image. The right choice depends on where the screenshot is going next.

## Two delivery models

| When you need                | Use | Result |
|------------------------------|-----|--------|
| Screenshot metadata inside an app or backend workflow | Default JSON response | Read the asset from `data.screenshot.url` |
| A direct image URL for HTML, CSS, Markdown, or social tags | `embed: 'screenshot.url'` | The API URL itself behaves like an image |

## JSON plus CDN URL

The default response gives you the screenshot metadata plus a CDN-hosted asset URL:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://github.com/microlinkhq',
  screenshot: true,
  meta: false
}} />

<Figcaption>Use <code>data.screenshot.url</code> when your application already expects JSON.</Figcaption>

This is the best fit for server-side workflows, queues, automation jobs, and UI code that wants to keep the JSON response around.

## Direct image with embed

Set `embed=screenshot.url` to return the image as the response body:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://github.com/microlinkhq',
  screenshot: true,
  meta: false,
  embed: 'screenshot.url'
}} />

<Figcaption>The API URL itself becomes the image. You can use dot notation to reference any nested field in the response payload.</Figcaption>

The `embed` parameter uses dot notation to extract a specific field from the JSON response and return it directly. For screenshots, `screenshot.url` is the field you want. See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for all supported fields and advanced usage.

## HTML

Use the API URL directly as an `<img>` src:

```html
<img
  src="https://api.microlink.io?url=https://github.com/microlinkhq&screenshot&meta=false&embed=screenshot.url"
  alt="GitHub screenshot"
  loading="lazy"
/>
```

The image loads directly — no JavaScript needed, no parsing, no extra requests. This works in any HTML context, including emails and static sites.

## CSS

Use it as a `background-image`:

```css
.hero {
  background-image: url(https://api.microlink.io?url=https://github.com/microlinkhq&screenshot&meta=false&embed=screenshot.url);
  background-size: cover;
  background-position: center;
}
```

## Markdown

Standard Markdown image syntax works:

```md
![GitHub](https://api.microlink.io?url=https://github.com/microlinkhq&screenshot&meta=false&embed=screenshot.url)
```

This is useful for documentation, README files, and any Markdown-based CMS.

## Open Graph and social cards

One of the most powerful use cases — generate dynamic social preview images for any page:

```html
<meta property="og:image" content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url">
<meta name="twitter:image" content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url">
```

Every time someone shares your link on Twitter, Slack, Discord, or LinkedIn, they can receive an up-to-date screenshot of the page. Combined with [caching](/docs/guides/screenshot/caching-and-performance), these images are served quickly from cache whenever possible.

## Embedding with customization

All screenshot parameters work with `embed`. For example, a mobile screenshot with a browser overlay:

<MultiCodeEditorInteractive height={320} mqlCode={{
  url: 'https://microlink.io',
  screenshot: {
    overlay: {
      background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
      browser: 'dark'
    }
  },
  device: 'iPhone 15 Pro',
  meta: false,
  embed: 'screenshot.url'
}} />

<Figcaption>Generate and embed a mobile screenshot with a browser overlay in a single URL.</Figcaption>

The equivalent URL:

```bash
https://api.microlink.io?url=https://microlink.io&screenshot.overlay.background=linear-gradient(225deg,%20%23FF057C%200%25,%20%238D0B93%2050%25,%20%23321575%20100%25)&screenshot.overlay.browser=dark&device=iPhone%2015%20Pro&meta=false&embed=screenshot.url
```

## Filtering JSON responses

If you still want JSON but only need the screenshot field, use `filter`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false, filter: 'screenshot' }} />

<Figcaption>The response only includes the <code>screenshot</code> field. This is useful for JSON workflows, but unnecessary when you already use <code>embed</code>.</Figcaption>

See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot notation and multiple fields.

## Custom filename <ProBadge />

The `filename` parameter lets you assign a meaningful name to the generated screenshot asset:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false, filename: 'github-microlink' }} />

<Figcaption>Helpful when you are downloading assets, organizing archives, or generating user-facing files with readable names.</Figcaption>

## Security considerations

If the request needs an API key, cookies, or authorization headers, do not expose those values in client-side code or public embed URLs. Keep the request on the server side or protect it with a proxy:

- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

Read more in the <Link href='/docs/api/basics/authentication' children='authentication' /> docs and the [private pages](/docs/guides/screenshot/private-pages) guide.

## Next step

Learn how to optimize screenshot requests for speed and cost in [caching and performance](/docs/guides/screenshot/caching-and-performance).
