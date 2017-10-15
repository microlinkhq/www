import React from 'react'

import {Image, Box, Text, Flex, Subhead} from 'rebass'
import { textAlign } from 'styled-system'

const CustomBox = Box.extend`
${textAlign}
`

export default ({direction = 'left'}) => (
  <Flex
    align={['center', 'end']}
    direction={['column', direction === 'left' ? 'row' : 'row-reverse']}
  >
    <Box width={[1, 0.8]} px={4} pb={[4, 0]}>
      <Image
        src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
      />
    </Box>
    <CustomBox px={4} align={['left', direction]}>
      {[1, 2, 3].map((item, index) => (
        <Box key={item} pb={4}>
          <Subhead pt={index === 0 ? 2 : 0}>Feature One</Subhead>
          <Text py={3}>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences.</Text>
        </Box>
      ))}
    </CustomBox>
  </Flex>
)
