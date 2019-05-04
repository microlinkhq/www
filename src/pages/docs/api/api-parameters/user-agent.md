---
title: 'user agent'
--- 

Type: `string`

Specify the user agent to be used in the moment of extract the content of the target URL.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&userAgent=Googlebot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      userAgent: 'Googlebot' 
  })
 
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children="Some websites can be different output based on User Agent." />
