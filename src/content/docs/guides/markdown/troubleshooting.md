---
title: 'Troubleshooting'
description: 'Debug empty or wrong Markdown output. Fix selector mistakes, timing issues, timeouts, blocked sites, and common auth or plan-related errors.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When extracted Markdown looks wrong, the cause is usually one of five things: the rule is scoped too broadly or too narrowly, the page was not ready yet, the wrong page variant was rendered, the request timed out, or the site blocked browser automation.

## Quick triage checklist

1. Start with `selector: 'main'` or `selector: 'article'` before you try whole-page extraction.
2. If content is missing, use `waitUntil: 'domcontentloaded'` plus `waitForSelector`.
3. If the output includes banners or layout chrome, keep `adblock: true` and then try `click` or `styles`.
4. If the page is a SPA, try `prerender: true`.
5. If the request times out, remove fixed waits before you raise `timeout`.
6. If the site blocks automation or geofences content, use `proxy` with a proxy URL <ProBadge />.

## The Markdown is empty, incomplete, or full of chrome

Start by tightening the scope and adding fallbacks:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      content: [
        {
          selector: 'article',
          attr: 'markdown'
        },
        {
          selector: 'main',
          attr: 'markdown'
        },
        {
          attr: 'markdown'
        }
      ]
    },
    meta: false
  }}
/>

<Figcaption>Try the most specific selector first, then fall back to broader rules only when needed.</Figcaption>

If the result is technically correct but noisy, clean the page before conversion with `adblock`, `click`, `styles`, or a more precise selector.

## The page is not ready yet

Dynamic pages often need a selector-based wait:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main'
  }}
/>

<Figcaption>This is usually more reliable than waiting a fixed number of seconds.</Figcaption>

Use `waitForTimeout` only when there is no stable selector to wait for. If the page still comes back empty, force browser rendering with `prerender: true`.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work first and only then raise the timeout:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
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
- Use `meta: false` for Markdown-only flows.
- Set `prerender: false` for pages that already ship the content in HTML.
- Disable `javascript` when the page does not need client-side execution.
- Remove unnecessary `styles`, `scripts`, `modules`, or `function` work.

## The site blocks the browser <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
  }}
/>

<Figcaption>Use a proxy URL when the target site blocks headless traffic, geofences content, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target site needs a proxy-backed request.

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

See [private pages](/docs/guides/markdown/private-pages) if the request also needs login, cookies, or forwarded headers.

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

If the issue is specific to authenticated targets, return to [private pages](/docs/guides/markdown/private-pages). Otherwise, see the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
