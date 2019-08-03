---
title: Authentication
---

The authentication is done passing your API token associated with your [pro plan](/#pricing) as `x-api-key` request header.

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


You can ensure your authentication is done correctly checking the `x-pricing-plan` header on the response.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://www.instagram.com/p/BvDTdWdnzkj&apiKey=MyApiToken | grep -i "x-pricing-plan"`,
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

If you need to consume the API from a frontend side (eg, )
