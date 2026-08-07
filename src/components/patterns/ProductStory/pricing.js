import React from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import { CurrencyProvider } from 'components/hook/use-currency'
import Plans from 'components/patterns/Plans/Plans'
import { useSiteMetadata } from 'components/hook/use-site-meta'

import { Subhead, Caption, NARROW_MAX_WIDTH } from './shared'

export const ProductPricing = ({
  title = 'Start free, scale when ready',
  caption,
  bg = 'pinky'
}) => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()

  return (
    <CurrencyProvider>
      <Box
        as='section'
        id='pricing'
        css={theme({
          bg,
          py: SECTION_VERTICAL_SPACING
        })}
      >
        <Container css={theme({ alignItems: 'center', maxWidth: '100%' })}>
          <Subhead variant='gradient'>{title}</Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: NARROW_MAX_WIDTH
            })}
          >
            {caption}
          </Caption>
        </Container>
        <Plans
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
          footer='compare'
        />
      </Box>
    </CurrencyProvider>
  )
}
