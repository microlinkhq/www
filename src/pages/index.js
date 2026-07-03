import Analytics from 'components/pages/home/analytics'
import Faqs from 'components/pages/home/faqs'
import Hero from 'components/pages/home/hero'
import Products from 'components/pages/home/products'
import Production from 'components/pages/home/production'
import Meta from 'components/elements/Meta/Meta'
import Container from 'components/elements/Container'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Layout from 'components/patterns/Layout'
import { CurrencyProvider } from 'components/hook/use-currency'
import Plans from 'components/patterns/Plans/Plans'
import { layout, textGradient, theme } from 'theme'
import React from 'react'

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
    description:
      'Microlink is a headless browser API that converts any URL into structured data, screenshots, previews and PDFs.',
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
    sameAs: ['https://github.com/microlinkhq', 'https://x.com/microlinkhq']
  })

  return (
    <>
      <Meta noSuffix />
      <script type='application/ld+json'>{structuredData}</script>
    </>
  )
}

const HomePage = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  return (
    <CurrencyProvider>
      <Layout>
        <Hero />
        <Products />
        <Analytics />
        <Production />
        <Container
          as='section'
          css={theme({
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '100%',
            pt: [4, 4, 5, 5],
            px: [3, 3, 4, 4]
          })}
        >
          <Subhead
            css={theme({
              fontSize: ['34px', '42px', '54px', '62px'],
              maxWidth: layout.large,
              textAlign: 'center'
            })}
          >
            Pricing built for <span css={textGradient}>builders</span>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            Start free. No seats, no minimums, no surprises.
          </Caption>
        </Container>
        <Plans
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
          footer='compare'
        />
        <Faqs />
      </Layout>
    </CurrencyProvider>
  )
}

export default HomePage
