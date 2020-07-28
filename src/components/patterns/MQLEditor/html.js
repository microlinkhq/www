import { mqlCode } from 'helpers'
import * as json from './json'

export const meta = () => mqlCode.html()

export const iframe = ({ url }) => `
<!-- HTML markup -->
<iframe src='https://api.microlink.io/?url=${url}${json.iframe}&embed=iframe.html'></iframe>

<!-- Add third party iframe scripts -->
<script>
  fetch('https://api.microlink.io/?url=${url}${json.iframe}')
  .then(response => response.json())
  .then(data => {
    data.iframe.scripts.forEach(attrs => {
      const script = document.createElement('script')
      Object.keys(attrs).forEach(key => (script[key] = attrs[key]))
      document.body.appendChild(script)
    })
  });
</script>
`

export const insights = ({ url }) =>
  `<Iframe src='https://lighthouse.microlink.io/?url=${encodeURI(
    `https://api.microlink.io/?url=${url}${json.insights}`
  )}' />`

export const screenshot = ({ url }) => `<img
src="http://api.microilink.io?url=${url}${json.screenshot}&embed=screenshot">`

export const pdf = ({ url }) =>
  `<iframe src='https://api.microlink.io/?url=${url}${json.pdf}&embed=pdf'></iframe>`
