import React from 'react'

import {Image, Box, Flex, Measure} from 'rebass'
import { textAlign } from 'styled-system'

const CustomBox = Box.extend`
${textAlign}
`

export default ({
  image = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20',
  children,
  title,
  direction = 'left'
}) => (
  <Flex
    align={['center', 'end']}
    direction={['column', direction === 'left' ? 'row' : 'row-reverse']}
    justify='center'
  >
    <Box width={[1, 1]} px={4} pb={[4, 0]} style={{maxWidth: '512px'}}>
      <Image src={image} width={['800px']} style={{
        maxWidth: 'none',
        borderRadius: '8px',
        boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
      }} />
    </Box>
    <CustomBox px={4} align={['left', direction]}>
      <Measure>
        {children}
      </Measure>
    </CustomBox>
  </Flex>
)
