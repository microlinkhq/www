import React from 'react'

import Flex from './Flex'

export default props => (
  <Flex width='100%' as='iframe' frameBorder='0' target='_parent' {...props} />
)
