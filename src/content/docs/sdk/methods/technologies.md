---
title: 'technologies'
description: 'Detect the tech stack behind any URL with the Microlink SDK: frameworks, CDNs, analytics, and more, each with a confidence score, logo, and categories.'
---

The tech stack powering any site, detected by [Wappalyzer](https://www.wappalyzer.com/):

```js
const technologies = await microlink.technologies('https://microlink.io')
```

It resolves to an array with one object per detected technology:

- **`name`** — the normalized name, e.g. `'Cloudflare'`.
- **`confidence`** — how sure the detection is, from `0` to `100`.
- **`logo`** — the technology logo as a URL.
- **`url`** — the technology's website.
- **`categories`** — keywords grouping similar technologies, e.g. `['CDN']`.

```js
const technologies = await microlink.technologies('https://vercel.com')

for (const { name, confidence, categories } of technologies) {
  console.log(`${name} (${confidence}%) — ${categories.join(', ')}`)
}
```

It has no method-specific options; the [shared options](/docs/sdk/getting-started/options) apply.

## Examples

Only the confident detections, grouped by category:

```js
const technologies = await microlink.technologies('https://github.com')

const byCategory = Object.groupBy(
  technologies.filter(({ confidence }) => confidence === 100),
  ({ categories }) => categories[0]
)
```

Check whether a list of sites runs a given framework, caching each answer for a week:

```js
const usesNext = async url => {
  const technologies = await microlink.technologies(url, { ttl: '7d' })
  return technologies.some(({ name }) => name === 'Next.js')
}
```

See the [technologies parameter](/docs/api/parameters/insights/technologies) for the detection details and [technology detection](/docs/guides/insights/technology-detection) in the insights guide.
