import React from 'react'
import {Box, Text, Container, Flex, Heading, Subhead} from 'rebass'
import {textGradient} from '../theme'

import Logo from './Logo'
import SearchBox from './SearchBox'
import DemoCard from './DemoCard'

const CustomContainer = Container.extend`
  max-width: 1400px;
  margin: auto;
`

const CustomSubhead = Subhead.extend`
  ${textGradient} text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const CustomText = Text.extend`
  text-transform: uppercase;
`

const Separator = Box.extend`
  height: 4px;
  background-image: linear-gradient(to right, #ec4e44, #c02e74 41%, #449bf8);
`

export default () => (
  <CustomContainer bg='#fafcfd' px={[3, 7]}>
    <Flex justify='center' direction='column' align='center'>
      {/* <Logo pb={1} /> */}
      <Flex justify='center' direction='column' align='center' py={3}>
        <Heading f={6} pb={2} bold>Microlink</Heading>
        <CustomSubhead f='36px'>Extract information from any link</CustomSubhead>
      </Flex>
      <SearchBox />
      <DemoCard />
      <Box py={3}>
        <CustomText pb={1} bold>Our Showcase</CustomText>
        <Separator />
      </Box>
      <Text color='gray8'>Big card previewing a link, or two medium cards</Text>
    </Flex>
  </CustomContainer>
)
