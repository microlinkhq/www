---
title: 'adblock'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

When it's <Type children='true'/>, it disables builtin adblock in the current page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://www.youtube.com&screenshot&adblock=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.youtube.com'. { 
      adblock: false
  })
  console.log(status, data)
}
  `
  }} 
/>

If the target URL has a lot of third party requests that normally they are aborted when adlbock is enabled, could be possible that the request finishes on timeout.
