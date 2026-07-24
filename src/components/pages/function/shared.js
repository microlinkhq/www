import React from 'react'
import { Code } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import { faqFromItems } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Browser Functions API: Serverless Puppeteer',
  description:
    'Run any JavaScript remotely inside Microlink’s headless browser with the function parameter — full Puppeteer access, npm packages installed on the fly, and zero infrastructure to manage. Works on the free tier; Pro plans raise execution limits and add automatic proxy resolution, custom headers, and configurable cache TTL.'
}

export const HERO = {
  name: 'Browser Functions',
  title: 'Browser Functions',
  description:
    'Run any JavaScript remotely with the function parameter — full Puppeteer access, npm packages installed on the fly, and zero infrastructure.',
  primaryCta: {
    label: 'Try it in Playground →',
    href: '/docs/guides/function'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/function'
  },
  plans: [
    { plan: 'Free', description: '5s timeout, 16 MB, prototype workflows.' },
    { plan: 'Pro', description: 'Up to 28s, 32 MB, no code-size limits.' }
  ]
}

export const HeroMark = () => (
  <Flex
    css={theme({
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      border: 1,
      borderColor: 'black10',
      bg: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'yellow7'
    })}
  >
    <Code size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      The <Link href='/docs/api/parameters/function'>function</Link> parameter
      runs your JavaScript in a sandboxed Node.js runtime. Reference{' '}
      <code>page</code> for full Puppeteer access, or skip it for plain compute.
      Detected npm packages are installed on the fly and cached.
    </>
  ),
  bullets: [
    'No Lambda bundle or browser fleet',
    'Full Puppeteer page access when you need it',
    'require() any npm package — installed on the fly',
    'Profiling phases show where time goes'
  ],
  sample: `{
  "isFulfilled": true,
  "value": "Example Domain",
  "profiling": { "phases": { "run": 42 } }
}`,
  sampleTitle: 'result.json'
}

export const STEPS = [
  {
    title: 'Write',
    description:
      'Author plain JavaScript that returns any JSON-serializable value.'
  },
  {
    title: 'Send',
    description:
      '@microlink/function serializes and posts your code to the API.'
  },
  {
    title: 'Execute',
    description:
      'Deps install on the fly; optional headless Chrome with page access.'
  },
  {
    title: 'Result',
    description:
      'Receive result.value plus profiling — or error details when it fails.'
  }
]

export const LANGUAGES = {
  cURL: `curl -G 'https://api.microlink.io' \\
  --data-urlencode 'url=https://example.com' \\
  --data-urlencode 'function=({ page }) => page.title()'`,
  JavaScript: `const microlink = require('@microlink/function')

const fn = microlink(({ page }) => page.title())
const result = await fn('https://example.com')

console.log(result.isFulfilled) // true
console.log(result.value) // 'Example Domain'`,
  Python: `import requests

response = requests.get(
  'https://api.microlink.io',
  params={
    'url': 'https://example.com',
    'function': '({ page }) => page.title()'
  }
)

print(response.json())`,
  Go: `package main

import (
  "fmt"
  "net/http"
  "net/url"
  "io"
)

func main() {
  q := url.Values{}
  q.Set("url", "https://example.com")
  q.Set("function", "({ page }) => page.title()")
  resp, err := http.Get("https://api.microlink.io?" + q.Encode())
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`
}

export const QUICK_START = {
  description:
    'Pass a function that references page for Puppeteer, or omit page for plain compute.',
  playgroundHref: '/docs/guides/function'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/function',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'Target URL; navigated when the function references page.',
      required: true,
      plan: 'Free + Pro'
    },
    {
      name: 'function',
      type: 'string | Function',
      description: 'Remote JS to run; use @microlink/function from Node.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Compose with automatic or BYO proxy for antibot targets.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'ttl',
      type: 'string | number',
      description:
        'Cache repeated function executions within a freshness window.',
      required: false,
      plan: 'Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/docs/guides/function',
  items: [
    {
      title: 'Puppeteer title',
      description: 'A live page already navigated to the URL.',
      snippet: 'microlink(({ page }) => page.title())',
      href: '/docs/api/parameters/function'
    },
    {
      title: 'npm deps on the fly',
      description: 'require() installs and caches packages in the sandbox.',
      snippet: `microlink(() => {
  const { kebabCase } = require('lodash')
  return kebabCase('Hello World')
})`,
      href: '/docs/guides/function'
    },
    {
      title: 'Plain compute',
      description: 'Skip page for faster orchestration without Chrome.',
      snippet: 'microlink(({ amount }) => amount * 1.21)',
      href: '/docs/guides/function'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Custom automation',
    description: 'Flows that declarative params cannot express.',
    icon: 'mouse'
  },
  {
    title: 'Remote compute',
    description: 'Run plain JS in a sandbox across requests.',
    icon: 'code'
  },
  {
    title: 'Parse with npm',
    description: 'cheerio, lodash, and friends — cached installs.',
    icon: 'list'
  },
  {
    title: 'Authenticated scrape',
    description: 'Combine with proxy and headers on Pro.',
    icon: 'lock'
  },
  {
    title: 'No Lambda',
    description: 'Prototype on free, scale limits on Pro.',
    icon: 'globe'
  }
]

export const FAQ_RAW = [
  {
    question: 'What can I run inside a function?',
    text: 'Any JavaScript. Plain functions run in a sandboxed Node.js runtime. Reference page for full Puppeteer access. You can also require() any npm package — dependencies are installed on the fly and cached.'
  },
  {
    question: 'Is the function parameter available on the free plan?',
    text: 'Yes. Free runs get a 5-second timeout, 16 MB of memory, 1024 bytes of code, and one concurrent execution per IP. Pro plans extend the timeout up to 28 seconds and raise memory to 32 MB.'
  },
  {
    question: 'When should I use function instead of data?',
    text: 'Start with data — declarative CSS-selector rules are shorter and easier to maintain. Escalate to function when you need to click, wait, compute, or orchestrate custom logic that rules cannot express.'
  },
  {
    question: 'What happens if my function throws?',
    text: 'The request still succeeds: result.isFulfilled comes back false and result.value contains the error details so you can handle failures in your own code.'
  },
  {
    question: 'Can functions reach pages behind antibots or logins?',
    text: 'Yes, on Pro plans. Combine function with automatic proxy resolution and forward session cookies with x-api-header-cookie.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
