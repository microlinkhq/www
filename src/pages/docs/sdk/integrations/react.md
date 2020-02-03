---
title: 'React'
--- 

It is available as an [npm package](https://www.npmjs.com/package/@microlink/react).

<Terminal>npm install @microlink/react styled-components --save</Terminal>

After that, you can use it as a regular React component.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://instagram.com/p/Bu1-PpyHmCn/'
  />
)
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' />

The React integration supports any [API Parameter](/docs/api/getting-started/overview), just pass them as props.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://instagram.com/p/Bu1-PpyHmCn/'
    size='large'
  />
)
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' size='large' />

Also, it supports the rest of common things in the React universe, like passing your own styles via the `style` prop.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://instagram.com/p/Bu1-PpyHmCn/'
    style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}}
  />
)
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} />

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

#### CodeSandbox

<iframe
  src="https://codesandbox.io/embed/gracious-blackburn-n5w839zm4m?fontsize=14&hidenavigation=1&theme=dark"
  style={{width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden'}}
  title="@microlink/react"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
