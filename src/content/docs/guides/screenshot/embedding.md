---
title: 'Embedding'
description: 'Use Microlink screenshots directly in HTML, CSS, Markdown, and Open Graph meta tags. The embed parameter turns the API into a direct image server.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

By default, the API returns JSON containing a screenshot URL. The `embed` parameter changes this behavior — instead of JSON, you get the raw image directly with the appropriate content-type headers. This makes the API URL usable anywhere an image URL is expected.

## How embed works

Set `embed=screenshot.url` to get the image as the response body:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://www.netflix.com/title/80057281',
  screenshot: true,
  meta: false,
  embed: 'screenshot.url'
}} />

<Figcaption>The API URL itself becomes the image. You can use dot notation to reference any nested field in the response payload.</Figcaption>

The `embed` parameter uses dot notation to extract a specific field from the JSON response and return it directly. For screenshots, `screenshot.url` is the one you need. See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for all supported fields and advanced usage.

## HTML

Use the API URL directly as an `<img>` src:

```html
<img
  src="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot&meta=false&embed=screenshot.url"
  alt="Netflix screenshot"
  loading="lazy"
/>
```

The image loads directly — no JavaScript needed, no parsing, no extra requests. This works in any HTML context, including emails and static sites.

## CSS

Use it as a `background-image`:

```css
.hero {
  background-image: url(https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot&meta=false&embed=screenshot.url);
  background-size: cover;
  background-position: center;
}
```

## Markdown

Standard Markdown image syntax works:

```md
![Netflix](https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot&meta=false&embed=screenshot.url)
```

This is useful for documentation, README files, and any Markdown-based CMS.

## Open Graph and social cards

One of the most powerful use cases — generate dynamic social preview images for any page:

```html
<meta property="og:image" content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url">
<meta name="twitter:image" content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url">
```

Every time someone shares your link on Twitter, Slack, Discord, or LinkedIn, they'll see an up-to-date screenshot of the page. Combined with [caching](/docs/guides/screenshot/caching-and-performance), these images are served instantly from the CDN.

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

## Security considerations

When using `embed` URLs in client-side code, your API key is exposed. To protect credentials:

- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

Read more in the <Link href='/docs/api/basics/authentication' children='authentication' /> section.

## Next step

Learn how to optimize screenshot requests for speed and cost in [caching and performance](/docs/guides/screenshot/caching-and-performance).
