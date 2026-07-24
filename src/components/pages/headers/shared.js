import React from 'react'
import { List } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import { faqFromItems } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Custom HTTP Headers API',
  description:
    'Forward any HTTP header to the target page on Microlink Pro. Use the headers parameter for non-sensitive values; use x-api-header-* request headers for cookies, bearer tokens, and other secrets that must never appear in the URL.'
}

export const HERO = {
  name: 'Custom HTTP Headers',
  title: 'Custom HTTP Headers',
  description:
    'Stop scraping the logged-out version. Public values go in headers; secrets ride as x-api-header-* and never touch the URL.',
  primaryCta: {
    label: 'Read the private pages guide →',
    href: '/docs/guides/common/private-pages'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/headers'
  },
  plans: [
    {
      plan: 'Pro',
      description: 'headers and x-api-header-* on every workflow.'
    }
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
      color: 'orange7'
    })}
  >
    <List size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      The <Link href='/docs/api/parameters/headers'>headers</Link> parameter
      goes through the query string — fine for locale or user-agent.{' '}
      <Link href='/docs/guides/common/private-pages#sensitive-headers-and-cookies'>
        x-api-header-*
      </Link>{' '}
      is sent as a request header on the Microlink call, so cookies and tokens
      never appear in the URL or in logs.
    </>
  ),
  bullets: [
    'Two channels: public headers vs secret x-api-header-*',
    'Works on screenshots, PDFs, metadata, and extraction',
    'Credentials stay server-side via MQL httpOptions',
    'Compose with proxy for WAF-fronted dashboards'
  ],
  sample: `{
  "headers": {
    "accept-language": "es-ES"
  },
  "httpOptions": {
    "headers": {
      "x-api-header-cookie": "session=…"
    }
  }
}`,
  sampleTitle: 'request'
}

export const STEPS = [
  {
    title: 'Choose channel',
    description:
      'Public shaping values use headers; secrets use x-api-header-*.'
  },
  {
    title: 'Call from backend',
    description: 'Pass secrets + API key via httpOptions from environment vars.'
  },
  {
    title: 'Strip & forward',
    description: 'Microlink strips the prefix and sends Cookie/Authorization.'
  },
  {
    title: 'Capture any output',
    description: 'Authenticated page state applies to every Microlink workflow.'
  }
]

export const LANGUAGES = {
  cURL: `curl -G 'https://api.microlink.io' \\
  -H 'x-api-key: $MICROLINK_API_KEY' \\
  -H 'x-api-header-cookie: session=…' \\
  --data-urlencode 'url=https://example.com/dashboard' \\
  --data-urlencode 'screenshot=true' \\
  --data-urlencode 'headers={"accept-language":"es-ES"}'`,
  JavaScript: `import mql from '@microlink/mql'

const { data } = await mql(
  'https://example.com/dashboard',
  {
    screenshot: true,
    meta: false,
    headers: { 'accept-language': 'es-ES' }
  },
  {
    headers: {
      'x-api-key': process.env.MICROLINK_API_KEY,
      'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
    }
  }
)`,
  Python: `import os, requests

response = requests.get(
  'https://api.microlink.io',
  params={
    'url': 'https://example.com/dashboard',
    'screenshot': 'true',
    'headers': '{"accept-language":"es-ES"}'
  },
  headers={
    'x-api-key': os.environ['MICROLINK_API_KEY'],
    'x-api-header-cookie': f"session={os.environ['SESSION_COOKIE']}"
  }
)`,
  Go: `package main

import (
  "fmt"
  "net/http"
  "os"
  "io"
)

func main() {
  req, _ := http.NewRequest("GET",
    "https://api.microlink.io?url=https%3A%2F%2Fexample.com%2Fdashboard&screenshot=true",
    nil)
  req.Header.Set("x-api-key", os.Getenv("MICROLINK_API_KEY"))
  req.Header.Set("x-api-header-cookie", "session="+os.Getenv("SESSION_COOKIE"))
  resp, err := http.DefaultClient.Do(req)
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`
}

export const QUICK_START = {
  description:
    'Always call Microlink from your backend so API keys and forwarded secrets never reach the browser.',
  playgroundHref: '/docs/guides/common/private-pages'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/headers',
  rows: [
    {
      name: 'headers',
      type: 'object',
      description: 'Non-sensitive headers in the query string.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'x-api-header-*',
      type: 'request header',
      description: 'Sensitive headers; prefix stripped before forward.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'x-api-key',
      type: 'request header',
      description: 'Pro authentication; keep server-side.',
      required: true,
      plan: 'Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/docs/guides/common/private-pages',
  items: [
    {
      title: 'Locale + session cookie',
      description: 'Public Accept-Language; secrets via httpOptions.',
      snippet: `headers: { 'accept-language': 'es-ES' }
// + x-api-header-cookie`,
      href: '/docs/guides/common/private-pages'
    },
    {
      title: 'Logged-in screenshot',
      description: 'Same cookie channel powers authenticated media.',
      snippet: `screenshot: true
// x-api-header-cookie: session=…`,
      href: '/docs/api/parameters/headers'
    },
    {
      title: 'Headers + proxy',
      description: 'Auth cookies plus residential exit for WAFs.',
      snippet: '// compose with Pro automatic proxy',
      href: '/features/proxy'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Behind login',
    description: 'Forward session cookies without leaking them into URLs.',
    icon: 'lock'
  },
  {
    title: 'Localized variants',
    description: 'Accept-Language to fetch the right regional page.',
    icon: 'globe'
  },
  {
    title: 'Basic-auth staging',
    description: 'x-api-header-authorization for protected environments.',
    icon: 'shield'
  },
  {
    title: 'A/B cohorts',
    description: 'Custom headers to land in the cohort you need.',
    icon: 'list'
  },
  {
    title: 'Authenticated media',
    description: 'Same session for logged-in screenshots and PDFs.',
    icon: 'code'
  }
]

export const FAQ_RAW = [
  {
    question: 'What is the difference between headers and x-api-header-*?',
    text: 'Both forward an HTTP header to the target. headers goes through the URL query string — fine for locale or user-agent. x-api-header-* is sent as a request header so secrets never appear in the URL or logs.'
  },
  {
    question: 'Can I forward cookies and authorization tokens?',
    text: 'Yes — through x-api-header-* only. Send x-api-header-cookie or x-api-header-authorization as request headers on your Microlink call.'
  },
  {
    question: 'Does this work for screenshots and PDFs too?',
    text: 'Yes — headers and x-api-header-* apply uniformly to every Microlink output.'
  },
  {
    question: 'How do I keep API keys out of client-side code?',
    text: 'Always make Microlink calls from your backend. Use MQL’s third argument (httpOptions) to pass x-api-key and x-api-header-* from environment variables.'
  },
  {
    question: 'Do headers work on free plans?',
    text: 'No. Both channels are Pro features. Free-tier requests cannot forward custom HTTP headers.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
