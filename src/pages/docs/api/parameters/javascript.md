---
title: 'javascript'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

When it's <Type children='false'/>, it disables javascript on the entire browser page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&javascript=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com'. { 
      javascript: false
  })
  console.log(status, data)
}
  `
  }} 
/>
