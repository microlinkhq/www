---
title: 'Embed: Troubleshooting'
description: 'Debug embed-specific failures: missing iframes, broken images, hot-linking blocks, missing og:image, and inconsistent provider widgets.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

When an embed renders wrong, the cause is usually one of five things: the field you needed wasn't returned, the iframe HTML wasn't injected with its scripts, the source page hot-link-blocks `og:image`, the SDK fetched too late, or the request needed auth or proxy.

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

## The `iframe` field is missing

Not every URL has an oEmbed endpoint. When discovery fails, the response has no `iframe` field — the rest of the metadata is still returned.

Plan for both shapes in your renderer:

```js
const { data } = await mql(url, { iframe: true })

if (data.iframe) {
  container.innerHTML = data.iframe.html
  data.iframe.scripts.forEach(injectScript)
} else {
  container.innerHTML = renderCustomCard(data) // fall back
}
```

The full provider list lives in the <Link href='/docs/api/parameters/iframe#providers-supported' children='iframe parameter reference' />.

## The iframe HTML renders blank or unstyled

Twitter, Instagram, Reddit, and similar widgets need their script tag to actually paint. If you only inject `iframe.html`, you'll see a styled blockquote instead of the real widget.

Inject `iframe.scripts` too:

```js
data.iframe.scripts.forEach(({ src, async, charset }) => {
  if (document.querySelector(`script[src="${src}"]`)) return // dedupe
  const script = document.createElement('script')
  script.src = src
  if (async) script.async = true
  if (charset) script.charset = charset
  document.head.appendChild(script)
})
```

Dedupe matters because the same script (`platform.twitter.com/widgets.js`) gets returned for every Tweet embed on the page.

## `og:image` is missing or low-resolution

Many sites either skip `og:image` entirely or ship a small social-media-only thumbnail. Replace it with a real capture:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://example.com/post',
  screenshot: true,
  embed: 'screenshot.url'
}} />

<Figcaption>The API URL itself becomes the image. Use this in <code>&lt;img src&gt;</code> or <code>&lt;meta property="og:image"&gt;</code>.</Figcaption>

Or fall back inside your renderer:

```js
const heroImage = data.image?.url ?? data.screenshot?.url
```

## The image works in the browser but not in `<img>`

Some sites block hot-linking based on `Referer`. The screenshot stays loadable from the browser's address bar but breaks inside another page's `<img>`.

Two options:

1. **Use `embed=image.url`** — this re-serves the asset through `api.microlink.io`, with permissive CORS and no referrer check.

   ```html
   <img src="https://api.microlink.io?url=https://stripe.com&embed=image.url" />
   ```

2. **Use a screenshot capture instead** — Microlink renders the page itself, so the resulting image is hosted on Microlink's CDN and never re-requests the source.

   ```html
   <img src="https://api.microlink.io?url=https://stripe.com&screenshot&meta=false&embed=screenshot.url" />
   ```

## The SDK preview never loads

The SDK is lazy by default — it only fetches when the card enters the viewport. If you embed it inside a hidden tab, accordion, or `display: none` container, it never triggers.

Two fixes:

```jsx
// 1. Disable lazy when the container is conditionally hidden
<Microlink url='...' lazy={false} />

// 2. Or expand the rootMargin so it fires earlier
<Microlink url='...' lazy={{ rootMargin: '600px' }} />
```

See <Link href='/docs/sdk/parameters/lazy' children='lazy reference' />.

## Inconsistent results across runs

If the same URL returns different metadata on different days, the cause is usually one of:

- **The source changed.** Default cache TTL is 24h. Pin to a fixed window with `ttl='7d'`.
- **The page is JS-rendered.** Some metadata only appears after hydration. The default rendering mode handles most cases, but for SPA-heavy targets you may need <Link href='/docs/api/parameters/waitForSelector' children='waitForSelector' /> or <Link href='/docs/api/parameters/waitUntil' children='waitUntil' />.
- **Different IP regions see different content.** Localized pricing, A/B tests, or geofences. Pin region with <Link href='/docs/guides/common/proxy#geolocation-target-region-specific-content' children='proxy' />.

## Embed URL works in some contexts but not others

Slack, Discord, X, LinkedIn, and email clients each cache embed URLs differently. Common gotchas:

| Symptom | Likely cause |
|---------|--------------|
| The image updated but Slack still shows the old one | Slack's image cache is sticky — change the URL by appending `&v=N`. |
| Twitter shows the title but no image | Twitter Cards requires `meta` tags on **your** page, not on the API URL. Reference the embed URL in `twitter:image`. |
| Email client renders a placeholder | Many email clients block remote images by default. Use a screenshot capture and a stable URL. |

## Provider-specific quirks

A short list:

- **YouTube** — switch to `youtube-nocookie.com` after fetching by replacing the host inside `iframe.html` if you need cookieless embeds.
- **Spotify** — the Spotify embed expects fixed dimensions; pass `iframe={{ maxWidth: 600 }}` when discovery returns a too-narrow value.
- **X / Twitter** — Twitter sometimes returns a blockquote-only embed when the tweet is geo-restricted. Test with multiple URLs from different accounts.
- **Instagram** — the Instagram widget script is large; defer it until the first Instagram embed enters the viewport.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' />, the <Link href='/docs/api/parameters/iframe' children='iframe parameter reference' />, the <Link href='/docs/api/parameters/embed' children='embed parameter reference' />, or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for timeouts, auth, and plan errors.

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
