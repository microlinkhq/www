import React from 'react'
import { Lead, Box, Flex } from 'rebass'
import styled from 'styled-components'

import Container from './Container'
import { bgGradient } from 'helpers'

const CustomLead = styled(Lead)`
  ${bgGradient} background-repeat: no-repeat;
  background-size: 100% 0.1em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
`

export default ({ title, text, bg, ...props }) => (
  <Container bg={bg} px={[0, '310px']} py={3}>
    <Flex justify='center' direction='column' alignItems='center' px={4}>
      <Box {...props}>
        <CustomLead color='#222' pb={1} fontWeight='bold' fontSize={[4, 5]}>
          {title}
        </CustomLead>
      </Box>
      <Box style={{ lineHeight: '26px' }} color='#A4A9B0'>
        {text}
      </Box>
    </Flex>
  </Container>
)
