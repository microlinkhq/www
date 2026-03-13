---
title: 'Private pages'
description: 'Extract metadata from pages behind logins, sessions, or header-based personalization. Learn when to use headers, how to pass secrets safely, and when the Pro endpoint is required.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Metadata extraction from private dashboards, localized experiences, or staged environments is possible, but the setup depends on whether the values you need to send are public or sensitive.

Most of these workflows require a <ProBadge /> plan because they rely on authenticated requests, custom headers, or proxying.

## Choose the right header path

| Situation | Use | Why |
|-----------|-----|-----|
| Language, user-agent, or other non-sensitive request shaping | `headers` | Fine when the value is safe to expose in the URL |
| Cookies, bearer tokens, or other secrets | Request headers with `x-api-header-*` | Keeps credentials out of the public query string |

Both approaches require a <ProBadge /> plan.

## Non-sensitive headers <ProBadge />

Use `headers` when the value is safe to expose, for example an `Accept-Language` override:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://example.com',
    meta: {
      title: true,
      description: true
    },
    headers: {
      'Accept-Language': 'es-ES'
    }
  }}
/>

<Figcaption>Good for locale or request shaping. Avoid putting cookies or authorization tokens here because query parameters are public.</Figcaption>

## Sensitive headers and cookies <ProBadge />

For cookies, authorization tokens, or any other secret, pass the value as an HTTP header on the Microlink request itself using the `x-api-header-*` prefix:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/private \
  -d meta.title=true \
  -d meta.description=true \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

The same pattern works for any forwarded header:

- `x-api-header-cookie`
- `x-api-header-authorization`
- `x-api-header-x-my-custom-header`

Microlink strips the `x-api-header-` prefix and forwards the original header to the target page.

## Use MQL from the server

If you are using `@microlink/mql`, keep credentials in the request headers passed via `httpOptions`, not inside public client-side code:

```js
import mql from '@microlink/mql'

const { data } = await mql(
  'https://example.com/private',
  {
    meta: {
      title: true,
      description: true
    },
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

When you make raw HTTP requests:

- Use `https://api.microlink.io` for unauthenticated requests.
- Use `https://pro.microlink.io` for authenticated requests with `x-api-key`.

If you send `x-api-key` to the free endpoint, the request fails with `EPRO`. See the <Link href='/docs/api/basics/endpoint' children='endpoint docs' /> and <Link href='/docs/api/basics/authentication' children='authentication docs' />.

## Keep credentials out of the browser

Do not expose API keys, cookies, or authorization headers in client-side code or public embed URLs.

- Keep authenticated metadata requests on your backend whenever possible.
- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

This is especially important when you use `embed` to expose fields such as `title`, `description`, or `image.url` via a shareable URL.

## When private pages still fail

If the page is authenticated **and** protected by antibot systems, CAPTCHAs, geofencing, or IP rules, you may also need [proxy](/docs/api/parameters/proxy) <ProBadge />.

For timeout errors, wrong endpoint issues, or antibot failures such as `EPROXYNEEDED`, continue with [troubleshooting](/docs/guides/metadata/troubleshooting).

## Next step

Learn how to debug missing fields, wrong page variants, and blocked sites in [troubleshooting](/docs/guides/metadata/troubleshooting).
