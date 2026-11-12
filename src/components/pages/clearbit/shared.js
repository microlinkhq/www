import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory/section'
import {
  FREE_PLAN_CONCURRENT_REQUESTS,
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from 'helpers/free-tier'

export const ACCENT_NAME = 'orange'
export const ACCENT = colors.orange7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.orange9} 0%,
  ${colors.orange9} 48%,
  ${colors.orange8} 48%,
  ${colors.orange8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.yellow7} 65%,
  ${colors.yellow7} 79%,
  ${colors.yellow6} 79%,
  ${colors.yellow6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/clearbit'

export const CLEARBIT_SHUTDOWN_DATE = 'December 8, 2025'

export const SOURCES = {
  hubspot:
    'https://developers.hubspot.com/changelog/november-2025-developer-rollup',
  clearbit: 'https://clearbit.com/changelog/2025-11-24',
  logoDevMigration: 'https://www.logo.dev/docs/migrations/clearbit',
  logoDevImages: 'https://www.logo.dev/docs/logo-images/introduction',
  logoDevPricing: 'https://www.logo.dev/pricing',
  brandfetch: 'https://docs.brandfetch.com/logo-api/overview',
  unavatar: 'https://unavatar.io'
}

export const EXAMPLE_DOMAIN = 'cloudflare.com'
export const EXAMPLE_SITE = 'https://www.cloudflare.com'

export const clearbitLogoUrl = domain => `https://logo.clearbit.com/${domain}`

export const microlinkLogoUrl = siteUrl =>
  `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&embed=logo.url`

export const META = {
  title: 'Clearbit Logo API Alternative with Brand Colors',
  description:
    'logo.clearbit.com shut down on December 8, 2025. Resolve the logo of any website on your server, with its brand colors and metadata in the same call.'
}

export const HERO = {
  title: 'The Clearbit Logo API alternative for any URL',
  description: `logo.clearbit.com stopped answering on ${CLEARBIT_SHUTDOWN_DATE}. Microlink reads the logo from the site itself and returns it with its brand colors, dimensions and page metadata in one call. Point an image tag at it to test, then resolve logos on your server or behind a key proxy in production.`,
  cta: 'alternative-clearbit:hero',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/api/parameters/embed',
  secondaryLabel: 'Read the embed docs',
  editorHeight: 100,
  mqlCode: {
    url: EXAMPLE_SITE,
    palette: true
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the logo back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const MIGRATION = {
  title: (
    <>
      Resolve it once, <GradientText>serve it from your side</GradientText>.
    </>
  ),
  caption: (
    <>
      Clearbit served a logo from the domain in the path. Microlink takes the
      site URL as a query parameter, and <code>embed=logo.url</code> turns the
      response into the image itself, so an <code>{'<img>'}</code> tag works for
      a quick test. In production every logo on a page is one request, and
      without a key a visitor gets {KEYLESS_REQUESTS_PER_DAY}&nbsp;a day, so a
      page with more logos than that breaks on its first view. Resolve the logo
      on your server with your key, store the file, and serve it yourself. For
      an image URL with no server, use{' '}
      <Link href={SOURCES.unavatar}>unavatar.io</Link>/{'{domain}'}, built by
      the Microlink team, with a publishable key as <code>?token=pk_…</code>.
    </>
  ),
  before: {
    title: 'clearbit.html',
    code: `<img src="${clearbitLogoUrl(EXAMPLE_DOMAIN)}" alt="Cloudflare">`
  },
  after: {
    title: 'test-only.html',
    code: `<img src="${microlinkLogoUrl(EXAMPLE_SITE)}" alt="Cloudflare">`
  },
  server: {
    title: 'resolve-logo.js',
    code: `import { mkdir, writeFile } from 'node:fs/promises'
import createClient from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const logo = await microlink.logo('${EXAMPLE_SITE}')
if (!logo) throw new Error('No logo found')

const image = await fetch(logo.url)
if (!image.ok) throw new Error(\`Logo download failed: \${image.status}\`)

await mkdir('logos', { recursive: true })
await writeFile(
  \`logos/${EXAMPLE_DOMAIN}.\${logo.type}\`,
  Buffer.from(await image.arrayBuffer())
)`
  },
  columns: ['What you need', 'Clearbit Logo API', 'Microlink'],
  rows: [
    {
      id: 'image',
      need: 'The logo as an image URL',
      clearbit: 'logo.clearbit.com/{domain}',
      microlink:
        'Resolve on your server and store the file; embed=logo.url to test'
    },
    {
      id: 'input',
      need: 'What you look up',
      clearbit: 'A company domain',
      microlink: 'Any URL: a domain, a subdomain, a single page'
    },
    {
      id: 'source',
      need: 'Where the logo comes from',
      clearbit: 'Clearbit company data',
      microlink:
        'The page markup, the DNS BIMI record, then the favicon, at request time'
    },
    {
      id: 'palette',
      need: 'Brand colors',
      clearbit: 'Not offered',
      microlink: 'palette=true, same call',
      highlight: true
    },
    {
      id: 'details',
      need: 'Width, height, format, file size',
      clearbit: 'Not in the response',
      microlink: 'data.logo.width, height, type, size'
    },
    {
      id: 'metadata',
      need: 'Title, description, preview image',
      clearbit: 'Not offered',
      microlink: 'Same response'
    },
    {
      id: 'size',
      need: 'Size and format',
      clearbit: 'size and format parameters',
      microlink: 'Not offered: size in CSS, format as published'
    },
    {
      id: 'greyscale',
      need: 'A greyscale logo',
      clearbit: 'greyscale=true',
      microlink: 'Not offered, apply a CSS filter'
    },
    {
      id: 'access',
      highlight: true,
      need: 'Access',
      clearbit: 'No key',
      microlink: `${KEYLESS_REQUESTS_PER_DAY} requests a day without a key, then a key in the x-api-key header`
    }
  ],
  footnote: (
    <>
      Clearbit values come from the{' '}
      <Link href={SOURCES.logoDevMigration}>Logo.dev migration guide</Link> and
      the <Link href={SOURCES.clearbit}>Clearbit changelog</Link>. The Microlink
      column was checked against the live API: <code>www.cloudflare.com</code>{' '}
      returns a 200 by 91 SVG with a palette led by <code>#FF5F08</code>.
      Microlink returns the file the site publishes, so format and proportions
      vary by site; size it in CSS. A key travels in a header, so for a public
      page, resolve the logo on your server and store the image file, or put the
      key behind the{' '}
      <Link href='/docs/api/basics/authentication'>authentication proxy</Link>.
    </>
  )
}

export const COMPARISON = {
  title: (
    <>
      <GradientText>Microlink and Logo.dev</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      HubSpot points Clearbit users to Logo.dev, and it is the closest match to
      the old URL. The Clearbit column is gone: logo.clearbit.com shut down on{' '}
      {CLEARBIT_SHUTDOWN_DATE}. Every Logo.dev row comes from its{' '}
      <Link href={SOURCES.logoDevImages}>image docs</Link>,{' '}
      <Link href={SOURCES.logoDevMigration}>migration guide</Link> and{' '}
      <Link href={SOURCES.logoDevPricing}>pricing page</Link>, the rows where it
      does more included.
    </>
  ),
  columns: ['Microlink', 'Logo.dev'],
  rows: [
    {
      feature: 'Lookup input',
      href: '/logo',
      microlink: 'Any URL',
      logodev: 'Domain, name, ticker, crypto, ISIN',
      highlight: true,
      note: 'Microlink renders the URL you pass, so a product page, a subdomain or a personal site resolves to the logo it publishes. Logo.dev looks brands up by domain or by identifier.'
    },
    {
      feature: 'Image URL for an img tag',
      href: '/docs/api/parameters/embed',
      microlink: 'embed=logo.url',
      logodev: 'img.logo.dev/{domain}'
    },
    {
      feature: 'Key in the image URL',
      href: '/docs/api/basics/authentication',
      microlink: false,
      logodev: 'Publishable pk_ token',
      note: `Microlink answers ${KEYLESS_REQUESTS_PER_DAY} requests a day without a key and reads keys from the x-api-key header. Logo.dev requires a token on every request, and its pk_ key is meant for client-side code.`
    },
    {
      feature: 'Brand colors',
      href: '/docs/api/parameters/palette',
      microlink: 'palette=true, same call',
      logodev: 'Brand API, secret key',
      highlight: true,
      note: 'Microlink adds palette, background_color, color and alternative_color to the logo it returns. Logo.dev lists colors in its brand profile at api.logo.dev/v2/brands, which needs a secret key.'
    },
    {
      feature: 'Page metadata in the same call',
      href: '/metadata',
      microlink: true,
      logodev: false,
      note: 'Title, description, image, author, date and publisher come back with the logo.'
    },
    {
      feature: 'Screenshot, PDF or Markdown in the same call',
      href: '/screenshot',
      microlink: true,
      logodev: false
    },
    {
      feature: 'Original file format',
      microlink: 'As published, SVG included',
      logodev: 'JPG, PNG, WebP',
      note: 'Logo.dev does not serve SVG. Microlink returns the file the site serves.'
    },
    {
      feature: 'Resize, retina, greyscale, dark theme',
      microlink: false,
      logodev: true,
      note: 'Logo.dev takes size, width, height, retina, greyscale and theme as query parameters. Microlink returns the logo as the site publishes it.'
    },
    {
      feature: 'When no logo exists',
      microlink: 'Favicon, then null',
      logodev: 'Monogram, or 404',
      note: 'Logo.dev generates a monogram by default, and fallback=404 turns that off.'
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day`,
      logodev: '500,000 images a month',
      highlight: true,
      note: `The free Microlink API key covers ${FREE_PLAN_REQUESTS_PER_DAY} requests every day, ${FREE_PLAN_CONCURRENT_REQUESTS} at a time, with no card. Logo.dev Community covers 500,000 logo CDN requests a month and needs a link back to Logo.dev on commercial projects.`
    },
    {
      feature: 'First paid plan',
      href: '/pricing',
      microlink: '$49 for 46,000',
      logodev: '$33 for 1,000,000',
      note: 'Microlink bills one request per call at $1.07 per 1,000, and a cache hit is free. Logo.dev Startup is $33 a month for 1,000,000 logo CDN requests.'
    }
  ],
  note: 'Last verified: November 2026. Check each product’s docs for the latest.'
}

export const PRICING_CAPTION = (
  <Text>
    One price per 1,000 requests on every tier, and one quota behind every
    product. A request returns the <Link href='/logo'>logo</Link>, its palette
    and the page <Link href='/metadata'>metadata</Link> together, and a cached
    response costs nothing.
  </Text>
)

export const CTA = {
  caption:
    'Paste the domain your logo.clearbit.com tag used to point at and see what comes back.',
  cta: 'alternative-clearbit:footer-cta',
  links: [
    { href: '/logo', label: 'See the logo API' },
    { href: '/docs/api/parameters/embed', label: 'Read the embed docs' }
  ]
}

export const HONESTY = {
  title: (
    <>
      When a <GradientText>logo CDN is the better pick</GradientText>.
    </>
  ),
  caption:
    'Microlink reads the logo off the live site. Logo.dev and Brandfetch serve logos from their own catalogs, and for these jobs that is the better shape.',
  items: [
    {
      title: 'A key that lives in the image URL',
      description: `Logo.dev puts a publishable pk_ token in the img src, safe in client code, and its free plan covers 500,000 images a month. Brandfetch takes a client ID in the URL. Microlink reads keys from a header, so a public page either stays within ${KEYLESS_REQUESTS_PER_DAY} keyless requests a day or resolves logos on a server.`
    },
    {
      title: 'Logos by name, ticker or ISIN',
      description:
        'Logo.dev resolves a brand name, a stock ticker, a crypto symbol or an ISIN. Brandfetch takes tickers, ISINs and crypto symbols too. Microlink needs a URL to render.'
    },
    {
      title: 'Uniform images in a grid',
      description:
        'Logo.dev resizes, adds retina, greyscale and a dark theme from query parameters. Brandfetch serves icon, symbol and logo variants with light and dark themes. Microlink returns whatever file the site publishes, in its own proportions.'
    },
    {
      title: 'Millions of impressions a month',
      description:
        'Logo.dev Startup is $33 a month for 1,000,000 images, and Brandfetch publishes a fair use limit of 1,000,000 requests a month on its free plan, for logos hotlinked from an img tag. Microlink starts at $49 for 46,000 requests, priced for work that reads the page.'
    }
  ]
}

export const FAQ_CAPTION =
  'What happened to logo.clearbit.com, and what replaces the image tag that broke.'

export const FAQ_ITEMS = [
  {
    question: 'When did the Clearbit Logo API shut down?',
    text: `On ${CLEARBIT_SHUTDOWN_DATE}. HubSpot, which owns Clearbit, deprecated the free logo.clearbit.com endpoint in 2025, ran a planned 24-hour outage on November 12, 2025, and turned it off for good on ${CLEARBIT_SHUTDOWN_DATE}. An earlier notice gave December 1, 2025; the later notice moved it to December 8. Requests to logo.clearbit.com no longer return logos.`,
    answer: (
      <div>
        On {CLEARBIT_SHUTDOWN_DATE}. HubSpot, which owns Clearbit, deprecated
        the free logo.clearbit.com endpoint in 2025, ran a planned 24-hour
        outage on November 12, 2025, and turned it off for good on{' '}
        {CLEARBIT_SHUTDOWN_DATE}, as the{' '}
        <Link href={SOURCES.hubspot}>HubSpot developer changelog</Link> and the{' '}
        <Link href={SOURCES.clearbit}>Clearbit changelog</Link> record. An
        earlier notice gave December 1, 2025; the later notice moved it to
        December 8. Requests to logo.clearbit.com no longer return logos.
      </div>
    )
  },
  {
    question: 'What replaces logo.clearbit.com in an img tag?',
    text: `For a public page, resolve the logo on your server with your API key, store the file and serve it yourself, or point the img at unavatar.io/{domain} with a publishable token. To test, point the src at api.microlink.io with the site URL encoded in url and embed=logo.url added, for example ${microlinkLogoUrl(
      EXAMPLE_SITE
    )}. That URL returns the logo file itself, but without a key it answers ${KEYLESS_REQUESTS_PER_DAY} requests a day per visitor.`,
    answer: (
      <div>
        For a public page, resolve the logo on your server with your API key,
        store the file and serve it yourself, or point the <code>img</code> at{' '}
        <Link href={SOURCES.unavatar}>unavatar.io</Link>/{'{domain}'} with a
        publishable token. To test, point the <code>src</code> at
        api.microlink.io with the site URL encoded in <code>url</code> and{' '}
        <Link href='/docs/api/parameters/embed'>embed=logo.url</Link> added, for
        example <code>{microlinkLogoUrl(EXAMPLE_SITE)}</code>. That URL returns
        the logo file itself, but without a key it answers{' '}
        {KEYLESS_REQUESTS_PER_DAY}&nbsp;requests a day per visitor.
      </div>
    )
  },
  {
    question: 'Is Logo.dev the official Clearbit replacement?',
    text: 'HubSpot recommends it in its sunset notice, and Logo.dev says the team that built the Clearbit Logo API builds it. It keeps the closest URL shape: change the host to img.logo.dev and add a publishable token. Clearbit itself pointed paying customers to its authenticated Company Enrichment and Name to Domain APIs, which return a logo field.',
    answer: (
      <div>
        HubSpot recommends it in its sunset notice, and Logo.dev says the team
        that built the Clearbit Logo API builds it. It keeps the closest URL
        shape: change the host to img.logo.dev and add a publishable token, as
        its <Link href={SOURCES.logoDevMigration}>migration guide</Link> shows.
        Clearbit itself pointed paying customers to its authenticated Company
        Enrichment and Name to Domain APIs, which return a logo field.
      </div>
    )
  },
  {
    question: 'Can I get the brand colors with the logo?',
    text: 'Yes. Add palette=true and the logo gains a palette array ordered from most dominant color to least, plus background_color, color and alternative_color picked for WCAG contrast. It is the same request, at the same price.',
    answer: (
      <div>
        Yes. Add <Link href='/docs/api/parameters/palette'>palette=true</Link>{' '}
        and the logo gains a palette array ordered from most dominant color to
        least, plus background_color, color and alternative_color picked for
        WCAG contrast. It is the same request, at the same price. See{' '}
        <Link href='/use-cases/website-metadata/brand-colors'>
          brand colors from any website
        </Link>
        .
      </div>
    )
  },
  {
    question: 'Do I need an API key?',
    text: `Not to try it: ${KEYLESS_REQUESTS_PER_DAY} requests a day need no key. The free API key covers ${FREE_PLAN_REQUESTS_PER_DAY} requests a day, ${FREE_PLAN_CONCURRENT_REQUESTS} at a time, with no card. Keys go in the x-api-key header, so for a public page, resolve the logo on your server and store the image file, or put the key behind a proxy.`,
    answer: (
      <div>
        Not to try it: {KEYLESS_REQUESTS_PER_DAY}&nbsp;requests a day need no
        key. The free API key covers {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests
        a day, {FREE_PLAN_CONCURRENT_REQUESTS} at a time, with no card. Keys go
        in the x-api-key header, so for a public page, resolve the logo on your
        server and store the image file, or put the key behind a{' '}
        <Link href='/docs/api/basics/authentication'>proxy</Link>.
      </div>
    )
  },
  {
    question: 'What happens when a site has no logo?',
    text: 'Microlink checks the page markup first, then the BIMI record in DNS, then the favicon, so nearly every site returns something. When none exists, data.logo is null and you render your own placeholder. Logo.dev generates a monogram instead unless fallback=404 is set.',
    answer: (
      <div>
        Microlink checks the page markup first, then the{' '}
        <Link href='/blog/brand-logos-are-hiding-in-dns'>
          BIMI record in DNS
        </Link>
        , then the favicon, so nearly every site returns something. When none
        exists, <code>data.logo</code> is null and you render your own
        placeholder. Logo.dev generates a monogram instead unless{' '}
        <code>fallback=404</code> is set.
      </div>
    )
  },
  {
    question: 'Is there a Microlink option that keeps a plain image URL?',
    text: 'unavatar.io, built by the Microlink team, resolves a domain such as unavatar.io/reddit.com to a logo from BIMI, DuckDuckGo, Google and Microlink, and takes a publishable pk_ token in img tags. Anonymous requests get a small daily allowance per IP, and free plans need an attribution link.',
    answer: (
      <div>
        <Link href={SOURCES.unavatar}>unavatar.io</Link>, built by the Microlink
        team, resolves a domain such as unavatar.io/reddit.com to a logo from
        BIMI, DuckDuckGo, Google and Microlink, and takes a publishable{' '}
        <code>pk_</code> token in img tags. Anonymous requests get a small daily
        allowance per IP, and free plans need an attribution link.
      </div>
    )
  }
]

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: META.title,
    description: META.description,
    url: PAGE_URL,
    about: {
      '@type': 'Thing',
      name: 'Clearbit Logo API',
      sameAs: 'https://clearbit.com'
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      keywords: [
        'clearbit logo api alternative',
        'logo.clearbit.com replacement',
        'clearbit logo api shutdown',
        'company logo api',
        'brand colors api'
      ],
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io/logo',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        url: 'https://microlink.io/pricing'
      }
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

export const TRADEMARKS =
  'Clearbit, HubSpot, Logo.dev and Brandfetch are trademarks of their respective owners. Microlink is not affiliated with or endorsed by them. Competitor details come from their public pages and may have changed since they were checked.'
