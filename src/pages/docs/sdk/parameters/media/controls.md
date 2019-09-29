---
title: 'controls'
--- 

Type: `boolean`<br/>
Default: `true`

Display UI controls to handle playing/pausing the cards video.

with `controls` enabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU){:.card-preview data-media='video' data-autoPlay='false' data-controls='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls />

with `controls` disabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU){:.card-preview data-media='video' data-autoPlay='false' data-controls='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls={false} />
