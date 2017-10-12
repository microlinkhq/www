
import React from 'react'
import {Box, Row, Column, Text, Avatar, Flex, Heading, Subhead} from 'rebass'

import {textGradient} from '../theme'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import DemoCard from '../components/DemoCard'
import CodeCard from '../components/CodeCard'

const CustomSubhead = Subhead.extend`
  ${textGradient}
  text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const CustomAvatar = Avatar.extend`
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
`

export default () => (
  <main>
    <Container bg='#f7f8fa' px='310px' py={3}>
      <Flex justify='center' direction='column' align='center' px={4}>
        {/* <Logo pb={1} /> */}
        <Flex justify='center' direction='column' align='center' py={3}>
          <Heading f={6} pb={2} color='#222' bold>Microlink</Heading>
          <CustomSubhead f='36px'>Turns any link into information.</CustomSubhead>
        </Flex>
        <SearchBox />
        <Text py={4} f={1} color='#4B5663'>Enter an URL. Receive information.</Text>
        <DemoCard />
        <Flex width='100%' justify='space-around' py={3}>
          {Array.from(Array(10).keys()).map(index => (
            <CustomAvatar
              key={index}
              size={48}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
              />
            ))}
        </Flex>
      </Flex>
    </Container>

    <Separator
      bg='#F7F8FA'
      py={4}
      title='Powerful'
      text={
        <p>
          Microlink provides you useful information from whatever internet link. description, predominant colors, screenshot or PDF export. Just call our <a href='#'>API</a>.
        </p>
      } />

    <CodeCard bg='#fafcfd' p={5} />

    <Separator
      py={4}
      bg='white'
      title='Easy to Embed'
      text='Using our API is easy integrate it in your current workflow.'
      />

    <Container px={5} py={5}>
      <Row>
        <Column>
          <Flex align='flex-start'>
            <Avatar
              size={32}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Box ml={3} tyle={{flex: '1'}}>
              <Text bold>Easy to use</Text>
              <Text>Easy to useEasy to useEasy to useEasy to use</Text>
            </Box>
          </Flex>
        </Column>

        <Column>
          <Flex align='flex-start'>
            <Avatar
              size={32}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Box ml={3} tyle={{flex: '1'}}>
              <Text bold>Easy to use</Text>
              <Text>Easy to useEasy to useEasy to useEasy to use</Text>
            </Box>
          </Flex>
        </Column>

        <Column>
          <Flex align='flex-start'>
            <Avatar
              size={32}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Box ml={3} tyle={{flex: '1'}}>
              <Text bold>Easy to use</Text>
              <Text>Easy to useEasy to useEasy to useEasy to use</Text>
            </Box>
          </Flex>
        </Column>
      </Row>
    </Container>

  </main>
)
