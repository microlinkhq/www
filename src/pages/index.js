
import React, {Component} from 'react'
import {Box, Row, Column, Text, Avatar, Flex, Heading, Subhead} from 'rebass'

import {textGradient} from '../theme'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import CodeCard from '../components/CodeCard'

const API_ENDPOINT = 'http://localhost:3000/1.0'

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

const URL_FALLBACK = 'https://kikobeats.com'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { url: URL_FALLBACK }
  }

  getUrl (url) {
    return `${API_ENDPOINT}/?url=${url}&screenshot&paletteColors`
  }

  render () {
    const url = this.state.url || URL_FALLBACK

    return (
      <main>
        <Container bg='#f7f8fa' px='310px' py={3}>

          <Flex justify='center' direction='column' align='center' px={7}>
            <Flex justify='center' direction='column' align='center' py={3}>
              <Heading f={6} pb={2} color='#222' bold>Microlink</Heading>
              <CustomSubhead f='36px'>Turns any link into information.</CustomSubhead>
            </Flex>
            <SearchBox
              bg='white'
              width='100%'
              my={3}
              placeholder={URL_FALLBACK}
              onSubmit={url => this.setState({url})}
            />
            <Text py={2} f={1} color='#4B5663'>Enter an URL. Receive information.</Text>
          </Flex>

          <CodeCard
            url={this.getUrl(url)}
            bg='#f7f8fa'
            p={5} />

          <Flex width='100%' justify='space-around' py={3}>
            {Array.from(Array(10).keys()).map(index => (
              <CustomAvatar
                key={index}
                size={48}
                src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
                  />
                ))}
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

        <Container px={5} py={5}>
          <Row>
            <Column>
              <Flex align='flex-start'>
                <Avatar
                  size={32}
                  src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
                  />
                <Box ml={3} style={{flex: '1'}}>
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
                <Box ml={3} style={{flex: '1'}}>
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
                <Box ml={3} style={{flex: '1'}}>
                  <Text bold>Easy to use</Text>
                  <Text>Easy to useEasy to useEasy to useEasy to use</Text>
                </Box>
              </Flex>
            </Column>
          </Row>
        </Container>

      </main>
    )
  }
}
