---
title: 'deviceScaleFactor'
---

Type: `number`<br/>
Default: `1`

Specify device scale factor.

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
