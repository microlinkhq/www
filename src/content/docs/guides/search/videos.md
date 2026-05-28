---
title: 'Search: Videos'
description: 'Video metadata with duration in milliseconds. Use it for tutorial discovery, content research, and video SERP coverage.'
---

import { Link } from 'components/elements/Link'

Video metadata with duration in milliseconds. Use it for tutorial discovery, content research, and video SERP coverage.

```js
const page = await google('node.js streams', { type: 'videos' })
```

## Result fields

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

```js
const page = await google('node.js streams', { type: 'videos' })

page.results[0]
// {
//   title: 'Learn Node.js Streams in 25 minutes | NodeJS Tutorials for ...',
//   channel: 'Dipesh Malvia',
//   url: 'https://www.youtube.com/watch?v=EcznOgzOdxI',
//   description: 'In this video we will understand what are streams, types of streams and their uses in Node.js...',
//   date: '2024-08-22T12:00:00.000Z',
//   publisher: 'YouTube',
//   duration: 1502000,
//   duration_pretty: '25m'
// }
```

## See also

- <Link href='/docs/guides/search/images' children='Images' /> — when you need static image metadata instead of video.
- <Link href='/docs/guides/search/content-expansion' children='Content expansion' /> — fetch the source page content for any video result.
