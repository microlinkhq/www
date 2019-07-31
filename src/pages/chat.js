import React from 'react'

import { Layout, Chat, Header } from 'components/patterns'
import { Container, Box, Flex } from 'components/elements'
import { Plus } from 'react-feather'
import { Microlink, Slack } from 'components/logos'

const LOGO_SIZE = 60
const PLUS_SIZE = LOGO_SIZE * 0.35

export default () => (
  <Layout title='Chat' image='https://cdn.microlink.io/page/chat.png'>
    <Container pt={5}>
      <Header subtitle='Come chat with us' caption='Be part of our community' />
      <Flex alignItems='center' justifyContent='center'>
        <Microlink size={LOGO_SIZE} />
        <Box color='gray' px={3}>
          <Plus size={PLUS_SIZE} />
        </Box>
        <Slack size={LOGO_SIZE} />
      </Flex>
      <Flex alignItems='center' justifyContent='center' py={5}>
        <Chat large />
      </Flex>
    </Container>
  </Layout>
)
