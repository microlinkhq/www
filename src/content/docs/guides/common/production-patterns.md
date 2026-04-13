---
title: 'Common patterns: Production patterns'
description: 'Best practices for using Microlink API in production. Handle rate limits, choose the right endpoint, protect credentials, and build resilient integrations.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

These patterns apply once you move from prototyping to a production integration. They cover the decisions most teams encounter after the first few hundred requests.

## Choose the right endpoint

| Stage | Endpoint | Auth |
|-------|----------|------|
| Local development / prototyping | `api.microlink.io` | None needed |
| Staging / CI | `pro.microlink.io` | `x-api-key` header |
| Production | `pro.microlink.io` | `x-api-key` header |

The free endpoint has a soft limit of **50 requests per day**. The Pro endpoint uses your plan quota. Sending `x-api-key` to the free endpoint fails with `EPRO`.

See the <Link href='/docs/api/basics/endpoint' children='endpoint docs' /> and <Link href='/docs/api/basics/authentication' children='authentication docs' />.

## Handle rate limits gracefully

When you hit your quota, Microlink returns **HTTP 429** with error code `ERATE`. Your integration should:

1. Check `x-rate-limit-remaining` on every response.
2. When the value approaches zero, slow down or queue requests.
3. On a 429 response, wait until `x-rate-limit-reset` (UTC epoch seconds) before retrying.

```js
const { status, data, headers } = response

if (status === 429) {
  const resetAt = Number(headers['x-rate-limit-reset']) * 1000
  const waitMs = Math.max(0, resetAt - Date.now())
  await new Promise(resolve => setTimeout(resolve, waitMs))
}
```

The free endpoint resets daily. Pro plan resets depend on your billing cycle. See the <Link href='/docs/api/basics/rate-limit' children='rate limit docs' />.

## Use stale-while-revalidate by default <ProBadge />

For most production workflows, the best cache setup is:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', ttl: '1d', staleTtl: 0 }} />

<Figcaption>Serve the cached response instantly, refresh in the background. This maximizes cache hits and minimizes user-facing latency.</Figcaption>

Adjust `ttl` based on how often the target content changes. See <Link href='/docs/guides/common/caching' children='caching patterns' /> for the full strategy.

## Protect credentials in client-side code

If you consume Microlink from a frontend (website, SPA, mobile app):

1. **Never embed your API key** in client-side code, HTML attributes, or public embed URLs.
2. **Use a proxy** to keep the key on your server:
   - <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> — self-hosted Node.js proxy.
   - <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> — edge-deployed (Cloudflare Workers, Vercel Edge).
3. **Restrict allowed domains** in your proxy configuration so only your own sites can consume your quota.

See the <Link href='/docs/api/basics/authentication' children='authentication docs' /> and <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

## Use `meta: false` when you do not need metadata

Many workflows only need one output (a screenshot, a PDF, or custom extracted fields). Adding `meta: false` skips the normalized metadata step, which is usually the single biggest speedup:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', screenshot: true, meta: false }} />

<Figcaption>The <code>x-fetch-mode</code> response header will show <code>'skipped'</code> when metadata detection is bypassed.</Figcaption>

## Retry with exponential backoff

Transient errors happen. The API supports a `retry` parameter that performs server-side retries with exponential backoff:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', retry: 3 }} />

<Figcaption>The default value is 2. Increase to 3 for targets that occasionally fail.</Figcaption>

For client-side retries, respect the same backoff pattern and avoid retrying on 4xx errors that indicate a configuration problem (like `EINVALURL` or `EAUTH`).

## Monitor response headers

Build observability into your integration by logging these headers:

| Header | Why it matters |
|--------|----------------|
| `x-cache-status` | Tracks cache hit rate — low hit rates mean wasted work |
| `x-response-time` | Tracks p50/p95 latency — spikes signal a target-site or rendering issue |
| `x-pricing-plan` | Confirms requests hit the right endpoint |
| `x-fetch-mode` | Shows whether requests used fetch, prerender, or proxy |
| `x-rate-limit-remaining` | Enables proactive throttling before you hit the limit |

## Compress responses

If you call the API directly (not through MQL or the SDK), set the `Accept-Encoding` header to `br` or `gzip`:

```bash
curl -H 'Accept-Encoding: br' 'https://api.microlink.io?url=https://example.com'
```

MQL and the SDK enable compression by default. See the <Link href='/docs/api/basics/compression' children='compression docs' />.
