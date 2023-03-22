import { Meta, Heading, Container, Flex } from 'components/elements'
import { Caption, Layout, Chat } from 'components/patterns'
import { cdnUrl } from 'helpers'
import { layout } from 'theme'
import React from 'react'

export const Head = () => (
  <Meta
    description='Direct support via chat with guaranteed response from exclusive top-tier engineers.'
    image={cdnUrl('banner/community.jpeg')}
  />
)

const CommunityPage = () => (
  <Layout>
    <Container pt={[2, 2, 3, 3]} justifyContent='center' alignItems='center'>
      <Heading>Community</Heading>

      <Caption
        as='h2'
        pt={[3, 3, 4, 4]}
        px={4}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Direct support via chat with guaranteed response from exclusive top-tier
        engineers.
      </Caption>

      <Flex alignItems='center' justifyContent='center' pt={[0, 0, 4, 4]}>
        <Chat />
      </Flex>
    </Container>
  </Layout>
)

export default CommunityPage
