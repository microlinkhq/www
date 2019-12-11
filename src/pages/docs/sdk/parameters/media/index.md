---
title: 'media'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="[ 'image', 'logo' ]"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'image'"/> | <Type children="'logo'"/> | <Type children="'screenshot'" /> | <Type children="'video'"/></TypeContainer>

Determines the field to use as the media of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{demolinks.ted.url}}'
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
[]({{demolinks.ted.url}}){:.card-preview data-media='image,logo'}
`}} 
/>

The default value is a collection of fields, meaning that the first valid value will be used as the image of the card.

<Microlink url='{{demolinks.ted.url}}' />

However, you can pass a single value to be used instead, for example <Type children="'logo'"/>

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{demolinks.ted.url}}'
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
[]({{demolinks.ted.url}}){:.card-preview data-media='logo'}
`}} 
/>

<Microlink url='{{demolinks.ted.url}}' media='logo'/>

The detection of <Type children="'video'"/> is also supported

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='{{demolinks.instagram.url}}'
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
[]({{demolinks.instagram.url}}){:.card-preview data-media='video'}
`}} 
/>

<Microlink url='{{demolinks.instagram.url}}' media='video'/>

And <Type children="'audio'"/> too!

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
