---
title: 'direction'
--- 

Type: `string`<br/>
Default: `ltr`<br/>
Values: `'ltr'|'rtl'`

It sets the direction of the card.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    direction='ltr'
    media='logo'
  />
)
```

<Microlink url='https://microlink.io' media='logo' />

<Figcaption children="The default direction is rtl."  />

Alternatively you can set `lrt` that means *right-to-left*

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    contrast
    direction='rtl'
    media='logo'
  />
)
```

<Microlink url='https://microlink.io' direction='rtl' media='logo' />
