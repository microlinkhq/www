import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import { CurrencyProvider } from 'components/hook/use-currency'
import Plans from 'components/patterns/Plans/Plans'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { Subhead, Caption } from './shared'

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
            No login required. No credit card needed. URL to PDF API free to use
            just start calling it.
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
