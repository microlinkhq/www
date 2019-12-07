import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { layout } from 'theme'

import {
  Box,
  Button,
  Caps,
  Flex,
  Heading,
  Hide,
  Subhead,
  Text
} from 'components/elements'

import { Caption, Grid, Block, MQLEditor, List } from 'components/patterns'

const Features = ({ children, ...props }) => (
  <Box as='section' mx='auto' {...props}>
    <Hide breakpoints={[0, 1]}>
      <Grid children={children} itemsPerRow={3} />
    </Hide>
    <Hide breakpoints={[2, 3]}>
      <Grid children={children} itemsPerRow={1} />
    </Hide>
  </Box>
)

const Automation = ({ word, ...props }) => (
  <Flex
    as='section'
    style={{ userSelect: 'none' }}
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
    {...props}
  >
    <Flex>
      <Heading variant={null} mr={3} fontWeight='light'>
        Blazing.
      </Heading>
      <Heading variant={null} mr={3} fontWeight='light'>
        Fast.
      </Heading>
      <Heading variant={null} mr={3} fontWeight='light'>
        {word}.
      </Heading>
      <Heading variant={null}>Cloud Browser.</Heading>
    </Flex>
    <Caption variant={null}>
      browser automation made simple at cost pricing, full control via API.
    </Caption>
  </Flex>
)

const Resume = ({ title }) => (
  <Flex
    maxWidth={['100%', '100%', '100%', '960px']}
    justifyContent='center'
    flexDirection='column'
    pr={[0, 0, 0, 4]}
  >
    <Subhead
      textAlign={['center', 'center', 'center', 'inherit']}
      children='Production ready'
      fontSize={3}
      fontWeight='light'
    />
    <Subhead
      textAlign={['center', 'center', 'center', 'inherit']}
      children={title}
      fontSize={5}
    />
    <Text
      maxWidth={['inherit', 'inherit', 'inherit', 7]}
      mt={[0, 0, 0, 3]}
      textAlign={['center', 'center', 'center', 'inherit']}
      children='Fast, scalable, and reliable browser automation built for businesses and developers.'
    />
    <List ml={2} px={[3, 3, 3, 0]} mt={4} mb={3}>
      <List.Item>Get HTML or PDF from any URL.</List.Item>
      <List.Item>Take an screenshot in ~3 seconds.</List.Item>
      <List.Item>Turns websites into structured data.</List.Item>
      <List.Item>Get perfomance metrics & detect bottlenecks.</List.Item>
    </List>
    <Flex
      alignItems='center'
      justifyContent={['center', 'center', 'center', 'end']}
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Flex>
        <Button onClick={() => navigate('/docs')}>
          <Caps fontSize={0}>Read Docs</Caps>
        </Button>
        <Text ml={3}>No credit card required.</Text>
      </Flex>
    </Flex>
  </Flex>
)

const Hero = ({ title, features }) => {
  const words = ['Instant', 'Costless', 'From $0', 'Effective', 'Reliable']
  const [word, setWord] = useState(words[0])
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    event.preventDefault()
    setIndex((index + 1) % words.length)
    setWord(words[index])
  }

  return (
    <Block
      id='hero'
      blockOne={<Resume title={title} />}
      blockTwo={<MQLEditor />}
      children={
        <>
          <Automation pt={5} onClick={handleClick} word={word} />
          <Features pt={5} children={features} />
        </>
      }
    />
  )
}

export default Hero
