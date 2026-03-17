---
title: 'Lighthouse reports'
description: 'Generate Lighthouse audits with Microlink Insights, choose the right output format, and tune reports with presets or custom Lighthouse settings.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Lighthouse is the heavyweight side of Insights. Use it when you need a real audit report for performance, SEO, accessibility, or best-practices analysis.

## Run Lighthouse only

Disable technology detection and keep only Lighthouse enabled:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: true
    },
    meta: false
  }}
/>

<Figcaption>This focuses the request on audit generation instead of running the full Insights bundle.</Figcaption>

By default, the report is serialized as JSON under `data.insights.lighthouse`.

## Choose an output format

JSON is the default output because it works well for automation and the [Lighthouse viewer](https://lighthouse.microlink.io). When you need a different format, pass `output`:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: {
        output: 'html'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use HTML when you want a human-readable report artifact instead of raw JSON.</Figcaption>

Supported output formats:

- `json` (default)
- `html`
- `csv`

## Tune the report

Presets bundle a useful set of Lighthouse settings:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: {
        preset: 'desktop'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use a preset when you want a known Lighthouse configuration without spelling out all the settings manually.</Figcaption>

Any Lighthouse configuration setting is supported. A common pattern is to limit the report to one category:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: {
        onlyCategories: ['performance']
      }
    },
    meta: false
  }}
/>

<Figcaption>Use custom config when you want a focused report instead of the full audit surface.</Figcaption>

## Keep it lighter

Lighthouse reports can be large. If you only need the Insights result, pair the report with `meta: false` and `filter: 'insights'`.

That keeps the response JSON but strips unrelated top-level fields. If the page is dynamic, try `prerender: true` or add `waitForSelector`. If the request is slow, add cache controls such as `ttl` <ProBadge /> and `staleTtl` <ProBadge /> or continue with [troubleshooting](/docs/guides/insights/troubleshooting).

## Next step

Learn how to cache expensive Lighthouse runs and skip unnecessary work in [caching and performance](/docs/guides/insights/caching-and-performance).
