import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'

import CaptionBase from 'components/patterns/Caption/Caption'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import Layout from 'components/patterns/Layout'
import ContactButton from 'components/pages/enterprise/ContactButton'
import Markdown from 'components/markdown'
import { withTitle } from 'helpers/hoc/with-title'

import Content from '../content/fragments/enterprise.md'

const Heading = withTitle(HeadingBase)
const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta description='Microlink Enterprise: dedicated API infrastructure, isolated browser pool, global CDN, and priority support for high-volume customers.' />
)

const EnterprisePage = () => (
  <DotsBackground>
    <Layout>
      <Flex
        as='section'
        id='hero'
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          pt: [1],
          pb: [1]
        })}
      >
        <Heading
          titleize={false}
          css={theme({
            px: [3, 3],
            maxWidth: layout.large
          })}
        >
          Microlink for Enterprise
        </Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [2, 2, 3, 3],
            px: 3,
            maxWidth: layout.large
          })}
        >
          The Microlink API you own. Dedicated endpoint, always-ready
          infrastructure, worldwide distribution.
        </Caption>
      </Flex>
      <Container
        css={theme({
          justifyContent: 'center',
          alignItems: 'center',
          pt: [3, 3, 4, 4]
        })}
      >
        <Box>
          <Markdown>
            <Content />
          </Markdown>
        </Box>
        <ContactButton event='enterprise contact' my={[2, null, 3]} />
      </Container>
    </Layout>
  </DotsBackground>
)

export default EnterprisePage
