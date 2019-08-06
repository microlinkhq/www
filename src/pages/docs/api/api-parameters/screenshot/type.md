---
title: 'type'
--- 

Type: `string`<br/>
Default: `'png'`<br/>
Values: `'jpeg'|'png'`

Specify screenshot type.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&type=jpeg`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      type: 'jpeg'
  })
  console.log(status, data)
}
  `
  }} 
/>
