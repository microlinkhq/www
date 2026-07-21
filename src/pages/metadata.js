import React, { useState, useCallback, useEffect } from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import { Benchmark } from 'components/pages/metadata/benchmark'
import { Capabilities } from 'components/pages/metadata/capabilities'
import { Clients } from 'components/pages/metadata/clients'
import { CodeExample } from 'components/pages/metadata/code-example'
import { CallToAction } from 'components/pages/metadata/cta'
import { Hero } from 'components/pages/metadata/hero'
import { Playground } from 'components/pages/metadata/playground'
import { Pricing } from 'components/pages/metadata/pricing'
import {
  ProductInformation,
  TOP_FAQ_ITEMS
} from 'components/pages/metadata/product-information'
import { ACCENT, FIRST_URL, Subhead } from 'components/pages/metadata/shared'
import { Stack } from 'components/pages/metadata/stack'
import { Timings } from 'components/pages/metadata/timings'

const FEATURES = [
  {
    title: 'Unified Metadata Extraction',
    description:
      'Normalize Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and raw HTML tags into a single, predictable JSON response. One API call, every source merged.'
  },
  {
    title: 'Free to Start',
    description:
      'Extract metadata from any URL immediately. No setup fees, no credit card required, and pay-as-you-grow pricing that scales with your link preview and ingestion workloads.'
  },
  {
    title: 'Global Edge Delivery',
    description: `Metadata responses are cached and distributed across ${CDN_EDGES} edge locations powered by Cloudflare, ensuring sub-second link previews and feed ingestion worldwide.`
  },
  {
    title: 'Language-Agnostic REST API',
    description:
      'A single REST endpoint designed for developers. Integrate in minutes using official SDKs for Node.js, Python, Ruby, and Go, or any standard HTTP client.'
  },
  {
    title: 'Smart Color Palette Detection',
    description:
      'Extract brand palettes and dominant image colors automatically. Perfect for theming link previews, hero cards, and chat unfurls with zero manual art direction.'
  },
  {
    title: 'Rich Media & Provider Support',
    description:
      'Detect logos, favicons, videos, audio, and embeddable iframes across 250+ verified providers, from YouTube and Spotify to Figma and CodeSandbox.'
  },
  {
    title: 'JavaScript-Rendered Pages',
    description:
      'Full headless browser execution means React, Vue, and Next.js sites that inject meta tags at runtime are captured correctly every time — no stale SSR required.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live caching rules to keep your metadata fresh. Stay up to date with source changes while maintaining sub-second API performance at scale.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation packed with live code examples. Copy-paste ready snippets get you from URL to structured metadata in under a minute.'
  }
]

const REPOS = ['metascraper', 'browserless', 'sdk']

export const Head = () => (
  <Meta
    title='Website Metadata API. URL to Metadata & Link Preview'
    noSuffix
    description='Website metadata API - 25 req/day free - that turns any URL to metadata: Open Graph, JSON-LD, Twitter Cards, link preview & URL preview in one JSON call.'
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/metadata',
          name: 'Microlink Website Metadata API',
          alternateName: [
            'Website Metadata API',
            'URL to Metadata API',
            'Link Preview API'
          ],
          description:
            'Website metadata API that extracts unified structured data from any URL — link preview, URL preview, Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa and HTML tags merged into a single JSON response, with images, logos, favicons and color palettes included.',
          url: 'https://microlink.io/metadata',
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
            priceCurrency: 'EUR',
            description:
              'Free tier available (25 requests/day). Pro plans start at €39/month for production workloads.',
            url: 'https://microlink.io/pricing'
          },
          keywords: [
            'website metadata api',
            'metadata api',
            'url to metadata',
            'link to metadata',
            'link preview api',
            'link preview',
            'url preview',
            'open graph api',
            'json-ld api',
            'twitter cards api',
            'oembed api',
            'unified metadata',
            'structured data extraction',
            'sharing debugger'
          ],
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: {
              '@type': 'https://schema.org/LikeAction'
            },
            userInteractionCount: getRepoStars(REPOS[0]),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: 'https://github.com/microlinkhq/metascraper'
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'Open Graph protocol',
              sameAs:
                'https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol'
            },
            {
              '@type': 'Thing',
              name: 'Metadata',
              sameAs: 'https://en.wikipedia.org/wiki/Metadata'
            },
            {
              '@type': 'Thing',
              name: 'JSON-LD',
              sameAs: 'https://en.wikipedia.org/wiki/JSON-LD'
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
          '@id': 'https://microlink.io/metadata#faq',
          url: 'https://microlink.io/metadata',
          mainEntity: TOP_FAQ_ITEMS.map(({ question, text }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text
            }
          }))
        }
      ]
    }}
  />
)

const INITIAL_TIMING_MS = 14

const randomTimingMs = () => Math.floor(Math.random() * (25 - 14 + 1)) + 14

const MetaPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState(FIRST_URL)
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: FIRST_URL }
  ])
  const [currentUrl, setCurrentUrl] = useState(FIRST_URL)
  const [currentData, setCurrentData] = useState(null)

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

  const handleUrlChange = useCallback(url => {
    setCurrentUrl(url)
  }, [])

  const handleDataChange = useCallback(data => {
    setCurrentData(data)
  }, [])

  return (
    <Layout>
      <Hero
        onRequestTiming={handleRequestTiming}
        onUrlChange={handleUrlChange}
        onDataChange={handleDataChange}
      />
      <Timings
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Capabilities currentUrl={currentUrl} currentData={currentData} />
      <CodeExample currentUrl={currentUrl} />
      <Clients />
      <Pricing />
      <OpenSource
        repos={REPOS}
        accent={ACCENT}
        caption={
          <>
            The Microlink metadata engine is powered by{' '}
            <Link href='https://metascraper.js.org'>metascraper</Link>, our
            battle-tested open source library used by thousands of developers
            worldwide. You can inspect the code, contribute, or self-host it.
          </>
        }
      />
      <Stack currentUrl={currentUrl} />
      <Playground />
      <Benchmark />
      <Features
        css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
        title={
          <Subhead
            css={theme({
              width: '100%',
              textAlign: 'left'
            })}
          >
            The most complete website metadata API,{' '}
            <span
              css={{
                display: 'block',
                color: ACCENT,
                width: '100%',
                textAlign: 'left'
              }}
            >
              with no compromises.
            </span>
          </Subhead>
        }
        caption={
          <>
            No more brittle scrapers, conflicting tag sources, or partial link
            previews — our website metadata API turns any URL to metadata in one
            predictable JSON response, with easy integration via the{' '}
            <Link href='/docs/guides/metadata'>metadata API documentation</Link>
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

export default MetaPage
