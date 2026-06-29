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

<MultiCodeEditorInteractive mqlCode={{ url: 'https://threejs.org/examples/webgl_animation_skinning_blending', screenshot: { animated: true } }} />

When it's enabled, the `screenshot` data field includes an `animated` object pointing to the generated video:

```json
{
  "data": {
    "screenshot": {
      "size_pretty": "619 kB",
      "size": 618992,
      "type": "png",
      "url": "https://iad.microlink.io/2ov-NQjphkr40lNPhXkT0jrVDuFvuEt1DNa9csiaWFJcVb4NrTmMYXmA3FKIcXoR7xjHTr_etfTdKzHl3Bp-RA.png",
      "width": 2560,
      "height": 1600,
      "animated": {
        "duration": 5000,
        "duration_pretty": "5s",
        "fps": 60,
        "size_pretty": "135 kB",
        "size": 134930,
        "type": "mp4",
        "codec": "avc1.640028",
        "backend": "screencast",
        "url": "https://iad.microlink.io/bM7LYSDXoIZumb0MddoxP1NZCfmbSNNA9dJcjIdkpMoDPR1psJFGPi_q1TiYh5qIqtC-T2_0T5Tn4pkAjfZo8A.mp4",
        "width": 1280,
        "height": 800
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

<MultiCodeEditorInteractive mqlCode={{ url: 'https://threejs.org/examples/webgl_animation_skinning_blending', screenshot: { animated: { duration: '8s', fps: 30 } } }} />

The recording starts at navigation, so the first moments capture the page loading before the content settles.

Like a regular screenshot, it can be combined with [embed](/docs/api/parameters/embed) to serve the video directly from the API (the response body is the `video/mp4` itself), so you can drop the request URL straight into a `<video>` tag:

```html
<video
  autoplay
  loop
  muted
  playsinline
  src="https://api.microlink.io/?url=https://threejs.org/examples/webgl_animation_skinning_blending&meta=false&screenshot.animated=true&embed=screenshot.animated.url"
></video>
```
