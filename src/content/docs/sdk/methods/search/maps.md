---
title: 'maps'
isPro: true
description: 'Get Google Maps places as structured data with the Microlink SDK: hours, price level, ratings, place types, and Place IDs.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'maps'"/>

Richer place data than [places](/docs/sdk/methods/search/places) — opening hours, price levels, place types, and thumbnails. Pass `type: 'maps'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('restaurants madrid', { type: 'maps' })

results[0]
// {
//   title: 'Rosi La Loca',
//   address: 'C. de Cádiz, 4, Centro, 28012 Madrid, Spain',
//   latitude: 40.4158037,
//   longitude: -3.7029837,
//   rating: 4.7,
//   ratingCount: 25007,
//   type: 'Restaurant',
//   types: ['Restaurant', 'Lounge bar'],
//   price: { level: '€20–40' },
//   phone: { number: '+34 915 32 66 81' },
//   opening: { hours: { Monday: '12:30 PM–1:30 AM', … } },
//   url: 'http://www.rosilaloca.com/',
//   place: { id: 'ChIJgwIBTHkoQg0RD1lm5kc2tWI' },
//   cid: '7112650868937611535'
// }
```

## Result

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Place name |
| `address` | `string` | Full address |
| `latitude` | `number` | Geographic latitude |
| `longitude` | `number` | Geographic longitude |
| `rating` | `number?` | Average rating |
| `ratingCount` | `number?` | Number of reviews |
| `price` | `{ level }?` | Price level indicator |
| `type` | `string?` | Primary place type |
| `types` | `string[]?` | All place types |
| `url` | `string?` | Website URL |
| `phone` | `{ number }?` | Phone number |
| `description` | `string?` | Place description |
| `opening` | `{ hours }?` | Opening hours by day |
| `thumbnail` | `{ url }?` | Place thumbnail image |
| `cid` | `string` | Google CID identifier |
| `fid` | `string?` | Google FID identifier |
| `place` | `{ id }?` | Google Place ID |

See the [maps guide](/docs/guides/search/maps) for entity and local lookup workflows.
