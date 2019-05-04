---
title: Authentication
---

The authentication is necessary just for paid plans and it will be done attaching your API Key as value of the `x-api-key` header on your requests

<MultiCodeEditor languages={{
  Shell: `microlink-api https://www.instagram.com/p/BvDTdWdnzkj&apiKey=MyApiToken`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(status, data)
}
  `
  }} 
/>


You can ensure your authentication is done checking the `x-pricing-plan` header on the response, that reflects if you are using a `pro` or `free` plan.

<MultiCodeEditor languages={{
  Shell: `microlink-api \\
https://www.instagram.com/p/BvDTdWdnzkj&apiKey=MyApiToken \\
| grep -i "x-pricing-plan"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(response.headers['x-pricing-plan']) // => pro
}
  `
  }} 
/>
