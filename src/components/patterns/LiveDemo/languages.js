const React = ({ url }) => `import Microlink from '@microlink/react'

export default props => (
  <Microlink
    url='${url}'
    size='large'
    media={['video', 'audio', 'image', 'logo']}
    {...props}
  />
)
`

React.language = 'jsx'

const HTML = () =>
  `<!-- Microlink SDK Vanilla/UMD bundle -->
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla/umd/microlink.min.js"></script>

<!-- Replace all elements with \`link-preview\` class -->
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.link-preview', {
      size: 'large',
      media: ['video', 'audio', 'image', 'logo']
    })
  })
</script>`

HTML.language = 'html'

export default {
  HTML,
  React
}
