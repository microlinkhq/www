import Analytics from 'components/pages/home/analytics'
import Faqs from 'components/pages/home/faqs'
import Hero from 'components/pages/home/hero'
import Overlay from 'components/pages/home/overlay'
import Pricing from 'components/pages/home/pricing'
import Meta from 'components/elements/Meta/Meta'
import { Link } from 'components/elements/Link'
import { withTitle } from 'helpers/hoc/with-title'
import SubheadBase from 'components/elements/Subhead'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { colors, borders, theme } from 'theme'
import React from 'react'

const FEATURES = [
  {
    title: 'Powerful & Scalable',
    description: 'Cloud-based solution with superior operational performance.'
  },
  {
    title: 'Costless Solution',
    description:
      'Starts free. No upfront costs, scalable pricing as you go, growing with your business.'
  },
  {
    title: 'Global CDN',
    description:
      'Edge storage distributed over +240 nodes backed by CloudFlare Network.'
  },
  {
    title: 'Developer First',
    description:
      'For developers, with top-notch industry technologies, language-agnostic.'
  },
  {
    title: 'Fully programmable',
    description:
      'Easy to integrate with any existing stack or cloud in just a few minutes.'
  },
  {
    title: 'Declarative Usage',
    description:
      'Simple documentation and interactive code examples that enable quick implementations.'
  },
  {
    title: 'Optimized hardware',
    description: 'No servers to maintain; no shared browsers between requests.'
  },
  {
    title: 'Built-in cache',
    description: 'Enabled by default, no additional caching setup required.'
  },
  {
    title: 'Security compliance',
    description: 'Request isolation with no shared browsers between requests.'
  }
]

const Subhead = withTitle(SubheadBase)

export const Head = () => {
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Microlink',
    alternateName: ['Microlink.io', 'Microlink API', 'Microlink HQ'],
    operatingSystem: 'Any',
    applicationCategory: ['DeveloperApplication', 'WebApplication'],
    url: 'https://microlink.io',
    image: 'https://cdn.microlink.io/logo/logo.png',
    description: 'Microlink is a headless browser API that converts any URL into structured data, screenshots, previews and PDFs.',
    softwareHelp: 'https://microlink.io/docs',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Organization',
      name: 'Microlink',
      url: 'https://microlink.io'
    },
    sameAs: [
      'https://github.com/microlinkhq',
      'https://x.com/microlinkhq'
    ]
  })

  return (
    <>
      <Meta noSuffix />
      <script type='application/ld+json'>
        {structuredData}
      </script>
    </>
  )
}

const HomePage = () => {
  const { canonicalUrl, stripeKey, paymentEndpoint } = useSiteMetadata()

  return (
    <Layout>
      <Hero>{({ color }) => <Overlay color={color} />}</Hero>
      <Analytics />
      <Features
        css={theme({ px: 4 })}
        title={
          <Subhead css={{ textAlign: 'left' }}>
            Production ready,{' '}
            <span css={{ display: 'block', color: '#3e55ff' }}>
              browser as a service
            </span>
          </Subhead>
        }
        caption={
          <>
            There are hidden costs to run your own infrastructure — Give your
            team an extra boost in performance, ease of use, browser automation
            made simple at cost pricing, full control via{' '}
            <Link href='/docs/api/getting-started/overview'>API</Link>.
          </>
        }
        features={FEATURES}
      />
      <Pricing
        canonicalUrl={canonicalUrl}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Faqs
        css={theme({
          bg: 'pinky',
          borderTop: `${borders[1]} ${colors.pinkest}`,
          borderBottom: `${borders[1]} ${colors.pinkest}`,
          pb: [5, 5, 6, 6]
        })}
      />
    </Layout>
  )
}

export default HomePage
