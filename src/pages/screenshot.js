import React, { useState, useCallback, useEffect } from 'react'
import { SECTION_VERTICAL_SPACING, colors, theme } from 'theme'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import { Benchmark } from 'components/pages/screenshot/benchmark'
import { Capabilities } from 'components/pages/screenshot/capabilities'
import { Clients } from 'components/pages/screenshot/clients'
import { CodeExample } from 'components/pages/screenshot/code-example'
import { CallToAction } from 'components/pages/screenshot/cta'
import { Hero } from 'components/pages/screenshot/hero'
import { Playground } from 'components/pages/screenshot/playground'
import { Pricing } from 'components/pages/screenshot/pricing'
import { ProductInformation } from 'components/pages/screenshot/product-information'
import { HERO_LAYOUT, Subhead } from 'components/pages/screenshot/shared'
import { Timings } from 'components/pages/screenshot/timings'
import { CDN_EDGES } from 'helpers/cdn-edges'

const FEATURES = [
  {
    title: 'Enterprise-Grade Infrastructure',
    description:
      'Production-ready and built for scale. Handle millions of browser sessions with a 99.95% uptime SLA and guaranteed latency limits for business-critical workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start capturing immediately. No setup fees, no credit card required, and pay-as-you-grow pricing that scales seamlessly as your infrastructure needs increase.'
  },
  {
    title: 'Global Edge Delivery',
    description: `Assets are automatically cached and distributed across ${CDN_EDGES} edge locations powered by Cloudflare, ensuring lightning-fast image delivery worldwide.`
  },
  {
    title: 'Language-Agnostic API',
    description:
      'A single REST endpoint designed for developers. Pass any URL and integrate in minutes using our official SDKs for Node.js, Python, Ruby, and Go, or standard HTTP requests.'
  },
  {
    title: 'Full Headless Browser Control',
    description:
      'Complete Puppeteer and Playwright capabilities. Configure custom viewports, full-page captures, device emulation, user agents, and geolocation natively.'
  },
  {
    title: 'Custom Injections & Overlays',
    description:
      'Execute custom JavaScript, inject CSS, click specific DOM elements, hide ad banners, or wait for network events before the capture is finalized.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live (TTL) caching rules to keep your snapshots fresh. Stay up to date with target website changes while maintaining sub-second API performance.'
  },
  {
    title: 'Optimized Output Formats',
    description:
      'Export directly to WebP, JPEG, or PNG formats with configurable compression. Optimize image payloads for web performance without sacrificing visual fidelity.'
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
    title='Website Screenshot API — Convert URL to Image'
    description='Capture pixel-perfect website screenshots with one API call. Free to start. Sub-second responses, full headless browser control, device emulation & ad-blocking.'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/screenshot',
      name: 'Microlink Screenshot API',
      description:
        'A developer-first API to capture pixel-perfect website screenshots programmatically. Sub-second cached responses, full Headless Chrome control, device emulation, and ad-blocking across a global edge network.',
      url: 'https://microlink.io/screenshot',
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
        'screenshot API, website screenshot, URL to image, headless chrome, website capture, web screenshot, puppeteer API',
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
          name: 'Headless browser',
          sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
        }
      ]
    }}
  />
)
const INITIAL_TIMING_MS = 14

const randomTimingMs = () => Math.floor(Math.random() * (25 - 14 + 1)) + 14

const ScreenshotPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState('https://apple.com')
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: 'https://apple.com' }
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
        accent={colors.red6}
        caption='The Microlink screenshot engine is powered by battle-tested open source libraries used by thousands of developers worldwide. Explore the code, contribute, or run it yourself.'
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
            The best screenshot API,{' '}
            <span
              css={theme({
                display: 'block',
                color: 'red6',
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
            No more servers to maintain, load balancers, or paying for capacity
            you don’t use — spend more time building, less time configuring,
            with easy integration via{' '}
            <Link href='/docs/guides/screenshot'>a single REST API</Link>.
          </>
        }
        features={FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </Layout>
  )
}

export default ScreenshotPage
