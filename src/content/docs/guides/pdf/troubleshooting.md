---
title: 'Troubleshooting'
description: 'Debug PDF generation failures and wrong output. Fix missing content, bad layout, and wrong print styling.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When a generated PDF looks wrong, the cause is usually one of five things: the print layout is wrong, the page was not ready yet, the request ran out of time, the site blocked automation, or the request used the wrong auth or plan setup.

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

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

<Figcaption>When the PDF feels too cramped, too wide, or overly "print-like," adjust layout controls before reaching for custom scripts.</Figcaption>

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
- Use `styles` to hide sticky headers, banners, or controls.
- Use `mediaType: 'screen'` if the print stylesheet removes important content.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for timeout, auth, and plan errors. If the issue is specific to authenticated targets, return to [private pages](/docs/guides/pdf/private-pages).

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
