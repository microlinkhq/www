import React from 'react'
import {Lead, Box, Flex} from 'rebass'
import Container from './Container'
import {bgGradient} from '../theme'

const CustomLead = Lead.extend`
  ${bgGradient}
  background-repeat: no-repeat;
  background-size: 100% 0.1em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
`

export default ({title, text, bg, ...props}) => (
  <Container bg={bg} px={[0, '310px']} py={3}>
    <Flex justify='center' direction='column' align='center' px={4}>
      <Box {...props}>
        <CustomLead color='#222' pb={1} bold f={[4, 5]}>{title}</CustomLead>
      </Box>
      <Box
        style={{lineHeight: '26px'}}
        color='#A4A9B0'>{text}</Box>
    </Flex>
  </Container>
)
