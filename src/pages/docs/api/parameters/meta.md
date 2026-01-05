---
title: 'meta'
---

import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='true'/>

It enables normalized metadata detection over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: true
})} />

Normalized data fields are enabled by default, so explicit setting to `true` is unnecessary.

```json
  "status": "success",
  "data": {
    "title": "Wormholes Explained – Breaking Spacetime",
    "description": "Are wormholes real or are they just magic disguised as physics and maths? And if they are real how do they work and where can we find them?Sources and furthe...",
    "lang": "en",
    "author": null,
    "publisher": "YouTube",
    "image": {
      "url": "https://img.youtube.com/vi/9P6rdqiybaw/maxresdefault.jpg",
      "type": "jpg",
      "size": 120116,
      "height": 720,
      "width": 1280,
      "size_pretty": "120 kB"
    },
    "date": "2021-12-17T23:29:01.000Z",
    "url": "https://www.youtube.com/watch?v=9P6rdqiybaw",
    "logo": {
      "url": "https://www.youtube.com/s/desktop/21ad9f7d/img/favicon_144x144.png",
      "type": "png",
      "size": 1664,
      "height": 145,
      "width": 145,
      "size_pretty": "1.66 kB"
    }
  }
}
```

## Configurable Detection

You can configure which specific metadata fields to detect by passing an object with field-specific settings:

### Include specific fields

Detect only specific fields by setting them to `true`:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: { author: true, title: true }
})} />

This will only extract `author` and `title` metadata, ignoring other fields like `description`, `image`, etc.

### Exclude specific fields

Detect all fields except those explicitly set to `false`:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: { image: false, logo: false }
})} />

This will extract all metadata fields except `image` and `logo`, which can help reduce response size and improve performance when you don't need heavy assets.

If you don't need any of this, you can explicitly disable the default behavior 

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: false
})} />

Doing that you can speed up response timing for those cases you are not interested in consuming the metadata, like [screenshot](/docs/api/parameters/screenshot) or [video](/docs/api/parameters/video).

This will be reflected at `x-fetch-mode` response header whose value should be <Type children="'skipped'"/>.

```headers{4}
cache-control: public, immutable, max-age=86399
x-cache-status: MISS
x-cache-ttl: 86400000
x-fetch-mode: skipped
x-pricing-plan: free
x-rate-limit-limit: 50
x-rate-limit-remaining: 49
x-rate-limit-reset: 1751787476
x-request-id: iad:ba5a0c60-db4e-48c8-be6d-05ebaca22c61
x-response-time: 5.1s
```
