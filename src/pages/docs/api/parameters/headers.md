---
title: 'headers'
isPro: true
--- 

Type: <Type children='<object>'/>

You can supply any custom HTTP header to be passed along over the [url](/docs/api/parameters/url).

<MultiCodeEditor languages={{
  Shell: `microlink https://news.ycombinator.com&headers.userAgent=googlebot&headers.acceptLanguage=en-us`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      headers: {
        'user-agent': 'googlebot',
        'accept-language': 'en-US'
      }
  })
 
 console.log(data)
}
  `
  }} 
/>

Passing headers must the way for authenticating a non public target URL, providing the necessary headers for making it reachable for Microlink API.

<MultiCodeEditor languages={{
  Shell: `microlink https://test-http-login.vercel.app\&screenshot\&embed\=screenshot.url\&headers.Authorization\="Basic+YWRtaW46YWRtaW4="\&meta\=false --apiKey MY_API_KEY`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://test-http-login.vercel.app', {
    headers: {
      authorization: "Basic YWRtaW46YWRtaW4="
    }
  })
 
 console.log(data)
}
  `
  }} 
/>


Also, [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) is supported as part of the URL schema.

![](https://api.microlink.io/?url=https%3A%2F%2Fadmin%3Aadmin%40test-http-login.vercel.app%2F&screenshot=&embed=screenshot.url)

<MultiCodeEditor languages={{
  Shell: `microlink https://admin:admin@test-http-login.vercel.app&screenshot&embed=screenshot.url`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://admin:admin@test-http-login.vercel.app', {
    screenshot: true
  })
 
 console.log(data)
}
  `
  }} 
/>

One consideration to keep in mind is that values provided will be passed as query parameters, meaning anyone can see them since they are public.

In case you are treating with sensible headers (e.g., [authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) or [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie)) you can pass them as part of the request headers rather tha query parameters.

For doing that, you need to pass the values with `x-api-header-*` prefix:

<MultiCodeEditor languages={{
  Shell: `curl --header 'x-api-header-authorization: Basic YWRtaW46YWRtaW4=' https://test-http-login.vercel.app\&screenshot\&embed\=screenshot.url\&meta\=false`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://test-http-login.vercel.app', {
    headers: {
      'accept-language': 'en-US'
    }
  }, {
    headers: {
      'x-api-header-authorization': 'Basic YWRtaW46YWRtaW4='
    }
  })
 
 console.log(data)
}
  `
  }} 
/>

In that way, they will be not publicly exposed.
