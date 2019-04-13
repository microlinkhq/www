---
title: 'muted'
--- 

Type: `boolean`<br/>
Default: `true`

It specifies that the audio output of the video should be muted.

with `muted` enabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    controls={true}
  />
)
```

<Microlink url='https://www.instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} controls={true} />

with `muted` disabled

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    muted={false}
  />
)
```

<Microlink url='https://www.instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} muted={false} />
