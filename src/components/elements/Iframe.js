import React from 'react'

import Flex from './Flex'

export default props => (
  <Flex as='iframe' width='100%' frameBorder='0' target='_parent' {...props} />
)
