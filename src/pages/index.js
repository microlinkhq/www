import Analytics from 'components/pages/home/analytics'
import Faqs from 'components/pages/home/faqs'
import Hero from 'components/pages/home/hero'
import Overlay from 'components/pages/home/overlay'
import Pricing from 'components/pages/home/pricing'
import Meta from 'components/elements/Meta/Meta'
import { Link } from 'components/elements/Link/base'
import { withTitle } from 'helpers/hoc/with-title'
import SubheadBase from 'components/elements/Subhead'
import { useFeatures } from 'components/hook/use-features'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { colors, borders, theme } from 'theme'
import React from 'react'

const Subhead = withTitle(SubheadBase)

export const Head = () => <Meta />

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
              browser as service
            </span>
          </Subhead>
        }
        caption={
          <>
            There are hidden costs to run your own infrastructure — Give your
            team extra boost in performance, ease of use, browser automation
            made simple at cost pricing, full control via{' '}
            <Link href='/docs/api/getting-started/overview'>API</Link>.
          </>
        }
        features={useFeatures()}
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
