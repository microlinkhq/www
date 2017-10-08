import React from 'react'
import {Flex, Banner, Heading, Subhead} from 'rebass'
import {textGradient} from '../../theme'

import Logo from '../Logo'
import SearchBox from './SearchBox'

const CustomBanner = Banner.extend`min-height: 100vh;`

const CustomSubhead = Subhead.extend`
  ${textGradient} text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

export default () => (
  <CustomBanner bg='#fafcfd'>
    <Flex justify='center' direction='column' align='center' p={3}>
      <Logo />
      <Heading py={3} f={7} bold>
        Microlink
      </Heading>
      <CustomSubhead py={5} f={[4, 6]}>
        Extract beautiful information from any link
      </CustomSubhead>
      <SearchBox />
    </Flex>
  </CustomBanner>
)
