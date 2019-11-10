---
title: 'deviceScaleFactor'
---

Type: `number`<br/>
Default: `1`

Specifies the device scale factor ratio.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&deviceScaleFactor=0.65`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      deviceScaleFactor: 0.65
  })
  console.log(status, data)
}
  `
  }} 
/>
