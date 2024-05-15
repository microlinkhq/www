import { Caption, PricingTable } from 'components/patterns'
import { Subhead, Container } from 'components/elements'
import { fontSizes, layout, theme } from 'theme'
import React from 'react'

const Pricing = ({ canonicalUrl, stripeKey, apiEndpoint }) => {
  return (
    <Container as='section' css={{ alignItems: 'center' }}>
      <Subhead
        id='pricing'
        variant='gradient'
        style={{ scrollMarginTop: `calc(${fontSizes[5]} * -1)` }}
      >
        Pricing
      </Subhead>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [4, 4, 4, 5],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Every plan comes with API access & 24/7 tech support. Use the forever
        free plan to try the service, no credit-card required.
      </Caption>

      <PricingTable
        canonicalUrl={canonicalUrl}
        stripeKey={stripeKey}
        apiEndpoint={apiEndpoint}
      />
    </Container>
  )
}

export default Pricing
