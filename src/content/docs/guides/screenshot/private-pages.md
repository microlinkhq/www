---
title: 'Screenshot: Private pages'
description: 'Capture screenshots of pages behind logins, sessions, or header-based personalization safely.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Capturing a private dashboard, localized experience, or staged environment requires the right auth setup. The general patterns for headers, secrets, endpoint selection, and proxy are covered in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

This page shows the screenshot-specific setup.

## Screenshot with non-sensitive headers <ProBadge />

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://example.com',
  screenshot: true,
  meta: false,
  headers: {
    'Accept-Language': 'es-ES'
  }
}} />

<Figcaption>Good for locale and request shaping. For cookies or authorization tokens, use the <code>x-api-header-*</code> pattern described in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.</Figcaption>

## Screenshot with sensitive credentials

Use `x-api-header-*` to forward secrets without exposing them in the URL:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/dashboard \
  -d screenshot=true \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

## When private screenshots still fail

If the page is authenticated **and** protected by antibot systems, CAPTCHAs, or geofencing, you may also need <Link href='/docs/api/parameters/proxy' children='proxy' /> <ProBadge />. If you see `EPROXYNEEDED`, that confirms it.

For other errors, continue with [troubleshooting](/docs/guides/screenshot/troubleshooting).

## Next step

Learn how to debug timing issues, blocked sites, and common screenshot errors in [troubleshooting](/docs/guides/screenshot/troubleshooting).
