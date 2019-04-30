---
title: 'user agent'
--- 

Type: `string`

Specify the user agent to be used in the moment of extract the content of the target URL.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      userAgent: 'Googlebot' 
  })
 
 console.log(status, data)
}
  `,
  cURL: `curl https://api.microlink.io?url=https://news.ycombinator.com&userAgent=Googlebot`, 
  }} 
/>

<Figcaption children="Some websites can be different output based on User Agent." />
