import React from 'react'
import { colors } from 'theme'
import {
  Code as CodeIcon,
  Droplet as DropletIcon,
  Image as ImageIcon,
  LifeBuoy as LifeBuoyIcon,
  Mail as MailIcon,
  Zap as ZapIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.yellow7
export const TILE_BG = colors.yellow0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.orange9} 0%,
  ${colors.orange9} 48%,
  ${colors.yellow9} 48%,
  ${colors.yellow9} 52%,
  ${colors.orange8} 52%,
  ${colors.orange8} 65%,
  ${colors.yellow8} 65%,
  ${colors.yellow8} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Brand logo API for developers',
  description:
    'Get the logo behind any URL. Microlink walks the page markup, checks the BIMI record in DNS and falls back to the favicon — returning the best asset with its format, dimensions and brand palette.',
  ctaHref: '/docs/api/parameters/meta',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://www.cloudflare.com',
    palette: true,
    filter: 'logo'
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the brand back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'More than',
  titleAccent: 'a favicon.',
  titleBreak: false,
  caption:
    'HTML never standardized how a site declares its logo. Microlink checks every source a brand can publish to and returns the best one, with the colors to match.',
  items: [
    {
      icon: CodeIcon,
      title: 'Markup conventions, walked in order',
      description:
        'og:logo, itemprop="logo" and the JSON-LD marks for brands, organizations and publishers are probed one by one — the first match wins.'
    },
    {
      icon: MailIcon,
      title: 'The logo hiding in DNS',
      description: (
        <>
          Domains publish an official square SVG as a{' '}
          <Link href='/blog/brand-logos-are-hiding-in-dns'>BIMI record</Link> —
          the same logo your mailbox shows next to authenticated email, resolved
          without downloading the page.
        </>
      )
    },
    {
      icon: LifeBuoyIcon,
      title: 'Favicon as the safety net',
      description:
        'Nearly every site serves a favicon, so when markup and DNS are empty the tab icon keeps coverage from dropping to zero.'
    },
    {
      icon: DropletIcon,
      title: 'Palette in the same call',
      description: (
        <>
          <Link href='/docs/api/parameters/palette'>palette</Link> adds the
          dominant colors plus background and foreground pairs picked for WCAG
          contrast — ready to theme UI with.
        </>
      )
    },
    {
      icon: ImageIcon,
      title: 'Hotlink it anywhere',
      description: (
        <>
          <Link href='/docs/api/parameters/embed'>embed</Link> turns the API URL
          into the image itself, so the logo drops straight into an {'<img>'}{' '}
          tag with nothing to parse or store.
        </>
      )
    },
    {
      icon: ZapIcon,
      title: 'Cached and current',
      description: (
        <>
          <Link href='/features/ttl'>Configurable TTL</Link> makes repeat
          lookups free and instant, while expiry means a rebrand propagates on
          its own.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The logo API is free to start — point it at a domain and get the brand back.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The logo API is free to use, with no account and no credit card. Send a URL and get the logo, its metadata and the brand palette back in one call.',
  ctaHref: '/docs/api/parameters/meta',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink logo API.'

export const FAQ_ITEMS = [
  {
    question: 'Where does the logo come from?',
    text: 'The page markup is walked first — og:logo, itemprop="logo" and the structured data for brands, organizations and publishers. When markup is empty the BIMI record published in DNS is checked, and the favicon is the last resort, so a result comes back for nearly every site.',
    answer: (
      <>
        <div>
          The page markup is walked first — og:logo, itemprop=&quot;logo&quot;
          and the structured data for brands, organizations and publishers. The
          first match wins.
        </div>
        <div>
          When markup is empty, the{' '}
          <Link href='/blog/brand-logos-are-hiding-in-dns'>
            BIMI record published in DNS
          </Link>{' '}
          is checked, and the favicon is the last resort — so a result comes
          back for nearly every site.
        </div>
      </>
    )
  },
  {
    question: 'What is a BIMI logo?',
    text: 'BIMI (Brand Indicators for Message Identification) lets a domain publish its official logo in DNS as a square SVG — the same logo Gmail and Apple Mail show next to authenticated email. When a domain publishes one it is the best source available: intentional, script-free and square by design.',
    answer: (
      <>
        <div>
          BIMI (Brand Indicators for Message Identification) lets a domain
          publish its official logo in DNS as a square SVG — the same logo Gmail
          and Apple Mail show next to authenticated email.
        </div>
        <div>
          When a domain publishes one it is the best source available:
          intentional, script-free and square by design. Read{' '}
          <Link href='/blog/brand-logos-are-hiding-in-dns'>
            how Microlink uses it
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How do I get the brand colors?',
    text: 'Enable the palette parameter and every detected image gains a palette array ordered from most dominant color to least, plus background_color, color and alternative_color — pairs picked for good WCAG contrast, so you can build accessible UI directly on the response.',
    answer: (
      <>
        <div>
          Enable the <Link href='/docs/api/parameters/palette'>palette</Link>{' '}
          parameter and every detected image gains a palette array ordered from
          most dominant color to least.
        </div>
        <div>
          You also get background_color, color and alternative_color — pairs
          picked for good WCAG contrast, so you can build accessible UI directly
          on the response.
        </div>
      </>
    )
  },
  {
    question: 'Can I embed the logo directly in an image tag?',
    text: 'Yes. Add embed=logo.url to the query string and the API URL becomes the image itself, so you can hotlink it from an img tag or a CSS background with no JSON parsing and nothing to store on your side.',
    answer: (
      <>
        <div>
          Yes. Add <Link href='/docs/api/parameters/embed'>embed=logo.url</Link>{' '}
          to the query string and the API URL becomes the image itself.
        </div>
        <div>
          Hotlink it from an {'<img>'} tag or a CSS background with no JSON
          parsing and nothing to store on your side.
        </div>
      </>
    )
  },
  {
    question: 'What happens when a site has no logo?',
    text: 'Nearly every site serves a favicon, so the fallback keeps coverage close to universal. When not even a favicon exists the logo field is null — easy to detect so you can render your own placeholder, such as an initials avatar.'
  },
  {
    question: 'How fresh are the responses?',
    text: 'Responses are cached at the edge with a configurable TTL from 1 minute to 31 days. Cache hits are free and served instantly, and once the TTL expires the logo is fetched again, so a rebrand propagates without you doing anything.'
  }
]

export const META = {
  title: 'Website Logo API - Logos, Favicons & Brand Colors',
  description:
    'Get the logo behind any URL — page markup, DNS BIMI records and favicons, plus brand palettes with WCAG-aware color pairs. 25 free requests/day.',
  structuredName: 'Microlink Logo API',
  structuredDescription:
    'A developer-first API that resolves website logos from HTML markup, DNS BIMI records and favicons, with color palette extraction, image metadata, direct embedding and global edge caching.',
  keywords: [
    'website logo api',
    'company logo api',
    'logo extraction api',
    'favicon api',
    'brand colors api',
    'bimi logo api'
  ],
  about: [
    { name: 'Logo', sameAs: 'https://en.wikipedia.org/wiki/Logo' },
    { name: 'Favicon', sameAs: 'https://en.wikipedia.org/wiki/Favicon' },
    {
      name: 'Brand Indicators for Message Identification',
      sameAs:
        'https://en.wikipedia.org/wiki/Brand_Indicators_for_Message_Identification'
    }
  ]
}
