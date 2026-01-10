---
title: 'type'
description: 'Validate and cast extracted values into specific data types like strings, numbers, images, or URLs. Ensure data consistency and correctness for your API responses.'
---

import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'author'"/> | <Type children="'auto'"/> | <Type children="'boolean'"/> | <Type children="'date'"/> | <Type children="'description'"/> | <Type children="'email'"/> | <Type children="'image'"/> | <Type children="'ip'"/> | <Type children="'lang'"/> | <Type children="'logo'"/> | <Type children="'number'"/> | <Type children="'object'"/> | <Type children="'publisher'"/> | <Type children="'regexp'"/> | <Type children="'string'"/> | <Type children="'title'"/> | <Type children="'url'"/> | <Type children="'video'"/></TypeContainer>

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
