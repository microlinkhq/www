---
title: 'Proxy'
description: 'Bypass IP blocking, CAPTCHAs, antibot protection, and regional restrictions using automatic or custom proxy rotation. Applies to every Microlink workflow.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

These proxy patterns apply to every Microlink workflow: screenshots, PDFs, data extraction, metadata, and insights. Use them whenever a target site blocks headless browsers, enforces rate limits on a specific IP, or geofences content by region.

## When you need a proxy

Not every site needs one. Use a proxy when you encounter:

| Signal | What is happening |
|--------|------------------|
| `EPROXYNEEDED` error code | The API detected blocking and the request cannot succeed without a proxy |
| Empty or partial results on a known-good URL | The target is returning a CAPTCHA or an antibot challenge page |
| Works locally but not via the API | Your origin IP is blocked or throttled by the target |
| Content differs by region | The target serves different content based on geographic IP |

## Automatic proxy <ProBadge />

Every <ProBadge /> plan includes **automatic proxy resolution** — you do not need to supply a proxy URL. When Microlink detects that a site requires a proxy to fetch correctly, it routes the request through a rotating proxy pool automatically.

The automatic pool is continuously tested against the [Top 500 most popular worldwide websites](/blog/proxy-capabilities). For most blocked sites, enabling the Pro plan is all that is required.

You can confirm automatic proxy was used by checking the `x-fetch-mode` response header. Any value prefixed with `proxy-` means a proxy was active:

```bash
x-fetch-mode: prerender-proxy
```

## Bring your own proxy <ProBadge />

If you have a dedicated proxy service — for example a residential proxy with a specific country IP — pass the proxy URL using the `proxy` parameter:

<MultiCodeEditorInteractive height={210} mqlCode={{
  url: 'https://geolocation.microlink.io',
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
}} />

<Figcaption>The <code>x-fetch-mode</code> response header will be prefixed with <code>proxy-*</code> when the request routes through your proxy.</Figcaption>

The proxy URL must be a valid [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api). The supported format is:

```
https://username:password@hostname:port
```

All sub-requests made while resolving the target URL (redirects, assets, dynamic fetches) go through the same proxy server.

## Verify proxy is active

Check these response headers to confirm a proxy was used:

| Header | Expected value |
|--------|---------------|
| `x-fetch-mode` | Any value starting with `proxy-` (e.g. `prerender-proxy`, `fetch-proxy`) |
| `x-pricing-plan` | `pro` — proxy requires a paid plan |
| `x-cache-status` | `BYPASS` on a fresh uncached request |

A full response using a proxy looks like:

```bash{5}
HTTP/2 200
content-type: application/json; charset=utf-8
x-response-time: 1.7s
x-pricing-plan: pro
x-fetch-mode: prerender-proxy
x-cache-ttl: 86400000
x-request-id: iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status: BYPASS
cache-control: public, must-revalidate, max-age=0
```

## Combine proxy with other parameters

Proxy works with every workflow parameter. Some useful combinations:

### Screenshot through a proxy

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://microlink.io',
  screenshot: true,
  meta: false,
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
}} />

<Figcaption>Adding <code>meta: false</code> skips metadata extraction and focuses the request on the screenshot alone.</Figcaption>

### Data extraction through a proxy

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://microlink.io',
  data: {
    title: { selector: 'h1', attr: 'text' }
  },
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001',
  meta: false
}} />

<Figcaption>Pass custom extraction rules alongside a proxy when the target requires one to deliver content.</Figcaption>

### Proxy with retry for flaky targets

Some proxy endpoints are temporarily unreachable or the target site intermittently challenges requests. Combine `proxy` with `retry` to handle transient failures automatically:

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://microlink.io',
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001',
  retry: 3,
  meta: false
}} />

<Figcaption>Server-side retries with exponential backoff reduce failures from temporarily blocked or slow proxy connections.</Figcaption>

## Geolocation: target region-specific content

A common use case is scraping a site that serves different content depending on the visitor's country. Route through a country-specific proxy IP to get the version you need:

```js
import mql from '@microlink/mql'

const { data } = await mql('https://example.com/pricing', {
  proxy: 'https://user:pass@fr-proxy.example.com:8080',
  meta: false
})
```

Pair this with a reliable geolocation test URL to verify the proxy is resolving from the expected country before sending production requests:

<MultiCodeEditorInteractive height={210} mqlCode={{
  url: 'https://geolocation.microlink.io',
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001',
  meta: false
}} />

<Figcaption><code>geolocation.microlink.io</code> returns the origin IP and country seen by the server — useful to confirm a proxy is routing through the right region.</Figcaption>

## Keep proxy credentials secure

Proxy URLs contain credentials. Treat them the same as API keys:

- **Never embed them in client-side code**, public HTML, or embed URLs.
- Pass them from environment variables in server-side code:

```js
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  proxy: process.env.PROXY_URL,
  meta: false
})
```

- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> or <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> to keep your API key and proxy URL server-side when calling Microlink from a frontend.

## Error codes

| Error | Cause | Fix |
|-------|-------|-----|
| `EPROXYNEEDED` | The target requires a proxy but none was supplied | Add `proxy` to the request or upgrade to a <ProBadge /> plan for automatic proxy |
| `EPROXY` | `proxy` parameter used without a <ProBadge /> plan | Upgrade to a paid plan |
| `EAUTH` | API key missing or invalid | Check your `x-api-key` header |
| `EPRO` | Sent `x-api-key` to `api.microlink.io` | Use `pro.microlink.io` instead |

See the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> and the <Link href='/docs/api/parameters/proxy' children='proxy parameter reference' /> for all supported values.

## See also

- <Link href='/docs/guides/common/private-pages' children='Private pages' /> — forward cookies, authorization headers, and other credentials to target pages.
- <Link href='/docs/guides/common/troubleshooting' children='Troubleshooting' /> — fix timeouts, blocked sites, and auth errors across all workflows.
- <Link href='/docs/guides/common/production-patterns' children='Production patterns' /> — endpoint selection, retries, rate limits, and credential safety.
