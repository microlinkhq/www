import React from 'react'

import { Link } from 'components/elements/Link'

import {
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from 'helpers/free-tier'
import {
  ALTERNATIVES,
  ALTERNATIVES_INDEX_HREF,
  alternativeHref
} from 'helpers/alternatives'

const PAGE_URL = `https://microlink.io${ALTERNATIVES_INDEX_HREF}`

export const META = {
  title: 'Alternatives and Comparisons',
  description:
    'Microlink compared with Puppeteer, Playwright, Firecrawl, ScrapingBee, Urlbox, Clearbit and more: pricing math, feature tables and what the other tool does better.'
}

export const HERO = {
  title: 'Every comparison, side by side',
  caption:
    'Each page puts Microlink next to one tool: the pricing math, a feature table built from their own docs, and what that tool does that Microlink does not.'
}

export const CTA = {
  caption:
    'Point one request at a URL you already process and compare the response with what you get today.',
  cta: 'alternatives:footer-cta',
  links: [{ href: '/docs/guides', label: 'Read the guides' }]
}

export const FAQ_CAPTION =
  'How the comparisons are made and what a Microlink request costs.'

export const FAQ_ITEMS = [
  {
    question: 'Where do the competitor numbers come from?',
    text: 'From each vendor’s own pricing page and documentation, linked from the page that uses them. Every page also names what the other tool does that Microlink does not, so the comparison holds up when you check it.'
  },
  {
    question: 'How does Microlink price a request?',
    text: 'One request per API call, whatever the call returns: a screenshot, a PDF, markdown, metadata or all of them together. Self-serve Pro plans cost $1.07 per 1,000 requests, from $49 for 46,000 a month, and a response served from cache is not counted.',
    answer: (
      <div>
        One request per API call, whatever the call returns: a screenshot, a
        PDF, markdown, metadata or all of them together. Self-serve{' '}
        <Link href='/pricing'>Pro plans</Link> cost $1.07 per 1,000 requests,
        from $49 for 46,000 a month, and a response served from{' '}
        <Link href='/features/ttl'>cache</Link> is not counted.
      </div>
    )
  },
  {
    question: 'Can I test it against my own URLs before paying?',
    text: `Yes. A free API key gives ${FREE_PLAN_REQUESTS_PER_DAY} requests a day with every Pro feature and no credit card, and ${KEYLESS_REQUESTS_PER_DAY} requests a day work with no key at all.`
  },
  {
    question: 'I run Puppeteer or Playwright myself. Where do I start?',
    text: 'With the page for the tool you run. The Puppeteer page lists what you stop running and how /function takes your existing page code. The Playwright page maps each call you make today to a Microlink parameter. Both say when keeping your own browser is the better choice.',
    answer: (
      <div>
        With the page for the tool you run:{' '}
        <Link href='/alternative/puppeteer'>Puppeteer</Link> or{' '}
        <Link href='/alternative/playwright'>Playwright</Link>. The Puppeteer
        page lists what you stop running and how{' '}
        <Link href='/function'>function</Link> takes your existing page code.
        The Playwright page maps each call you make today to a Microlink
        parameter. Both say when keeping your own browser is the better choice.
      </div>
    )
  }
]

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: META.title,
    description: META.description,
    url: PAGE_URL,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ALTERNATIVES.length,
      itemListElement: ALTERNATIVES.map(({ slug, name }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `Microlink vs ${name}`,
        url: `https://microlink.io${alternativeHref(slug)}`
      }))
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text
      }
    }))
  }
]
