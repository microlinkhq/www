---
title: 'Insights'
description: 'Analyze any URL with Microlink Insights, choose between technology detection and Lighthouse audits, and move quickly to the right next step.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Running Insights requires two parameters: the target `url` and `insights`.

Use `insights: true` to run both technology detection and a Lighthouse audit, or pass an object when you want only one of them.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://vercel.com', insights: true, meta: false }} />

<Figcaption>Run the request and look for the analysis under <code>data.insights</code>.</Figcaption>

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for the environment-specific setup.

If you are using another language, you do not need to install MQL to follow this guide. You can use the terminal examples or call the API directly from any HTTP client.

## How it works

Switch to an `insights` object when you want only one analysis:

```js
{
  url: 'https://vercel.com',
  insights: {
    technologies: true,
    lighthouse: false
  },
  meta: false
}
```

In practice, you will usually read one of these fields:

- `data.insights.technologies`
- `data.insights.lighthouse`

## Choose a mode

| Need | Best option | Why |
|------|-------------|-----|
| You want to identify the site's stack | `insights: { technologies: true, lighthouse: false }` | Faster and lighter |
| You want a Lighthouse audit | `insights: { technologies: false, lighthouse: true }` | Focuses on report generation |
| You want both | `insights: true` | Runs the full Insights flow |

## Keep it light

If Insights is the only thing you need, skip metadata and keep only the Insights payload:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: true,
      lighthouse: false
    },
    meta: false,
    filter: 'insights'
  }}
/>

<Figcaption>Use <code>meta: false</code> and <code>filter: 'insights'</code> to keep the request lighter and the response smaller.</Figcaption>

If you run repeated checks, you can also add [ttl](/docs/api/parameters/ttl) <ProBadge /> or [staleTtl](/docs/api/parameters/staleTtl) <ProBadge /> to cache expensive runs.

## Free tier and API key

The Microlink API works without an API key and gives you **50 free requests per day**. For production usage, a <ProBadge /> plan unlocks features such as configurable cache TTL, custom headers, and proxy support.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

- **[Technology detection](/docs/guides/insights/technology-detection)** — identify frameworks, CDNs, analytics tools, and other technologies behind a site.
- **[Lighthouse reports](/docs/guides/insights/lighthouse-reports)** — generate JSON, HTML, or CSV Lighthouse audits and tune report settings.
- **[Troubleshooting](/docs/guides/insights/troubleshooting)** — fix missing results, slow requests, private-page issues, and blocked sites.
