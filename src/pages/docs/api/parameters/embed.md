---
title: 'embed'
--- 

Type: <Type children='<string>'/>

It returns the specified data field as response, mimic the same headers and body.

![](https://api.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2F&meta=false&screenshot=&embed=screenshot.url)

<MultiCodeEditor languages={mqlCode('https://news.ycombinator.com/', { screenshot: true, embed: 'screenshot.url' })} />

<Figcaption children='You can use dot notation to reference a nested data field of the response payload.' />

In this way, you can embed any data field directly as part of your HTML markup.

```html
<img 
  src="https://api.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2F&meta=false&screenshot=&embed=screenshot.url" alt="Hacker News">
```

In order to authenticate your requests, you should use [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to don't expose your credentials. 

Read more about that at [authentication](/docs/api/parameters/authentication) section.
