---
title: 'isLandscape'
--- 

Type: `boolean`<br/>
Default: `false`

Specifies if viewport is in landscape mode.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&isLandscape=true`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      isLandscape: true
  })
  console.log(status, data)
}
  `
  }} 
/>
