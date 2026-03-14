---
title: 'Private pages'
description: 'Extract data from authenticated, session-based, or header-dependent pages safely.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

If the target page changes based on cookies, authorization, locale, or geolocation, the extraction rules are only half the problem. You also need the request to reach the right page variant. The general patterns for headers, secrets, endpoint selection, and proxy are covered in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

This page shows the data-extraction-specific setup.

## Extraction with non-sensitive headers <ProBadge />

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false,
    headers: {
      'accept-language': 'en-US'
    }
  }}
/>

<Figcaption>Use <code>headers</code> for public request shaping. For cookies or authorization tokens, use the <code>x-api-header-*</code> pattern described in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.</Figcaption>

## Extraction with sensitive credentials

Use `x-api-header-*` to forward secrets without exposing them in the URL:

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/private \
  -d data.title.selector=h1 \
  -d data.title.attr=text \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=YOUR_SESSION_COOKIE'
```

## When private extraction still fails

If the target blocks headless traffic, geofences content, or rate-limits the origin, use <Link href='/docs/api/parameters/proxy' children='proxy' /> <ProBadge />. If the API returns `EPROXYNEEDED`, that confirms it.

For other errors, continue with [troubleshooting](/docs/guides/data-extraction/troubleshooting).

## Next step

If extraction still fails after the auth setup is correct, continue with [troubleshooting](/docs/guides/data-extraction/troubleshooting).
