import React from 'react'
import {Avatar, Flex, Heading, Subhead} from 'rebass'
import styled from 'styled-components'

import {bgGradient} from '../theme'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import DemoCard from '../components/DemoCard'
import CodeCard from '../components/CodeCard'

const CustomSubhead = Subhead.extend`
  text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const CustomAvatar = Avatar.extend`
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
`

const Main = styled.main`
  ${bgGradient}
`

export default () => (
  <Main>
    <Container bg='#fafcfd' px='310px' py={3}>
      <Flex justify='center' direction='column' align='center' px={4}>
        {/* <Logo pb={1} /> */}
        <Flex justify='center' direction='column' align='center' py={3}>
          <Heading f={6} pb={2} bold>Microlink</Heading>
          <CustomSubhead f='36px'>Links previews done right</CustomSubhead>
        </Flex>
        <SearchBox />
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
      title='Powerful'
      text='Extract information from whatever link and made beautiful previewing without effort.'
    />

    <CodeCard />

    <Separator
      title='Easy'
      text='Using our API is easy integrate it in your current workflow.'
      />
  </Main>
)
