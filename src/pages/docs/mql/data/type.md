---
title: 'type'
---

Type: <Type children="<string>"/><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'auto'"/> | <Type children="'regex'"/> | <Type children="'author'"/> | <Type children="'object'"/> | <Type children="'boolean'"/> | <Type children="'date'"/> | <Type children="'description'"/> | <Type children="'video'"/> | <Type children="'audio'"/> | <Type children="'image'"/> | <Type children="'logo'"/> | <Type children="'number'"/> | <Type children="'string'"/> | <Type children="'title'"/> | <Type children="'url'"/> | <Type children="'lang'"/> | <Type children="'publisher'"/></TypeContainer>

It defines how the value extracted should be considered.

```js
const mql = require('@microlink/mql')
 
const productHunt = id =>
  mql(`https://www.producthunt.com/posts/${id}`, {
    data: {
      name: {
        selector: 'h1 a',
        attr: 'text',
        type: 'string'
      },
      upvotes: {
        selector: '.bigButtonCount_10448',
        attr: 'text',
        type: 'string'
      }
    }
  })

const productSlug = 'microlink-2-0'
const { data } = await productHunt(productSlug)

console.log(`'${data.name}' has ${data.upvotes} upvotes`)
```

The data shape ensures that the extracted value will only be considered as valid when it's of the declared shape.
