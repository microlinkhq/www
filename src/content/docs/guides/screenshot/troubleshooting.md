---
title: 'Troubleshooting'
description: 'Debug screenshot failures and wrong captures. Fix blank screenshots, timing issues, wrong capture areas, overlay errors, and antibot protections.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When a screenshot looks wrong, the cause is usually one of five things: the page was not ready yet, the wrong area was captured, the request ran out of time, the site blocked automation, or the request used the wrong auth or plan setup.

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

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

If you are using `screenshot.element`, remember that Microlink already waits for that element to be visible before it captures.

## The screenshot shows the wrong part of the page

| Problem | Best fix |
|---------|----------|
| You want a specific section visible in the normal viewport | `scroll` |
| You want the image cropped to a single component | `screenshot.element` |
| You want the whole page from top to bottom | `screenshot.fullPage` |

If the capture is technically correct but cluttered, clean it first with `adblock`, `click`, or `styles`.

## Overlay errors

If you use `screenshot.overlay.background` and the request fails with `EINVALOVERLAYBG`, the background value is malformed.

Valid examples:

```js
{ background: '#F76698' }
{ background: 'rgba(0, 0, 0, 0.8)' }
{ background: 'linear-gradient(0deg, #330867 0%, #30CFD0 100%)' }
```

The most common problems are missing gradient color stops, invalid color values, or malformed CSS syntax.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for timeout, auth, and plan errors.

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
