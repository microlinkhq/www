---
title: 'screenshot'
---

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

Takes a screenshot of a website, making it possible to embed it directly in your markup and refresh it asynchronously in the background (known as _stale_).

![]({{demolinks.netflix.screenshot.url}})

<MultiCodeEditor languages={{
  HTML: `<img src="https://api.microlink.io/?url={{demolinks.netflix.url}}&screenshot&embed=screenshot.url">`,
  Shell: `microlink {{demolinks.netflix.url}}&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{demolinks.netflix.url}}', { 
      screenshot: true
  })
  console.log(data)
}
  `
  }} 
/>

When it's enabled, a new `screenshot` data field will be part of the Microlink API response payload.

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

You can combine it with [embed](/docs/api/parameters/embed) for inserting it as HTML markup

```html
<!-- Meta & SEO Tags  -->
<meta
  name="image"
  content="https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  itemprop="image"
  content="https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  property="og:image"
  content="https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url"
/>
<meta
  name="twitter:image"
  content="https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url"
/>

<!-- regular HTML Tags  -->
<img
  src="https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url"
/>
```

or inside CSS stylesheets:

```css
.screenshot {
  background-image: url(https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url);
}
```

even in Markdown:

```md
![Screenshot](https://api.microlink.io?url={{demolinks.netflix.url}}&screenshot=true&meta=false&embed=screenshot.url)
```
