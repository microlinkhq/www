---
title: 'javascript'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

When it's <Type children='false'/>, it disables the javascript engine on the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://news.ycombinator.com&javascript=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com'. { 
      javascript: false
  })
  console.log(data)
}
  `
  }} 
/>
