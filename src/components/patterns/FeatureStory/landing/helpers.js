import React from 'react'

import { Link } from 'components/elements/Link'

export const sdkExample = body => `import createClient from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

${body}`

export const faqFromItems = items =>
  items.map(({ question, text, answer }) => ({
    question,
    text,
    answer: answer || (
      <div>
        {text.split(/\n\n+/).map((paragraph, index) => (
          <div key={index}>{paragraph}</div>
        ))}
      </div>
    )
  }))

export const ProxyDocLink = props => (
  <Link href='/docs/api/parameters/proxy' {...props}>
    {props.children || 'proxy'}
  </Link>
)

export const HeadersDocLink = props => (
  <Link href='/docs/api/parameters/headers' {...props}>
    {props.children || 'headers'}
  </Link>
)

export const TtlDocLink = props => (
  <Link href='/docs/api/parameters/ttl' {...props}>
    {props.children || 'TTL'}
  </Link>
)

export const ProxyHeadersTtlLinks = ({
  conjunction = 'and',
  ttlLabel = 'TTL'
}) => (
  <>
    <ProxyDocLink />
    {', '}
    <HeadersDocLink />
    {` ${conjunction} `}
    <TtlDocLink>{ttlLabel}</TtlDocLink>
  </>
)

const indentBlock = (value, spaces = 2) => {
  const pad = ' '.repeat(spaces)
  return String(value)
    .split('\n')
    .map((line, i) => (i === 0 ? line : `${pad}${line}`))
    .join('\n')
}

export const buildMicrolinkLanguages = ({
  method,
  url,
  jsArgs = [],
  query = {},
  binding = 'result',
  log = 'result',
  comment
}) => {
  const jsArgList = jsArgs.map(arg => `,\n  ${indentBlock(arg)}`).join('')
  const curlExtra = Object.entries(query)
    .map(
      ([key, value]) =>
        ` \\\n  --data-urlencode "${key}=${
          typeof value === 'string' ? value : JSON.stringify(value)
        }"`
    )
    .join('')
  const encodedUrl = encodeURIComponent(url)
  const queryPairs = Object.entries(query)
    .map(([key, value]) => {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value)
      return `${key}=${encodeURIComponent(serialized)}`
    })
    .join('&')
  const querySuffix = queryPairs ? `&${queryPairs}` : ''

  return {
    cURL: `${
      comment ? `# ${comment}\n` : ''
    }curl -G 'https://api.microlink.io' \\
  --data-urlencode "url=${url}"${curlExtra}`,
    JavaScript: `${
      comment ? `// ${comment}\n` : ''
    }import createClient from 'microlink.io'

const microlink = createClient()

const ${binding} = await microlink.${method}('${url}'${jsArgList})

console.log(${log})`,
    Python: `import requests

response = requests.get(
  'https://api.microlink.io',
  params={
    'url': '${url}'${
      Object.keys(query).length
        ? ',\n' +
        Object.entries(query)
          .map(
            ([key, value]) =>
              `    '${key}': ${
                typeof value === 'string' ? `'${value}'` : JSON.stringify(value)
              }`
          )
          .join(',\n')
        : ''
    }
  }
)

print(response.json())`,
    Go: `package main

import (
  "fmt"
  "io"
  "net/http"
)

func main() {
  resp, err := http.Get("https://api.microlink.io?url=${encodedUrl}${querySuffix}")
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`
  }
}

export const buildMqlLanguages = ({ url, options, comment }) => {
  const encodedUrl = encodeURIComponent(url)
  const queryPairs = Object.entries(options || {})
    .map(([key, value]) => {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value)
      return `${key}=${encodeURIComponent(serialized)}`
    })
    .join('&')
  const query = queryPairs ? `&${queryPairs}` : ''
  const optsJs = JSON.stringify(options || {}, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join('\n')

  return {
    cURL: `${
      comment ? `# ${comment}\n` : ''
    }curl -G 'https://api.microlink.io' \\
  --data-urlencode "url=${url}"${
      Object.keys(options || {}).length
        ? Object.entries(options)
          .map(
            ([key, value]) =>
              ` \\\n  --data-urlencode "${key}=${
                typeof value === 'string' ? value : JSON.stringify(value)
              }"`
          )
          .join('')
        : ''
    }`,
    JavaScript: `import mql from '@microlink/mql'

const { data } = await mql('${url}', ${optsJs})

console.log(data)`,
    Python: `import requests

response = requests.get(
  'https://api.microlink.io',
  params={
    'url': '${url}'${
      Object.keys(options || {}).length
        ? ',\n' +
        Object.entries(options)
          .map(
            ([key, value]) =>
              `    '${key}': ${
                typeof value === 'string' ? `'${value}'` : JSON.stringify(value)
              }`
          )
          .join(',\n')
        : ''
    }
  }
)

print(response.json())`,
    Go: `package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  resp, err := http.Get("https://api.microlink.io?url=${encodedUrl}${query}")
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`
  }
}
