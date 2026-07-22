import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme as themeProp } from 'theme'
import Markdown from 'components/markdown'
import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import ContactButton from 'components/pages/enterprise/ContactButton'

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
          <Box css={themeProp({ pt: [3, null, 4] })}>
            <Markdown>
              <Content />
            </Markdown>
          </Box>
          <ContactButton event='enterprise contact' my={[2, null, 3]} />
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default EnterprisePage
