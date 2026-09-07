---
title: 'lighthouse'
description: 'Run a full Lighthouse report for any URL with the Microlink SDK, choosing categories and audits and getting the report as JSON, HTML, or CSV.'
---

A full [Lighthouse](https://developers.google.com/web/tools/lighthouse) report for any URL:

```js
const report = await microlink.lighthouse('https://example.com')

console.log(report.categories.performance.score)
```

It resolves to the Lighthouse result object — `categories`, `audits`, `timing`, and the rest — serialized as JSON by default, which [lighthouse.microlink.io](https://lighthouse.microlink.io) can render as a shareable page.

## Options

- `onlyCategories` `<string[]>` — runs only the given categories, e.g. `['performance', 'accessibility']`.
- `onlyAudits` `<string[]>` — runs only the given audits.
- `skipAudits` `<string[]>` — skips the given audits.
- `output` `<string> | <string[]>` — the report format: `'json'`, `'html'`, or `'csv'` (default: `'json'`).

Any [shared option](/docs/sdk/getting-started/options) applies too. A report reflects the emulated [device](/docs/api/parameters/device), and it's expensive enough to be worth a long [ttl](/docs/api/parameters/ttl).

## Examples

Audit just two categories and get the report as a self-contained HTML page:

```js
const report = await microlink.lighthouse('https://example.com', {
  onlyCategories: ['performance', 'accessibility'],
  output: 'html'
})
```

The Core Web Vitals of a page on a phone, cached for a day:

```js
const { audits } = await microlink.lighthouse('https://example.com', {
  device: 'iPhone 11',
  onlyAudits: ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'],
  ttl: '1d'
})

for (const { title, displayValue } of Object.values(audits)) console.log(title, displayValue)
```

Other [Lighthouse settings](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md), such as `preset`, aren't routed by the SDK; pass them through [MQL](/docs/sdk/mql/getting-started/overview) as `insights: { lighthouse: { preset: 'desktop' } }` when you need them.

See the [lighthouse parameter](/docs/api/parameters/insights/lighthouse) for the underlying API and [Lighthouse reports](/docs/guides/insights/lighthouse-reports) in the insights guide.
