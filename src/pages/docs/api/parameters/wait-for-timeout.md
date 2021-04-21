---
title: 'waitForTimeout'
--- 

Type: <TypeContainer><Type children='<number>'/></TypeContainer><br/>

Wait a quantity of time in milliseconds before processing the content of the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://dev.to&waitForTimeout=1500&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://dev.to', { 
      screenshot: true,
      waitForTimeout: '1500'
  })
  console.log(status, data)
}
  `
  }} 
/>
