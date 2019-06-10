import React from 'react'

import { Layout, Chat } from 'components/patterns'
import { Container, Subhead, Box, Flex } from 'components/elements'
import { Plus } from 'react-feather'
import { Microlink, Slack } from 'components/logos'

const LOGO_SIZE = 60
const PLUS_SIZE = LOGO_SIZE * 0.35
const TITLE = 'Chat'

export default () => (
  <Layout title={TITLE} image='https://cdn.microlink.io/page/chat.png'>
    <Container width='100vh'>
      <Subhead fontSize={[4, 5]} fontWeight='regular' pt={4} pb={5}>
        Come Chat with Us
      </Subhead>
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
