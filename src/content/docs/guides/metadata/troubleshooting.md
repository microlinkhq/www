---
title: 'Troubleshooting'
description: 'Debug missing or wrong metadata. Fix null fields, dynamic-page issues, wrong variants, timeouts, and blocked sites.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When metadata looks wrong, the cause is usually one of five things: the page did not render the right variant, the metadata is not present in the initial HTML, the request timed out, the site blocked automation, or the field you want is simply not exposed in a normalized way.

## Quick triage checklist

1. Start with the default metadata behavior before aggressively narrowing fields.
2. If fields are missing or `null`, try `prerender: true`.
3. If the wrong language, region, or personalization is showing up, continue with [private pages](/docs/guides/metadata/private-pages).
4. If the request is too slow, reduce enrichments and remove fixed waits.
5. If the site blocks automation or geofences content, use `proxy` with a proxy URL <ProBadge />.

## The fields are missing or null

If a page is client-rendered, start by forcing browser rendering:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://vercel.com',
    meta: {
      title: true,
      description: true
    },
    prerender: true
  }}
/>

<Figcaption>When the initial HTML does not contain the metadata you need, <code>prerender: true</code> can expose the real page state.</Figcaption>

If a field is still missing after that:

- confirm the site really exposes it at all
- try the default metadata set instead of a narrowed `meta` object
- add a site-specific fallback with `data` in [extending results](/docs/guides/metadata/extending-results)

## The page variant is wrong

Sometimes the metadata is correct for the page Microlink saw, but not for the page variant you expected.

Common causes:

- locale-specific content
- logged-in vs logged-out variants
- geofencing or regional content
- request-header-based personalization

If that sounds like the problem, continue with [private pages](/docs/guides/metadata/private-pages) and use `headers`, `x-api-header-*`, or `proxy` as needed.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work before you simply raise `timeout`:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://vercel.com',
    meta: {
      title: true,
      description: true
    },
    retry: 3,
    timeout: '15s'
  }}
/>

<Figcaption>Increase timeout only after removing unnecessary rendering work and enrichments.</Figcaption>

The most effective fixes are:

- use a smaller `meta` object instead of the full field set
- disable `palette`, `iframe`, `insights`, or custom `data` fields you do not need
- use `prerender: false` if the page already exposes the metadata in HTML
- replace `waitForTimeout` with `waitForSelector`
- disable `javascript` when the page does not need it

## The site blocks the browser <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    meta: {
      title: true,
      description: true
    },
    proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
  }}
/>

<Figcaption>Use a proxy URL when the target site blocks headless traffic, geofences content, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target site needs a proxy-backed request.

## Auth and plan errors

Some common errors point directly to setup issues:

- `EAUTH` — the API key is missing or invalid.
- `EPRO` — you sent `x-api-key` to `api.microlink.io` instead of `pro.microlink.io`.
- `EHEADERS` — `headers` requires a <ProBadge /> plan.
- `EPROXY` — `proxy` requires a <ProBadge /> plan.
- `ETTL` or `ESTTL` — configurable cache parameters require a <ProBadge /> plan.
- `ERATE` — you reached the free-tier or plan quota limit.

## Useful headers while debugging

Open the response headers view in the interactive editor and look for:

- `x-cache-status` — whether the response was a `MISS`, `HIT`, or `BYPASS`
- `x-cache-ttl` — the effective cache lifetime
- `x-fetch-mode` — whether the request was fetched, prerendered, or proxy-backed
- `x-fetch-time` — time spent fetching and rendering
- `x-pricing-plan` — whether the request ran on the free or Pro plan
- `x-response-time` — the total request duration

These headers usually tell you whether the problem is caching, rendering, auth, or target-site protection.

## Next step

If the issue is auth-specific, return to [private pages](/docs/guides/metadata/private-pages). Otherwise, see the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
