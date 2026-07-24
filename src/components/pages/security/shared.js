import React from 'react'
import { Lock } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import { faqFromItems } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Request Security: One Isolated Browser per Request',
  description:
    'Every Microlink API request runs in its own incognito browser context — no shared cookies, caches, or profiles — with dual-layer SSRF protection that blocks private and reserved IP ranges before and during rendering. Enterprise adds dedicated hardware.'
}

export const HERO = {
  name: 'Request Security',
  title: 'Request Security',
  description:
    'Every API call gets its own incognito browser context — created for that request, destroyed when it finishes. No shared cookies, caches, or profiles, and every URL is screened against reserved IP ranges.',
  primaryCta: {
    label: 'Read security practices →',
    href: '/security'
  },
  secondaryCta: {
    label: 'View error codes',
    href: '/docs/api/basics/error-codes#eforbiddenurl'
  },
  plans: [
    {
      plan: 'Free + Pro',
      description: 'Isolation and SSRF protection on every plan.'
    },
    {
      plan: 'Enterprise',
      description: 'Dedicated hardware and isolated browser pools.'
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
      color: 'blue7'
    })}
  >
    <Lock size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      Each request is assigned its own incognito browser context, destroyed when
      it finishes. Before fetch, hostnames are DNS-resolved and refused with{' '}
      <Link href='/docs/api/basics/error-codes#eforbiddenurl'>
        EFORBIDDENURL
      </Link>{' '}
      if they point at reserved ranges. During render, a Chromium interceptor
      validates every origin the page touches.
    </>
  ),
  bullets: [
    'One isolated browser context per request',
    'Dual-layer SSRF protection (DNS + interceptor)',
    'No shared cookies, caches, or profiles',
    'User code runs in a VM with hard ceilings'
  ],
  sample: `{
  "status": "fail",
  "code": "EFORBIDDENURL",
  "message": "The URL is forbidden"
}`,
  sampleTitle: 'response.json'
}

export const STEPS = [
  {
    title: 'Allocate',
    description: 'Each request gets a dedicated incognito browser context.'
  },
  {
    title: 'Screen',
    description:
      'DNS-resolve the host; refuse reserved ranges with EFORBIDDENURL.'
  },
  {
    title: 'Enforce',
    description: 'A Chromium interceptor aborts mid-render private navigations.'
  },
  {
    title: 'Destroy',
    description:
      'Context is destroyed on completion — never recycled across tenants.'
  }
]

export const LANGUAGES = {
  cURL: `# Private / metadata targets are refused before fetch
curl -G 'https://api.microlink.io' \\
  --data-urlencode 'url=http://169.254.169.254'
# → EFORBIDDENURL`,
  JavaScript: `import mql from '@microlink/mql'

try {
  await mql('http://169.254.169.254')
} catch (error) {
  console.log(error.code) // EFORBIDDENURL
}`,
  Python: `import requests

response = requests.get(
  'https://api.microlink.io',
  params={'url': 'http://169.254.169.254'}
)
print(response.json())  # EFORBIDDENURL`,
  Go: `package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  resp, err := http.Get(
    "https://api.microlink.io?url=http%3A%2F%2F169.254.169.254")
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body)) // EFORBIDDENURL
}`
}

export const QUICK_START = {
  description:
    'SSRF protection and per-request isolation are always on — no configuration required.',
  playgroundHref: '/security',
  playgroundLabel: 'Read security practices →'
}

export const PARAMS = {
  docsHref: '/docs/api/basics/error-codes#eforbiddenurl',
  rows: [
    {
      name: 'url',
      type: 'string',
      description:
        'Validated against reserved IP ranges before and during render.',
      required: true,
      plan: 'Free + Pro'
    },
    {
      name: 'function',
      type: 'string',
      description: 'User code runs in a VM with timeout and memory ceilings.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'x-api-header-*',
      type: 'request header',
      description: 'Secrets redacted from logs; cache keys include headers.',
      required: false,
      plan: 'Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/security',
  items: [
    {
      title: 'SSRF refusal',
      description:
        'Private and cloud-metadata targets are refused before fetch.',
      snippet: `url: 'http://169.254.169.254'
→ EFORBIDDENURL`,
      href: '/docs/api/basics/error-codes#eforbiddenurl'
    },
    {
      title: 'Sandboxed function',
      description: 'User JS runs with timeout, memory, and egress ceilings.',
      snippet: '// VM sandbox + hard limits',
      href: '/features/function'
    },
    {
      title: 'Credential-safe cache',
      description: 'Cache keys incorporate headers so sessions never cross.',
      snippet: '// SHA-512(url + headers…)',
      href: '/features/ttl'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Multi-tenant APIs',
    description: 'Untrusted URLs cannot reach other tenants’ browser state.',
    icon: 'lock'
  },
  {
    title: 'SSRF-hardened rendering',
    description: 'Block loopback, private nets, and cloud metadata.',
    icon: 'shield'
  },
  {
    title: 'Secret-safe private pages',
    description: 'Headers redacted from logs; cache keyed by credentials.',
    icon: 'list'
  },
  {
    title: 'Contained user code',
    description: 'function runs under VM ceilings — not an egress proxy.',
    icon: 'code'
  },
  {
    title: 'Enterprise isolation',
    description: 'Dedicated endpoint, isolated browser pool, GDPR DPA.',
    icon: 'globe'
  }
]

export const FAQ_RAW = [
  {
    question: 'Does every request really get its own browser?',
    text: 'Yes. Each request is assigned its own incognito browser context, created when the request starts and destroyed when it finishes. Contexts are never shared or reused across requests.'
  },
  {
    question: 'How does Microlink prevent SSRF?',
    text: 'At two layers. Before the fetch, the hostname is resolved via DNS and refused with EFORBIDDENURL if it points at a reserved range. During rendering, a Chromium request interceptor validates every origin the page touches.'
  },
  {
    question: 'Are cookies, cache, or sessions shared between requests?',
    text: 'No. All browser state lives inside the request’s own incognito context and is destroyed with it. Cached API responses are keyed by SHA-512 hashes that incorporate request headers.'
  },
  {
    question: 'What limits apply to user-supplied code?',
    text: 'Code passed through the function parameter runs inside a VM with an execution timeout and a memory ceiling. On the free plan, cross-origin fetch, XHR, and WebSocket calls are blocked.'
  },
  {
    question: 'What additional security does Enterprise provide?',
    text: 'Microlink Enterprise runs the full API on hardware that serves only you: a dedicated endpoint backed by an isolated pool of always-ready browsers, deployable in 8 locations, with a 99.9% uptime SLA.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
