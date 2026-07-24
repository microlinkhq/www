import React from 'react'
import { Activity } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import { faqFromItems } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Antibot Detection: Know Who Blocked Your Request',
  description:
    'Detect antibot and CAPTCHA challenges from 30+ providers — Cloudflare, Akamai, DataDome, reCAPTCHA, hCaptcha, and more — on every HTTP response. Pro plans route detected blocks through automatic proxy resolution; the detection layer is open source as is-antibot.'
}

export const HERO = {
  name: 'Antibot Detection',
  title: 'Antibot Detection',
  description:
    'Detect antibot and CAPTCHA challenges from 30+ providers in every HTTP response — then route the request through the resolution path that provider requires.',
  primaryCta: {
    label: 'See proxy resolution →',
    href: '/features/proxy'
  },
  secondaryCta: {
    label: 'View on GitHub',
    href: 'https://github.com/microlinkhq/is-antibot'
  },
  plans: [
    {
      plan: 'Free',
      description: 'Detection signals; EPROXYNEEDED when blocked.'
    },
    { plan: 'Pro', description: 'Automatic resolution after detection.' }
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
      color: 'pink7'
    })}
  >
    <Activity size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      Every HTTP response is inspected across headers, cookies, HTML, URL, and
      status code. The detection layer is open source as{' '}
      <Link href='https://github.com/microlinkhq/is-antibot'>is-antibot</Link>.
      On Pro, a detected block feeds{' '}
      <Link href='/features/proxy'>automatic proxy resolution</Link>.
    </>
  ),
  bullets: [
    '30+ antibot and CAPTCHA providers',
    'Static analysis — no extra browser cost',
    'Open source fingerprints you can audit',
    'Pro routes the right resolution path automatically'
  ],
  sample: `{
  "detected": true,
  "provider": "cloudflare",
  "detection": "headers"
}`,
  sampleTitle: 'is-antibot'
}

export const STEPS = [
  {
    title: 'Status',
    description: 'Unusual codes (e.g. LinkedIn 999) often classify the block.'
  },
  {
    title: 'Headers',
    description: 'Mitigation fingerprints like cf-mitigated identify providers.'
  },
  {
    title: 'Cookies & HTML',
    description:
      'Challenge tokens and interstitial templates confirm the vendor.'
  },
  {
    title: 'Resolve',
    description: 'Pro routes the residential / browser path for that provider.'
  }
]

export const LANGUAGES = {
  cURL: `# Use is-antibot locally, or call Microlink Pro for auto-resolve
curl -sI 'https://example.com' | head`,
  JavaScript: `import isAntibot from 'is-antibot'

const response = await fetch('https://example.com')

const { detected, provider, detection } = isAntibot({
  headers: Object.fromEntries(response.headers),
  statusCode: response.status,
  html: await response.text(),
  url: response.url
})

if (detected) {
  console.log(\`Blocked by \${provider} (via \${detection})\`)
}`,
  Python: `import requests

# Microlink Pro auto-resolves after detection
response = requests.get(
  'https://api.microlink.io',
  params={'url': 'https://example.com'},
  headers={'x-api-key': 'YOUR_API_KEY'}
)
print(response.headers.get('x-fetch-mode'))`,
  Go: `package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  resp, err := http.Get("https://api.microlink.io?url=https%3A%2F%2Fexample.com")
  if err != nil { panic(err) }
  defer resp.Body.Close()
  fmt.Println(resp.Header.Get("x-fetch-mode"))
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`
}

export const QUICK_START = {
  description:
    'Run is-antibot against any HTTP response, or let Microlink Pro detect and resolve automatically.',
  playgroundHref: 'https://github.com/microlinkhq/is-antibot',
  playgroundLabel: 'View is-antibot on GitHub →'
}

export const PARAMS = {
  docsHref: '/features/proxy',
  rows: [
    {
      name: '(automatic)',
      type: 'n/a',
      description: 'Detection runs on every API response; no opt-in parameter.',
      required: false,
      plan: 'Detection: all'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Resolution path after detection (auto on Pro).',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'is-antibot',
      type: 'library',
      description: 'Standalone OSS detector for any HTTP client.',
      required: false,
      plan: 'Open source'
    }
  ]
}

export const EXAMPLES = {
  moreHref: 'https://github.com/microlinkhq/is-antibot',
  items: [
    {
      title: 'Audit with is-antibot',
      description: 'Open-source static analysis of any HTTP response.',
      snippet: 'isAntibot({ headers, statusCode, html, url })',
      href: 'https://github.com/microlinkhq/is-antibot'
    },
    {
      title: 'Pro auto-resolve',
      description: 'Detection feeds residential resolution.',
      snippet: '// x-fetch-mode: fetch-proxy',
      href: '/features/proxy'
    },
    {
      title: 'Classify outcomes',
      description: 'Allowed, Blocked, or Challenged on every response.',
      snippet: 'detected / provider / detection',
      href: '/blog/antibot-detection-at-scale'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Stop blind retries',
    description: 'Know which provider blocked you before rerouting.',
    icon: 'radar'
  },
  {
    title: 'Scraper observability',
    description: 'Classify Allowed vs Blocked vs Challenged.',
    icon: 'list'
  },
  {
    title: 'OSS fingerprint audits',
    description: 'Run is-antibot with fetch, got, or axios.',
    icon: 'code'
  },
  {
    title: 'Pro unblock pipelines',
    description: 'Detection feeds automatic proxy resolution.',
    icon: 'shield'
  },
  {
    title: 'CAPTCHA vendor ID',
    description: 'Identify reCAPTCHA, hCaptcha, Turnstile, and more.',
    icon: 'lock'
  }
]

export const FAQ_RAW = [
  {
    question: 'How does Microlink detect an antibot challenge?',
    text: 'Every HTTP response is inspected across five signals — headers, cookies, HTML, URL, and status code. Checks run in priority order and the first match identifies the provider.'
  },
  {
    question: 'Which providers can be detected?',
    text: 'More than 30 providers across antibot systems, CAPTCHA vendors, and platform-specific protection flows (LinkedIn, Reddit, Instagram, YouTube, and more).'
  },
  {
    question: 'Is the detection logic open source?',
    text: 'Yes. The detection layer is published as is-antibot on GitHub and npm. It performs static HTTP response analysis — detection only, not challenge solving.'
  },
  {
    question: 'What happens after a block is detected?',
    text: 'On Pro plans, the request is automatically routed through the resolution path that provider requires. Without Pro, the API returns EPROXYNEEDED.'
  },
  {
    question: 'Does detection slow down my requests?',
    text: 'No. Detection is static response analysis without launching a browser or making extra network calls.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
