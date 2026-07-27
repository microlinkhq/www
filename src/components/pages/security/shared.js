import React from 'react'
import { Link } from 'components/elements/Link'

import {
  faqFromItems,
  ProxyHeadersTtlLinks,
  sdkExample
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Request Security API: Isolated Browsers, SSRF Protected',
  description:
    'Every Microlink request runs in its own isolated, ephemeral browser and is destroyed after. SSRF is blocked by default — private and link-local URLs reject with EFORBIDDENURL before any navigation.'
}

export const HERO = {
  name: 'Request Security',
  title: 'Request Security',
  description:
    'One browser. One request. Then gone. Every call runs in its own isolated, ephemeral browser, and SSRF to private targets is blocked with EFORBIDDENURL.',
  plans: [
    {
      plan: 'Free',
      description: 'Isolation and SSRF protection on every request.'
    },
    {
      plan: 'Pro',
      description: (
        <>
          Same guarantees with <ProxyHeadersTtlLinks />.
        </>
      )
    }
  ]
}

export const OVERVIEW = {
  eyebrow: 'Overview',
  title: 'Isolated by default. SSRF blocked.',
  body: (
    <>
      Every request gets a fresh, isolated browser that is destroyed the moment
      it finishes — no shared cookies, no leaked state between calls. Requests
      to private, loopback, or link-local addresses are rejected with{' '}
      <code>EFORBIDDENURL</code> before any navigation, so a target URL can
      never reach your internal network. See the{' '}
      <Link href='/docs/api/getting-started/overview'>API overview</Link>.
    </>
  ),
  bullets: [
    'One ephemeral browser per request — created, used, destroyed',
    'No state, cookies or storage shared between calls',
    'SSRF blocked: private / loopback / link-local URLs are refused',
    'EFORBIDDENURL rejects unsafe targets before navigation',
    'Errors are typed: catch MicrolinkError for code and description'
  ]
}

export const PARAMS = {
  eyebrow: 'Parameters',
  title: 'The guarantees on every call.',
  docsHref: '/docs/api/getting-started/overview',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'Validated for SSRF before any browser navigates to it.',
      required: true,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/url'
    },
    {
      name: 'EFORBIDDENURL',
      type: 'error code',
      description: 'Rejects private, loopback and link-local targets.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/getting-started/overview'
    },
    {
      name: 'MicrolinkError',
      type: 'error',
      description: 'Carries code, statusCode and a human-readable description.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/getting-started/overview'
    },
    {
      name: 'isolation',
      type: 'guarantee',
      description: 'One ephemeral browser per request, destroyed after use.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/getting-started/overview'
    }
  ]
}

export const EXAMPLES = {
  eyebrow: 'Examples',
  title: 'Guards you never opt into.',
  panels: [
    {
      id: 'ssrf',
      title: 'SSRF is refused',
      description: 'A link-local metadata URL rejects before navigation.',
      language: 'js',
      snippet: sdkExample(`await microlink.metadata(
  'http://169.254.169.254'
)
// → MicrolinkError { code: 'EFORBIDDENURL' }`)
    },
    {
      id: 'catch-error',
      title: 'Catch MicrolinkError',
      description: 'Typed errors carry code and a readable description.',
      language: 'js',
      snippet: `import createClient, { MicrolinkError } from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

microlink.screenshot(url).catch(error => {
  if (error instanceof MicrolinkError) {
    console.error(error.code, error.description)
  }
})`
    },
    {
      id: 'isolation',
      title: 'Isolated by default',
      description: 'No cookies or state carry over between requests.',
      language: 'js',
      snippet: sdkExample(`await microlink.metadata('https://a.example')
await microlink.metadata('https://b.example')
// → separate browsers, nothing shared`)
    },
    {
      id: 'user-urls',
      title: 'User-supplied URLs',
      description: 'Render links from users without exposing internal hosts.',
      language: 'js',
      snippet: sdkExample(`async function preview (userUrl) {
  try {
    return await microlink.metadata(userUrl)
  } catch (error) {
    if (error.code === 'EFORBIDDENURL') {
      return { blocked: true }
    }
    throw error
  }
}`)
    },
    {
      id: 'compose',
      title: 'Same guards under Pro options',
      description: 'proxy, headers, and ttl still run inside the sandbox.',
      language: 'js',
      snippet: sdkExample(`const md = await microlink.markdown(url, {
  proxy: true,
  headers: { 'x-api-header-cookie': 'session=…' },
  ttl: '1h'
})
// → still isolated; still SSRF-checked`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['headers', 'proxy', 'antibot', 'ttl'],
  title: 'Trust, access and isolation.'
}

export const FAQ_RAW = [
  {
    question: 'What does “isolated browser per request” mean?',
    text: 'Every request gets its own fresh browser instance that is destroyed as soon as the response is sent. No cookies, storage or state are shared between calls, so one request can never observe or affect another.'
  },
  {
    question: 'How does Microlink prevent SSRF?',
    text: 'Before any navigation, the target URL is validated. Requests to private, loopback, or link-local addresses — like 127.0.0.1, 10.0.0.0/8, or 169.254.169.254 — are rejected with the EFORBIDDENURL error, so a target can never reach your internal network.'
  },
  {
    question: 'What is EFORBIDDENURL?',
    text: 'It is the error code returned when a URL is not allowed for security reasons, typically because it resolves to a private or link-local address. It rejects before the browser navigates, so the unsafe request never runs.'
  },
  {
    question: 'How do I handle security errors in code?',
    text: 'API errors reject with a MicrolinkError carrying code, statusCode and a human-readable description. Import it from microlink.io and branch on error.code to handle EFORBIDDENURL and other cases explicitly.'
  },
  {
    question: 'Do these protections apply on the free plan?',
    text: 'Yes. Per-request isolation and SSRF protection apply to every request on every plan, with no configuration required. They hold the same when you add proxy, headers or ttl on Pro.',
    answer: (
      <div>
        Yes. Per-request isolation and SSRF protection apply to every request on
        every plan, with no configuration required. They hold the same when you
        add <ProxyHeadersTtlLinks ttlLabel='ttl' /> on Pro.
      </div>
    )
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)

export const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'examples', label: 'Examples' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]
