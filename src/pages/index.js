import { Features, Faqs, Hero, Analytics, Pricing } from 'components/pages/home'
import { useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'
import { colors, borders } from 'theme'
import React from 'react'

export default () => {
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
        pt={6}
        pb={6}
        bg='black'
        borderTop={`${borders[1]} ${colors.white20}`}
        borderBottom={`${borders[1]} ${colors.white20}`}
      />
      <Features />
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
        pb={6}
      />
    </Layout>
  )
}
