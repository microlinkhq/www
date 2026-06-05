---
title: 'screenshot'
description: 'Generate high-fidelity screenshots of any website with a single API call. Automatically handle headless browser infrastructure to extract visual data.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It generates a screenshot over the target [url](/docs/api/parameters/url).

![](/images/netflix.png)

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.netflix.com/title/80057281', screenshot: true }} />

When it's enabled, a new `screenshot` data field will be part of the response payload.

```json
{
  "data": {
    "screenshot": {
      "url": "https://microlink-cdn.s3.amazonaws.com/s/pjzG_NocJqnd2U/Ef2b6g9P944wI_",
      "width": 1920,
      "height": 1080,
      "type": "jpg",
      "size": 284037,
      "size_pretty": "284 kB"
    }
  },
  "status": "success"
}
```

You can configure different specific options, such as [element](/docs/api/parameters/screenshot/element) or [overlay](/docs/api/parameters/screenshot/overlay):

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.netflix.com/title/80057281', screenshot: true, element: "#section-hero" }} />

Also, combine it with [embed](/docs/api/parameters/embed) for inserting it as HTML markup and refresh it asynchronously in the background (known as _stale_).

```html
<!-- Meta & SEO Tags  -->
<meta
  property="og:image"
  content="/images/image-1.png"
/>
<!-- regular HTML Tags  -->
<img
  src="/images/image-1.png"
/>
```

or inside CSS stylesheets:

```css
.screenshot {
  background-image: url(/images/image-1.png);
}
```

even in Markdown:

```md
![Screenshot](/images/image-1.png)
```
