import {Input, Box, Flex, Banner, Heading, Container, Subhead} from 'rebass'
import React from "react"
import {textGradient} from '../theme'

const CustomBanner = Banner.extend`
  min-height: 100vh;
`

const CustomSubhead = Subhead.extend`
  ${textGradient}
  text-align: center;
  font-weight: normal;
  max-width: 40rem;
`
const Logo = () => (
  <Box width='48px'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="z0Svg_mdmmr9 z0Svg_3h4hbk z0Svg_mdmmr9 z0Svg_16d3ta3 z0Svg_f2dgne"><path fill="currentColor" d="M16 7 C13 7 2 9 2 16 C2 23 6 23 10 24 L11 28 L12 26 L20 26 L21 28 L22 24 C26 23 30 23 30 16 C30 9 19 7 16 7 M4 18 A4 4 0 0 1 12 18 A4 4 0 0 1 4 18 M20 18 A4 4 0 0 1 28 18 A4 4 0 0 1 20 18 "></path></svg>
  </Box>
)

const CustomInput = Input.extend`
  height: 64px;
`

const SearchBox = () => (
  <Box width={100} py={4}>
    <CustomInput
    height={'64px'}
    defaultValue='Hello'
    placeholder='Input'
  />
  </Box>
)

export default () => (
  <CustomBanner bg='#fafcfd'>
    <Flex justify='center' direction='column' align='center' p={3}>
      <Logo/>
      <Heading py={3} f={7} bold>Microlink</Heading>
      <CustomSubhead py={3} f={[4, 6]}>
        Extract beautiful information from any link
      </CustomSubhead>
      <SearchBox />
    </Flex>
  </CustomBanner>
)
