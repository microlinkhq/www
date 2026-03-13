---
title: 'Troubleshooting'
description: 'Debug PDF generation failures and wrong output. Fix missing content, bad layout, timing issues, blocked sites, auth mistakes, and common Pro-plan or endpoint errors.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When a generated PDF looks wrong, the cause is usually one of five things: the print layout is wrong, the page was not ready yet, the request ran out of time, the site blocked automation, or the request used the wrong auth or plan setup.

## Quick triage checklist

1. Add `meta: false` unless you really need metadata.
2. If the layout is wrong, choose the right combination of `format`, `width`/`height`, `margin`, `scale`, `landscape`, and `mediaType`.
3. If content is missing, start with `waitUntil: 'domcontentloaded'` plus `waitForSelector`.
4. If the request times out, remove fixed waits, reduce rendering work, or raise `timeout`.
5. If the site blocks automation or geofences content, use `proxy` with a proxy URL <ProBadge />.
6. If the page needs login, continue with [private pages](/docs/guides/pdf/private-pages).

## The PDF layout looks wrong

Pick the control that matches the problem:

| Problem | Best fix |
|---------|----------|
| You need a standard printable document size | `pdf.format` |
| You need exact custom page dimensions | `pdf.width` + `pdf.height` |
| You need a wide document | `pdf.landscape` |
| You need more whitespace around the content | `pdf.margin` |
| You need more or less content per page | `pdf.scale` |
| You want on-screen design instead of print CSS | `mediaType: 'screen'` |
| You only need part of the final document | `pdf.pageRanges` |

A common fix is to keep the paper format but switch to screen CSS and add predictable margins:

<MultiCodeEditorInteractive height={310} mqlCode={{
  url: 'https://blog.alexmaccaw.com/advice-to-my-younger-self',
  pdf: {
    format: 'Letter',
    margin: '1cm',
    scale: 0.9
  },
  mediaType: 'screen',
  meta: false
}} />

<Figcaption>When the PDF feels too cramped, too wide, or overly “print-like,” adjust layout controls before reaching for custom scripts.</Figcaption>

## The PDF is missing content or printed too early

Start with a fast navigation event, then wait for the exact content you need:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://dev.to',
  pdf: true,
  meta: false,
  waitUntil: 'domcontentloaded',
  waitForSelector: 'article'
}} />

<Figcaption>This is usually more reliable than waiting a fixed number of seconds.</Figcaption>

If the page still needs cleanup:

- Use `click` to open tabs or dismiss UI before printing.
- Use `styles` to hide sticky headers, banners, or controls that do not belong in the final PDF.
- Use `mediaType: 'screen'` if the print stylesheet removes important content.
- Use `waitForTimeout` only when there is no stable selector to wait for.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work the browser has to do before you simply raise the timeout:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', pdf: true, meta: false, retry: 3, timeout: '15s' }} />

<Figcaption>Increase timeout only after removing unnecessary waits and overly expensive page preparation.</Figcaption>

The most effective fixes are:

- Replace `waitForTimeout` with `waitForSelector`.
- Keep `meta: false` for PDF-only flows.
- Stay on `mediaType: 'print'` unless the page genuinely needs screen CSS.
- Disable `javascript` when the page is already useful without client-side rendering.
- Remove unnecessary `click`, CSS injection, or heavy page preparation logic.

## The site blocks the browser <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', pdf: true, meta: false, proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' }} />

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

See [private pages](/docs/guides/pdf/private-pages) if the request also needs login, cookies, or forwarded headers.

## Useful headers while debugging

Open the response headers view in the interactive editor and look for:

- `x-cache-status` — whether the response was a `MISS`, `HIT`, or `BYPASS`
- `x-cache-ttl` — the effective cache lifetime
- `x-fetch-mode` — whether the request was skipped, prerendered, or proxy-backed
- `x-fetch-time` — time spent fetching and rendering
- `x-pricing-plan` — whether the request ran on the free or Pro plan
- `x-response-time` — the total request duration

These headers usually tell you whether the problem is layout, timing, auth, caching, or target-site protection.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> for the exact message returned by the API. If the issue is specific to authenticated targets, return to [private pages](/docs/guides/pdf/private-pages).

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
