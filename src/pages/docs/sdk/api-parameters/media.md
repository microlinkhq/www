---
title: 'media'
--- 

Type: `string|array`<br/>
Default: `['image', 'logo']`<br/>
Values: `'image'|'logo'|'screenshot'|'video'`

It determines the field to used as media of the card.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    image={['image', 'logo']}
  />
)
```

The default value is a collection of field, meaning that the first valid value will be used as the image of the card.

<Microlink url='https://microlink.io' />

However, you can pass a single value to be used instead, for example `logo`

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
  />
)
```

<Microlink url='https://microlink.io' media='logo'/>

The `video` detection is also supported

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    media='video'
  />
)
```

<Microlink url='https://microlink.io' media='video'/>
