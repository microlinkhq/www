---
title: 'Private pages'
description: 'Access authenticated, session-based, or header-dependent pages safely. Choose between public headers and secret forwarding, use the right endpoint, and keep credentials secure.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

These authentication patterns apply to every Microlink workflow: screenshots, PDFs, data extraction, metadata, and insights. Each guide's own private pages section covers workflow-specific examples; this page covers the shared patterns.

## Choose the right header path <ProBadge />

| Situation | Use | Why |
|-----------|-----|-----|
| Language, user-agent, or other non-sensitive values | `headers` parameter | Fine when the value is safe to expose in the URL |
| Cookies, bearer tokens, or secrets | `x-api-header-*` request headers | Keeps credentials out of the public query string |

Both approaches require a <ProBadge /> plan.

## Non-sensitive headers <ProBadge />

Use `headers` when the value is safe to appear in the URL:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://example.com',
  headers: {
    'Accept-Language': 'es-ES'
  }
}} />

<Figcaption>Good for locale and request shaping. Avoid putting cookies or authorization tokens here because query parameters are public.</Figcaption>

## Sensitive headers and cookies <ProBadge />

For cookies, authorization tokens, or any other secret, pass the value as an HTTP header on the Microlink request itself using the `x-api-header-*` prefix:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/dashboard \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123' \
  -H 'x-api-header-authorization: Bearer YOUR_BEARER_TOKEN'
```

Microlink strips the `x-api-header-` prefix and forwards the original header to the target page. Any header can be forwarded this way:

- `x-api-header-cookie`
- `x-api-header-authorization`
- `x-api-header-x-my-custom-header`

## Use MQL from the server

Keep credentials in the request headers passed via `httpOptions`, not in public client-side code:

```js
import mql from '@microlink/mql'

const { data } = await mql(
  'https://example.com/dashboard',
  {
    headers: {
      'accept-language': 'es-ES'
    }
  },
  {
    headers: {
      'x-api-key': process.env.MICROLINK_API_KEY,
      'x-api-header-cookie': `session=${process.env.SESSION_COOKIE}`
    }
  }
)
```

See the <Link href='/docs/mql/getting-started/api' children='MQL API reference' /> for more on `httpOptions`.

## Use the correct endpoint

- `https://api.microlink.io` — unauthenticated, free-tier requests.
- `https://pro.microlink.io` — authenticated requests with `x-api-key`.

If you send `x-api-key` to the free endpoint, the request fails with `EPRO`. See the <Link href='/docs/api/basics/endpoint' children='endpoint docs' /> and <Link href='/docs/api/basics/authentication' children='authentication docs' />.

## Keep credentials out of the browser

Do not expose API keys, cookies, or authorization headers in client-side code or public embed URLs.

- Keep authenticated requests on your backend whenever possible.
- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

This is especially important when you use `embed` in public markup, because the full URL can end up in HTML source, logs, or browser devtools.

## Proxy for blocked or geofenced sites <ProBadge />

When the target site blocks headless browsers, geofences content, or triggers antibot protection, use `proxy`:

<MultiCodeEditorInteractive height={210} mqlCode={{
  url: 'https://example.com',
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
}} />

<Figcaption>Use a proxy URL when the target site blocks automation, needs a specific region, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target needs a proxy-backed request. See the <Link href='/docs/api/parameters/proxy' children='proxy reference' />.
