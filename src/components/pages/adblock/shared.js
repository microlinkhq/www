import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Adblock API: Capture Pages Without Ads or Banners',
  description:
    'Microlink drops third-party ad, tracker and cookie-consent requests before the page renders. Adblock is on by default on every request, on every plan.'
}

export const HERO = {
  title: 'Adblock & Cookie Banners',
  tag: null,
  description:
    'Third-party ads, trackers and consent banners are dropped before the page renders — on by default, on every plan. Cleaner captures, fewer third-party requests, repeatable results.'
}

export const OVERVIEW = {
  title: 'On by default.',
  body: (
    <>
      A page rendered as-is pulls in third-party requests it does not need — ad
      exchanges, analytics trackers, consent-management widgets. They slow the
      response down and cover the target{' '}
      <Link href='/docs/api/parameters/url'>url</Link> with banners.{' '}
      <Link href='/docs/api/parameters/adblock'>adblock</Link> refuses those
      requests before they load. It is enabled by default, so a plain request
      already returns a clean result.
    </>
  ),
  bullets: [
    'On by default — no parameter to set, on every plan',
    'Third-party ad, tracker and cookie-consent requests never load',
    'Applies to every product — screenshot, PDF, markdown, metadata, extract',
    'Opt out per request with adblock: false when you need the page untouched',
    'Powered by the open-source Cliqz adblocker engine'
  ]
}

export const HOW = {
  id: 'how',
  eyebrow: 'How it works',
  title: 'Requests, not markup.',
  body: (
    <>
      Adblock works at the network layer: it matches each sub-request the page
      makes against the engine filter rules and refuses the ones that belong to
      ads, trackers or consent services. That is why a banner served from a
      third-party widget disappears, while a consent dialog the site ships in
      its own markup still renders — nothing was requested, so nothing was
      blocked. For those, act on the page instead:{' '}
      <Link href='/docs/api/parameters/click'>click</Link> the button that
      dismisses it, or hide it with{' '}
      <Link href='/docs/api/parameters/styles'>styles</Link>.
    </>
  ),
  bullets: [
    'Blocked: third-party requests to ad, tracker and consent-management hosts',
    'Not blocked: first-party markup the site serves itself',
    'Dismiss a first-party dialog with click and a CSS selector',
    'Hide one with styles and a display: none rule',
    'Motion is already frozen — animations defaults to false'
  ]
}

export const PARAMS = {
  title: 'What you can tune.',
  rows: [
    {
      name: 'adblock',
      type: 'boolean',
      description:
        'Refuse third-party ad, tracker and consent requests. Default: true.',
      href: '/docs/api/parameters/adblock'
    },
    {
      name: 'animations',
      type: 'boolean',
      description:
        'Enable CSS animations and transitions. Default: false, so repeat captures match.',
      href: '/docs/api/parameters/animations'
    },
    {
      name: 'click',
      type: 'string | string[]',
      description:
        'Click elements by CSS selector — accept or dismiss a first-party dialog.',
      href: '/docs/api/parameters/click'
    },
    {
      name: 'styles',
      type: 'string | string[]',
      description:
        'Inject CSS before render to hide what the network layer cannot block.',
      href: '/docs/api/parameters/styles'
    },
    {
      name: 'scripts',
      type: 'string | string[]',
      description:
        'Inject JavaScript before render for dialogs that need a real interaction.',
      href: '/docs/api/parameters/scripts'
    }
  ]
}

export const EXAMPLES = {
  title: 'Clean by default. Explicit when you need it.',
  panels: [
    {
      id: 'default',
      title: 'Nothing to configure',
      description:
        'Adblock is already on — this screenshot arrives without ad slots or consent widgets.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com'
)`)
    },
    {
      id: 'consent-click',
      title: 'Dismiss a first-party dialog',
      description:
        'The site serves its own consent dialog, so click the button that accepts it.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { click: '#accept-cookies' }
)`)
    },
    {
      id: 'hide-styles',
      title: 'Hide what stays',
      description:
        'Inject CSS to remove a sticky bar or newsletter overlay before the capture.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { styles: '.cookie-bar, .newsletter-modal { display: none !important }' }
)`)
    },
    {
      id: 'markdown',
      title: 'Cleaner text extraction',
      description:
        'Ads and trackers never load, so the markdown carries the article and not the noise.',
      snippet: sdkExample(`const { markdown } = await microlink.markdown(
  'https://example.com/blog/post'
)`)
    },
    {
      id: 'opt-out',
      title: 'Keep the page untouched',
      description:
        'Auditing what a page actually loads? Turn adblock off and see every request.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { adblock: false }
)`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['automation', 'scraping', 'ttl', 'function'],
  title: 'Pair adblock with these.'
}

export const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'how', label: 'How it works' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'examples', label: 'Examples' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'Do I need to enable adblock?',
    text: 'No. adblock defaults to true on every request and on every plan, so third-party ads, trackers and cookie-consent requests are already refused before the page renders. Pass adblock: false only when you want the page loaded untouched.'
  },
  {
    question: 'What exactly gets blocked?',
    text: 'Third-party sub-requests that belong to advertisements, trackers or cookie-consent services. The page’s own resources — its HTML, CSS, images and scripts — are always loaded, so the capture still shows the real page.'
  },
  {
    question: 'A cookie banner still appears in my screenshot. Why?',
    text: 'Adblock filters network requests, not markup. When a site ships its consent dialog in its own code, no third-party request is made and nothing is blocked. Dismiss it with click and the CSS selector of the accept button, or hide it by injecting a display: none rule with styles.'
  },
  {
    question: 'Does adblock make requests faster?',
    text: 'It removes work. Third-party ad and tracker requests are never issued, so nothing waits on them. Those requests are not essential to the page: they bloat response time and clutter the interface.'
  },
  {
    question: 'Which blocking engine is used?',
    text: 'The open-source Cliqz adblocker engine. It ships as part of the API, so there is nothing to install, host or keep up to date.'
  }
])
