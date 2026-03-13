---
title: 'Troubleshooting'
description: 'Debug empty fields, wrong selectors, timing issues, timeouts, blocked sites, and common auth or plan-related errors when extracting custom data.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When custom extraction looks wrong, the cause is usually one of five things: the rule is targeting the wrong element, the page was not ready yet, the wrong page variant was rendered, the request timed out, or the site blocked the request.

## Quick triage checklist

1. Start with one field and make sure it works before you add nested objects or collections.
2. If a field is empty, verify the selector first and then add `waitForSelector`.
3. If a page is dynamic, try `prerender: true`.
4. If a value should be a URL, number, or date, check whether `type` is rejecting it.
5. If the request times out, remove fixed waits before you raise `timeout`.
6. If the site blocks automation or geofences content, use `proxy` with a proxy URL <ProBadge />.

## A field is empty or null

Start by tightening the rule and adding fallbacks:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: [
        { selector: 'meta[property=\"og:title\"]', attr: 'content' },
        { selector: 'title', attr: 'text' },
        { selector: 'h1', attr: 'text' }
      ]
    },
    meta: false
  }}
/>

<Figcaption>Try the most specific selector first, then fall back to broader rules only when needed.</Figcaption>

If the field is still empty:

- Check whether the selector exists in the rendered DOM.
- Remove `type` temporarily to see whether validation is discarding the value.
- Confirm you are extracting the right page variant for that device, locale, or auth state.

## A collection or object has the wrong shape

The most common rule-shape mistakes are:

- Using `selector` when you really need `selectorAll`.
- Returning a single string when you meant to build an object with nested `attr` rules.
- Building a nested object too early before the individual child selectors work.

Fix the smallest piece first, then rebuild the larger structure around it.

## The page is not ready yet

Dynamic pages often need a selector-based wait:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      title: {
        selector: 'main h1',
        attr: 'text'
      }
    },
    meta: false,
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main h1'
  }}
/>

<Figcaption>This is usually more reliable than waiting a fixed number of seconds.</Figcaption>

Use `waitForTimeout` only when there is no stable selector to wait for. If the field still comes back empty, force browser rendering with `prerender: true`.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work first and only then raise the timeout:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      title: {
        selector: 'main h1',
        attr: 'text'
      }
    },
    meta: false,
    retry: 3,
    timeout: '15s'
  }}
/>

<Figcaption>Increase timeout only after removing unnecessary waits and expensive browser work.</Figcaption>

The most effective fixes are:

- Replace `waitForTimeout` with `waitForSelector`.
- Use `meta: false` for data-only flows.
- Set `prerender: false` for pages that already ship the content in HTML.
- Disable `javascript` when the page does not need client-side execution.
- Remove unnecessary `styles`, `scripts`, `modules`, or `function` work.

## The site blocks the request <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

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

<Figcaption>Use a proxy URL when the target site blocks headless traffic, geofences content, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target needs a proxy-backed request.

## Auth, endpoint, and rule errors

Some common errors point directly to setup issues:

- `EAUTH` — the API key is missing or invalid.
- `EPRO` — you sent `x-api-key` to `api.microlink.io` instead of `pro.microlink.io`.
- `EHEADERS` — `headers` requires a <ProBadge /> plan.
- `EPROXY` — `proxy` requires a <ProBadge /> plan.
- `ETTL` or `ESTTL` — configurable cache parameters require a <ProBadge /> plan.
- `ETIMEOUT` or `EBRWSRTIMEOUT` — the request ran out of time.
- `EINVALFUNCTION` — the `function` parameter has invalid JavaScript syntax.
- `EINVALEVAL` — the custom extraction logic failed during evaluation.

See [private pages](/docs/guides/data-extraction/private-pages) if the request also needs login, cookies, or forwarded headers.

## Useful headers while debugging

Open the response headers view in the interactive editor and look for:

- `x-cache-status` — whether the response was a `MISS`, `HIT`, or `BYPASS`.
- `x-cache-ttl` — the effective cache lifetime.
- `x-fetch-mode` — whether the request was fetched, prerendered, or proxy-backed.
- `x-fetch-time` — time spent fetching and rendering.
- `x-pricing-plan` — whether the request ran on the free or Pro plan.
- `x-response-time` — the total request duration.

These headers usually tell you whether the problem is timing, auth, caching, or target-site protection.

## Next step

If the issue is specific to authenticated targets, return to [private pages](/docs/guides/data-extraction/private-pages). Otherwise, see the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
