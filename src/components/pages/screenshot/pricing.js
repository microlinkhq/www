import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Plans from 'components/patterns/Plans/Plans'
import { CurrencyProvider } from 'components/hook/use-currency'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { Caption, Subhead } from './shared'

export const Pricing = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  return (
    <CurrencyProvider>
      <Box
        as='section'
        id='pricing'
        css={theme({
          bg: 'pinky',
          py: SECTION_VERTICAL_SPACING
        })}
      >
        <Container
          css={theme({
            alignItems: 'center',
            maxWidth: '100%'
          })}
        >
          <Subhead variant='gradient'>Start free, scale when ready</Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            No signup, no API key, no credit card. The screenshot API is free to
            start — just call the endpoint.
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
