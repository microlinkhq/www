---
title: 'React'
--- 

It is available as [npm package](https://www.npmjs.com/package/@microlink/react).

<Terminal>npm install @microlink/react styled-components --save</Terminal>

After that, you can use it as a regular React component.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bu1-PpyHmCn/'
  />
)
```

<Microlink url='https://www.instagram.com/p/Bu1-PpyHmCn/' />

The React integration supports any [API Parameter](/api-parameter), just pass them as a `prop`.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bu1-PpyHmCn/'
    size='large'
  />
)
```

<Microlink url='https://www.instagram.com/p/Bu1-PpyHmCn/' size='large' />

Also, it supports rest of common things on React universy, like passing your own style using `style`.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bu1-PpyHmCn/'
    style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}}
  />
)
```

<Microlink url='https://www.instagram.com/p/Bu1-PpyHmCn/' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} />

This is the approach used for more high level abstraction, like [fela](http://fela.js.org) or [styled components](https://www.styled-components.com).

```jsx
import Microlink from '@microlink/react'
import styled from 'styled-components'

const MyCustomCard = styled(Microlink)`
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
  border-radius: .42857em;
`
```
