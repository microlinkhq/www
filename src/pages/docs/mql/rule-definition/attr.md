---
title: attr
---

Type: `string|string[]`<br/>
Default: `html`<br/>
Values: [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) or `html|val|text`<br/>

Get the value of an attribute from the matched [selector](/docs/mql/rule-definition/selector) that should be picked.

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

```js{6}
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

<Figcaption children='If you want to extract an img, probably you are interested in src property, so you should specify it.' />

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) is supported, keeping in mind three special values:

- `text`: Get the combined text contents of the matched selector, including their descendants.
- `html`: Get the HTML contents of the matched selector.
- `val`: Get the current value of the matched selector.

If you don't define the attribute, `html` will be used by default.

Specify a collection of attributes is supported as well, being important the position of the attribute since only the first truth and value will be got.

```js{6}
const mql = require('@microlink/mql')
const {data } mql(`https://twitter.com/${username}`, {
  rules: {
    avatar: {
      selector: '#avatar'
      attr: ['src', 'data-load']
    }
  }
})
```

<Figcaption children="If you don't define the attribute, `html` will be used by default." />

## Nested Structures

You can use `attr` for mapping nested structures, being it useful for groupoing values over the same property name.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Best Chocolate Chip Cookies</title>
</head>
<body>
  <ul>
    <li>
      <span class="quantity">1 cup</span>
      <p class="ingredient">Butter</p>
    </li>
    <li>
      <span class="quantity">1 cup</span>
      <p class="ingredient">Sugar</p>
    </li>
    <li>
      <span class="quantity">2 units</span>
      <p class="ingredient">Eggs</p>
    </li>
  </ul>
</body>
</html>
```

```js{6,9}
const mql = require('@microlink/mql')
const {data } mql(`https://bestcookie.recipe`, {
  rules: {
    ingredients: {
      selector: 'li',
      attr: {
        ingredient: { selector: '.ingredient', attr: 'text' },
        quantity: { selector: '.quantity', attr: 'text' }
      }
    }
  }
})
```


```json
{
  "data": {
    "ingredients": [
      { "ingredient": "Butter", "quantity": "1 cup"},
      { "ingredient": "Sugar", "quantity": "1 cup"},
      { "ingredient": "Eggs", "quantity": "2 units"}
    ]
  }
}
```
