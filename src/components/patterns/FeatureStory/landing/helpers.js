import React from 'react'

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
