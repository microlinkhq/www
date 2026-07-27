import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Antibot Detection API: Know Who Blocked You',
  description:
    'Microlink identifies 30+ anti-bot providers — Cloudflare, DataDome, Akamai and more — and names the one guarding a target. Once you know who blocked you, resolve it with proxy: true on the same request.'
}

export const HERO = {
  title: 'Antibot Detection',
  description:
    'Know who blocked you. Microlink identifies 30+ anti-bot providers guarding a target, names the signal, and lets you resolve it with proxy on the same call.',
  plans: [
    {
      plan: 'Free',
      description: 'Detection surfaces the provider guarding a target.'
    },
    {
      plan: 'Pro',
      description: 'Resolve the block with proxy: true on the same request.'
    }
  ]
}

export const OVERVIEW = {
  title: 'Detection first. Then resolution.',
  body: (
    <>
      Before a request silently fails, Microlink fingerprints the defense in
      front of a target and names the provider — Cloudflare, DataDome, Akamai
      and 30+ more. Once you know who blocked you, resolve it with{' '}
      <Link href='/docs/api/parameters/proxy'>proxy: true</Link> on the same
      request.
    </>
  ),
  bullets: [
    'Identifies 30+ anti-bot providers — not just a generic “blocked”',
    'The provider name tells you what you are up against',
    'Resolve detected blocks with proxy: true on the same call',
    'Detection is a signal, not a dead end — the flow keeps going',
    'Composes with headers to pass session cookies through'
  ]
}

export const PARAMS = {
  title: 'Detection and resolution signals.',
  docsHref: '/docs/api/parameters/proxy',
  rows: [
    {
      name: 'detected',
      type: 'boolean',
      description: 'Whether an anti-bot defense guards the target.',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'provider',
      type: 'string',
      description: "The named defense — 'cloudflare', 'datadome', 'akamai', ….",
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description:
        'Resolve a detected block via residential IPs, or BYO proxy.',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'headers',
      type: 'object',
      description: 'Forward session cookies through with x-api-header-cookie.',
      href: '/docs/api/parameters/headers'
    }
  ]
}

export const EXAMPLES = {
  title: 'Detect, then resolve.',
  panels: [
    {
      id: 'resolve',
      title: 'Resolve a detected block',
      description: 'Once the provider is named, proxy: true routes around it.',
      language: 'js',
      snippet: sdkExample(`const { title } = await microlink.metadata(
  'https://protected-target.com',
  { proxy: true }
)`)
    },
    {
      id: 'signal',
      title: 'Read the detection signal',
      description: 'EPROXYNEEDED means a defense refused a direct request.',
      language: 'js',
      snippet: sdkExample(`try {
  await microlink.metadata(url)
} catch (error) {
  console.log(error.code) // → 'EPROXYNEEDED'
}`)
    },
    {
      id: 'retry',
      title: 'Smart retry',
      description:
        'Escalate to proxy only when the target refuses direct access.',
      language: 'js',
      snippet: sdkExample(`try {
  return await microlink.metadata(url)
} catch (error) {
  if (error.code === 'EPROXYNEEDED') {
    return microlink.metadata(url, { proxy: true })
  }
  throw error
}`)
    },
    {
      id: 'auth',
      title: 'Unblock, then authenticate',
      description: 'Combine proxy resolution with a forwarded session cookie.',
      language: 'js',
      snippet: sdkExample(`const md = await microlink.markdown(
  'https://protected-target.com/account',
  {
    proxy: true,
    headers: { 'x-api-header-cookie': 'session=…' }
  }
)`)
    },
    {
      id: 'with-ttl',
      title: 'Cache after resolution',
      description: 'ttl keeps the unblocked result warm for the next run.',
      language: 'js',
      snippet: sdkExample(`const { title } = await microlink.metadata(url, {
  proxy: true,
  ttl: '6h'
})`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['proxy', 'headers', 'scraping', 'function'],
  title: 'From detection to access.'
}

export const FAQ_RAW = [
  {
    question: 'What does antibot detection tell me?',
    text: 'It identifies the anti-bot provider guarding a target — Cloudflare, DataDome, Akamai and 30+ others — so you know exactly what is blocking you instead of getting a generic failure.'
  },
  {
    question: 'How do I resolve a detected block?',
    text: 'Retry the same request with proxy: true. Microlink routes through residential IPs to route around the named provider, then returns the normal result.'
  },
  {
    question: 'How is this different from the proxy feature?',
    text: 'Antibot detection is the diagnosis — it names who blocked you. Proxy is the treatment — it routes around that block. They are designed to work together: detect, then resolve.'
  },
  {
    question: 'Is detection available on the free plan?',
    text: 'The detection signal, including the EPROXYNEEDED error, surfaces on every plan so you always know when and by whom a target is guarded. Resolving the block with proxy: true is a Pro capability.'
  },
  {
    question: 'Can I reach pages that also require login?',
    text: 'Yes, on Pro. Combine proxy resolution with forwarded session cookies via x-api-header-cookie so one call both unblocks and authenticates the request.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
