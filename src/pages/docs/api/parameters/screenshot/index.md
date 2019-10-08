---
title: 'screenshot'
--- 

Type: `boolean|string`<br/>
Default: `false`<br/>
Values: `true|false|{devideName}`

It takes a screenshot of a website, being possible embed it directly in your markup and asynchronous refresh it on the background (known as *stale*).

![](https://api.microlink.io/?url={{DemoLinks.Netflix.url}}&screenshot&browser=dark&embed=screenshot.url&background=https://source.unsplash.com/random/1920x1080&meta=false)

<MultiCodeEditor languages={{
  Shell: `microlink-api {{DemoLinks.Netflix.url}}&screenshot&browser=dark&embed=screenshot.url&background=https://source.unsplash.com/random/1920x1080`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{DemoLinks.Netflix.url}}'. { 
      screenshot: true ,
      background: 'https://source.unsplash.com/random/1920x1080',
      browser: 'dark',
  })
  console.log(status, data)
}
  `
  }} 
/>

When you enable it, a field `screenshot` will present as part of Microlink API response payload.

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
