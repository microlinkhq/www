import React from 'react'

import {Image, Box, Flex, Measure} from 'rebass'
import { textAlign } from 'styled-system'

const CustomBox = Box.extend`
${textAlign}
`

export default ({children, title, direction = 'left'}) => (
  <Flex
    align={['center', 'end']}
    direction={['column', direction === 'left' ? 'row' : 'row-reverse']}
    justify='center'
  >
    <Box width={[1, 1]} px={4} pb={[4, 0]} style={{maxWidth: '512px'}}>
      <Image
        src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
      />
    </Box>
    <CustomBox px={4} align={['left', direction]}>
      <Measure>
        {children}
      </Measure>
    </CustomBox>
  </Flex>
)
