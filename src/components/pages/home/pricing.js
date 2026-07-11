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
        <Subhead css={theme({ maxWidth: layout.large })}>
          Pricing built for{' '}
          <Subhead variant='gradient' as='span'>
            builders
          </Subhead>
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          Start free, scale predictably. No seats, no minimums, no surprises.
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
