---
title: 'contrast'
--- 

Type: `boolean`<br/>
Default: `false`

When enabled, it will generate a high contrast card based on predominant colors detected in the feature image from the target URL.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/BsMKPL2nDgX/'
    contrast
  />
)
```

<Figcaption children="The contrast mode has better accessibility ratio."  />

<Microlink url='https://www.instagram.com/p/BsMKPL2nDgX/' contrast />
<Microlink url='https://www.instagram.com/p/BsMKPL2nDgX/' contrast size='large' />
