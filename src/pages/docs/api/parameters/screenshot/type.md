---
title: 'type'
--- 

Type: <Type children='<string>'/><br/>
Default: <Type children="'png'"/><br/>
Values: <TypeContainer><Type children="'jpeg'"/> | <Type children="'png'"/></TypeContainer>

Specifies the screenshot file type.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&screenshot&type=jpeg`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      type: 'jpeg'
  })
  console.log(data)
}
  `
  }} 
/>
