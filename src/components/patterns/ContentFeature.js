import React from 'react'
import { Image, Flex, Measure, Box } from 'components/elements'

import { maxWidth } from 'helpers'

const CustomImage = Image.extend`
  ${maxWidth} border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

CustomImage.defaultProps = {
  is: 'img',
  blacklist: [...Image.defaultProps.blacklist, 'maxWidth']
}

export default ({ image, children, title, flexDirection = 'left' }) => (
  <Flex
    alignContent={'center'}
    flexDirection={[
      'column',
      '',
      '',
      flexDirection === 'left' ? 'row' : 'row-reverse'
    ]}
    justifyContent='space-evenly'
  >
    <Box
      width={1}
      px={4}
      pb={[4, '', '', 0]}
      maxWidth={['100%', '', '600px', '512px']}
    >
      <CustomImage
        src={image}
        width={['800px']}
        maxWidth={['100%', '', '', 'none']}
      />
    </Box>
    <Box px={4} textAlign={['center', '', '', 'left']}>
      <Measure>{children}</Measure>
    </Box>
  </Flex>
)
