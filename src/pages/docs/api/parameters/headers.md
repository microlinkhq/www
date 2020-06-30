---
title: 'headers'
isPro: true
--- 

Type: <Type children='<object>'/>

You can supply any custom HTTP header to be passed along over the [url](/docs/api/parameters/url).

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
  Shell: `microlink-pro https://test-http-login.now.sh\&screenshot\&embed\=screenshot.url\&headers.Authorization\="Basic+YWRtaW46YWRtaW4="\&meta\=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://test-http-login.now.sh', {
    headers: {
      authorization: "Basic YWRtaW46YWRtaW4="
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

One consideration to keep in mind is that values provided will be passed as query parameters, meaning anyone can see them since they are public.

In case you are treating with sensible headers (e.g., [authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) or [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie)) you can pass them as part of the request headers rather tha query parameters.

In that way, they will be not publicly exposed. They should be prefixes with `x-api-header`:

<MultiCodeEditor languages={{
  Shell: `curl -H 'x-api-header-authorization: Basic YWRtaW46YWRtaW4=' https://test-http-login.now.sh\&screenshot\&embed\=screenshot.url\&meta\=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://test-http-login.now.sh', {
    headers: {
      'accept-language': 'en-US'
    }
  }, {
    headers: {
      'x-api-header-authorization': 'Basic YWRtaW46YWRtaW4='
    }
  })
 
 console.log(status, data)
}
  `
  }} 
/>

In that way, they will be not publicly exposed.
