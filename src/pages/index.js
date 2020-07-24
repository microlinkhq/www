import { Faqs, Hero, Analytics, Pricing } from 'components/pages/home'
import { usePrinciples, useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'
import { colors, borders } from 'theme'
import React from 'react'

export default () => {
  const {
    canonicalUrl,
    paymentApiKey,
    stripeKey,
    paymentEndpoint,
    headline
  } = useSiteMetadata()

  return (
    <Layout>
      <Hero title={headline} features={usePrinciples()} />
      <Analytics
        bg='black'
        borderTop={`${borders[1]} ${colors.white20}`}
        borderBottom={`${borders[1]} ${colors.white20}`}
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
      />
    </Layout>
  )
}
