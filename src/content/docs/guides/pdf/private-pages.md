---
title: 'Private pages'
description: 'Generate PDFs from pages behind logins, sessions, or header-based personalization safely.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Many real PDF workflows involve private content: invoices, dashboards, internal documentation, and user-specific views. The general patterns for headers, secrets, endpoint selection, and proxy are covered in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

This page shows the PDF-specific setup.

## PDF with non-sensitive headers <ProBadge />

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://example.com',
  pdf: true,
  meta: false,
  headers: {
    'Accept-Language': 'es-ES'
  }
}} />

<Figcaption>Good for locale and request shaping. For cookies or authorization tokens, use the <code>x-api-header-*</code> pattern described in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.</Figcaption>

## PDF with sensitive credentials

Use `x-api-header-*` to forward secrets without exposing them in the URL:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/dashboard \
  -d pdf=true \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

## When private PDFs still fail

If the page is authenticated **and** protected by antibot systems, CAPTCHAs, or geofencing, you may also need <Link href='/docs/api/parameters/proxy' children='proxy' /> <ProBadge />. If you see `EPROXYNEEDED`, that confirms it.

For other errors, continue with [troubleshooting](/docs/guides/pdf/troubleshooting).

## Next step

Learn how to debug missing content, wrong layout, blocked sites, and common PDF errors in [troubleshooting](/docs/guides/pdf/troubleshooting).
