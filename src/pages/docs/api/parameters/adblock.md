---
title: 'adblock'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

When it's <Type children='true'/>, it enables to block third party requests coming from advertisements trackers cookies banners, coin miners, etc.

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

The adblock engine is provided by [Cliqz](https://github.com/cliqz-oss/adblocker). It's always up to date with the latest lists of resources to block, that generally bloat the response time of any website and they aren't essential.
