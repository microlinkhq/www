import React from 'react'
import {Box, Text, Flex} from 'rebass'
import Container from './Container'

const Header = Text.extend`
  letter-spacing: 0.9px;
`

const Separator = Box.extend`
  height: 4px;
  background-image: linear-gradient(to right, #ec4e44, #c02e74 41%, #449bf8);
`

export default ({title, text, bg, py}) => (
  <Container bg={bg} px='310px' py={3}>
    <Flex justify='center' direction='column' align='center' px={4}>
      <Box py={py}>
        <Header color='#222' pb={1} bold f={4}>{title}</Header>
        <Separator />
      </Box>
      <Box
        style={{lineHeight: '26px'}}
        color='#A4A9B0'>{text}</Box>
    </Flex>
  </Container>
)
