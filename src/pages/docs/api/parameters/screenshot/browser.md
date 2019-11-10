---
title: 'browser'
--- 

Type: `string`
Values: `'light'|'dark'`

Sets the browser overlay to be used with your screenshot.

![](https://api.microlink.io/?url={{DemoLinks.Nasa.url}}&screenshot&browser=dark&embed=screenshot.url&meta=false)

<MultiCodeEditor languages={{
  Shell: `microlink-api {{DemoLinks.Nasa.url}}&screenshot&browser=dark`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{DemoLinks.Nasa.url}}'. { 
      screenshot: true,
      browser: 'dark'
  })
  console.log(status, data)
}
  `
  }} 
/>
