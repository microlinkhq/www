---
title: 'Search: Places'
description: 'Local business listings with coordinates and contact info. Use it for local entity lookup when you need addresses, phone numbers, and geographic coordinates.'
---

import { Link } from 'components/elements/Link'

Local business listings with coordinates and contact info. Use it for local entity lookup when you need addresses, phone numbers, and geographic coordinates.

```js
const page = await google('coworking spaces barcelona', { type: 'places' })
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Business name |
| `address` | `string` | Street address |
| `latitude` | `number` | Geographic latitude |
| `longitude` | `number` | Geographic longitude |
| `rating` | `number?` | Average rating |
| `ratingCount` | `number?` | Number of reviews |
| `category` | `string?` | Business category |
| `phone` | `{ number }?` | Phone number |
| `url` | `string?` | Website URL |
| `cid` | `string` | Google CID identifier |

```js
const page = await google('coworking spaces barcelona', { type: 'places' })

page.results[0]
// {
//   title: 'Betahaus | Coworking Barcelona',
//   address: 'Carrer de Vilafranca, 7, 08024 Barcelona, Spain',
//   latitude: 41.406982,
//   longitude: 2.1567652,
//   rating: 4.8,
//   ratingCount: 417,
//   category: 'Coworking space',
//   phone: { number: '+34 655 62 71 49' },
//   url: 'https://www.betahaus.es/...',
//   cid: '15533147541347981884'
// }
```

Choose `places` for simple local listings. Choose <Link href='/docs/guides/search/maps' children='Maps' /> when you need opening hours, price levels, or place IDs for downstream API calls.

## See also

- <Link href='/docs/guides/search/maps' children='Maps' /> — richer place metadata with ratings, hours, and pricing.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — entity and local lookup workflows.
