---
title: 'setData'
--- 

Type: <TypeContainer><Type children='<object>'/> | <Type children='<function>'/></TypeContainer>

Setup the content to be rendered into the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/Bt6EMQhHHIr/'
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

<Microlink url='https://instagram.com/p/Bt6EMQhHHIr/' setData={{title: 'SENTRY ACTIVATED' }}/>

When an <Type children='<object>'/> is passed to `setData`, the custom data provided will be merged with the original data.

If you need a more granular control, you can pass a <Type children='<function>'/>.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://instagram.com/p/Bt6EMQhHHIr/'
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

In that case, the function should be return all the data necessary to be mounted.

<Microlink url='https://instagram.com/p/Bt6EMQhHHIr/' setData={() => ({
  title: 'SENTRY ACTIVATED',
  description: 'Are humans worth it?',
  image: { url: 'https://i.imgur.com/1FyFxlk.jpg' },
  publisher: 'HAL 9000',
  url: 'http://thehal9000.com'
})} />
