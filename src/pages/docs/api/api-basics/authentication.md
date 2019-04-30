---
title: Authentication
---

The authentication is necessary just for paid plans and it will be done attaching your API Key as value of the `x-api-key` header on your requests

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(status, data)
}
  `,
  cURL: `
curl -H "x-api-key: MyApiToken" \\
https://pro.microlink.io?url=https://www.instagram.com/p/BvDTdWdnzkj/`, 
  }} 
/>


You can ensure your authentication is done checking the `x-pricing-plan` header on the response, that reflects if you are using a `pro` or `free` plan.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(response.headers['x-pricing-plan']) // => pro
}
  `,
  cURL: `
curl -H "x-api-key: MyApiToken" \\
https://pro.microlink.io?url=https://www.instagram.com/p/BvDTdWdnzkj/ -i \\
| grep -i "x-pricing-plan"`, 
  }} 
/>
