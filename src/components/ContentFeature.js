import React from 'react'

import {Image, Box, Text, Flex, Subhead} from 'rebass'

export default ({direction = 'left'}) => (
  <Flex align='center' direction={direction === 'left' ? 'row' : 'row-reverse'}>
    <Box m='auto' width={0.8} px={6}>
      <Image
        src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
      />
    </Box>
    <Box style={{textAlign: direction}}>
      {[1, 2, 3].map((item) => (
        <Box key={item} pb={4}>
          <Subhead>Feature One</Subhead>
          <Text py={3}>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences.</Text>
        </Box>
      ))}
    </Box>
  </Flex>
)
