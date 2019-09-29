---
title: 'loop'
--- 

Type: `boolean`<br/>
Default: `true`

It specifies that the video will start over again, every time it finishes.

with `loop` enabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls
    loop
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: true, loop: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU/){:.card-preview data-media='video' data-autoPlay='false' data-controls='true' data-loop='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls loop />

with `loop` disabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    controls
    loop={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: true, loop: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU/){:.card-preview data-media='video' data-autoPlay='false' data-controls='true' data-loop='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} controls loop={false} />
