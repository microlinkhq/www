---
title: 'Troubleshooting'
description: 'Debug missing or wrong Insights results. Fix empty analyses, timing issues, timeouts, wrong page variants, and blocked sites.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When an Insights result looks wrong, the cause is usually one of four things: the page rendered as a generic shell, the request did too much work, the wrong page variant was analyzed, or the site blocked browser automation.

## Quick triage checklist

1. Run one analysis at a time before you run both.
2. If the result is missing or generic on a SPA, try `prerender: true`.
3. If the request is too slow, remove fixed waits and unnecessary analysis first.
4. If the wrong locale, region, or personalization is showing up, use `headers` or forwarded auth headers <ProBadge />.
5. If the site blocks automation or geofences content, use `proxy` with a proxy URL <ProBadge />.

## The result is missing or generic

Start by forcing browser rendering:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false,
    prerender: true
  }}
/>

<Figcaption>When the initial HTML is too generic, <code>prerender: true</code> can expose the real page state before analysis runs.</Figcaption>

If the output is still wrong, switch to a single analysis and add `waitUntil` plus `waitForSelector` for dynamic pages.

## The request is too slow or times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work before you simply raise `timeout`:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: true
    },
    meta: false,
    retry: 3,
    timeout: '20s'
  }}
/>

<Figcaption>Increase timeout only after removing unnecessary analysis and rendering work.</Figcaption>

The most effective fixes are:

- run only technologies or only Lighthouse, not both
- set `meta: false` when the standard metadata payload is not needed
- use `filter: 'insights'` when you only need the Insights payload
- use `prerender: false` if the page already exposes enough information in HTML
- replace `waitForTimeout` with `waitForSelector`
- disable `javascript` when the page does not need it
- add `ttl` or `staleTtl` <ProBadge /> for repeated runs

## Private pages and blocked sites <ProBadge />

If the page only works for logged-in users, a specific locale, or a particular request context:

- use `headers` for non-sensitive request shaping
- use `x-api-header-*` for cookies or authorization
- use `pro.microlink.io` when sending `x-api-key`

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://example.com',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false,
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

See the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
