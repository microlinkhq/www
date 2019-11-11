---
title: 'media'
--- 

Type: `string|string[]`<br/>
Default: `['image', 'logo']`<br/>
Values: `'audio'|'image'|'logo'|'screenshot'|'video'`

Determines the field to use as the media of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{DemoLinks.TED.url}}'
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
[]({{DemoLinks.TED.url}}){:.card-preview data-media='image,logo'}
`}} 
/>

The default value is a collection of fields, meaning that the first valid value will be used as the image of the card.

<Microlink url='{{DemoLinks.TED.url}}' />

However, you can pass a single value to be used instead, for example `logo`

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{DemoLinks.TED.url}}'
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
[]({{DemoLinks.TED.url}}){:.card-preview data-media='logo'}
`}} 
/>

<Microlink url='{{DemoLinks.TED.url}}' media='logo'/>

The detection of `video` is also supported

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{DemoLinks.Instagram.url}}'
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
[]({{DemoLinks.Instagram.url}}){:.card-preview data-media='video'}
`}} 
/>

<Microlink url='{{DemoLinks.Instagram.url}}' media='video'/>

And `audio` too

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT?si=4PcqgjH5RlWCvB5q4ukdnw'
    media='audio'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'audio' })
  })
</script>
`, Jekyll: `
[](https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT?si=4PcqgjH5RlWCvB5q4ukdnw){:.card-preview data-media='audio'}
`}} 
/>

<Microlink url='https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT?si=4PcqgjH5RlWCvB5q4ukdnw' media='audio'/>
