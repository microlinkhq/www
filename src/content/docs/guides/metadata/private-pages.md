---
title: 'Private pages'
description: 'Extract metadata from pages behind logins, sessions, or header-based personalization safely.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Metadata extraction from private dashboards, localized experiences, or staged environments requires the right auth setup. The general patterns for headers, secrets, endpoint selection, and proxy are covered in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

This page shows the metadata-specific setup.

## Metadata with non-sensitive headers <ProBadge />

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://example.com',
    meta: {
      title: true,
      description: true
    },
    headers: {
      'Accept-Language': 'es-ES'
    }
  }}
/>

<Figcaption>Good for locale and request shaping. For cookies or authorization tokens, use the <code>x-api-header-*</code> pattern described in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.</Figcaption>

## Metadata with sensitive credentials

Use `x-api-header-*` to forward secrets without exposing them in the URL:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/private \
  -d meta.title=true \
  -d meta.description=true \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

## When private metadata still fails

If the target blocks headless traffic, geofences content, or rate-limits the origin, use <Link href='/docs/api/parameters/proxy' children='proxy' /> <ProBadge />. If the API returns `EPROXYNEEDED`, that confirms it.

For other errors, continue with [troubleshooting](/docs/guides/metadata/troubleshooting).

## Next step

Learn how to debug missing fields, wrong page variants, and blocked sites in [troubleshooting](/docs/guides/metadata/troubleshooting).
