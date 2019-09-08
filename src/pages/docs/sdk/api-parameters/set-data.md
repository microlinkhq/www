---
title: 'setData'
--- 

Type: `object|function`

Setup the content to be rendered into the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://www.instagram.com/p/Bt6EMQhHHIr/'
    setData={{
      title: 'SENTRY ACTIVATED'
    }}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { setData: { title: 'SENTRY ACTIVATED' } })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo' data-set-data='{"title": "SENTRY ACTIVATED"'}
`}} 
/>

<Figcaption children='The data provided will be merged with the original data extracted.' />

<Microlink url='https://www.instagram.com/p/Bt6EMQhHHIr/' setData={{title: 'SENTRY ACTIVATED' }}/>

When an `object` is passed to `setData`, the custom data provided will merged with the original data.

If you need a more granular control, you can pass a `function`.

In that case, the `function` receives the data fetched internally as the first argument, and you need to return the data you want to mount.

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

<Figcaption children='Skip internal fetch providing a function as setData.' />

<Microlink url='https://www.instagram.com/p/Bt6EMQhHHIr/' setData={{title: 'SENTRY ACTIVATED' }}/>