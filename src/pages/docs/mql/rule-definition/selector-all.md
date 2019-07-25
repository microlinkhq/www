---
title: 'selectorAll'
---

Type: `string|string[]`<br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

The collection version of [selector](/docs/mql/rule-definition/selector). 

While `selector` returns you just the first result, `selectorAll` will returns you all results matching the value provided.

It's equivalent to [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

```html{10,16}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
  <nav>
    <a aria-current="page" class="active" href="/">
    <a href="/#principles">Principles</a>  
    <a href="/#pricing">Pricing</a>
    <a href="/embed">Embed</a>
    <a href="/screenshot">Screenshot</a>
    <a href="/docs/">Docs</a>
    <a href="/blog">Blog</a>
  </nav>
</body>
</html>
```

```js{5}
const mql = require('@microlink/mql')
const { data } mql(`https://microlink.io`, {
  rules: {
    links: {
      selectorAll: 'nav a',
      attr: 'href',
      type: 'url',
    }
  }
})
```

```json{3, 11}
{
  "data": {
     "links": [
      "https://microlink.io/",
      "https://microlink.io/#pricing",
      "https://microlink.io/#principles",
      "https://microlink.io/embed/",
      "https://microlink.io/screenshot/",
      "https://microlink.io/docs/",
      "https://microlink.io/blog/",
    ]
  }
}
```