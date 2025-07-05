---
title: 'screenshot'
---

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It generates a screenshot over the target [url](/docs/api/parameters/url).

![](https://cdn.microlink.io/docs/netflix.png)

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.netflix.com/title/80057281', { screenshot: true })} />

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

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.netflix.com/title/80057281', { screenshot: true, element: "#section-hero" })} />

Also, combine it with [embed](/docs/api/parameters/embed) for inserting it as HTML markup and refresh it asynchronously in the background (known as _stale_).

```html
<!-- Meta & SEO Tags  -->
<meta
  name="image"
  content="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  itemprop="image"
  content="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  property="og:image"
  content="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  name="twitter:image"
  content="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url"
/>

<!-- regular HTML Tags  -->
<img
  src="https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url"
/>
```

or inside CSS stylesheets:

```css
.screenshot {
  background-image: url(https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url);
}
```

even in Markdown:

```md
![Screenshot](https://api.microlink.io?url=https://www.netflix.com/title/80057281&screenshot=true&meta=false&embed=screenshot.url)
```
