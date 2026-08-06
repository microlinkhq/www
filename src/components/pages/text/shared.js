import React from 'react'
import { colors } from 'theme'
import {
  AlignLeft as AlignLeftIcon,
  Cpu as CpuIcon,
  Scissors as ScissorsIcon,
  Layers as LayersIcon,
  Zap as ZapIcon,
  FileText as FileTextIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.orange6
export const TILE_BG = colors.orange0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.orange9} 0%,
  ${colors.orange9} 48%,
  ${colors.orange8} 48%,
  ${colors.orange8} 52%,
  ${colors.orange7} 52%,
  ${colors.orange7} 65%,
  ${colors.yellow7} 65%,
  ${colors.yellow7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Readable text API for developers',
  description:
    'Turn any URL into clean, LLM-ready plain text. Navigation, ads, cookie banners and boilerplate stripped out — just the words that matter.',
  ctaHref: '/docs/api/parameters/data',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://stripe.com/blog/payment-api-design',
    data: { text: { attr: 'text' } },
    meta: false
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the readable text back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'Content, not chrome.',
  caption:
    'Feeding raw HTML to a model burns tokens on navigation, scripts and footers. Microlink renders the page, isolates the main content, and returns text you can embed or prompt with directly.',
  items: [
    {
      icon: ScissorsIcon,
      title: 'Boilerplate removed',
      description:
        'Headers, sidebars, cookie notices, share widgets and footers are dropped. What is left is the article, the docs page, or the product copy.'
    },
    {
      icon: CpuIcon,
      title: 'Rendered before extraction',
      description:
        'Content injected by JavaScript is captured too, so client-rendered blogs and docs sites return their real text rather than an empty shell.'
    },
    {
      icon: ZapIcon,
      title: 'Fewer tokens per page',
      description:
        'Plain text is a fraction of the size of the source HTML, which cuts both the cost and the latency of every downstream model call.'
    },
    {
      icon: FileTextIcon,
      title: 'Works on documents too',
      description: (
        <>
          PDFs, Word files and slide decks resolve to text through the same
          endpoint — see <Link href='/file-conversion'>file conversion</Link>.
        </>
      )
    },
    {
      icon: LayersIcon,
      title: 'Structure when you want it',
      description: (
        <>
          Need headings and links preserved? Ask for{' '}
          <Link href='/markdown'>markdown</Link> instead, or request both in the
          same call.
        </>
      )
    },
    {
      icon: AlignLeftIcon,
      title: 'Cached and proxied',
      description: (
        <>
          <Link href='/features/ttl'>Configurable TTL</Link> makes repeat reads
          free, and <Link href='/features/proxy'>proxy resolution</Link> gets
          you into sites that block plain fetches.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The readable text API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The readable text API is free to use, with no account and no credit card. Point it at a URL and start feeding clean content to your models.',
  ctaHref: '/docs/api/parameters/data',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink readable text API.'

export const FAQ_ITEMS = [
  {
    question: 'What exactly gets removed from the page?',
    text: 'Navigation bars, sidebars, cookie and consent banners, advertising slots, share widgets, related-content modules and footers. What remains is the main content of the page — the article body, documentation section or product description.'
  },
  {
    question: 'Should I use text or markdown?',
    text: 'Use text when you want the smallest possible payload for embeddings, classification or summarisation. Use markdown when the structure matters — headings, lists, links and code blocks are preserved so a model can follow the document hierarchy.',
    answer: (
      <>
        <div>
          Use text when you want the smallest possible payload for embeddings,
          classification or summarisation.
        </div>
        <div>
          Use <Link href='/markdown'>markdown</Link> when structure matters —
          headings, lists, links and code blocks are preserved so a model can
          follow the document hierarchy. You can request both in one call.
        </div>
      </>
    )
  },
  {
    question: 'Does it work on JavaScript-rendered sites?',
    text: 'Yes. Every request runs in a real browser, so content injected after load is present before the text is extracted. Client-rendered blogs, docs sites and single-page apps all return their actual content.'
  },
  {
    question: 'Can I extract text from a PDF or a Word document?',
    text: 'Yes. Point the API at a document URL and it is converted before extraction, so PDFs, Word files, spreadsheets and slide decks all resolve to plain text through the same endpoint.'
  },
  {
    question: 'How much does this reduce token usage?',
    text: 'It depends on the page, but plain text is typically a small fraction of the source HTML, since markup, scripts, styles and navigation are all discarded. That reduction applies to every model call you make with the content.'
  },
  {
    question: 'What happens when a site blocks the request?',
    text: 'Enable proxy resolution to route through residential IPs, and antibot detection will tell you which provider blocked a request if one still does. Both work on the same call that returns the text.'
  }
]

export const META = {
  title: 'URL to Text API - Clean, LLM-Ready Page Content',
  description:
    'Extract clean, readable plain text from any URL. Boilerplate removed, JavaScript rendered, documents supported. Built for LLM pipelines. 25 free requests/day.',
  structuredName: 'Microlink Text API',
  structuredDescription:
    'A developer-first API that extracts clean, readable plain text from any URL or document, with boilerplate removal, full JavaScript rendering, residential proxy resolution and global edge caching.',
  keywords: [
    'url to text api',
    'webpage to text api',
    'html to text api',
    'llm ready text extraction',
    'readable content api',
    'boilerplate removal api'
  ],
  about: [
    {
      name: 'Plain text',
      sameAs: 'https://en.wikipedia.org/wiki/Plain_text'
    },
    {
      name: 'Information extraction',
      sameAs: 'https://en.wikipedia.org/wiki/Information_extraction'
    },
    {
      name: 'Large language model',
      sameAs: 'https://en.wikipedia.org/wiki/Large_language_model'
    }
  ]
}
