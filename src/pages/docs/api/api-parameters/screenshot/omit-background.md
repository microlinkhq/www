---
title: 'omitBackground'
--- 

Type: `boolean`<br/>
Default: `true`

Hides default white background and allows capturing screenshots with transparency.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&omitBackground`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      omitBackground: true
  })
  console.log(status, data)
}
  `
  }} 
/>
