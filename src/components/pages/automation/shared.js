import React from 'react'
import { Link } from 'components/elements/Link'

import {
  faqFromItems,
  ProxyHeadersTtlLinks,
  sdkExample
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Browser Automation API: Shape the Page Before Capture',
  description:
    'Set device, wait for the right state, click, and inject scripts as declarative options on any Microlink request — the page is shaped before the screenshot, PDF, or data is taken.'
}

export const HERO = {
  title: 'Browser Automation',
  description:
    'Shape the page first. Set the device, wait for the right state, click, and run scripts — declarative options on the same request, applied before capture.',
  plans: [
    {
      plan: 'Free',
      description: 'device, waitUntil, click and scripts on any product.'
    },
    {
      plan: 'Pro',
      description: (
        <>
          Longer waits plus <ProxyHeadersTtlLinks /> on the same call.
        </>
      )
    }
  ]
}

export const OVERVIEW = {
  title: 'Declarative steps, then the capture.',
  body: (
    <>
      Pass automation options on any product call —{' '}
      <Link href='/docs/api/parameters/device'>device</Link>,{' '}
      <Link href='/docs/api/parameters/waitUntil'>waitUntil</Link>,{' '}
      <Link href='/docs/api/parameters/waitForSelector'>waitForSelector</Link>,{' '}
      <Link href='/docs/api/parameters/click'>click</Link>,{' '}
      <Link href='/docs/api/parameters/scripts'>scripts</Link>. The page is
      shaped into the right state before the screenshot, PDF, or data is taken.
    </>
  ),
  bullets: [
    'One product call — the page is prepared, then captured',
    'device emulates viewport, DPR and user-agent presets',
    'waitUntil / waitForSelector settle dynamic, client-rendered pages',
    'click, scroll and scripts drive the UI before extraction',
    'Escalate to a function only when the flow is truly custom'
  ]
}

export const PARAMS = {
  title: 'Options that shape the page.',
  docsHref: '/docs/api/parameters/prerender',
  rows: [
    {
      name: 'device',
      type: 'string',
      description: 'Emulate a viewport, DPR and user-agent preset before load.',
      href: '/docs/api/parameters/device'
    },
    {
      name: 'waitUntil',
      type: 'string',
      description: "Navigation settle event — 'networkidle0', 'load', ….",
      href: '/docs/api/parameters/waitUntil'
    },
    {
      name: 'waitForSelector',
      type: 'string',
      description: 'Block until a selector is present before capturing.',
      href: '/docs/api/parameters/waitForSelector'
    },
    {
      name: 'click / scroll',
      type: 'string',
      description: 'Interact with the page — target elements by selector.',
      href: '/docs/api/parameters/click'
    },
    {
      name: 'scripts',
      type: 'string | string[]',
      description: 'Inject and run JavaScript in the page context before read.',
      href: '/docs/api/parameters/scripts'
    }
  ]
}

export const EXAMPLES = {
  title: 'Shape the page, then capture.',
  panels: [
    {
      id: 'device',
      title: 'Emulate a phone',
      description:
        'device presets the viewport before the screenshot is taken.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { device: 'iPhone 11', fullPage: true }
)`)
    },
    {
      id: 'click-wait',
      title: 'Click, wait, capture',
      description: 'Open the annual tab and wait for the price to render.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com/pricing',
  { click: '.tab-annual', waitForSelector: '.price' }
)`)
    },
    {
      id: 'wait-until',
      title: 'PDF after network idle',
      description: 'Let async content settle before rendering to PDF.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.pdf(
  'https://example.com/report',
  { waitUntil: 'networkidle0', format: 'A4' }
)`)
    },
    {
      id: 'scripts',
      title: 'Inject a script',
      description: 'Dismiss a banner or expand a section before capture.',
      language: 'js',
      snippet: sdkExample(`const { url } = await microlink.screenshot(url, {
  scripts: [
    "document.querySelector('.cookie-banner')?.remove()"
  ]
})`)
    },
    {
      id: 'extract',
      title: 'Wait, then extract',
      description: 'Settle the SPA, then pull structured fields.',
      language: 'js',
      snippet: sdkExample(`const { price } = await microlink.extract(
  'https://example.com/pricing',
  { price: { selector: '.price', type: 'string' } },
  { click: '.tab-annual', waitForSelector: '.price' }
)`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['function', 'scraping', 'proxy', 'antibot'],
  title: 'Pair automation with these.'
}

export const FAQ_RAW = [
  {
    question: 'How is automation different from a function?',
    text: 'Automation is declarative: device, waitUntil, click, scroll and scripts are options on a normal product call, so the page is shaped and then captured. A function is imperative code you author when a flow is too custom for those options.'
  },
  {
    question: 'Do automation options work on the free plan?',
    text: 'Yes. device, waitUntil, waitForSelector, click, scroll and scripts all work on the free tier. Pro raises the time budget and lets you combine them with proxy, custom headers and configurable TTL.'
  },
  {
    question: 'When should I use waitUntil vs waitForSelector?',
    text: 'Use waitUntil to gate on a navigation event like networkidle0 for whole-page settling. Use waitForSelector when you know the exact element that signals the page is ready, which is more precise for single-page apps.'
  },
  {
    question: 'Can I run my own JavaScript before capture?',
    text: 'Yes. Pass scripts to inject and execute JavaScript in the page context before the product reads it — useful for dismissing banners or expanding sections. For return values and npm packages, use the function parameter instead.'
  },
  {
    question: 'Does automation compose with other products?',
    text: 'Yes. The same options apply to screenshot, pdf, markdown and extract, and they stack with proxy, headers and ttl on Pro so one call can emulate a device, unblock the target, and cache the result.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
