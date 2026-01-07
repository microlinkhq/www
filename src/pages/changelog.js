import Meta from 'components/elements/Meta/Meta'
import Container from 'components/elements/Container'
import HeadingBase from 'components/elements/Heading'
import Box from 'components/elements/Box'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Markdown from 'components/markdown'
import { cdnUrl } from 'helpers/cdn-url'
import { layout, theme } from 'theme'
import React from 'react'

import Content from '../content/fragments/changelog.md'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta
    description='We’re constantly improving the platform. See here notable changes in our lineup of products & improvements over the time.'
    image={cdnUrl('banner/changelog.jpeg')}
  />
)

const ChangelogPage = () => {
  return (
    <Layout>
      <Container
        css={theme({
          pt: [2, null, 3],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Heading css={{ maxWidth: layout.large }}>Changelog</Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [3, null, 4],
            mb: ['-16px', null, '-32px'],
            px: [4, null, 0],
            maxWidth: layout.small
          })}
          titleize={false}
        >
          We’re constantly improving the platform. See here notable changes in
          our lineup of products & improvements over the time.
        </Caption>
        <Box css={theme({ pt: [3, null, 4] })}>
          <Markdown>
            <Content />
          </Markdown>
        </Box>
      </Container>
    </Layout>
  )
}

export default ChangelogPage
