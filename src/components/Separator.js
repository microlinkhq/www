import React from 'react'
import {Lead, Box, Flex} from 'rebass'
import Container from './Container'

const Separator = Box.extend`
  height: 4px;
  background-image: linear-gradient(to right, #ec4e44, #c02e74 41%, #449bf8);
`

export default ({title, text, bg, ...props}) => (
  <Container bg={bg} px={[0, '310px']} py={3}>
    <Flex justify='center' direction='column' align='center' px={4}>
      <Box {...props}>
        <Lead color='#222' pb={1} bold f={[4, 5]}>{title}</Lead>
        <Separator />
      </Box>
      <Box
        style={{lineHeight: '26px'}}
        color='#A4A9B0'>{text}</Box>
    </Flex>
  </Container>
)
