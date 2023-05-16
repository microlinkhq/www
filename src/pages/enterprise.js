import { DotsBackground, Caption, Layout } from 'components/patterns'
import { transition, space, gradient, layout } from 'theme'
import Markdown from 'components/markdown'
import { useTheme } from 'components/hook'
import styled from 'styled-components'
import { cdnUrl } from 'helpers'
import React from 'react'

import {
  Box,
  Button,
  Caps,
  Container,
  Heading,
  Meta,
  Subhead
} from 'components/elements'

const THEMES = {
  dark: {
    primary: 'white',
    secondary: 'white80'
  }
}

const content = `
The **Microlink Enterprise** plan is oriented for any customer that wants to maximize Microlink capabilities, unleashing the maximum performance with dedicated hardware and superior software integration with any existence customer infrastructure.

Running a **Microlink Enterprise** plan means:

- Your own Microlink API endpoint, off of the rest customers, with your own dedicated pool of always-ready browsers.
- Your own S3-like storage service for assets integration, with no time-to-live (TTL) restriction.
- Your own worlwide CDN distribution (+240 nodes over the world, powered by CloudFlare).

The physical servers associated with your own Microlink API endpoint can be chosen between 8 locations (<img src="https://cdn.microlink.io/flags/S/US.svg" /> New York, <img src="https://cdn.microlink.io/flags/S/US.svg" /> San Francisco, <img src="https://cdn.microlink.io/flags/S/NL.svg" /> Amsterdam, <img src="https://cdn.microlink.io/flags/S/SG.svg" /> Singapore, <img src="https://cdn.microlink.io/flags/S/GB.svg" /> London, <img src="https://cdn.microlink.io/flags/S/DE.svg" /> Frankfurt, <img src="https://cdn.microlink.io/flags/S/CA.svg" /> Toronto, or <img src="https://cdn.microlink.io/flags/S/IN.svg" /> Bangalore).

The price model is the same as you Microlink Pro plan, plus <PriceMonthly theme='dark'>500</PriceMonthly> for the extra cost of keeping the dedicated infrastructure running.`.trim()

const GradientButton = styled(Button)`
  transition: filter ${transition.medium};
  background-image: ${gradient};
  padding: ${space[1]};

  &&& {
    &:hover:not([disabled]) {
      color: inherit;
      box-shadow: none;
      filter: hue-rotate(40deg);
    }
  }
`

export const Head = () => (
  <Meta
    description='Unleash the maximum performance. Hardware, with the software baked in.'
    image={cdnUrl('banner/enterprise.jpeg')}
  />
)

const EnterprisePage = () => {
  const [{ theme, primary, secondary }] = useTheme(THEMES, 'dark')

  return (
    <DotsBackground theme={theme}>
      <Layout theme={theme} footer={{ bg: 'transparent' }}>
        <Container
          pt={[2, 2, 3, 3]}
          justifyContent='center'
          alignItems='center'
        >
          <Subhead color={primary}>Microlink for</Subhead>
          <Heading>Enterprise</Heading>
          <Caption
            color={primary}
            pt={[3, 3, 4, 4]}
            px={4}
            titleize={false}
            maxWidth={[layout.small, layout.small, layout.small, layout.small]}
          >
            Unleash the maximum performance. Hardware, with the software baked
            in.
          </Caption>
          <Box
            pt={[3, 3, 4, 4]}
            color={secondary}
            css={`
              b {
                color: white;
              }
            `}
          >
            <Markdown>{content}</Markdown>
          </Box>
          <Box pt={[2, 2, 3, 3]} color={secondary}>
            <GradientButton
              onClick={() =>
                window.open(
                  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hello%2C%20I%20want%20to%20upgrade%20my%20customer%20plan%20to%20Microlink%20Enterprise.%0D%0A%0D%0ACan%20you%20tell%20me%20more%20about%20the%20details%3F%0D%0A%0D%0AThank%20you!%0D%0A',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              <Caps bg='black' px={3} py={2} color={primary}>
                Get in touch
              </Caps>
            </GradientButton>
          </Box>
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default EnterprisePage
