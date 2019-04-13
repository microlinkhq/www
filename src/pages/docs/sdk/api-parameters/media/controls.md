---
title: 'controls'
--- 

Type: `boolean`<br/>
Default: `true`

Display UI controls to handle playing/pausing the cards video.

with `controls` enabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls={true}
  />
)
```

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls={true} />

with `controls` disabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls={false}
  />
)
```

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls={false} />
