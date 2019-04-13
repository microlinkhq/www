---
title: 'setData'
--- 

Type: `object|function`<br/>
Default: `undefined`

Setup the content to be rendered into the card.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bt6EMQhHHIr/'
    setData={{
      title: 'SENTRY ACTIVATED'
    }}
  />
)
```

<Figcaption children='Since you are providing the data, the internal fetch will be not perfomed.' />

<Microlink url='https://www.instagram.com/p/Bt6EMQhHHIr/' setData={{title: 'SENTRY ACTIVATED' }}/>

By default, the library internally performs a fetch against the Microlink API for getting the data related to the target URL.

However, maybe you are interested in skip this part, especially if you are interacting with Microlink API out of the component, but you want to mount that data, skipping fetching the content again.

In that case, you need to provide `setData` with the content you have to be mounted. This content need to have the same Microlink API data fields.

Additionally, `setData`, can be invoked as a `function`

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bt6EMQhHHIr/'
    setData={data => ({
      ...data,
      title: 'SENTRY ACTIVATED'
    }})
  />
)
```

<Figcaption children='Internal fetch is performed and data is provied as first argument.' />

<Microlink url='https://www.instagram.com/p/Bt6EMQhHHIr/' />

The `function` receive the data fetched internally as the first argument, and you need to return the data you want to be mounted.

This is specially useful when you want to map missing fields from the Microlink API.

In that case, note `title` is not replaced since it's detected from the initial data.


