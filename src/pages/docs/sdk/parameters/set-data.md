---
title: 'setData'
---

Type: <TypeContainer><Type children='<object>'/> | <Type children='<function>'/></TypeContainer>

Setup the content to be rendered into the card.

<DemoIntegrations
  parameters="{{url: '{{demolinks.instagram.url}}', setData: { title: 'SENTRY ACTIVATED' } }}"
  caption="The data provided will be merged with the original data extracted." 
  urlName="instagram.com" 
/>

When an <Type children='<object>'/> is passed to `setData`, the custom data provided will be merged with the original data.

If you need a more granular control, you can pass a <Type children='<function>'/>.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='{{demolinks.instagram.url}}'
    setData={() => ({
      title: 'SENTRY ACTIVATED',
      description: 'Are humans worth it?',
      image: { url: 'https://i.imgur.com/1FyFxlk.jpg' },
      publisher: 'HAL 9000',
      url: 'http://thehal9000.com'
    })}
  />
)
```

<Figcaption children='Skip internal fetch providing a function as setData.' />

In that case, the function should return all the data necessary to be mounted.

<Microlink url='{{demolinks.instagram.url}}' setData={() => ({
title: 'SENTRY ACTIVATED',
description: 'Are humans worth it?',
image: { url: 'https://i.imgur.com/1FyFxlk.jpg' },
publisher: 'HAL 9000',
url: 'http://thehal9000.com'
})} />
