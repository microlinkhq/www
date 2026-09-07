---
title: 'Data definition'
description: 'The primitives of a Microlink Query Language rule: selector, selectorAll, attr, type, and evaluate, and how each one shapes the value extracted from a page.'
---

Every [rule](/docs/sdk/mql/rules/basic) is built from a handful of primitives. Each one answers a single question about the value you want:

| Primitive | Question it answers | Example |
|-----------|---------------------|---------|
| [selector](/docs/sdk/mql/data/selector) | Which element? The first match of a CSS selector | `'meta[property="og:image"]'` |
| [selectorAll](/docs/sdk/mql/data/selectorAll) | Which elements? Every match, returning a collection | `'.athing'` |
| [attr](/docs/sdk/mql/data/attr) | What to read from it: an HTML attribute, or `text`, `html`, `markdown`, `json` | `'content'` |
| [type](/docs/sdk/mql/data/type) | How to validate and normalize the value | `'image'` |
| [evaluate](/docs/sdk/mql/data/evaluate) | Run JavaScript in the page instead of querying the DOM | `'window.next.version'` |

A rule needs at least a query — `selector`, `selectorAll`, or `evaluate` — or an `attr` alone to serialize the whole page. Omitted primitives fall back to `attr: 'html'` and `type: 'auto'`.

In the SDK these are the keys you pass to [extract](/docs/sdk/methods/extract), and the options accepted by [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and the [collections](/docs/sdk/methods/collections).
