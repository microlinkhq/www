---
title: 'browser'
--- 

Type: `string`
Values: `'light'|'dark'`

It sets the browser overlay to use with your screenshot.

![](https://api.microlink.io/?url=https://microlink.io&screenshot&browser=light&embed=screenshot.url)

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&browser=dark`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      browser: 'dark'
  })
  console.log(status, data)
}
  `
  }} 
/>
