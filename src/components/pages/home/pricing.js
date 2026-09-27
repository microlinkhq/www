import Container from 'components/elements/Container'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'
import Plans from 'components/patterns/Plans/Plans'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

const Pricing = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  return (
    <>
      <Container
        as='section'
        id='pricing'
        aria-labelledby='home-pricing-title'
        css={theme({
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '100%',
          py: SECTION_VERTICAL_SPACING,
          px: [3, 3, 4, 4],
          scrollMarginTop: 4
        })}
      >
        <Subhead id='home-pricing-title' variant='gradient'>
          Simple to start. Ready to scale.
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          Start free, no card needed. When you need volume, pick the Pro tier
          that fits your traffic. Priced by requests, not seats.
        </Caption>
      </Container>
      <Plans
        canonicalUrl={canonicalUrl}
        stripeKey={stripeKey}
        footer='compare'
      />
    </>
  )
}

export default Pricing
