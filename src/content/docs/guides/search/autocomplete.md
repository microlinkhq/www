---
title: 'Search: Autocomplete'
description: 'Search suggestions as the user types. Use it for query expansion, demand modeling, and prompt seeding.'
---

import { Link } from 'components/elements/Link'

Search suggestions as the user types. Use it for query expansion, demand modeling, and prompt seeding.

```js
const page = await google('javascript debounce', { type: 'autocomplete' })
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Suggested query string |

```js
const page = await google('javascript debounce', { type: 'autocomplete' })

page.results
// [
//   { value: 'javascript debounce' },
//   { value: 'javascript debounce function' },
//   { value: 'javascript debounce vs throttle' },
//   { value: 'javascript debounce implementation' },
//   { value: 'javascript debounce and throttle' },
//   { value: 'javascript debounce example' },
//   { value: 'javascript debounce function example' },
//   { value: 'javascript debounce library' },
//   { value: 'javascript debounce async function' },
//   { value: 'javascript debounce event listener' }
// ]
```

`autocomplete` is lightweight and fast. Use it before heavier surfaces to discover what people are actually searching for, then route those expanded queries to `search`, `news`, or `scholar`.

## See also

- <Link href='/docs/guides/search/search' children='Web Search' /> — run the expanded queries as full web searches.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — query expansion and vertical routing workflows.
