---
title: 'type'
---

Type: `string`<br/>
Default: `undefined`<br/>
Values: `author|date|description|image|title|url|lang|publisher`

It defines the data shape to use for the extracted value.

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

```js{7}
const mql = require("@microlink/mql");
const {data } mql(`https://kikobeats.com`, {
  rules: {
    avatar: {
      selector: '#avatar',
      attr: 'src',
      type: 'url'
    }
  }
})
```

```json{3,10}
{
  "data": {
    "avatar": {
      "url": "https://kikobeats.com/images/avatar-glitch.jpg",
      "width": 500,
      "height": 500,
      "type": "jpg",
      "size": 53310,
      "size_pretty": "53.3 kB"
    }
  }
}
```

<Figcaption children='Always that could be possible, define the `type` of your data fields.' />

If you define a valid `type`, it will validate and alter the original value to strictly accomplish the shape.

In that case, we have added the type `url` to our data field `avatar` and the service can attach more contextual related with the [data field](/docs/api/getting-started/data-fields).

The same thing happens with `image` and [palette](/docs/api/api-parameters/palette).

Defining the `type` also makes the extraction more accurate

```js{7}
const mql = require("@microlink/mql");
const {data } mql(`https://kikobeats.com`, {
  rules: {
    avatar: {
      selector: 'span',
      type: 'date'
    }
  }
})
```

In this case, only an `span` will a valid `Date` will extracted, omitting the rest of possibilities.

If you don't specify a type, then it returns the raw value extracted.
