---
title: 'setData'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Figcaption } from 'components/markdown/Figcaption'
import { Microlink } from 'components/markdown/Microlink'

Type: <TypeContainer><Type children='<object>'/> | <Type children='<function>'/></TypeContainer>

A data mapper that will be invoked before mounting the card.

When an <Type children='<object>'/> is passed to `setData`, the custom data provided will be merged with the original data.

<DemoIntegrations
  parameters={{
    url: 'https://www.instagram.com/p/BeV6tOhFUor/',
    setData: { title: 'SENTRY ACTIVATED' } }
  }
  caption="The data provided will be merged with the original data extracted."
/>

Additionally you can pass a <Type children='<function>'/> where in this case the first argument that received will be the data fetched using [fetchData](/docs/sdk/parameters/fetch-data/):

```jsx
import Microlink from '@microlink/react'

<Microlink
  url='https://www.instagram.com/p/BeV6tOhFUor/'
  setData={data => ({
    ...data,
    title: 'SENTRY ACTIVATED',
    description: 'Are humans worth it?',
    image: { url: '/images/1FyFxlk.jpg' },
    publisher: 'HAL 9000',
    url: 'http://thehal9000.com'
  })}
/>
```

<Figcaption children='Skip internal fetch providing a function as setData.' />

The function should return all the data necessary to be mounted.

<Microlink
  url='https://www.instagram.com/p/BeV6tOhFUor/'
  setData={data => ({
    title: 'SENTRY ACTIVATED',
    description: 'Are humans worth it?',
    image: { url: '/images/1FyFxlk.jpg' },
    publisher: 'HAL 9000',
    url: 'http://thehal9000.com'
  })}
/>
