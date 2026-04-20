import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme as themeProp } from 'theme'
import Markdown from 'components/markdown'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import HeadingBase from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'

import Content from '../content/fragments/enterprise.md'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta
    description='Unleash maximum performance. Hardware with the software baked in.'
    image={cdnUrl('banner/enterprise.jpeg')}
  />
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
          <Heading titleize={false}>Microlink for Enterprise</Heading>
          <Caption
            css={themeProp({
              pt: [3, null, 4],
              px: 4,
              maxWidth: layout.small
            })}
            titleize={false}
          >
            Unleash maximum performance. Hardware with the software baked in.
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
              onClick={() =>
                window.open(
                  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hello%2C%20I%20want%20to%20upgrade%20my%20customer%20plan%20to%20Microlink%20Enterprise.%0D%0A%0D%0ACan%20you%20tell%20me%20more%20about%20the%20details%3F%0D%0A%0D%0AThank%20you!%0D%0A',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              <Caps css={themeProp({ fontSize: 0 })}>Get in touch</Caps>
            </Button>
          </Box>
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default EnterprisePage
