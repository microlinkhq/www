import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme as themeProp } from 'theme'
import Markdown from 'components/markdown'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { cdnUrl } from 'helpers/cdn-url'
import { useClipboard } from 'components/hook/use-clipboard'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import HeadingBase from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

import Content from '../content/fragments/enterprise.md'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta
    description='Microlink Enterprise: dedicated API infrastructure, isolated browser pool, global CDN, and priority support for high-volume customers.'
    image={cdnUrl('banner/enterprise.jpeg')}
  />
)

const EnterprisePage = () => {
  const [ClipboardComponent, toClipboard] = useClipboard()

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
            For high-volume customers who've outgrown shared infrastructure.
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
                  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hi%2C%20I%27m%20interested%20in%20Microlink%20Enterprise.%20Could%20you%20share%20more%20details%3F%0D%0A%0D%0AThanks!%0D%0A',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              <Caps css={themeProp({ fontSize: 0 })}>Contact sales</Caps>
            </Button>
          </Box>
          <Box css={themeProp({ pt: 2 })}>
            <Text css={themeProp({ fontSize: 0, color: 'black60' })}>
              or email us at{' '}
              <Text
                as='span'
                onClick={() =>
                  toClipboard({
                    copy: 'hello@microlink.io',
                    text: Tooltip.TEXT.COPIED('email')
                  })
                }
                css={themeProp({
                  color: 'black',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: 1
                })}
              >
                hello@microlink.io
              </Text>
            </Text>
          </Box>
          <ClipboardComponent />
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default EnterprisePage
