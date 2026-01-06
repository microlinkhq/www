---
title: 'video'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

Enables video source detection over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', {video: true })} />

<Figcaption children="Some websites can be different output based on User Agent." />

The video source URL detected will be in a browser-friendly format to be possible embedded it.

The video detection introduce some human readable fields as part of the payload:

```json
{
  "status": "success",
  "data": {
    "title": "Wormholes Explained – Breaking Spacetime",
    "description": "Are wormholes real or are they just magic…",
    "lang": "en",
    "author": "Kurzgesagt – In a Nutshell",
    "publisher": "YouTube",
    "image": {
      "url": "https://img.youtube.com/vi/9P6rdqiybaw/maxresdefault.jpg",
      "type": "jpg",
      "size": 120116,
      "height": 720,
      "width": 1280,
      "size_pretty": "120 kB"
    },
    "date": "2022-01-20T22:57:11.000Z",
    "url": "https://www.youtube.com/watch?v=9P6rdqiybaw",
    "logo": {
      "url": "https://www.youtube.com/s/desktop/3f35b67c/img/favicon_144x144.png",
      "type": "png",
      "size": 2783,
      "height": 144,
      "width": 144,
      "size_pretty": "2.78 kB"
    },
    "video": {
      "url": "https://rr3---sn-ab5l6n6e.googlevideo.com/videoplayback?expire=1642741040&ei=0OjpYfCJ…",
      "type": "mp4",
      "duration": 552.007,
      "size": 98183318,
      "height": 720,
      "width": 1280,
      "duration_pretty": "9m",
      "size_pretty": "98.2 MB"
    }
  }
}
```
