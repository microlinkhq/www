---
title: 'Delivery and response shaping'
description: 'Serve parsed JSON in the standard envelope or directly as the response body, then apply caching and auth patterns for production use.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Once your JSON extraction returns the right data, the next questions are operational: how should you serve it, how aggressively should it cache, and how do you keep private endpoints secure?

## Choose a response model

| When you need | Use | Why |
|---------------|-----|-----|
| Parsed JSON inside the Microlink envelope | Default JSON response | Best fit for apps that already expect the `{ status, data }` wrapper |
| A trimmed envelope with specific fields | `filter` | Keeps JSON, reduces payload size |
| The raw parsed JSON directly | `embed` | Turns the request into a passthrough for the upstream JSON |

## Keep JSON in the envelope

The default response wraps your parsed JSON inside the standard Microlink payload:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      content: {
        attr: 'json'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use the envelope when your consumer expects the standard <code>status</code> and <code>data</code> structure.</Figcaption>

This is the safest default. Your application gets a predictable shape regardless of what the upstream API returns.

## Return parsed JSON directly

Set `embed` to the field name when the parsed JSON is the only output you need:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      content: {
        attr: 'json'
      }
    },
    meta: false,
    embed: 'content'
  }}
/>

<Figcaption>With <code>embed</code>, the response is the parsed JSON itself — no Microlink envelope.</Figcaption>

This turns the Microlink URL into a cached, normalized proxy for the upstream JSON endpoint. Useful for frontend apps that want to consume the API response directly.

## Use a fast default for production

For most production JSON proxy endpoints, a good default is:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      content: {
        attr: 'json'
      }
    },
    meta: false,
    prerender: false,
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>Skip metadata, avoid browser work, and let cache absorb repeated requests.</Figcaption>

The usual levers are:

- `meta: false` when you only need the parsed JSON
- `prerender: false` since JSON endpoints rarely need a browser
- `filter` when you still want the envelope but only need specific keys
- `ttl` <Link href='/docs/api/parameters/ttl' children='cache TTL' /> for freshness control
- `staleTtl` <Link href='/docs/api/parameters/staleTtl' children='stale-while-revalidate' /> when latency matters
- `force` for the occasional fresh uncached run

## Keep private endpoints off the public internet

If the upstream JSON endpoint requires authentication:

- do not expose it as a public `embed` URL
- keep it on your backend whenever possible
- forward secrets with `x-api-header-*`, not query parameters

```bash
curl -G https://pro.microlink.io \
  -d url=https://api.example.com/internal/data \
  -d data.content.attr=json \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-authorization: Bearer SECRET'
```

## JSON fields skip URL resolution

When Microlink processes extracted data, it normally resolves relative URLs and validates link-like fields. Fields declared with `attr: 'json'` are excluded from this step entirely.

This means:

- Arrays are not compacted (falsy values like `null`, `0`, `false`, `""` are preserved).
- Strings that look like URLs are not rewritten or pinged.
- The full structure from `JSON.parse` arrives unchanged.

This is by design — JSON payloads represent structured data, not HTML metadata, so URL normalization would corrupt the values.

## Use Data extraction for the deeper dives

JSON extraction follows the same shared response model as any other extracted field. Continue with Data extraction when you need:

- deeper `filter` coverage, including dot notation
- a fuller cache strategy with `ttl`, `staleTtl`, and `force`
- private-page setup, endpoint choice, and proxy-backed requests
- timeout and response-header debugging

The most relevant deeper pages are:

- <Link href='/docs/guides/data-extraction/delivery-and-response' children='Data extraction: Delivery and response shaping' />
- <Link href='/docs/guides/data-extraction/caching-and-performance' children='Data extraction: Caching and performance' />
- <Link href='/docs/guides/data-extraction/private-pages' children='Data extraction: Private pages' />
- <Link href='/docs/guides/data-extraction/troubleshooting' children='Data extraction: Troubleshooting' />

## Next step

If you need richer structured extraction alongside the JSON field, continue with <Link href='/docs/guides/data-extraction' children='Data extraction' />. Otherwise, see the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
