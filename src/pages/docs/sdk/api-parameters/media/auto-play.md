---
title: 'autoPlay'
--- 

Type: `boolean`<br/>
Default: `true`

Determinate if the video will automatically start playing as soon as it can do so without stopping.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay
  />
)
```

When a video is playing, you can stop it just clicking over the image

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay />

The default behavior is to start the video playing; You can change that passing a `autoPlay: false`

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
  />
)
```

<Microlink url='https://www.instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} />
