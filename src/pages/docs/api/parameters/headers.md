---
title: 'headers'
isPro: true
--- 

Type: <Type children='<object>'/>

You can supply custom HTTP headers that will be passed along when making requests.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&headers.userAgent=googlebot&headers.acceptLanguage=en-us`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      headers: {
        'user-agent': 'googlebot',
        'accept-language': 'en-US'
      }
  })
 
 console.log(status, data)
}
  `
  }} 
/>
