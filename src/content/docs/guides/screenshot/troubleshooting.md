---
title: 'Troubleshooting'
description: 'Debug screenshot failures and wrong captures. Fix blank screenshots, timing issues, antibot protections, overlay errors, auth mistakes, and common Pro-plan or endpoint errors.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When a screenshot looks wrong, the cause is usually one of five things: the page was not ready yet, the wrong area was captured, the request ran out of time, the site blocked automation, or the request used the wrong auth or plan setup.

## Quick triage checklist

1. Add `meta: false` unless you really need metadata.
2. If content is missing, start with `waitUntil: 'domcontentloaded'` plus `waitForSelector`.
3. If the wrong area is visible, choose between `scroll`, `screenshot.element`, and `screenshot.fullPage`.
4. If the request times out, remove fixed waits, lower `deviceScaleFactor`, or raise `timeout`.
5. If the site blocks automation or geofences content, try `proxy` with a proxy URL <ProBadge />.
6. If the page needs login, continue with [private pages](/docs/guides/screenshot/private-pages).

## The screenshot is blank, incomplete, or too early

Start with a fast navigation event, then wait for the exact piece of content you care about:

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://dev.to',
  screenshot: true,
  meta: false,
  waitUntil: 'domcontentloaded',
  waitForSelector: 'h1'
}} />

<Figcaption>This is usually more reliable than waiting a fixed number of seconds.</Figcaption>

Use `waitForTimeout` only when there is no stable selector to wait for. If you are already using `screenshot.element`, remember that Microlink already waits for that element to be visible before it captures.

## The screenshot shows the wrong part of the page

Choose the capture mode that matches the problem:

| Problem | Best fix |
|---------|----------|
| You want a specific section visible in the normal viewport | `scroll` |
| You want the image cropped to a single component | `screenshot.element` |
| You want the whole page from top to bottom | `screenshot.fullPage` |

If the capture is technically correct but cluttered, clean it first with `adblock`, `click`, or `styles`.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work the browser has to do before you simply raise the timeout:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', screenshot: true, meta: false, retry: 3, timeout: '15s' }} />

<Figcaption>Increase timeout only after removing unnecessary waits and expensive rendering options.</Figcaption>

The most effective fixes are:

- Replace `waitForTimeout` with `waitForSelector`.
- Keep `meta: false` for screenshot-only flows.
- Avoid `fullPage` when a viewport or element capture is enough.
- Lower `viewport.deviceScaleFactor` when ultra-high resolution is not necessary.
- Disable `javascript` when the page is already useful without client-side rendering.

## The site blocks the browser <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', screenshot: true, meta: false, proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' }} />

<Figcaption>Use a proxy URL when the target site blocks headless browser traffic, geofences content, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target site needs a proxy-backed request.

## Auth and plan errors

Some common errors point directly to setup issues:

- `EAUTH` — the API key is missing or invalid.
- `EPRO` — you sent `x-api-key` to `api.microlink.io` instead of `pro.microlink.io`.
- `EHEADERS` — `headers` requires a <ProBadge /> plan.
- `EPROXY` — `proxy` requires a <ProBadge /> plan.
- `EFILENAME` — `filename` requires a <ProBadge /> plan.
- `ETTL` or `ESTTL` — configurable cache parameters require a <ProBadge /> plan.

See [private pages](/docs/guides/screenshot/private-pages) if the request also needs login, cookies, or forwarded headers.

## Overlay errors

If you use `screenshot.overlay.background` and the request fails with `EINVALOVERLAYBG`, the background value is malformed.

Valid examples include:

```js
{ background: '#F76698' }
{ background: 'rgba(0, 0, 0, 0.8)' }
{ background: 'linear-gradient(0deg, #330867 0%, #30CFD0 100%)' }
```

The most common problems are missing gradient color stops, invalid color values, or malformed CSS syntax.

## Useful headers while debugging

Open the response headers view in the interactive editor and look for:

- `x-cache-status` — whether the response was a `MISS`, `HIT`, or `BYPASS`.
- `x-cache-ttl` — the effective cache lifetime.
- `x-fetch-mode` — whether the request was skipped, prerendered, or proxy-backed.
- `x-fetch-time` — time spent fetching and rendering.
- `x-pricing-plan` — whether the request ran on the free or Pro plan.
- `x-response-time` — the total request duration.

These headers usually tell you whether the problem is timing, auth, caching, or target-site protection.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> for the exact message returned by the API. If the issue is specific to authenticated targets, return to [private pages](/docs/guides/screenshot/private-pages).

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
