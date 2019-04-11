---
title: 'React'
--- 

It is available as [npm package](https://www.npmjs.com/package/@microlink/react)

<Terminal>npm install @microlink/react styled-components --save</Terminal>

After that, you can use it as a regular React component

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk'
  />
)
```

that will produce the folllowing output

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' />

You can pass any [API Parameter](/api-parameter) as a prop, for example, `size`

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk'
    size='large'
  />
)
```

and voilá!

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' size='large' />

The component itself accepts a `style` property

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk'
    style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}}
  />
)
```

You can use this to add your own inline styles

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} />

This is the approach used for more high level abstraction, like [fela](http://fela.js.org) or [styled components](https://www.styled-components.com)

```jsx
import Microlink from '@microlink/react'
import styled from 'styled-components'

const MyCustomCard = styled(Microlink)`
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
  border-radius: .42857em;
`
```

