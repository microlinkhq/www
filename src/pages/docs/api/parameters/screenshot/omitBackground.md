---
title: 'omitBackground'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>



When it's <Type children='true'/>, it hides default white background and allows capturing screenshots with transparency.

<MultiCodeEditor languages={{
  Shell: `microlink https://kikobeats.com&screenshot&omitBackground`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://kikobeats.com'. { 
      screenshot: true,
      omitBackground: true
  })
  console.log(data)
}
  `
  }} 
/>
