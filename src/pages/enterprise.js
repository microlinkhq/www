import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme as themeProp } from 'theme'
import Markdown from 'components/markdown'
import { trackEvent } from 'helpers/plausible'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'

import Content from '../content/fragments/enterprise.md'

export const Head = () => (
  <Meta description='Microlink Enterprise: dedicated API infrastructure, isolated browser pool, global CDN, and priority support for high-volume customers.' />
)

const EnterprisePage = () => {
  return (
    <DotsBackground>
      <Layout>
        <Container
          css={themeProp({
            pt: [2, null, 3],
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Heading>Microlink for Enterprise</Heading>
          <Caption
            css={themeProp({
              pt: [3, null, 4],
              px: 4,
              maxWidth: layout.small
            })}
          >
            The Microlink API you own. Dedicated endpoint, always-ready
            infrastructure, worldwide distribution.
          </Caption>
          <Box
            css={themeProp({
              pt: [3, null, 4]
            })}
          >
            <Markdown>
              <Content />
            </Markdown>
          </Box>
          <Box css={themeProp({ pt: [2, null, 3] })}>
            <Button
              variant='black'
              onClick={() => {
                trackEvent('enterprise contact')
                window.open(
                  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hi%2C%20I%27m%20interested%20in%20Microlink%20Enterprise.%20Could%20you%20share%20more%20details%3F%0D%0A%0D%0AThanks!%0D%0A',
                  '_blank',
                  'noopener noreferrer'
                )
              }}
            >
              <Caps css={themeProp({ fontSize: 0 })}>Contact sales</Caps>
            </Button>
          </Box>
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default EnterprisePage
