---
title: 'autoPlay'
---

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Determine if the media will automatically start playing as soon as it can do so without stopping.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU'
    media='video'
    autoPlay
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU){:.card-preview data-media='video' data-auto-play='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay />

<Figcaption children='To control the media just hover with your cursor.' />

The default behavior is to start the media playing; You can change that by passing `autoPlay: false`.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BXHj-DllyYU'
    media='video'
    autoPlay={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BXHj-DllyYU){:.card-preview data-media='video' data-auto-play='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BXHj-DllyYU/' media='video' autoPlay={false} />
