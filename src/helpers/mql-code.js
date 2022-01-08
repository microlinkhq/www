import mql from '@microlink/mql'

const createApiUrl = ({ url = 'https://example.com', ...props } = {}) => {
  const [apiUrl] = mql.getApiUrl(url, props)
  return decodeURIComponent(apiUrl)
}

const stringProps = (props = {}) =>
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

const composeUrl = ({ headers, ...props }) => (url = 'https://example.com') =>
  createApiUrl({ url, ...props })

const mqlCode = (input, props = {}) => {
  const url = composeUrl({ url: input, ...props })

  const JavaScript = args => {
    const { url = input || '{{demolinks.spotify.url}}' } = { ...props, ...args }
    const opts = props.data ? `{ ${stringProps(props.data)} }` : ''

    return `
const mql = require('@microlink/mql')

const { status, data } = await mql('${url}'${opts ? `, ${opts}` : ''})`
  }

  JavaScript.language = 'javascript'

  const Shell = () => `curl -sL '${url()}' | jq`

  Shell.language = 'bash'

  const CLI = () => {
    const input = `${url().replace('https://api.microlink.io?url=', '')}`
    return `microlink '${input}'`
  }

  Shell.language = 'bash'

  const Ruby = () => {
    const sanetizedUrl = url().replace(`?url=${input}`, '')

    const headers =
      props.headers &&
      Object.keys(props.headers).reduce(
        (acc, key) => acc + `:${key} => '${props.headers[key]}'`,
        ''
      )

    return `require('httparty')

url = '${sanetizedUrl}'
query = {:url => "${url().replace('https://api.microlink.io?url=', '')}"}
${headers ? `headers = {${headers}}\n` : ''}
${
  headers
    ? 'response = HTTParty.get(url, :query => query, :headers => headers)'
    : 'response = HTTParty.get(url, :query => query)'
}

puts response.body`
  }

  Ruby.language = 'ruby'

  const Python = () => {
    const sanetizedUrl = url().replace(`?url=${input}`, '')

    const headers =
      props.headers &&
      JSON.stringify(props.headers, null)
        .replaceAll('"', "'")
        .replaceAll(':', ': ')

    return `
import requests

url = '${sanetizedUrl}'
params = {'url': '${input}'}
${headers ? `headers = ${headers}\n` : ''}
${
  headers
    ? 'response = requests.get(url, params=params headers=headers)'
    : 'response = requests.get(url, params=params)'
}

print(response.text)`
  }

  Python.language = 'python'

  return {
    CLI,
    JavaScript: JavaScript,
    Shell,
    Python,
    Ruby
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
