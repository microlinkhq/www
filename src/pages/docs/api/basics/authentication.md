---
title: Authentication
---

The authentication is done passing your API token associated with your [pro plan](/#pricing) as `x-api-key` request header.

<MultiCodeEditor languages={{
  ...mqlCode("https://github.com", { headers: { 'x-api-key': 'YOUR_API_TOKEN' }}),
  CLI: 'microlink https://github.com --api-key YOUR_API_TOKEN',
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://github.com/microlinkhq/', { 
      apiKey: 'MyApiToken' 
    })
  
  console.log(data)
}
  `,
  Shell: `curl --header 'x-api-key: YOUR_API_TOKEN' https://pro.microlink.io?url=https://github.com/microlinkhq`
  
  }} 
/>

You can ensure your authentication is done correctly checking the `x-pricing-plan` header on the response.

```bash{4}
HTTP/2 200
content-type: application/json; charset=utf-8
x-response-time: 1.7s
x-pricing-plan: pro
x-cache-ttl: 86400000
x-request-id: iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status: BYPASS
cache-control: public, must-revalidate, max-age=0
x-fetch-time: 0ms
```

If you need to consume the API from a frontend side (e.g, from a website), don't attach your API token directly in your client code: It will easy to a visitor leak it and consume your API quota without consent.

Instead, you need to setup a mechanism to just allow consume your token for a allowed list of trusted domains. 

Check our repositories [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to accomplish that, only allowing a list of well-known domains to consume your API quota.
