import mql from '@microlink/mql'
import get from 'dlv'

const ENDPOINT = {
  FREE: 'https://api.microlink.io',
  PRO: 'https://pro.microlink.io'
}

const stringify = (input = '') => {
  return JSON.stringify(input).replaceAll('"', "'")
}

stringify.python = input =>
  stringify(input)
    .replaceAll('true', 'True')
    .replaceAll('false', 'False')

const endpoint = ({ endpoint, headers } = {}) => {
  const apiKey = headers && headers['x-api-key']
  const isPro = !!apiKey
  return endpoint || ENDPOINT[isPro ? 'PRO' : 'FREE']
}

const createApiUrl = ({ url = 'https://example.com', ...props } = {}) => {
  const [apiUrl] = mql.getApiUrl(url, props)
  return decodeURIComponent(apiUrl)
}

const stringProps = (props = {}) => {
  const keys = Object.keys(props)
  return keys.reduce(
    (acc, key) =>
      acc +
      `${stringify(key)}: ${
        Array.isArray(props[key])
          ? stringify(props[key])
          : typeof props[key] === 'object'
          ? `{${stringProps(props[key])}}`
          : stringify(props[key])
      }${keys.length === 1 ? '' : ','}`,
    ''
  )
}

const mqlCode = (input, props) => {
  const JavaScript = args => {
    const { url = input || '{{demolinks.spotify.url}}' } = { ...props, ...args }
    const opts = props ? `{ ${stringProps(props)} }` : ''

    return `
const mql = require('@microlink/mql')

const { status, data } = await mql('${url}'${opts ? `, ${opts}` : ''})

console.log(data)`
  }

  JavaScript.language = 'javascript'

  const Shell = () => {
    const rawStyles = get(props, 'styles')
    const rawScripts = get(props, 'scripts')

    const styles = Array.isArray(rawStyles)
      ? rawStyles.map(style => encodeURIComponent(style))
      : rawStyles

    const scripts = Array.isArray(rawScripts)
      ? rawScripts.map(script => encodeURIComponent(script))
      : rawScripts

    const url = createApiUrl({
      url: input,
      ...props,
      styles,
      scripts
    }).replaceAll('=true', '')

    return `curl -sL '${url}' | jq`
  }

  Shell.language = 'bash'

  const CLI = () => {
    const url = createApiUrl({ url: input, ...props })
    return `microlink '${url.replace('https://api.microlink.io?url=', '')}'`
  }

  Shell.language = 'bash'

  const Ruby = () => {
    const { headers: rawHeaders, ...restProps } = props || {}
    const keys = Object.keys(restProps)
    const size = keys.length

    const serialiedProps = keys.reduce((acc, key, index) => {
      return (
        acc +
        `:${key} => ${stringify(restProps[key])}${
          size > 1 ? `${index + 1 === size ? '' : ', '}` : ''
        }`
      )
    }, '')

    const headers =
      rawHeaders &&
      Object.keys(rawHeaders).reduce(
        (acc, key) => acc + `:${key} => '${rawHeaders[key]}'`,
        ''
      )

    return `require('httparty')

url = '${endpoint(props)}'
query = {:url => "${input}"${serialiedProps ? `, ${serialiedProps}` : ''}}
${headers ? `headers = {${headers}}\n` : ''}
${
  headers
    ? 'response = HTTParty.get(url, query, headers)'
    : 'response = HTTParty.get(url, query)'
}

puts response.body`
  }

  Ruby.language = 'ruby'

  const Python = () => {
    const { headers: rawHeaders, ...restProps } = props || {}
    const keys = Object.keys(restProps)
    const size = keys.length
    const serialiedProps = keys.reduce((acc, key, index) => {
      return (
        acc +
        `'${key}': ${stringify.python(restProps[key])}${
          size > 1 ? `${index + 1 === size ? '' : ', '}` : ''
        }`
      )
    }, '')

    const headers = rawHeaders && stringify(rawHeaders).replaceAll(':', ': ')

    return `
import requests

url = '${endpoint(props)}'
params = {'url': '${input}'${serialiedProps ? `, ${serialiedProps}` : ''}}
${headers ? `headers = ${headers}\n` : ''}
${
  headers
    ? 'response = requests.get(url, params headers)'
    : 'response = requests.get(url, params)'
}

print(response.json())`
  }

  Python.language = 'python'

  return {
    CLI,
    JavaScript,
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
