import { Meta, Heading, Container, Flex } from 'components/elements'
import { Caption, Layout, Chat } from 'components/patterns'
import { cdnUrl } from 'helpers'
import { layout, theme } from 'theme'
import React from 'react'

export const Head = () => (
  <Meta
    description='Direct support via chat with guaranteed response from exclusive top-tier engineers.'
    image={cdnUrl('banner/community.jpeg')}
  />
)

const CommunityPage = () => (
  <Layout>
    <Container
      css={theme({
        pt: [2, null, 3],
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Heading>Community</Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, null, 4],
          px: 4,
          maxWidth: layout.small
        })}
        titleize={false}
      >
        Direct support via chat with guaranteed response from exclusive top-tier
        engineers.
      </Caption>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          pt: [3, null, 4],
          mt: 3
        })}
      >
        <Chat />
      </Flex>
    </Container>
  </Layout>
)

export default CommunityPage
