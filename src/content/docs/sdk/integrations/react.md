---
title: 'React'
description: Implement beautiful link previews in React applications using the official Microlink SDK. Supports styled-components, custom props, and all Microlink API parameters.
---

import { Microlink } from 'components/markdown/Microlink'

It's available as [npm package](https://www.npmjs.com/package/@microlink/react).

```bash
npm install @microlink/react styled-components --save
```

After that, you can use it as a regular React component.

```jsx
import Microlink from '@microlink/react'

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' />
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' />

The React integration supports any [Microlink API](/docs/api/getting-started/overview) query parameter, just pass them as props.

```jsx
import Microlink from '@microlink/react'

<Microlink 
  url='https://www.youtube.com/watch?v=9P6rdqiybaw' 
  size='large' 
/>
```

<Microlink 
  url='https://www.youtube.com/watch?v=9P6rdqiybaw' 
  size='large' 
/>

Also, it supports the rest of common things in the React universe, like passing your own styles via the `style` prop.

```jsx
import Microlink from '@microlink/react'

<Microlink
  url='https://www.youtube.com/watch?v=9P6rdqiybaw'
  style={{ fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace' }}
  {...props}
/>
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} />

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
