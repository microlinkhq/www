---
title: 'disableJavaScript'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

When it's <Type children='true'/>, it disables JavaScript on the entire browser page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&disableJavaScript`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com'. { 
      disableJavaScript: true
  })
  console.log(status, data)
}
  `
  }} 
/>
