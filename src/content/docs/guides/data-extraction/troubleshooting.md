---
title: 'Data extraction: Troubleshooting'
description: 'Debug empty fields, wrong selectors, timing issues, and collection shape errors when extracting custom data.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

When custom extraction looks wrong, the cause is usually one of five things: the rule is targeting the wrong element, the page was not ready yet, the wrong page variant was rendered, the request timed out, or the site blocked the request.

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

## A field is empty or null

Start by tightening the rule and adding fallbacks:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: [
        { selector: 'meta[property=\"og:title\"]', attr: 'content' },
        { selector: 'title', attr: 'text' },
        { selector: 'h1', attr: 'text' }
      ]
    },
    meta: false
  }}
/>

<Figcaption>Try the most specific selector first, then fall back to broader rules only when needed.</Figcaption>

If the field is still empty:

- Check whether the selector exists in the rendered DOM.
- Remove `type` temporarily to see whether validation is discarding the value.
- Confirm you are extracting the right page variant for that device, locale, or auth state.

## A collection or object has the wrong shape

The most common rule-shape mistakes are:

- Using `selector` when you really need `selectorAll`.
- Returning a single string when you meant to build an object with nested `attr` rules.
- Building a nested object too early before the individual child selectors work.

Fix the smallest piece first, then rebuild the larger structure around it.

## The page is not ready yet

Dynamic pages often need a selector-based wait:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      title: {
        selector: 'main h1',
        attr: 'text'
      }
    },
    meta: false,
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main h1'
  }}
/>

<Figcaption>This is usually more reliable than waiting a fixed number of seconds.</Figcaption>

If the field still comes back empty, force browser rendering with `prerender: true`.

## Function errors

- `EINVALFUNCTION` — the `function` parameter has invalid JavaScript syntax.
- `EINVALEVAL` — the custom extraction logic failed during evaluation.

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' /> for timeout, auth, and plan errors. If the issue is specific to authenticated targets, return to [private pages](/docs/guides/data-extraction/private-pages).

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
