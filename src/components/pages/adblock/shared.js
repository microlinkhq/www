import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Adblock API: Capture Pages Without Ads or Banners',
  description:
    'Microlink blocks ads and trackers before the page renders and dismisses cookie-consent banners automatically. Adblock is on by default, on every plan.'
}

export const HERO = {
  title: 'Adblock & Cookie Banners',
  tag: null,
  description:
    'On by default, on every plan — cleaner captures, fewer third-party requests, repeatable results.'
}

export const OVERVIEW = {
  title: 'On by default.',
  body: (
    <>
      Ad exchanges, trackers and consent widgets slow the response down and
      cover the target <Link href='/docs/api/parameters/url'>url</Link> with
      banners. <Link href='/docs/api/parameters/adblock'>adblock</Link> refuses
      those third-party requests before they load and dismisses common cookie
      dialogs automatically — on by default, so a plain request already returns
      a clean result.
    </>
  ),
  bullets: [
    'On by default — no parameter to set, on every plan',
    'Third-party ad, tracker and cookie-consent requests never load',
    'Cookie banners from supported consent providers are dismissed automatically',
    'Applies to every product — screenshot, PDF, markdown, metadata, extract',
    'Opt out per request with adblock: false when you need the page untouched',
    'Open source under the hood — Ghostery adblocker plus DuckDuckGo autoconsent'
  ]
}

export const HOW = {
  id: 'how',
  eyebrow: 'How it works',
  title: 'Three layers, one parameter.',
  body: (
    <>
      Requests that belong to ads, trackers or consent services are refused at
      the network level, cookie dialogs from supported consent providers are{' '}
      <Link href='/blog/microlink-adblock-now-handles-cookie-banners'>
        opted out automatically
      </Link>
      , and cosmetic rules hide leftover overlays before the capture. For a
      site-specific dialog that slips through,{' '}
      <Link href='/docs/api/parameters/click'>click</Link> the button that
      dismisses it, or hide it with{' '}
      <Link href='/docs/api/parameters/styles'>styles</Link>.
    </>
  ),
  bullets: [
    'Network layer: requests to ad, tracker and consent-management hosts are refused',
    'Consent layer: known cookie dialogs are opted out automatically',
    'Cosmetic layer: leftover overlays are hidden before the capture',
    'Custom dialogs: dismiss with click, hide with styles, or drive them with scripts',
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
        'Block third-party ads and trackers, dismiss cookie banners automatically. Default: true.',
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
      icon: 'zap',
      title: 'Nothing to configure',
      description:
        'Adblock is already on — this screenshot arrives without ad slots or consent widgets.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com'
)`)
    },
    {
      id: 'consent-click',
      icon: 'mouse',
      title: 'Dismiss a first-party dialog',
      description:
        'For a custom consent dialog adblock does not recognize, click the button that accepts it.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { click: '#accept-cookies' }
)`)
    },
    {
      id: 'hide-styles',
      icon: 'eye-off',
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
      icon: 'file',
      title: 'Cleaner text extraction',
      description:
        'Ads and trackers never load, so the markdown carries the article and not the noise.',
      snippet: sdkExample(`const { markdown } = await microlink.markdown(
  'https://example.com/blog/post'
)`)
    },
    {
      id: 'opt-out',
      icon: 'toggle',
      title: 'Keep the page untouched',
      description:
        'Pass adblock: false and the page loads with every request intact.',
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
    text: 'Third-party sub-requests that belong to advertisements, trackers or cookie-consent services. On top of that, cookie dialogs from supported consent providers are dismissed automatically. The page’s own resources — its HTML, CSS, images and scripts — are always loaded, so the capture still shows the real page.'
  },
  {
    question: 'Does adblock apply to every product?',
    text: 'Yes. adblock acts at the browser level before the page renders, so screenshots, PDFs, markdown, metadata and structured data extraction all start from the same clean page.'
  },
  {
    question: 'A cookie banner still appears in my screenshot. Why?',
    text: 'No consent strategy covers every site. Adblock refuses consent-service requests and opts out of dialogs from supported consent providers, but a custom dialog it does not recognize still renders. Dismiss it with click and the CSS selector of the accept button, or hide it by injecting a display: none rule with styles.',
    answer: (
      <div>
        No consent strategy covers every site. Adblock refuses consent-service
        requests and opts out of dialogs from supported consent providers, but a
        custom dialog it does not recognize still renders. Dismiss it with{' '}
        <Link href='/docs/api/parameters/click'>click</Link> and the CSS
        selector of the accept button, or hide it by injecting a display: none
        rule with <Link href='/docs/api/parameters/styles'>styles</Link>.
      </div>
    )
  },
  {
    question: 'Does adblock make requests faster?',
    text: 'It removes work. Third-party ad and tracker requests are never issued, so nothing waits on them. Those requests are not essential to the page: they bloat response time and clutter the interface.'
  },
  {
    question: 'Which blocking engine is used?',
    text: 'Two open-source projects. The Ghostery adblocker engine refuses ad and tracker requests, and DuckDuckGo’s autoconsent opts out of cookie dialogs. Both ship as part of the API, so there is nothing to install, host or keep up to date.',
    answer: (
      <div>
        Two open-source projects.{' '}
        <Link href='https://github.com/ghostery/adblocker'>
          Ghostery adblocker
        </Link>{' '}
        refuses ad and tracker requests, and{' '}
        <Link href='https://github.com/duckduckgo/autoconsent'>
          DuckDuckGo’s autoconsent
        </Link>{' '}
        opts out of cookie dialogs. Both ship as part of the API, so there is
        nothing to install, host or keep up to date.
      </div>
    )
  }
])
