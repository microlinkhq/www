---
title: 'selector'
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

Defines the first HTML element you want to get from the HTML of the target [url](/docs/api/parameters/url). It's equivalent to [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

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
const { data } = mql('https://kikobeats.com', {
  data: {
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

<Figcaption children='`selector` should be specified for getting data.' />

You can specify any [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), like:

- An HTML tag (e.g., <Type children="'img'"/>).
- A CSS class or pseudo class, id or data-attribute (e.g., <Type children="'#avatar'"/>).
- A combination of both (e.g., <Type children="'img:first'"/>).

If you pass a collection of selectors, they are considered as fallbacks values.

```js{5}
const mql = require('@microlink/mql')
const { data } = mql(`https://twitter.com/${username}`, {
  data: {
    avatar: {
      selector: ['#avatar', 'img:first']
    }
  }
})
```

<Figcaption children='Using mulitple selectors makes the data rule more generic.' />

The position into the collection matters: The first data rule that returns a truthy value after applying type will be used, discarding the rest of the selectors.
