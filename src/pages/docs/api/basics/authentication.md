---
title: Authentication
---

The authentication is done passing your API token associated with your [pro plan](/#pricing) as `x-api-key` request header.

<MultiCodeEditor languages={{
  Shell: `curl --header 'x-api-key: YOUR_API_TOKEN' https://pro.microlink.io?url=https://github.com/microlinkhq`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://github.com/microlinkhq/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(data)
}
  `
  }} 
/>

You can ensure your authentication is done correctly checking the `x-pricing-plan` header on the response.

<MultiCodeEditor languages={{
  Shell: `curl --head --silent --header 'x-api-key: YOUR_API_TOKEN' https://pro.microlink.io?url=https://github.com/microlinkhq | grep -i "x-pricing-plan:"`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://github.com/microlinkhq/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(response.headers['x-pricing-plan']) // => pro
}
  `
  }} 
/>

If you need to consume the API from a frontend side (e.g, from a website), don't attach your API token directly in your client code: It will easy to a visitor leak it and consume your API quota without consent.

Instead, you need to setup a mechanism to just allow consume your token for a allowed list of trusted domains. 

Check our repositories [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to accomplish that, only allowing a list of well-known domains to consume your API quota.
