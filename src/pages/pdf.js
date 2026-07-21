import React, { useState, useCallback, useEffect } from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Benchmark } from 'components/pages/pdf/benchmark'
import { Capabilities } from 'components/pages/pdf/capabilities'
import { Clients } from 'components/pages/pdf/clients'
import { CodeExample } from 'components/pages/pdf/code-example'
import { CallToAction } from 'components/pages/pdf/cta'
import { Hero } from 'components/pages/pdf/hero'
import { Playground } from 'components/pages/pdf/playground'
import { Pricing } from 'components/pages/pdf/pricing'
import { ProductInformation } from 'components/pages/pdf/product-information'
import { Timings } from 'components/pages/pdf/timings'
import { ACCENT, Subhead, FIRST_URL } from 'components/pages/pdf/shared'

const FEATURES = [
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready HTML to PDF service at scale. Handle millions of documents with 99.9% uptime SLA and guaranteed performance for business-critical workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start converting URLs to PDF immediately. No setup fees, no credit card required, and pay-as-you-grow pricing that scales with your document generation needs.'
  },
  {
    title: 'Global Edge Delivery',
    description: `PDFs are cached and distributed across ${CDN_EDGES} edge locations powered by Cloudflare, ensuring lightning-fast document delivery worldwide.`
  },
  {
    title: 'Language-Agnostic REST API',
    description:
      'A single REST endpoint for our web to PDF API. Integrate in minutes using official SDKs for Node.js, Python, Ruby, and Go, or standard HTTP requests.'
  },
  {
    title: 'Full Headless Browser Control',
    description:
      'Complete Puppeteer and Playwright capabilities. Configure custom viewports, JavaScript execution, CSS injection, and page interaction natively before PDF generation.'
  },
  {
    title: 'Custom Paper & Layout',
    description:
      'Full control over paper sizes (A0-A6, Letter, Legal, Tabloid), orientation, margins, scaling, and page ranges for pixel-perfect document output.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live caching rules to keep your PDFs fresh. Stay up to date with website changes while maintaining sub-second API performance.'
  },
  {
    title: 'Optimized Document Output',
    description:
      'Our URL to PDF API generates optimized documents with configurable formatting. Perfect for reports, invoices, contracts, and compliance documentation.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation packed with live code examples. Copy-paste ready snippets allow you to bypass complex infrastructure setup and ship to production faster.'
  }
]

const REPOS = ['browserless', 'metascraper', 'html-get']

export const Head = () => (
  <Meta
    title='HTML to PDF API - Convert URL to PDF Document'
    description='Convert HTML or any URL to PDF with a single REST API call. Features custom margins, headless control, and edge caching. 25 free requests/day.'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/pdf',
      name: 'Microlink PDF API',
      description:
        'A developer-first API to convert any URL or HTML to a professional PDF document. Custom paper sizes, margins, orientation, and full browser control across a global edge network.',
      url: 'https://microlink.io/pdf',
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
        'html to pdf api',
        'url to pdf api',
        'webpage to pdf api',
        'rest api pdf download',
        'PDF generation',
        'document automation'
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
          url: 'https://github.com/microlinkhq/browserless'
        }
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Application Programming Interface',
          sameAs: 'https://en.wikipedia.org/wiki/API'
        },
        {
          '@type': 'Thing',
          name: 'PDF',
          sameAs: 'https://en.wikipedia.org/wiki/PDF'
        },
        {
          '@type': 'Thing',
          name: 'Headless browser',
          sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
        }
      ]
    }}
  />
)

const INITIAL_TIMING_MS = 14

const randomTimingMs = () => Math.floor(Math.random() * (25 - 14 + 1)) + 14

const PdfPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState(FIRST_URL)
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: FIRST_URL }
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
      <Hero onRequestTiming={handleRequestTiming} />
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
        accent={ACCENT}
        caption='The Microlink PDF engine is powered by battle-tested open source libraries used by thousands of developers worldwide. Our HTML to PDF API is built on an open source foundation: explore the code, contribute, or run it yourself.'
      />
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
            The best HTML to PDF API,{' '}
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
            No more servers to maintain, load balancers, or paying for capacity
            you don&apos;t use our HTML to PDF service API lets you spend more
            time building, less time configuring, with easy integration via{' '}
            <Link href='/docs/guides/pdf'>web to PDF API</Link>.
          </>
        }
        features={FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </Layout>
  )
}

export default PdfPage
