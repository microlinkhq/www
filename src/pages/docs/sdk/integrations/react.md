---
title: 'React'
---

It's available as [npm package](https://www.npmjs.com/package/@microlink/react).

```bash
npm install @microlink/react styled-components --save
```

After that, you can use it as a regular React component.

```jsx
import Microlink from '@microlink/react'

export default () => <Microlink url='https://instagram.com/p/BvDTdWdnzkj/' />
```

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' />

The React integration supports any [Microlink API](/docs/api/getting-started/overview) query parameter, just pass them as props.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink url='https://instagram.com/p/BvDTdWdnzkj/' size='large' />
)
```

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' size='large' />

Also, it supports the rest of common things in the React universe, like passing your own styles via the `style` prop.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://instagram.com/p/BvDTdWdnzkj/'
    style={{ fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace' }}
  />
)
```

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} />

This is the approach used for more high level abstraction, like [fela](http://fela.js.org) or [styled components](https://www.styled-components.com).

```jsx
import Microlink from '@microlink/react'
import styled from 'styled-components'

const MyCustomCard = styled(Microlink)`
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
  border-radius: 0.42857em;
`
```
