import React, { useState, useCallback, useEffect } from 'react'
import { SECTION_VERTICAL_SPACING, colors, theme } from 'theme'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import { Capabilities } from 'components/pages/markdown/capabilities'
import { Clients } from 'components/pages/markdown/clients'
import { CodeExample } from 'components/pages/markdown/code-example'
import { CallToAction } from 'components/pages/markdown/cta'
import { Hero } from 'components/pages/markdown/hero'
import { Playground } from 'components/pages/markdown/playground'
import { Pricing } from 'components/pages/markdown/pricing'
import { ProductInformation } from 'components/pages/markdown/product-information'
import { HERO_LAYOUT, Subhead } from 'components/pages/markdown/shared'
import { Timings } from 'components/pages/markdown/timings'
import { TokenSavings } from 'components/pages/markdown/token-savings'

const REPOS = ['browserless', 'html-get', 'metascraper']

const FEATURES = [
  {
    title: 'Token Efficient by Default',
    description:
      'Return clean markdown instead of HTML noise so your agents spend context budget on meaning, not markup. 80% fewer tokens on average.'
  },
  {
    title: 'Works on Any Website',
    description:
      'Our HTML to markdown converter processes any public URL without the target site needing CDN opt-in or special configuration. The entire web is your dataset.'
  },
  {
    title: 'Built for Agent Workloads',
    description:
      'Purpose-built for AI crawling, summarization, RAG indexing, LangChain, LlamaIndex, and large-scale LLM data preparation.'
  },
  {
    title: 'Streaming Friendly',
    description:
      'Compact markdown payloads move cleanly through queues, workers, and inference services with lower latency than HTML.'
  },
  {
    title: 'Metadata Included',
    description:
      'Pair markdown content with structured metadata — title, description, author, date — for better chunking, ranking, and traceability.'
  },
  {
    title: 'Fast Integration',
    description:
      'Ship quickly from browser demos, server workers, or SDK clients. One URL in, clean markdown out. Minimal glue code.'
  },
  {
    title: 'Flexible Scope Control',
    description:
      'Extract the whole page, narrow to a CSS selector like main or article, or combine multiple selectors with fallback arrays for precise content targeting.'
  },
  {
    title: 'YAML Frontmatter',
    description:
      'Enable the meta parameter to prepend structured YAML frontmatter — title, author, date, description — for downstream chunking and traceability.'
  },
  {
    title: 'Shortcut Endpoint',
    description:
      'Skip the full API call. Use markdown.microlink.io/{url} for direct markdown output — ideal for quick scripts, curl one-liners, and pipeline prototyping.'
  }
]

export const Head = () => (
  <Meta
    title='URL to Markdown API — Free, no login required'
    description='Convert any web page to clean markdown. Built for AI agents, RAG pipelines, and LLM ingestion reducing token usage by 80%. No login required.'
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/markdown',
          name: 'Microlink URL to Markdown API',
          description:
            'Free URL to markdown API — convert any web page to clean markdown with 80% fewer tokens than raw HTML. Purpose-built for AI agents, RAG ingestion, and LLM content processing at scale.',
          url: 'https://microlink.io/markdown',
          applicationCategory: ['DeveloperApplication', 'WebAPI'],
          operatingSystem: 'Web, Platform-Agnostic',
          provider: {
            '@type': 'Organization',
            '@id': 'https://microlink.io/about',
            name: 'Microlink',
            url: 'https://microlink.io'
          },
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://microlink.io',
            url: 'https://microlink.io',
            name: 'Microlink'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description:
              'Free tier available for experimentation, 25 requests per day. Pro plans scale for high concurrency.'
          },
          keywords:
            'url to markdown api, url to markdown free, web to markdown api, html to markdown api, url to markdown service, markdown for AI agents, RAG ingestion, LLM preprocessing, token-efficient content',
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: {
              '@type': 'https://schema.org/LikeAction'
            },
            userInteractionCount: getRepoStars(REPOS[1]),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: `https://github.com/microlinkhq/${REPOS[1]}`
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'HTML to Markdown Conversion',
              sameAs: 'https://en.wikipedia.org/wiki/Markdown'
            },
            {
              '@type': 'Thing',
              name: 'Application Programming Interface',
              sameAs: 'https://en.wikipedia.org/wiki/API'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://microlink.io/markdown#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Microlink Markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Microlink Markdown is an extraction API that takes any URL and returns clean markdown content ready for AI workflows. It is built on the same Microlink API surface your team already uses for metadata, screenshots, and PDFs. Use it for crawling, summarization, and RAG ingestion where clean text beats noisy HTML.'
              }
            },
            {
              '@type': 'Question',
              name: 'Why do AI agents prefer markdown over HTML?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'HTML pages are padded with navigation bars, script tags, class attributes, and styling that carry zero semantic value for AI. Markdown’s explicit structure lets AI models focus on meaning, not markup, which improves comprehension and reduces LLM API costs at scale. You can further tune extraction with CSS selector scoping to target only the content your agents need.'
              }
            },
            {
              '@type': 'Question',
              name: 'How much do I save on tokens by converting to markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'On average, markdown reduces token usage by 80% compared to raw HTML. A page costing 20,000 tokens as HTML costs around 4,000 tokens as markdown. Giving you 5x more content per context window. This directly lowers your LLM API costs and increases how much information you can process per request.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does it work on any website?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Microlink extracts markdown from any public URL. The target website does not need to natively serve markdown or have any special CDN or server-level configuration. Unlike solutions that require opt-in at the infrastructure layer, Microlink works on the entire web immediately.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I control what content is extracted?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Use the selector parameter to target specific DOM elements — narrow to main, article, or any CSS selector. You can also use fallback arrays that try selectors in order. Omit the selector entirely to convert the whole page, or combine multiple fields to extract different sections of the same page in a single API call.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I get metadata alongside the markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Set meta: true to prepend a YAML frontmatter block with normalized metadata — title, description, author, publisher, date, word count, and reading time. This structure supports LLM and RAG pipelines by providing source context without additional requests.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I integrate it?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In minutes. Visit our documentation for interactive playground examples, official SDKs (Node.js, Python, Ruby, Go), and copy-paste code snippets. Or use the shortcut endpoint markdown.microlink.io/{url} for the simplest possible integration — just an HTTP GET.'
              }
            },
            {
              '@type': 'Question',
              name: 'Where can I see all parameters?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Visit the Microlink API documentation for parameter details, request examples, and SDK usage guides. Key parameters include embed for raw markdown output, ttl for cache control, and the data extraction rules for CSS selector scoping.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is the URL to markdown API free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The URL to markdown API is free to use with 25 requests per day — no login, no credit card, and no setup required. Just call the endpoint and get clean markdown back. For production workloads that need higher volume, automatic proxy rotation, and priority support, see our Pro plans.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is a URL to markdown service and how does it work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A URL to markdown service takes any web page URL as input, fetches the page with a full headless browser, strips away HTML noise (ads, navigation, scripts), and returns clean, structured markdown text. Microlink’s URL to markdown API does this in a single REST call. The result is ready for AI agents, RAG pipelines, or any downstream text processing.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I convert a web page to markdown for AI or LLMs?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Send the page URL to the Microlink API with the markdown data extraction rule. The API renders the page, removes clutter, and returns clean markdown with up to 80% fewer tokens than raw HTML. You can also use the shortcut endpoint markdown.microlink.io/{url} for quick scripts and pipeline prototyping.'
              }
            }
          ]
        }
      ]
    }}
  />
)

const INITIAL_TIMING_MS = 14

const randomTimingMs = () => Math.floor(Math.random() * (25 - 14 + 1)) + 14

const MarkdownPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState('https://stripe.com')
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: 'https://stripe.com' }
  ])

  useEffect(() => {
    const ms = randomTimingMs()
    setTimingMs(prev => (prev === INITIAL_TIMING_MS ? ms : prev))
    setTimingHistory(prev =>
      prev.map(entry =>
        entry.ms === INITIAL_TIMING_MS ? { ...entry, ms } : entry
      )
    )
  }, [])

  const handleRequestTiming = useCallback((ms, url) => {
    setTimingMs(ms)
    setTimingUrl(url)
    setTimingHistory(prev => {
      const filtered = prev.filter(e => e.url !== url)
      return [{ ms, url }, ...filtered].slice(0, 20)
    })
  }, [])

  return (
    <Layout>
      <Hero onRequestTiming={handleRequestTiming} heroLayout={HERO_LAYOUT} />
      <Timings
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Capabilities />
      <CodeExample />
      <Clients />
      <Pricing />
      <OpenSource
        repos={REPOS}
        accent={colors.orange7}
        caption='The Microlink markdown engine is powered by battle-tested open source libraries used by thousands of developers worldwide. Explore the code, contribute, or run it yourself.'
      />
      <Playground />
      <TokenSavings />
      <Features
        css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
        title={
          <Subhead
            css={theme({
              width: '100%',
              textAlign: 'left'
            })}
          >
            The best URL to markdown service,{' '}
            <span
              css={theme({
                display: 'block',
                color: 'orange7',
                width: '100%',
                textAlign: 'left'
              })}
            >
              with no compromises.
            </span>
          </Subhead>
        }
        caption={
          <>
            No more custom scrapers or brittle parsing — our URL to markdown API
            lets you convert any web page to markdown with easy integration via
            the{' '}
            <Link href='/docs/guides/content-conversion/url-to-markdown'>
              URL to Markdown API documentation
            </Link>
            .
          </>
        }
        features={FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </Layout>
  )
}

export default MarkdownPage
