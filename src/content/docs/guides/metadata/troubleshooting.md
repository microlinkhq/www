---
title: 'Troubleshooting'
description: 'Debug missing or wrong metadata. Fix null fields, dynamic-page issues, and wrong page variants.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When metadata looks wrong, the cause is usually one of five things: the page did not render the right variant, the metadata is not present in the initial HTML, the request timed out, the site blocked automation, or the field you want is simply not exposed in a normalized way.

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

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

- Confirm the site actually exposes it.
- Try the default metadata set instead of a narrowed `meta` object.
- Add a site-specific fallback with `data` in [extending results](/docs/guides/metadata/extending-results).

## The page variant is wrong

Sometimes the metadata is correct for the page Microlink saw, but not for the variant you expected.

Common causes:

- Locale-specific content
- Logged-in vs logged-out variants
- Geofencing or regional content
- Request-header-based personalization

If that sounds like the problem, continue with [private pages](/docs/guides/metadata/private-pages) and use `headers`, `x-api-header-*`, or `proxy` as needed.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for timeout, auth, and plan errors. If the issue is auth-specific, return to [private pages](/docs/guides/metadata/private-pages).

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
