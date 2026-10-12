import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory'

export const ACCENT_NAME = 'teal'
export const ACCENT = colors.teal7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.teal9} 0%,
  ${colors.teal9} 48%,
  ${colors.teal8} 48%,
  ${colors.teal8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.cyan7} 65%,
  ${colors.cyan7} 79%,
  ${colors.cyan6} 79%,
  ${colors.cyan6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/jina-reader'

const JINA_READER = 'https://jina.ai/reader'
const JINA_READER_REPO = 'https://github.com/jina-ai/reader'

export const META = {
  title: 'Jina Reader Alternative That Bills Per Request',
  description:
    'A Jina Reader alternative that bills one request per call, not output tokens, and returns markdown, screenshot, PDF and metadata in one response.'
}

export const HERO = {
  title: 'The Jina Reader alternative that bills per request',
  description: (
    <Text as='span'>
      Jina Reader meters the tokens it hands back, so a long page costs more
      than a short one, and one call returns one shape of that page. Microlink
      counts one request per call at the same price on every plan, and that
      single response carries the markdown, the screenshot, the PDF and the page
      metadata together.
    </Text>
  ),
  cta: 'alternative-jina-reader:hero',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/guides/content-conversion/url-to-markdown',
  secondaryLabel: 'Read the Markdown guide',
  mqlCode: {
    url: 'https://stripe.com/blog/payment-api-design',
    screenshot: true,
    data: { markdown: { attr: 'markdown' } }
  }
}

export const TIMINGS = {
  title: 'One request',
  subtitle: 'Every format in the response',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 metadata' },
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const SHAPES = {
  title: (
    <>
      One response, <GradientText>not one shape per call</GradientText>.
    </>
  ),
  caption: (
    <>
      Reader picks the output with an <code>X-Respond-With</code> header, and
      that header takes a single value: markdown, html, text, screenshot or
      pageshot. Every other representation of the same URL is another call.
      Microlink takes the formats as request parameters, so they come back in
      the same JSON.
    </>
  ),
  columns: ['What you need back', 'Jina Reader', 'Microlink'],
  rows: [
    {
      id: 'markdown',
      need: 'Markdown of the page',
      jina: 'X-Respond-With: markdown',
      microlink: 'data.markdown.attr=markdown'
    },
    {
      id: 'html',
      need: 'The rendered HTML',
      jina: 'X-Respond-With: html, a second call',
      microlink: 'Same response'
    },
    {
      id: 'screenshot',
      need: 'A screenshot',
      jina: 'X-Respond-With: screenshot, a third call',
      microlink: 'screenshot=true, same response'
    },
    {
      id: 'pdf',
      need: 'A PDF of the page',
      jina: 'Not documented',
      microlink: 'pdf=true, same response'
    },
    {
      id: 'metadata',
      need: 'Title, author, date, logo, publisher',
      jina: 'url, title, content, timestamp',
      microlink: 'Normalized, same response'
    },
    {
      id: 'total',
      need: 'Calls to collect all of it',
      jina: '3 or more',
      microlink: '1',
      highlight: true
    }
  ],
  footnote: (
    <>
      Reader values are the ones published in the{' '}
      <Link href={JINA_READER_REPO}>Reader repository</Link> and on{' '}
      <Link href={JINA_READER}>jina.ai/reader</Link>; the JSON fields are the
      ones that page lists for its JSON mode. The Microlink column is the
      request in the{' '}
      <Link href='/docs/guides/content-conversion/url-to-markdown'>
        URL to Markdown guide
      </Link>{' '}
      with <code>screenshot</code> and <code>pdf</code> added to it.
    </>
  )
}

export const COMPARISON = {
  title: (
    <>
      <GradientText>Capability by capability</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      Both services render a URL in a real browser and return clean markdown for
      an LLM. The differences are what a call is billed for, what else comes
      back with it, and how long a response can be reused. Every Reader row
      comes from <Link href={JINA_READER}>jina.ai/reader</Link> or the{' '}
      <Link href={JINA_READER_REPO}>Reader repository</Link>, the last three
      included, where Reader does things Microlink does not.
    </>
  ),
  columns: ['Microlink', 'Jina Reader'],
  rows: [
    {
      feature: 'Billing unit',
      href: '/pricing',
      microlink: '1 request',
      jina: 'Output tokens',
      highlight: true,
      note: 'Microlink is $1.07 per 1,000 requests on every self-serve Pro plan, from $49 for 46,000 to $450 for 420,000. Reader charges for the tokens in the response, so the same page costs more when it is longer, and its jina-ocr-v1 option costs 40× more tokens.'
    },
    {
      feature: 'Formats in one response',
      href: '/formats',
      microlink: 'Markdown, HTML, screenshot, PDF, metadata',
      jina: 'One per call',
      highlight: true,
      note: 'X-Respond-With takes a single value. A Microlink request accepts the formats as parameters and returns them together.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: '1 minute to 31 days',
      jina: '5 minutes',
      highlight: true,
      note: 'Microlink cache hits are free and fast, and ttl is settable with any API key. Reader serves the same URL from cache for 5 minutes, with X-No-Cache and X-Cache-Tolerance to control reuse.'
    },
    {
      feature: 'Requests per minute',
      href: '/docs/api/basics/rate-limit',
      microlink: 'No throttling',
      jina: '20 to 5,000',
      highlight: true,
      note: 'Microlink runs as many parallel requests as the monthly quota allows. Reader publishes 20 RPM without a key and 5,000 RPM on its premium key.'
    },
    {
      feature: 'Page metadata',
      href: '/metadata',
      microlink: true,
      jina: 'url, title, content, timestamp',
      note: 'Title, description, author, date, logo, image, publisher and brand palette, normalized across sites.'
    },
    {
      feature: 'PDF of the page',
      href: '/pdf',
      microlink: true,
      jina: false,
      note: 'pdf=true on any Microlink request. Reader parses PDFs it reads, but documents no PDF output of its own.'
    },
    {
      feature: 'Screenshot controls',
      href: '/screenshot',
      microlink: 'Device, viewport, full page, element',
      jina: 'A URL to a screenshot',
      note: 'Reader returns a screenshot (or a full-page pageshot) with no documented device or viewport options.'
    },
    {
      feature: 'Lighthouse and technology detection',
      href: '/insights',
      microlink: true,
      jina: false
    },
    {
      feature: 'Markdown from PDFs and office files',
      href: '/use-cases/website-to-markdown/documents',
      microlink: true,
      jina: true,
      note: 'Microlink converts a PDF, docx, xlsx or pptx URL to a DOM at fetch time. Reader parses PDFs with PDF.js and also accepts an uploaded file.'
    },
    {
      feature: 'Structured extraction',
      href: '/features/scraping',
      microlink: 'Typed JSON fields',
      jina: 'Selector for the content',
      note: 'Microlink takes declarative CSS and regex rules and returns typed fields. Reader uses X-Target-Selector to narrow the page before converting it.'
    },
    {
      feature: 'Proxy for blocked targets',
      href: '/features/proxy',
      microlink: 'Managed, any API key',
      jina: 'Bring your own',
      note: 'A managed residential proxy comes with every Microlink API key, the free one included. Reader forwards requests through the proxy URL you pass in X-Proxy-Url.'
    },
    {
      feature: 'Antibot reporting',
      href: '/features/antibot',
      microlink: true,
      jina: false,
      note: 'Microlink names the provider that blocked a request across 30+ antibot and CAPTCHA vendors.'
    },
    {
      feature: 'Search results',
      href: '/search',
      microlink: true,
      jina: true,
      note: 'Microlink Search comes with every API key, the free one included. Reader search needs a key and bills a fixed amount per request, starting from 10,000 tokens, for the top five results.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: true,
      jina: true
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: '100/month',
      jina: '10M tokens, 20 RPM keyless',
      highlight: true,
      note: 'The free Microlink API key renews 100 requests every month with no card and every Pro feature. Every new Reader key comes with 10M free tokens, and Reader answers without a key at 20 RPM.'
    },
    {
      feature: 'Token trimming and chunking',
      microlink: false,
      jina: true,
      note: 'X-Max-Tokens trims the response, X-Token-Budget rejects a page over budget, X-Markdown-Chunking splits it by heading.'
    },
    {
      feature: 'Generated alt text for images',
      microlink: false,
      jina: true,
      note: 'X-With-Generated-Alt captions images with a vision model.'
    },
    {
      feature: 'Upload a file instead of a URL',
      microlink: false,
      jina: true,
      note: 'A local PDF or office file can be posted to the Reader file body field. Microlink needs a URL it can fetch.'
    }
  ],
  note: 'Last verified: October 2026. Check each product’s docs for the latest.'
}

export const PRICING_CAPTION = (
  <Text>
    One price per 1,000 requests on every tier, and one quota behind every
    product. Spend it on <Link href='/markdown'>Markdown</Link>, screenshots,
    PDFs or <Link href='/search'>Search</Link> in whatever mix the month needs.
    A page that returns 200 words and a page that returns 20,000 cost the same.
  </Text>
)

export const CTA = {
  caption:
    'Point a request at the URL you read through Reader this morning and compare the response. The free API key covers the first 100 calls a month.',
  cta: 'alternative-jina-reader:footer-cta',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/guides/content-conversion/url-to-markdown',
  secondaryLabel: 'Read the Markdown guide',
  badges: ['One request per call', 'Markdown, PDF, screenshot', 'No token math']
}

export const HONESTY = {
  title: (
    <>
      Where <GradientText>Reader is the better tool</GradientText>.
    </>
  ),
  caption:
    'Four jobs Reader does that Microlink does not, taken from its own documentation.',
  items: [
    {
      title: 'Nothing to sign up for',
      body: 'Reader answers a prefixed URL with no API key at 20 requests a minute, and every new key comes with 10M free tokens. Microlink needs a signup, and the free key renews 100 requests a month.'
    },
    {
      title: 'Markdown sized for a context window',
      body: 'X-Max-Tokens trims the response, X-Token-Budget refuses a page that would blow the budget, X-Markdown-Chunking splits by heading, and the link and image summaries collapse the rest. Microlink returns the whole document and leaves the budget to you.'
    },
    {
      title: 'Files without a public URL',
      body: 'A local PDF or office file can be posted straight to the Reader file body field, and jina-ocr-v1 reads a scan at 40× the tokens. Microlink converts the same file types, but only from a URL it can fetch.'
    },
    {
      title: 'Images described, not just linked',
      body: 'X-With-Generated-Alt captions images with a vision model, so a model reads what is in them. Microlink returns the image URLs and leaves captioning to you.'
    }
  ]
}

export const FAQ_CAPTION =
  'What a call costs, what comes back in it, and what happens to the code calling r.jina.ai today.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for r.jina.ai?',
    text: 'No. Reader is a URL prefix with its options in request headers; Microlink is an API endpoint with query parameters and an SDK. The migration is usually one module: the prefixed URL becomes api.microlink.io with url and data.markdown.attr=markdown, X-Target-Selector becomes a selector on that field, X-Timeout becomes timeout and X-Proxy-Url becomes proxy. The converted page arrives in data.markdown instead of the response body.',
    answer: (
      <div>
        No. Reader is a URL prefix with its options in request headers.
        Microlink is an API endpoint with query parameters and an{' '}
        <Link href='/integrations/sdk'>SDK</Link>. The migration is usually one
        module: the prefixed URL becomes a request with <code>url</code> and{' '}
        <code>data.markdown.attr=markdown</code>, <code>X-Target-Selector</code>{' '}
        becomes a selector on that field, <code>X-Timeout</code> becomes{' '}
        <code>timeout</code> and <code>X-Proxy-Url</code> becomes{' '}
        <code>proxy</code>. The converted page arrives in{' '}
        <code>data.markdown</code> instead of the response body.
      </div>
    )
  },
  {
    question: 'Does Microlink charge by tokens?',
    text: 'No. Microlink bills one request per API call, at $1.07 per 1,000 requests on every self-serve Pro plan, from $49 for 46,000 to $450 for 420,000. A 200-word page and a 20,000-word page cost the same one request, and a cache hit costs nothing at all. Reader bills the tokens its response contains, so page length decides the invoice.',
    answer: (
      <div>
        No. Microlink bills one request per API call, at $1.07 per 1,000
        requests on every self-serve <Link href='/pricing'>Pro plan</Link>, from
        $49 for 46,000 to $450 for 420,000. A 200-word page and a 20,000-word
        page cost the same one request, and a{' '}
        <Link href='/features/ttl'>cache hit</Link> costs nothing at all. Reader
        bills the tokens its response contains, so page length decides the
        invoice.
      </div>
    )
  },
  {
    question: 'Can Microlink read a PDF or a Word file as Markdown?',
    text: 'Yes. Point url at a PDF, docx, xlsx or pptx file and Microlink converts it to an HTML DOM at fetch time, so the same markdown request returns readable Markdown. The file has to live at a URL Microlink can fetch; Reader also accepts a file uploaded in the request body.',
    answer: (
      <div>
        Yes. Point the request at a PDF, docx, xlsx or pptx file and Microlink
        converts it to an HTML DOM at fetch time, so the same{' '}
        <Link href='/use-cases/website-to-markdown/documents'>
          Markdown request
        </Link>{' '}
        returns readable Markdown. The file has to live at a URL Microlink can
        fetch; Reader also accepts a file uploaded in the request body.
      </div>
    )
  },
  {
    question: 'What are the rate limits?',
    text: 'Microlink applies no throttling: you can run as many parallel requests as your monthly quota allows, and the quota is the only ceiling. Reader publishes 20 requests per minute without an API key and 5,000 per minute on its premium key.',
    answer: (
      <div>
        Microlink applies no throttling: run as many parallel requests as the
        monthly <Link href='/docs/api/basics/rate-limit'>quota</Link> allows,
        and the quota is the only ceiling. Reader publishes 20 requests per
        minute without an API key and 5,000 per minute on its premium key.
      </div>
    )
  },
  {
    question: 'Is there a search API like s.jina.ai?',
    text: 'Yes. Microlink Search returns Google results as JSON and comes with every API key, the free one included, drawing on the same request quota as every other product. Reader search needs a key, is blocked without one, and bills a fixed amount per request starting from 10,000 tokens for the top five results.',
    answer: (
      <div>
        Yes. <Link href='/search'>Microlink Search</Link> returns Google results
        as JSON and comes with every API key, the free one included, drawing on
        the same request quota as every other product. Reader search needs a
        key, is blocked without one, and bills a fixed amount per request
        starting from 10,000 tokens for the top five results.
      </div>
    )
  },
  {
    question: 'Is the free API key enough to evaluate it?',
    text: 'It covers 100 requests a month with every Pro feature included: markdown, screenshot, PDF, metadata, search, insights, the SDK, the edge cache, the residential proxy and adblock. No credit card, and the allowance renews monthly, so an evaluation never runs out mid-test.',
    answer: (
      <div>
        It covers 100&nbsp;requests a month with every Pro feature included:
        markdown, screenshot, PDF, metadata, search,{' '}
        <Link href='/insights'>insights</Link>, the SDK, the edge cache, the
        residential <Link href='/features/proxy'>proxy</Link> and adblock. No
        credit card, and the allowance renews monthly, so an evaluation never
        runs out mid-test.
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
      name: 'Jina Reader',
      sameAs: JINA_READER
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      keywords: [
        'jina reader alternative',
        'r.jina.ai alternative',
        'url to markdown api',
        'markdown api for llm'
      ],
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io/markdown',
      offers: {
        '@type': 'Offer',
        price: '39',
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
