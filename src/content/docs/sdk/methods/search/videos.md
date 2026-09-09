---
title: 'videos'
isPro: true
description: 'Get Google Videos results as structured data with the Microlink SDK: title, channel, duration, publish date, and thumbnail.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'videos'"/>

Video metadata with duration and channel. Pass `type: 'videos'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('node.js streams', { type: 'videos' })

results[0]
// {
//   title: 'Learn Node.js Streams in 25 minutes',
//   channel: 'Dipesh Malvia',
//   url: 'https://www.youtube.com/watch?v=EcznOgzOdxI',
//   description: 'In this video we will understand what are streams…',
//   date: '2024-08-22T12:00:00.000Z',
//   publisher: 'YouTube',
//   duration: 1502000,
//   duration_pretty: '25m'
// }
```

## Result

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Video title |
| `url` | `string` | Video page URL |
| `description` | `string` | Video description snippet |
| `image` | `{ url }?` | Video thumbnail |
| `video` | `{ url }?` | Direct video URL if available |
| `duration` | `number?` | Duration in milliseconds |
| `duration_pretty` | `string?` | Human-readable duration (`'25m'`, `'1h'`) |
| `publisher` | `string?` | Platform name |
| `channel` | `string?` | Channel or creator name |
| `date` | `string?` | ISO 8601 publish date |

See the [videos guide](/docs/guides/search/videos) for tutorial-discovery workflows.
