import { Layout, Chat, SubHeadline } from 'components/patterns'
import { Container, Box, Flex } from 'components/elements'
import { Microlink, Slack } from 'components/logos'
import { cdnUrl } from 'helpers'
import { Plus } from 'react-feather'
import React from 'react'

const LOGO_SIZE = 60

export default () => (
  <Layout title='Chat' image={cdnUrl('page/chat.png')}>
    <Container pt={5}>
      <SubHeadline
        title='Come chat with us'
        caption='Be part of our community'
      />
      <Flex alignItems='center' justifyContent='center'>
        <Microlink width={LOGO_SIZE} />
        <Box color='black' px={3}>
          <Plus />
        </Box>
        <Slack width={LOGO_SIZE} />
      </Flex>
      <Flex alignItems='center' justifyContent='center' pt={4}>
        <Chat large />
      </Flex>
    </Container>
  </Layout>
)
