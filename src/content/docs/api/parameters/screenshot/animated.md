---
title: 'screenshot › animated'
description: 'Record a website as a short video instead of a static image. Capture animations, transitions and live content as an H.264 MP4 with a single API call.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Video } from 'components/markdown/Video'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It records a short video of the target [url](/docs/api/parameters/url) instead of a static [screenshot](/docs/api/parameters/screenshot), capturing animations, transitions and any live content as it plays.

<Video src="/images/screenshot-animated.mp4" />

<MultiCodeEditorInteractive mqlCode={{ url: 'https://superpower.com', screenshot: { animated: true } }} />

When it's enabled, the `screenshot` data field includes an `animated` object pointing to the generated video:

```json
{
  "data": {
    "screenshot": {
      "animated": {
        "url": "https://microlink-cdn.s3.amazonaws.com/s/pjzG_NocJqnd2U/Ef2b6g9P944wI_.mp4",
        "duration": 5000,
        "duration_pretty": "5s",
        "fps": 60,
        "type": "mp4",
        "codec": "avc1.640028",
        "width": 1280,
        "height": 800,
        "size": 72516,
        "size_pretty": "72.5 kB"
      }
    }
  },
  "status": "success"
}
```

## Options

Pass an object to tune the recording:

| Field      | Type       | Default | Description                                                           |
| ---------- | ---------- | ------- | -------------------------------------------------------------------- |
| `duration` | `<number>` | `5000`  | Recording length in milliseconds (also accepts `'5s'`). Max `10000`. |
| `fps`      | `<number>` | `60`    | Frames per second. Max `60`.                                         |
| `type`     | `<string>` | `'mp4'` | Video container: `'mp4'` (H.264) or `'webm'` (VP9).                  |

<MultiCodeEditorInteractive mqlCode={{ url: 'https://superpower.com', screenshot: { animated: { duration: '8s', fps: 30 } } }} />

The recording starts at navigation, so the first moments capture the page loading before the content settles.

Like a regular screenshot, the resulting video can be combined with [embed](/docs/api/parameters/embed) to insert it directly as HTML markup:

```html
<video autoplay loop muted playsinline src="/images/image-1.mp4"></video>
```
