---
title: 'insights'
description: 'Analyze any site with the Microlink SDK: the technologies powering it, detected by Wappalyzer, and a full Lighthouse performance report.'
---

The insights methods analyze a site rather than extract content from it. There are two of them:

- [technologies](/docs/sdk/methods/insights/technologies) — the tech stack powering the site, detected by [Wappalyzer](https://www.wappalyzer.com/).
- [lighthouse](/docs/sdk/methods/insights/lighthouse) — a full web audit report powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

Each method enables only its own analysis, so a `technologies` call never pays for a Lighthouse run and vice versa:

```js
const [technologies, report] = await Promise.all([
  microlink.technologies('https://vercel.com'),
  microlink.lighthouse('https://vercel.com', { onlyCategories: ['performance'] })
])
```

Both accept the [shared options](/docs/sdk/getting-started/options); [device](/docs/api/parameters/device) and [ttl](/docs/api/parameters/ttl) are the ones that matter most, since a report reflects the emulated device and is expensive enough to be worth caching for a long time.

See the [insights parameter](/docs/api/parameters/insights) for the underlying API and the [insights guide](/docs/guides/insights) for technology detection, Lighthouse reports, and caching.
