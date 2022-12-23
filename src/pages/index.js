import { Faqs, Hero, Analytics, Pricing } from 'components/pages/home'
import { useFeatures, useSiteMetadata } from 'components/hook'
import { Container, Link, Subhead } from 'components/elements'
import { Features, Layout } from 'components/patterns'
import { colors, borders } from 'theme'
import React from 'react'

const HomePage = () => {
  const {
    canonicalUrl,
    paymentApiKey,
    stripeKey,
    paymentEndpoint
  } = useSiteMetadata()

  return (
    <Layout>
      <Hero />
      <Analytics
        pb={Container.defaultProps.pt}
        color='white80'
        bg='black'
        borderTop={`${borders[1]} ${colors.white20}`}
        borderBottom={`${borders[1]} ${colors.white20}`}
      />
      <Features
        px={4}
        title={
          <>
            <Subhead width='100%' textAlign='left'>
              Production ready,
            </Subhead>
            <Subhead
              color='#3e55ff'
              width='100%'
              textAlign='left'
              titleize={false}
            >
              browser as service
            </Subhead>
          </>
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
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Faqs
        bg='pinky'
        borderTop={`${borders[1]} ${colors.pinkest}`}
        borderBottom={`${borders[1]} ${colors.pinkest}`}
        pb={Container.defaultProps.pt}
      />
    </Layout>
  )
}

export default HomePage
