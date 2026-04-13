---
title: 'Insights: Caching and performance'
description: 'Optimize Insights requests for speed and cost. Cache expensive Lighthouse runs, skip unnecessary work, and choose the right analysis mode for your use case.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Insights requests — especially Lighthouse — are among the most expensive Microlink API calls. The fastest workflows are the ones that skip unnecessary analysis, cache aggressively, and avoid redundant metadata extraction.

## Skip what you do not need

The single biggest speedup is running only the analysis you actually need:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false
  }}
/>

<Figcaption>Technology detection alone is much faster than a full Insights run with Lighthouse.</Figcaption>

Three flags that reduce work immediately:

| Flag | Effect |
|------|--------|
| `insights: { lighthouse: false }` | Skip Lighthouse entirely — technology detection is lightweight |
| `meta: false` | Skip normalized metadata extraction |
| `filter: 'insights'` | Return only the Insights payload, stripping unrelated fields |

Combining all three gives you the leanest possible Insights request.

## Cache expensive runs <ProBadge />

Lighthouse reports rarely change minute-to-minute. Use `ttl` to cache the result and `staleTtl` to serve the cached copy while a background refresh runs:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: false,
      lighthouse: true
    },
    meta: false,
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>Cache the Lighthouse report for a day. <code>staleTtl: 0</code> means the next request after expiration immediately returns the stale copy while refreshing in the background.</Figcaption>

| Pattern | TTL | staleTtl | Best for |
|---------|-----|----------|----------|
| Daily monitoring dashboard | `'1d'` | `0` | Scheduled checks that tolerate day-old data |
| Weekly audit reports | `'7d'` | `'1d'` | Low-frequency reporting |
| On-demand one-off checks | omit | omit | Fresh results every time |

See the <Link href='/docs/api/parameters/ttl' children='ttl' /> and <Link href='/docs/api/parameters/staleTtl' children='staleTtl' /> references for all supported formats.

## Bypass cache when needed

Use `force: true` to invalidate the cache and generate a fresh analysis:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false,
    force: true
  }}
/>

<Figcaption>Use <code>force</code> after a deployment or site change when you need a guaranteed fresh result.</Figcaption>

## Verify what happened

Check these response headers to confirm the request behaved as expected:

| Header | What it tells you |
|--------|-------------------|
| `x-cache-status` | `HIT` (served from cache), `MISS` (fresh), or `BYPASS` (force) |
| `x-cache-ttl` | The effective cache lifetime in milliseconds |
| `x-fetch-mode` | Whether the request was fetched, prerendered, or proxy-backed |
| `x-response-time` | The total request duration |

## Next step

If Insights results are missing, slow, or wrong, continue with [troubleshooting](/docs/guides/insights/troubleshooting).
