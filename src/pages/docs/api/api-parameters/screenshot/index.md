---
title: 'screenshot'
--- 

Type: `boolean|string`<br/>
Default: `false`<br/>
Values: `true|false|{devideName}`

Take a screenshot of the website.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true 
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>The image will be hosted at <Link href="https://imgur.com">imgur.com</Link>.</Figcaption>

After that, a new field `screenshot` will present int the data payload.

```json
{
  "data": {
    "screenshot": {
      "url": "https://i.imgur.com/rLReKBy.png",
      "width": 1280,
      "height": 800,
      "type": "png",
      "size": 179126,
      "size_pretty": "179 kB"
    }
  },
  "status": "success"
}
```
