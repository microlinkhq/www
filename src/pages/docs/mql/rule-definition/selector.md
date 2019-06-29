---
title: 'selector'
---

**Required**<br/>

Type: `string|string[]`<br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It defines the HTML element you want to get from the HTML of the target [url](/docs/api/api-parameters/url).

```html{11}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>kikobeats.com</title>
</head>
<body>
  <h1>Hey, I'm <span>Kiko Beats</span>, a millennial doing stuff on internet.</h1>
  <img id="avatar" src="https://kikobeats.com/images/avatar-glitch.jpg">
</body>
</html>
```

```js{5}
const mql = require('@microlink/mql')
const {data } mql(`https://kikobeats.com`, {
  rules: {
    avatar: {
      selector: '#avatar',
      attr: 'src'
    }
  }
})
```

```json{3}
{
  "data": {
    "avatar": "https://kikobeats.com/images/avatar-glitch.jpg"
  }
}
```

<Figcaption children='At least you need to specify the selector of the data to be extracted.' />

You can specify any [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), like:

- An HTML tag, e.g. `img`.
- An CSS class or pseudo class, id or data-attribute, e.g. `#avatar`.
- A combination of both, e.g. `img:first`.

You can pass a collection of selectors as well

```js{5}
const mql = require('@microlink/mql')
const {data } mql(`https://twitter.com/${username}`, {
  rules: {
    avatar: {
      selector: ['#avatar', 'img:first']
    }
  }
})
```

<Figcaption children='Using mulitple selector makes the rule more generic.' />

The position into the collection matters: The first rule that returns a truthy value after applying type will be used, not being applying the rest of the rules.
