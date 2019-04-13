---
title: 'size'
--- 

Type: `string`<br/>
Default: `normal`<br/>
Values: `'normal'|'large'`

It set the size layout of the card.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    size='normal'
    media='logo'
  />
)
```

<Microlink url='https://microlink.io' media='logo' />

<Figcaption children="The default direction is normal."  />

Alternatively you can set `large`

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    size='large'
    media='logo'
  />
)
```

<Microlink url='https://microlink.io' size='large' media='logo' />
