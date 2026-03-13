---
title: 'Technology detection'
description: 'Identify the frameworks, platforms, analytics tools, and infrastructure behind any URL using Microlink Insights.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Technology detection is the lightweight side of Insights. Use it when you want to know what stack a site runs without paying the cost of a full Lighthouse report.

## Run technology detection only

Disable Lighthouse and keep only technologies enabled:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://microlink.io',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false
  }}
/>

<Figcaption>This is the best starting point when you only care about the site's stack, not its audit report.</Figcaption>

## What you get

Each technology entry includes:

- `name` — the normalized technology name
- `confidence` — how confident the detector is, from `0` to `100`
- `logo` — the technology logo URL
- `url` — the main website for that technology
- `categories` — one or more categories such as `Analytics`, `CDN`, or `JavaScript frameworks`

See the <Link href='/docs/api/parameters/insights/technologies' children='technologies reference' /> for the detailed shape.

## Technology detection vs Lighthouse

| If you need | Use |
|-------------|-----|
| Frameworks, CMSs, CDNs, analytics tools, or payment providers | `insights.technologies` |
| Performance, SEO, accessibility, or best-practices audits | `insights.lighthouse` |
| Both stack and audit data | `insights: true` |

Reach for Lighthouse only when the workflow genuinely needs audit data.

## Keep it smaller

If you want a smaller JSON payload, keep only the `insights` field:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://microlink.io',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false,
    filter: 'insights'
  }}
/>

<Figcaption>Enable only technologies and filter down to <code>insights</code> when you want the smallest useful JSON response.</Figcaption>

If the result looks wrong on a SPA, try `prerender: true`. If the page is private, locale-dependent, or blocked, continue with [troubleshooting](/docs/guides/insights/troubleshooting).

## Next step

Learn how to generate and customize audit reports in [Lighthouse reports](/docs/guides/insights/lighthouse-reports).
