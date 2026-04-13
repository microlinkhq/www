---
title: 'Common patterns: Troubleshooting'
description: 'Debug common issues across all Microlink workflows. Fix timeouts, blocked sites, auth errors, plan-related errors, and learn to read response headers for diagnosis.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

These troubleshooting patterns apply to every Microlink workflow. Each guide's own troubleshooting page covers workflow-specific issues (wrong screenshots, bad PDF layout, empty extraction fields, etc.); this page covers the problems that appear across all workflows.

## The request times out

If you hit `ETIMEOUT` or `EBRWSRTIMEOUT`, reduce the amount of work before raising `timeout`:

1. **Replace `waitForTimeout` with `waitForSelector`** — selector-based waits finish as soon as content appears.
2. **Set `meta: false`** when you do not need normalized metadata.
3. **Use `prerender: false`** when the page already ships the content in HTML.
4. **Disable `javascript`** when the page does not need client-side execution.
5. **Remove unnecessary `scripts`, `modules`, or `function` work**.
6. **Only then raise `timeout`** and increase `retry`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', meta: false, retry: 3, timeout: '20s' }} />

<Figcaption>Increase timeout only after removing unnecessary work. The maximum allowed timeout is 28 seconds.</Figcaption>

## The site blocks the browser <ProBadge />

Some sites block headless browsers, require a region-specific IP, or trigger antibot protection. In those cases, use `proxy`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://example.com', meta: false, proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' }} />

<Figcaption>Use a proxy URL when the target site blocks headless traffic, geofences content, or rate-limits your origin.</Figcaption>

If the API returns `EPROXYNEEDED`, that is the clearest signal that the target needs a proxy-backed request.

## Auth and plan errors

These errors point directly to setup issues and apply to all workflows:

| Error code | Cause | Fix |
|------------|-------|-----|
| `EAUTH` | API key missing or invalid | Check your `x-api-key` header |
| `EPRO` | Sent `x-api-key` to `api.microlink.io` | Use `pro.microlink.io` instead |
| `EHEADERS` | `headers` used without Pro plan | Upgrade to a <ProBadge /> plan |
| `EPROXY` | `proxy` used without Pro plan | Upgrade to a <ProBadge /> plan |
| `EFILENAME` | `filename` used without Pro plan | Upgrade to a <ProBadge /> plan |
| `ETTL` | `ttl` used without Pro plan | Upgrade to a <ProBadge /> plan |
| `ESTTL` | `staleTtl` used without Pro plan | Upgrade to a <ProBadge /> plan |
| `ERATE` | Rate limit reached | Wait for reset or upgrade |
| `EINVALURL` | URL format is invalid | Check protocol and hostname |
| `EFORBIDDENURL` | URL resolves to a forbidden IP | Use a public URL |
| `EMAXREDIRECTS` | More than 10 redirects | Provide the final destination URL |

See the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> for every error.

## Useful headers while debugging

Open the response headers view in the interactive editor and look for:

| Header | What it tells you |
|--------|-------------------|
| `x-cache-status` | `MISS` (fresh), `HIT` (cached), or `BYPASS` (forced) |
| `x-cache-ttl` | Effective cache lifetime in milliseconds |
| `x-fetch-mode` | `fetch`, `prerender`, `proxy-*`, or `skipped` |
| `x-fetch-time` | Time spent fetching and rendering |
| `x-pricing-plan` | Whether the request ran on `free` or `pro` |
| `x-response-time` | Total request duration |

These headers usually tell you whether the problem is timing, auth, caching, or target-site protection.
