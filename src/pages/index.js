import { Analytics, Faqs, Hero, Overlay, Pricing } from 'components/pages/home'
import { Meta, Link, Subhead } from 'components/elements'
import { useFeatures, useSiteMetadata } from 'components/hook'
import { Features, Layout } from 'components/patterns'
import { colors, borders, theme } from 'theme'
import React from 'react'

export const Head = () => <Meta />

const HomePage = () => {
  const { canonicalUrl, stripeKey, paymentEndpoint } = useSiteMetadata()

  return (
    <Layout>
      <Hero>{({ color }) => <Overlay color={color} />}</Hero>
      <Analytics />
      <Features
        px={4}
        title={
          <Subhead>
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
