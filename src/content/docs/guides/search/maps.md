---
title: 'Search: Maps'
description: 'Detailed place data with ratings, hours, and pricing. Use it when you need richer metadata than Places provides.'
---

import { Link } from 'components/elements/Link'

Detailed place data with ratings, hours, and pricing. Use it when you need richer metadata than <Link href='/docs/guides/search/places' children='Places' /> provides — opening hours, price levels, place types, and thumbnails.

```js
const page = await google('restaurants madrid', { type: 'maps' })
```

## Result fields

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

```js
const page = await google('restaurants madrid', { type: 'maps' })

page.results[0]
// {
//   title: 'Rosi La Loca',
//   address: 'C. de Cádiz, 4, Centro, 28012 Madrid, Spain',
//   latitude: 40.4158037,
//   longitude: -3.7029837,
//   rating: 4.7,
//   ratingCount: 25007,
//   type: 'Restaurant',
//   types: ['Restaurant', 'Lounge bar'],
//   description: 'Maximalist, multicolored venue serving cocktails & tapas, plus Spanish dishes like paellas.',
//   price: { level: '€20–40' },
//   phone: { number: '+34 915 32 66 81' },
//   opening: {
//     hours: {
//       Monday: '12:30 PM–1:30 AM',
//       Tuesday: '12:30 PM–1:30 AM',
//       Saturday: '12 PM–1:30 AM',
//       Sunday: '12 PM–1:30 AM'
//     }
//   },
//   url: 'http://www.rosilaloca.com/',
//   place: { id: 'ChIJgwIBTHkoQg0RD1lm5kc2tWI' },
//   cid: '7112650868937611535'
// }
```

## See also

- <Link href='/docs/guides/search/places' children='Places' /> — simpler local listings when you only need addresses and coordinates.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — entity and local lookup workflows.
