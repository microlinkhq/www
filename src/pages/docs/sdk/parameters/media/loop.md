---
title: 'loop'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Specifies if the media will start over again, every time it finishes.

with `loop` enabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    loop
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, loop: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU/){:.card-preview data-media='video' data-autoPlay='false' data-loop='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} loop />

with `loop` disabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU/'
    media='video'
    autoPlay={false}
    loop={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, loop: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU/){:.card-preview data-media='video' data-autoPlay='false' data-loop='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} loop={false} />
