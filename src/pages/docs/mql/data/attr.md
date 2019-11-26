---
title: attr
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type children="'html'"/> | <Type children="'val'"/> | <Type children="'text'"/></TypeContainer> or any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).

Get the value of an attribute from the matching [selector](/docs/mql/data/selector) that should be picked.

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
const { data } mql(`https://kikobeats.com`, {
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

<Figcaption children='If you want to extract an img, probably you are interested in src property, so you should specify it.' />

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) is supported, keeping in mind three special values:

- <Type children="'text'"/>: Get the combined text contents of the matched selector, including their descendants.
- <Type children="'html'"/>: Get the HTML contents of the matched selector.
- <Type children="'val'"/>: Get the current value of the matched selector.

If you don't define the attribute, <Type children="'html'"/> will be used by default.

Specifying a collection of attributes is supported as well, being important the position of the attribute since only the first truthy value will be taken.

```js{6}
const mql = require('@microlink/mql')
const {data } mql(`https://twitter.com/${username}`, {
  data: {
    avatar: {
      selector: '#avatar'
      attr: ['src', 'data-load']
    }
  }
})
```

<Figcaption children="If you don't define the attribute, `html` will be used by default." />

## Nested Structures

You can use `attr` for mapping nested structures, being useful for grouping values over the same property name.

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
const { data } mql(`https://bestcookie.recipe`, {
  data: {
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
