---
title: 'embed'
--- 

Type: <Type children='<string>'/>

It returns the specified data field as response over the target [url](/docs/api/parameters/url), mimic the same headers and body.

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://news.ycombinator.com/item?id=13713480', {
    screenshot: true, 
    embed: 'screenshot.url'
  })}
/>

<Figcaption children='You can use dot notation to reference a nested data field of the response payload.' />

In this way, you can embed any data field directly as part of your HTML markup.

```html
<img 
  src="https://api.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2Fitem%3Fid%3D13713480&meta=false&screenshot=&embed=screenshot.url" 
  alt="Hacker News"
>
```

And it will be rendered as an external image:

![](https://cdn.microlink.io/docs/embed.png)

This signals Microlink to return a specified field and set the `content-type` response accordingly, enabling API URLs to be used directly in HTML, CSS, and Markdown without JavaScript JSON parsing.

To authenticate requests securely, use [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to protect your credentials.

Read more about that at [authentication](/docs/api/basics/authentication) section.
