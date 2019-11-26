---
title: 'type'
---

Type: <Type children="<string>"/><br/>
Values: <TypeContainer><Type children="'author'"/> | <Type children="'date'"/> | <Type children="'description'"/> | <Type children="'image'"/> | <Type children="'title'"/> | <Type children="'url'"/> | <Type children="'lang'"/> | <Type children="'publisher'"/></TypeContainer>

Defines the data shape to use for the extracted value.

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
const mql = require('@microlink/mql')
const { data } mql(`https://kikobeats.com`, {
  data: {
    avatar: {
      selector: '#avatar',
      attr: 'src',
      type: 'url'
    }
  }
})
```

If you define a valid `type`, it will validate and alter the original value to strictly accomplish the shape.

In the above case, we have added the <Type children="'url'"/> type to our `avatar` [data field](/docs/api/getting-started/data-fields), now the service can attach more contextual data.

The same thing happens with `image` and [palette](/docs/api/parameters/palette).

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

<Figcaption children='Always define the `type` of your data fields when possible.' />

Defining the type also makes the extraction more accurate.

```js{6}
const mql = require('@microlink/mql')
const {data } mql(`https://kikobeats.com`, {
  data: {
    avatar: {
      selector: 'span',
      type: 'date'
    }
  }
})
```

In this case, only a <Type children="'span'"/> with a valid <Type children="Date"/> will be extracted, omitting the rest of the possibilities.

If you don't specify a type, then it returns the raw extracted value.
