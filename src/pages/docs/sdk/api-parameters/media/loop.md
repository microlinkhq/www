---
title: 'loop'
--- 

Type: `boolean`<br/>
Default: `true`

It specifies that the video will start over again, every time it finishes.

with `loop` enabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls={true}
    loop={true}
  />
)
```

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls={true} loop={true} />

with `loop` disabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls={true}
    loop={false}
  />
)
```

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls={true} loop={false} />
