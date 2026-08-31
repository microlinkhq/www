import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

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

export const EXAMPLES = {
  title: 'From a named block to a resolved request.',
  panels: [
    {
      id: 'auto-resolve',
      title: 'Resolved automatically',
      description:
        'On Pro, a named block is retried through a residential IP — no extra option.',
      snippet: sdkExample('const { title } = await microlink.metadata(url)')
    },
    {
      id: 'pin-location',
      title: 'Pin the exit country',
      description:
        'proxy.location routes through a residential IP in that country.',
      snippet: sdkExample(`const { title } = await microlink.metadata(url, {
  proxy: { location: 'fr' }
})`)
    }
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
  { id: 'examples', label: 'Examples' },
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
    text: 'Antibot systems are not interchangeable. A Cloudflare JS challenge is not an Akamai edge block. Microlink uses the named provider to pick the right residential resolution path automatically. Pin a country with proxy.location only when the target is geofenced or serves regional content.'
  },
  {
    question: 'How do I resolve a detected block?',
    answer: (
      <div>
        On Pro, you do not retry it yourself. Microlink names the provider and
        routes the same request through a residential{' '}
        <Link href='/docs/api/parameters/proxy'>proxy</Link> automatically. Pin
        the exit country with{' '}
        <Link href='/docs/api/parameters/proxy/location'>proxy.location</Link>{' '}
        only when the target is geofenced or serves regional content.
      </div>
    ),
    text: 'On Pro, you do not retry it yourself. Microlink names the provider and routes the same request through a residential proxy automatically. Pin the exit country with proxy.location only when the target is geofenced or serves regional content.'
  },
  {
    question: 'Can I choose which country the proxy exits from?',
    answer: (
      <div>
        Yes. Pass{' '}
        <Link href='/docs/api/parameters/proxy/location'>proxy.location</Link>{' '}
        with a two-letter country code such as fr or jp when the target is
        geofenced or serves regional content. The default is us. See the{' '}
        <Link href='/docs/api/parameters/proxy/location'>location</Link>{' '}
        reference for every supported code.
      </div>
    ),
    text: 'Yes. Pass proxy.location with a two-letter country code such as fr or jp when the target is geofenced or serves regional content. The default is us. See the location reference for every supported code.'
  },
  {
    question: 'Is the detection logic open source?',
    answer: (
      <div>
        Yes. The classifier is published as{' '}
        <Link href='https://github.com/microlinkhq/is-antibot'>is-antibot</Link>{' '}
        so you can audit how providers and signals are matched.
      </div>
    ),
    text: 'Yes. The classifier is published as is-antibot so you can audit how providers and signals are matched.'
  }
])
