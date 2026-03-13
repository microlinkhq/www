---
title: 'Private pages'
description: 'Extract data from authenticated, session-based, or header-dependent pages without exposing secrets in public Microlink URLs.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

If the target page changes based on cookies, authorization, locale, or geolocation, the extraction rules are only half the problem. You also need the request to reach the right page variant safely.

## Public vs sensitive headers <ProBadge />

Use `headers` for non-sensitive request customization such as locale or user agent:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    headers: {
      'accept-language': 'en-US'
    }
  }}
/>

<Figcaption>Use <code>headers</code> for public request shaping, but remember these values travel as query parameters.</Figcaption>

Anything passed through `headers` is visible in the request URL, so do not put cookies, bearer tokens, or other secrets there.

## Keep secrets out of the URL

For sensitive values, pass them as request headers using the `x-api-header-*` prefix instead:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/private \
  -d data.title.selector=h1 \
  -d data.title.attr=text \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=YOUR_SESSION_COOKIE'
```

That keeps the secret out of the public query string while still forwarding it to the target site.

## Use the right endpoint

Authenticated requests belong on the Pro endpoint:

- `api.microlink.io` for unauthenticated free requests.
- `pro.microlink.io` when you send `x-api-key`.

If you send an API key to the free endpoint, Microlink returns `EPRO`.

## Run MQL from the server

If your extractor needs private headers or cookies, run MQL from your backend, serverless function, or trusted worker instead of directly from the browser.

This keeps:

- your `x-api-key` private
- session cookies out of client-side code
- sensitive extraction logic under your control

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/endpoint' children='endpoint' /> docs for the full setup.

## When proxy is needed <ProBadge />

Some targets block headless traffic, geofence content, or rate-limit the request origin. In those cases, use `proxy`:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
  }}
/>

<Figcaption>Use a proxy URL when the target site blocks automation, needs a specific region, or serves the wrong variant from your default origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target needs a proxy-backed request.

## Next step

If extraction still fails after the auth setup is correct, continue with [troubleshooting](/docs/guides/data-extraction/troubleshooting).
