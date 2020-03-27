---
title: 'timeout'
---

Type: <Type children='<number>'/><br/>
Default: <Type children="25000"/>

It defines the maximum quantity of time allowed for resolving a request successfully.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&ping`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      timeout: 25000
  })
  
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption>The default value is the maximum time available.</Figcaption>
