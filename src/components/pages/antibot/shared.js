import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems } from 'components/patterns/FeatureStory'

import { PROVIDERS_COVERED } from './providers-data'

export const META = {
  title: 'Antibot Detection: Know Who Blocked You',
  description: `Know exactly who blocked your request and why. Microlink detects antibot and CAPTCHA challenges from ${PROVIDERS_COVERED} providers so you can decide what to do next.`
}

export const HERO = {
  title: 'Antibot Detection',
  tag: 'PRO',
  description: `Know exactly who blocked your request and why. Microlink detects antibot and CAPTCHA challenges from ${PROVIDERS_COVERED} providers using response signals — then you can decide what to do next.`
}

export const HOW = {
  id: 'how',
  eyebrow: 'How it works',
  title: 'Classify the challenge. Name the provider.',
  body: (
    <>
      At a high level, Microlink classifies challenge responses using the HTTP
      response itself — no headless browser required for detection. Each
      provider leaves a distinct combination of signals. Providers are checked
      in priority order; the first match wins.
    </>
  ),
  bullets: [
    'HTTP status patterns — LinkedIn can return 999; Reddit can return 403 on challenge flows',
    'Known challenge signatures — CAPTCHA widgets, interstitial templates, verification scripts',
    'Response headers and body markers — mitigation headers, challenge tokens, provider script references',
    'Provider-specific fingerprints — for example Cloudflare commonly surfaces cf-mitigated: challenge'
  ]
}

export const RELATED = {
  relatedSlugs: ['proxy', 'headers', 'scraping', 'function'],
  title: 'From detection to access.'
}

export const TOC = [
  { id: 'overview', label: 'Why' },
  { id: 'how', label: 'How it works' },
  { id: 'providers', label: 'Providers' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'What does antibot detection tell me?',
    text: `Whether a response is an antibot or CAPTCHA challenge, which of ${PROVIDERS_COVERED} providers triggered it, and which signal matched — so you can choose the right next step instead of treating every failure the same.`
  },
  {
    question: 'Why does naming the provider matter?',
    text: 'Antibot systems are not interchangeable. A Cloudflare JS challenge is not an Akamai edge block. Once you know who blocked you, you can adapt retries, route through a proxy, escalate to a browser, or exit early.'
  },
  {
    question: 'How do I resolve a detected block?',
    answer: (
      <>
        On Pro, retry with{' '}
        <Link href='/docs/api/parameters/proxy'>proxy: true</Link>. Microlink
        routes through residential IPs for the named provider, then returns the
        normal result.
      </>
    ),
    text: 'On Pro, retry with proxy: true. Microlink routes through residential IPs for the named provider, then returns the normal result.'
  },
  {
    question: 'Is the detection logic open source?',
    answer: (
      <>
        Yes. The classifier is published as{' '}
        <Link href='https://github.com/microlinkhq/is-antibot'>is-antibot</Link>{' '}
        so you can audit how providers and signals are matched.
      </>
    ),
    text: 'Yes. The classifier is published as is-antibot so you can audit how providers and signals are matched.'
  }
])
