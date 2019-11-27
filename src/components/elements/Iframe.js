import React from 'react'

import { aspectRatio } from 'helpers'

import Flex from './Flex'

export default props => (
  <Flex
    as='iframe'
    width={aspectRatio.widths}
    height={aspectRatio.heights}
    frameBorder='0'
    target='_parent'
    {...props}
  />
)
