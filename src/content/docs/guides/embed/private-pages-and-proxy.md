---
title: 'Embed: Private pages and proxy'
description: 'Embed authenticated dashboards, geofenced content, and pages blocked by antibot systems. Forward credentials safely, route through proxies, and keep secrets out of public embed URLs.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Most embeds are for public pages. The hard cases are private dashboards, region-locked products, and sites that block headless browsers. Both require <ProBadge /> features — `headers`, `x-api-header-*`, and `proxy` — plus extra discipline because embed URLs are public by nature.

The shared patterns live in <Link href='/docs/guides/common/private-pages' children='private pages patterns' /> and <Link href='/docs/guides/common/proxy' children='proxy patterns' />. This page covers the embed-specific setup.

## The embed URL is public

Whatever you put in an embed URL ends up in HTML, browser devtools, server logs, social previews, and downstream caches. That changes the threat model:

| Approach | Safe in public embed URLs? |
|----------|---------------------------|
| `headers={ 'accept-language': 'es-ES' }` (locale-only) | Yes — value is non-sensitive |
| `headers={ 'cookie': '...' }` (sensitive) | **No** — exposes credentials |
| `x-api-header-cookie: ...` request header | Yes — sent server-to-server, never in the embed URL |
| `proxy=https://user:pass@...` query param | **No** — leaks proxy credentials |
| `proxy` set inside an MQL call from the server | Yes — never reaches the browser |

The rule: only **non-sensitive** values belong in the embed URL. Everything else stays server-side, behind a backend that proxies the call to Microlink.

## Embed an authenticated dashboard <ProBadge />

Use `x-api-header-*` to forward the cookie or bearer token without exposing it:

```bash
curl -G https://pro.microlink.io \
  -d url=https://app.example.com/dashboard \
  -d screenshot=true \
  -d embed=screenshot.url \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

The response is the screenshot bytes — usable as an `<img src>` in an internal portal or a logged-in user's email. The cookie never reaches the browser because the request lives on your backend.

For non-sensitive values like locale or accept-language, the URL-based `headers` parameter is fine:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://example.com/pricing',
  screenshot: true,
  meta: false,
  headers: {
    'Accept-Language': 'es-ES'
  },
  embed: 'screenshot.url'
}} />

<Figcaption>The locale-aware capture is rendered for an embedding without leaking secrets.</Figcaption>

## Front public embeds with a proxy server

When the embed URL must be visible (a public OG image, a marketing card) but the request needs a key or cookies, run your own proxy:

- <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted Node.js / Express.
- <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for Cloudflare Workers and edge runtimes.

Your public URL becomes `https://my-app.example.com/og?slug=hello`. The proxy converts that to a Microlink call with the API key and any `x-api-header-*` it needs, then streams the response back. The browser never sees the credentials.

For the architecture in detail, see <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

## Embed sites blocked by antibot systems <ProBadge />

If the target page returns a CAPTCHA, an antibot challenge, or `EPROXYNEEDED`, you need a proxy.

Pro plans include **automatic proxy resolution** — the API detects the antibot provider and routes through the right pool without you setting `proxy` at all:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://difficult-target.example',
  screenshot: true,
  meta: false,
  embed: 'screenshot.url'
}} />

<Figcaption>On a Pro plan, the API quietly resolves the antibot when it detects one. The <code>x-fetch-mode</code> response header will be prefixed with <code>proxy-</code>.</Figcaption>

You can also pass your own proxy URL when you have a residential or country-specific service:

```js
import mql from '@microlink/mql'

const { data } = await mql('https://example.com/pricing', {
  proxy: process.env.PROXY_URL,
  meta: false
})

return data.screenshot.url // hand this to your embed renderer
```

Keep that call server-side — never expose the `proxy=` param in a public embed URL.

For the full proxy reference (when, how, and how to verify), see <Link href='/docs/guides/common/proxy' children='proxy patterns' />.

## Geofenced content

A common embed use case: a product whose homepage shows different prices per country, and you want each region's preview cached separately. Combine `proxy` (for the IP region) with a content-hash cache buster (so each region cache is independent):

```js
async function regionalEmbed (region) {
  const proxy = PROXIES[region] // e.g. 'https://user:pass@us-proxy.example.com:8080'
  const { data } = await mql('https://example.com/pricing', {
    proxy,
    screenshot: true,
    meta: false
  })
  return data.screenshot.url
}
```

Render the resulting URL into your `<meta property="og:image">` for that locale. Pair with `ttl: '1d'` and `staleTtl: 0` so each region's variant stays warm. See <Link href='/docs/guides/common/proxy#geolocation-target-region-specific-content' children='geolocation patterns' />.

## When private embeds still fail

If `x-api-header-*` and `proxy` are both set and the embed still returns wrong content:

- Confirm the cookie / token has not expired. Authenticated previews are only as fresh as the credential.
- Check `x-fetch-mode` — anything other than `proxy-*` means the proxy did not engage.
- Look for `EPROXYNEEDED` or `EAUTH` in the response body. See <Link href='/docs/api/basics/error-codes' children='error codes' />.

For the rest, continue to <Link href='/docs/guides/embed/troubleshooting' children='troubleshooting' />.

## Next step

For debugging missing iframes, broken images, and provider-specific quirks, see <Link href='/docs/guides/embed/troubleshooting' children='troubleshooting' />.
