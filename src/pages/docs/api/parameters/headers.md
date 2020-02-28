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

Passing headers must the way for authenticating a non public target URL, providing the necessary headers for making it reachable for Microlink API.

<MultiCodeEditor languages={{
  Shell: `microlink-api hhttps://test-http-login.now.sh\&screenshot\&embed\=screenshot.url\&headers.Authorization\="Basic YWRtaW46YWRtaW4="\&meta\=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://test-http-login.now.sh', {
    headers: {
      Authorization: "Basic YWRtaW46YWRtaW4="
    }
  })
 
 console.log(status, data)
}
  `
  }} 
/>


Also, [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) is supported as part of the URL schema.

![](https://api.microlink.io/?url=https%3A%2F%2Fadmin%3Aadmin%40test-http-login.now.sh%2F&screenshot=&embed=screenshot.url)

<MultiCodeEditor languages={{
  Shell: `microlink-api https://admin:admin@test-http-login.now.sh&screenshot&embed=screenshot.url`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://admin:admin@test-http-login.now.sh', {
    screenshot: true
  })
 
 console.log(status, data)
}
  `
  }} 
/>
