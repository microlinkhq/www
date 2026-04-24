import Analytics from 'components/pages/home/analytics'
import Faqs from 'components/pages/home/faqs'
import Hero from 'components/pages/home/hero'
import Overlay from 'components/pages/home/overlay'
import Meta from 'components/elements/Meta/Meta'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import { withTitle } from 'helpers/hoc/with-title'
import SubheadBase from 'components/elements/Subhead'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Plans, {
  CurrencyContext,
  useCurrency
} from 'components/patterns/Plans/Plans'
import { colors, layout, textGradient, theme } from 'theme'
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
const Caption = withTitle(CaptionBase)

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
  const currencyState = useCurrency()

  return (
    <CurrencyContext.Provider value={currencyState}>
      <Layout>
        <Hero>{({ color }) => <Overlay color={color} />}</Hero>
        <Analytics />
        <Features
          title={
            <Subhead style={{ textAlign: 'left' }}>
              Production ready,{' '}
              <span style={{ display: 'block', color: '#3e55ff' }}>
                browser as a service
              </span>
            </Subhead>
          }
          caption={
            <>
              There are hidden costs to run your own infrastructure — Give your
              team an extra boost in performance, ease of use, browser
              automation made simple at cost pricing, full control via{' '}
              <Link href='/docs/api/getting-started/overview'>API</Link>.
            </>
          }
          features={FEATURES}
        />
        <Container
          as='section'
          css={theme({
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '100%',
            pt: [5, 5, 6, 6],
            px: [3, 3, 4, 4]
          })}
        >
          <Subhead
            titleize={false}
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
            titleize={false}
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
        <Plans canonicalUrl={canonicalUrl} stripeKey={stripeKey} />
        <Container
          as='section'
          css={theme({
            alignItems: 'center',
            maxWidth: '100%',
            pt: [2, 2, 3, 3],
            pb: [3, 3, 4, 4],
            px: [3, 3, 4, 4]
          })}
        >
          <Box
            aria-hidden='true'
            css={`
              width: 100%;
              max-width: ${layout.normal};
              height: 1px;
              background: linear-gradient(
                90deg,
                transparent,
                ${colors.black10},
                transparent
              );
            `}
          />
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: 'center',
              justifyContent: 'center',
              gap: [1, 2, 2, 2],
              textAlign: 'center',
              fontSize: [1, 1, 2, 2]
            })}
          >
            <Text as='span' css={theme({ color: 'black60' })}>
              Need more details?
            </Text>
            <ArrowLink href='/pricing'>
              Compare every plan side by side
            </ArrowLink>
          </Flex>
        </Container>
        <Faqs />
      </Layout>
    </CurrencyContext.Provider>
  )
}

export default HomePage
