import React from 'react'
import { Link } from 'components/elements/Link'

import {
  faqFromItems,
  ProxyHeadersTtlLinks,
  sdkExample
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Request Isolation: One Browser Per Call, SSRF Blocked',
  description:
    'Every Microlink call gets its own ephemeral browser — created, used, destroyed. Private and link-local URLs are refused with EFORBIDDENURL before navigation.'
}

export const HERO = {
  title: 'Request Isolation',
  description:
    'One browser per call. Then gone. No shared cookies, no leaked state — and private targets never leave the gate.'
}

export const OVERVIEW = {
  title: 'Fresh browser. Closed network.',
  body: (
    <>
      Microlink does not reuse browsers across calls. Each request boots an
      isolated instance, runs the job, and tears it down — so one URL can never
      see another’s cookies, storage, or session. Before any navigation, the
      target is checked for SSRF: private, loopback, and link-local addresses
      reject with <code>EFORBIDDENURL</code>. Same guarantees on every product
      and every plan — see the{' '}
      <Link href='/docs/api/getting-started/overview'>API overview</Link>.
    </>
  ),
  bullets: [
    'One ephemeral browser per request — created, used, destroyed',
    'No cookies, storage, or session state shared between calls',
    'SSRF gate: private, loopback, and link-local URLs never navigate',
    'EFORBIDDENURL fails closed before the browser starts',
    'Typed MicrolinkError with code, statusCode, and description'
  ]
}

export const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'examples', label: 'Examples' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]

export const EXAMPLES = {
  title: 'Isolation you do not configure.',
  panels: [
    {
      id: 'ssrf',
      title: 'SSRF is refused',
      description: 'A link-local metadata URL rejects before navigation.',
      snippet: sdkExample(`await microlink.metadata(
  'http://169.254.169.254'
)
// → MicrolinkError { code: 'EFORBIDDENURL' }`)
    },
    {
      id: 'catch-error',
      title: 'Catch MicrolinkError',
      description: 'Branch on code when a target is blocked or invalid.',
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
      title: 'Nothing shared between calls',
      description: 'Two requests, two browsers — cookies never cross.',
      snippet: sdkExample(`await microlink.metadata('https://a.example')
await microlink.metadata('https://b.example')
// → separate browsers, nothing shared`)
    },
    {
      id: 'user-urls',
      title: 'Safe with user-supplied URLs',
      description: 'Preview links from users without exposing internal hosts.',
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
      title: 'Same gate under Pro options',
      description: 'proxy, headers, and ttl still run inside the sandbox.',
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
  title: 'Compose without leaving the sandbox.'
}

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'What does “isolated browser per request” mean?',
    text: 'Every call gets its own fresh browser instance that is destroyed when the response is sent. No cookies, storage, or state are shared between calls, so one request can never observe or affect another.'
  },
  {
    question: 'How does Microlink prevent SSRF?',
    text: 'Before any navigation, the target URL is validated. Requests to private, loopback, or link-local addresses — like 127.0.0.1, 10.0.0.0/8, or 169.254.169.254 — are rejected with EFORBIDDENURL, so a target can never reach your internal network.'
  },
  {
    question: 'What is EFORBIDDENURL?',
    text: 'The error code returned when a URL is not allowed to navigate — typically because it resolves to a private or link-local address. Rejection happens before the browser starts, so the unsafe request never runs.'
  },
  {
    question: 'How do I handle EFORBIDDENURL in code?',
    text: 'API errors reject with a MicrolinkError carrying code, statusCode, and a human-readable description. Import it from microlink.io and branch on error.code to handle EFORBIDDENURL and other cases explicitly.'
  },
  {
    question: 'Do these guarantees apply on the free plan?',
    text: 'Yes. Per-request isolation and SSRF protection apply to every request on every plan, with no configuration required. They hold the same when you add proxy, headers, or ttl on Pro.',
    answer: (
      <div>
        Yes. Per-request isolation and SSRF protection apply to every request on
        every plan, with no configuration required. They hold the same when you
        add <ProxyHeadersTtlLinks ttlLabel='ttl' /> on Pro.
      </div>
    )
  }
])
