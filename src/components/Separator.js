import React from 'react'
import {Box, Text, Flex} from 'rebass'
import Container from './Container'

const CustomText = Text.extend`
  text-transform: uppercase;
  letter-spacing: 0.9px;
`

const Separator = Box.extend`
  height: 4px;
  background-image: linear-gradient(to right, #ec4e44, #c02e74 41%, #449bf8);
`

export default ({title, text}) => (
  <Container bg='#fafcfd' px='310px' py={3}>
    <Flex justify='center' direction='column' align='center' px={4}>
      <Box py={4}>
        <CustomText pb={1} bold f={'14px'}>{title}</CustomText>
        <Separator />
      </Box>
      <Text color='gray8'>{text}</Text>
    </Flex>
  </Container>
)
