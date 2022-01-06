---
title: 'timeout'
---

Type: <Type children='<number>'/><br/>
Default: <Type children="25000"/>

It defines the maximum quantity of time allowed for resolving a request successfully.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&ping`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      timeout: 25000
  })
  
 console.log(data)
}
  `
  }} 
/>

<Figcaption>The default value is the maximum time available.</Figcaption>
