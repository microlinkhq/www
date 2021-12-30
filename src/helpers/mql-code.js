import mql from '@microlink/mql'

const createApiUrl = ({ url = 'https://example.com', ...props } = {}) => {
  const [apiUrl] = mql.getApiUrl(url, props)
  return decodeURIComponent(apiUrl)
}

const stringProps = props =>
  Object.keys(props).reduce(
    (acc, key) =>
      acc +
      `${key}: ${
        typeof props[key] === 'object'
          ? `{${stringProps(props[key])}}`
          : JSON.stringify(props[key])
      },`,
    ''
  )

const composeUrl = props => (url = 'https://example.com') =>
  createApiUrl({ url, ...props })

const mqlCode = (input, props) => {
  const url = composeUrl({ url: input, ...props })

  const JavaScript = args => {
    const { url = '{{demolinks.spotify.url}}' } = { ...props, ...args }
    const opts = props ? `{ ${stringProps(props.data)} ...opts }` : 'opts'

    return `
const mql = require('@microlink/mql')

module.exports = opts => {
  const { status, data } = await mql('${url}', ${opts})
}`
  }

  JavaScript.language = 'javascript'

  const Shell = () => `curl -sL '${url()}' | jq`

  Shell.language = 'bash'

  const CLI = () => {
    const input = `${url().replace('https://api.microlink.io?url=', '')}`
    return `microlink '${input}'`
  }

  Shell.language = 'bash'

  const Ruby = props =>
    `require('httparty')

response = HTTParty.get('${url()}')

puts response.body`

  Ruby.language = 'ruby'

  const Python = () =>
    `import requests

url = '${url()}'
response = requests.get(url)

print(response.text)`

  Python.language = 'python'

  const Swift = () =>
    `import Foundation

var request = NSMutableURLRequest(
  URL: NSURL(string: '${url()}')!,
  cachePolicy: .UseProtocolCachePolicy,
  timeoutInterval: 10.0
)

request.HTTPMethod = "GET"

let session = NSURLSession.sharedSession()
let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    println(error)
  } else {
    let httpResponse = response as? NSHTTPURLResponse
    println(httpResponse)
  }
})

dataTask.resume()`

  Swift.language = 'swift'

  return {
    CLI,
    JavaScript: JavaScript,
    Shell,
    Python,
    Ruby,
    Swift
  }
}

mqlCode.json = (data, props = '') => `
// npm install @microlink/cli --global
// microlink ${data.url}${props}\n
${JSON.stringify(data, null, 2)}
`

mqlCode.html = (props = {}) => {
  const { size = 'large' } = props

  return `
<!-- Microlink SDK Vanilla/UMD bundle -->
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla/umd/microlink.min.js"></script>

<!-- Replace all elements with \`link-preview\` class -->
<script>
document.addEventListener("DOMContentLoaded", function(event) {
  microlink('.link-preview', {
    size: '${size}'
  })
})
</script>`
}

export default mqlCode
