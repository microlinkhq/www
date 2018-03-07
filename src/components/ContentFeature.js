import React from 'react'
import {Image, Flex, Measure} from 'rebass'
import CustomBox from './CustomBox'
import {maxWidth} from '../theme'

const CustomImage = Image.extend`
  ${maxWidth}
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

export default ({
  image = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20',
  children,
  title,
  flexDirection = 'left'
}) => (
  <Flex
    alignContent={'center'}
    flexDirection={['column', '', '', flexDirection === 'left' ? 'row' : 'row-reverse']}
    justifyContent='space-evenly'
  >
    <CustomBox width={1} px={4} pb={[4, '', '', 0]} maxWidth={['100%', '', '600px', '512px']}>
      <CustomImage src={image} width={['800px']} maxWidth={['100%', '', '', 'none']} />
    </CustomBox>
    <CustomBox px={4} align={['center', '', '', 'left']}>
      <Measure>
        {children}
      </Measure>
    </CustomBox>
  </Flex>
)
