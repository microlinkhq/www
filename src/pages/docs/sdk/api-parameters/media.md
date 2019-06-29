---
title: 'media'
--- 

Type: `string|string[]`<br/>
Default: `['image', 'logo']`<br/>
Values: `'image'|'logo'|'screenshot'|'video'`

It determines the field to used as media of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media={['image', 'logo']}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: ['image', 'logo'] })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='image,logo'}
`}} 
/>

The default value is a collection of field, meaning that the first valid value will be used as the image of the card.

<Microlink url='https://microlink.io' />

However, you can pass a single value to be used instead, for example `logo`

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'logo' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo'}
`}} 
/>

<Microlink url='https://microlink.io' media='logo'/>

The `video` detection is also supported

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='video'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='video'}
`}} 
/>

<Microlink url='https://microlink.io' media='video'/>
