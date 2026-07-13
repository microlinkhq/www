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
        css={theme({
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '100%',
          pt: SECTION_VERTICAL_SPACING,
          px: [3, 3, 4, 4]
        })}
      >
        <Subhead css={theme({ maxWidth: layout.large, fontSize: 4 })}>
          Pricing built for{' '}
          <Subhead
            variant='gradient'
            as='span'
            css={theme({ fontSize: 'inherit' })}
          >
            builders
          </Subhead>
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            lineHeight: 1,
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          Start on the free plan and pay only for what you use as you grow.
          Pricing is two numbers, a flat subscription plus usage that scales
          with your traffic, so the bill tracks real requests. No per-seat fees,
          no minimums, no surprise overages.
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
