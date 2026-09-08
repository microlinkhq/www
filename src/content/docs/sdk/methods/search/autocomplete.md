---
title: 'autocomplete'
isPro: true
description: 'Get Google autocomplete suggestions as structured data with the Microlink SDK: query strings for expansion, demand modeling, and prompt seeding.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'autocomplete'"/>

Query suggestions as the user types. Pass `type: 'autocomplete'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('javascript debounce', { type: 'autocomplete' })

results.map(({ value }) => value)
// [
//   'javascript debounce',
//   'javascript debounce function',
//   'javascript debounce vs throttle',
//   …
// ]
```

## Result

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Suggested query string |

Lightweight enough to run before a heavier surface. Use it to discover what people are actually searching for, then route those expanded queries to [search](/docs/sdk/methods/search/search), [news](/docs/sdk/methods/search/news), or [scholar](/docs/sdk/methods/search/scholar).

See the [autocomplete guide](/docs/guides/search/autocomplete) for query-expansion workflows.
