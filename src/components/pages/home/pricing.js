import { Caption, PricingTable } from 'components/patterns'
import { Subhead, Container } from 'components/elements'
import { fontSizes, layout } from 'theme'
import React from 'react'

const Pricing = ({
  canonicalUrl,
  apiKey,
  stripeKey,
  apiEndpoint,
  ...props
}) => {
  return (
    <Container as='section' alignItems='center' {...props}>
      <Subhead
        id='pricing'
        variant='gradient'
        style={{ scrollMarginTop: `calc(${fontSizes[5]} * -1)` }}
      >
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

export default Pricing
