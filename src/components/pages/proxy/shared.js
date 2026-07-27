import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Proxy API: Automatic Unblocker for Hard Targets',
  description:
    'Add proxy: true to any Microlink request and traffic routes through residential IPs to bypass Cloudflare, DataDome and Akamai. EPROXYNEEDED tells you exactly when a target requires it.'
}

export const HERO = {
  name: 'Proxy Resolution',
  title: 'Proxy Resolution',
  description:
    'One param. Hard targets. Add proxy: true and Microlink routes the request through residential IPs — the unblocker is automatic, no proxy list to manage.',
  plans: [
    {
      plan: 'Free',
      description: 'EPROXYNEEDED surfaces when a target needs a proxy.'
    },
    {
      plan: 'Pro',
      description: 'proxy: true auto-unblocks; or bring your own proxy URL.'
    }
  ]
}

export const OVERVIEW = {
  eyebrow: 'Overview',
  title: 'The unblocker is a single option.',
  body: (
    <>
      When a target blocks datacenter traffic, the API rejects with{' '}
      <code>EPROXYNEEDED</code>. Pass{' '}
      <Link href='/docs/api/parameters/proxy'>proxy: true</Link> on the same
      request and Microlink routes through residential IPs automatically — or
      pass your own proxy URL to bring your pool. Works on every product:
      screenshot, markdown, extract, run.
    </>
  ),
  bullets: [
    'proxy: true routes through managed residential IPs — nothing to rotate',
    'Bypasses Cloudflare, DataDome, Akamai and similar defenses',
    'EPROXYNEEDED names the moment a target requires a proxy',
    'Works on every product — screenshot, markdown, extract, run',
    'BYO proxy: pass a proxy URL string instead of a boolean'
  ]
}

export const PARAMS = {
  eyebrow: 'Parameters',
  title: 'How proxy routing is controlled.',
  docsHref: '/docs/api/parameters/proxy',
  rows: [
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'true for the managed unblocker, or your own proxy URL.',
      required: false,
      plan: 'Pro',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'url',
      type: 'string',
      description: 'Target page reached through the proxy when set.',
      required: true,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/url'
    },
    {
      name: 'EPROXYNEEDED',
      type: 'error code',
      description: 'Signals the target refused a direct, non-proxied request.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'ttl',
      type: 'string | number',
      description: 'Cache proxied responses so repeat calls skip the proxy.',
      required: false,
      plan: 'Pro',
      href: '/docs/api/parameters/ttl'
    }
  ]
}

const sdkExample = body => `import createClient from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

${body}`

export const EXAMPLES = {
  eyebrow: 'Examples',
  title: 'Unblock hard targets.',
  panels: [
    {
      id: 'auto-unblock',
      title: 'Auto-unblock',
      description: 'proxy: true routes through residential IPs automatically.',
      language: 'js',
      snippet: sdkExample(`const markdown = await microlink.markdown(
  'https://hard-target.com/article',
  { proxy: true }
)`)
    },
    {
      id: 'eproxyneded',
      title: 'Handle EPROXYNEEDED',
      description: 'Catch the code, then retry the same call with a proxy.',
      language: 'js',
      snippet: sdkExample(`try {
  await microlink.metadata(url)
} catch (error) {
  if (error.code === 'EPROXYNEEDED') {
    return microlink.metadata(url, { proxy: true })
  }
}`)
    },
    {
      id: 'byo-proxy',
      title: 'Bring your own proxy',
      description: 'Pass a proxy URL string to route through your own pool.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://hard-target.com',
  { proxy: process.env.PROXY_URL }
)`)
    },
    {
      id: 'screenshot',
      title: 'Screenshot behind a wall',
      description: 'Same unblocker on visual capture — one option.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://hard-target.com/pricing',
  { proxy: true }
)`)
    },
    {
      id: 'with-ttl',
      title: 'Cache the unblocked result',
      description: 'ttl keeps repeat calls off the proxy path.',
      language: 'js',
      snippet: sdkExample(`const md = await microlink.markdown(url, {
  proxy: true,
  ttl: '1d'
})`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['antibot', 'headers', 'scraping', 'ttl'],
  title: 'Reach and read hard targets.'
}

export const FAQ_RAW = [
  {
    question: 'What does proxy: true actually do?',
    text: 'It routes your request through Microlink’s managed residential IP pool instead of a datacenter IP. There is no proxy list to maintain or rotate — Microlink picks and manages the exit for you.'
  },
  {
    question: 'When do I need a proxy?',
    text: 'When a target refuses direct access, the API rejects with EPROXYNEEDED. That error is your signal to retry the same call with proxy: true. It typically appears on sites protected by Cloudflare, DataDome or Akamai.'
  },
  {
    question: 'Is proxy available on the free plan?',
    text: 'The EPROXYNEEDED signal surfaces on every plan so you always know when a target needs a proxy. Actually routing through the residential unblocker with proxy: true is a Pro capability.'
  },
  {
    question: 'Can I bring my own proxy?',
    text: 'Yes. Instead of true, pass a proxy URL string and Microlink routes through your own pool while still handling the browser, retries and errors.'
  },
  {
    question: 'Does proxy compose with other options?',
    text: 'Yes. proxy stacks with headers, ttl and automation options on the same request, so one call can unblock a target, forward a session cookie, and cache the result.'
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
