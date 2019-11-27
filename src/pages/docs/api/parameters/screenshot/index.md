---
title: 'screenshot'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

Takes a screenshot of a website, making it possible to embed it directly in your markup and refresh it asynchronously in the background (known as *stale*).

![](https://api.microlink.io/?url={{DemoLinks.Netflix.url}}&screenshot&overlay.browser=dark&embed=screenshot.url&background=https://source.unsplash.com/random/1920x1080&meta=false)

<MultiCodeEditor languages={{
  Shell: `microlink-api {{DemoLinks.Netflix.url}}&screenshot&overlay.browser=dark&embed=screenshot.url&background=https://source.unsplash.com/random/1920x1080`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{DemoLinks.Netflix.url}}', { 
      screenshot: true ,
      overlay: {
        background: 'https://source.unsplash.com/random/1920x1080',
        browser: 'dark',
      }
  })
  console.log(status, data)
}
  `
  }} 
/>

When you enable it, a `screenshot` field will be included as part of the Microlink API response payload.

```json{3, 10}
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

You can complement it with the rest of the API parameters, like [embed](/docs/api/parameters/embed) for inserting the screenshot direcly in your HTML markup: 

```html
<!-- Meta & SEO Tags  -->
<meta name="image" content="https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url">
<meta itemprop="image" content="https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url">
<meta property="og:image" content="https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url">
<meta name="twitter:image" content="https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url">

<!-- regular HTML Tags  -->
<img src="https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url" />
```

or in your CSS stylesheets:

```css
.screenshot {
  background-image: url(https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url);
}
```

even in markdown:

```md
![Screenshot](https://api.microlink.io?url={{DemoLinks.Netflix.url}}&screenshot=true&meta=false&embed=screenshot.url)
```
