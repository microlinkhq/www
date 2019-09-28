---
title: 'isMobile'
--- 

Type: `boolean`<br/>
Default: `false`

Whether the meta viewport tag is taken into account.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&isMobile=true`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      isMobile: true
  })
  console.log(status, data)
}
  `
  }} 
/>
