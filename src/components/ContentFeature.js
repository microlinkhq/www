import React from 'react'

import {Image, Box, Flex, Measure} from 'rebass'
import { responsiveStyle, textAlign } from 'styled-system'

const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth'
})

const CustomBox = Box.extend`
${textAlign}
`

const CustomImage = Image.extend`
${maxWidth}
border-radius: 8px;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

export default ({
  image = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20',
  children,
  title,
  direction = 'left'
}) => (
  <Flex
    align={'center'}
    direction={['column', direction === 'left' ? 'row' : 'row-reverse']}
    justify='center'
  >
    <Box width={[1, 1]} px={4} pb={[4, 0]} style={{maxWidth: '512px'}}>
      <CustomImage src={image} width={['800px']} maxWidth={['100%', 'none']} />
    </Box>
    <CustomBox px={4} align={['center', 'left']}>
      <Measure>
        {children}
      </Measure>
    </CustomBox>
  </Flex>
)
