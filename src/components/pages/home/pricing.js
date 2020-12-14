import { Caption, PricingTable } from 'components/patterns'
import { Subhead, Container } from 'components/elements'
import { layout } from 'theme'
import React from 'react'

export default ({ canonicalUrl, apiKey, stripeKey, apiEndpoint, ...props }) => {
  return (
    <Container
      alignItems='center'
      id='pricing'
      maxWidth={layout.large}
      {...props}
    >
      <Subhead variant='gradient' pt={[0, 0, 4, 4]}>
        Pricing
      </Subhead>
      <Caption
        pt={[3, 3, 4, 4]}
        pb={[4, 4, 4, 5]}
        maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
      >
        Every plan comes with API access & 24/7 tech support. Use the forever
        free plan to try the service, no credit-card required.
      </Caption>
      <PricingTable
        canonicalUrl={canonicalUrl}
        apiKey={apiKey}
        stripeKey={stripeKey}
        apiEndpoint={apiEndpoint}
      />
    </Container>
  )
}
