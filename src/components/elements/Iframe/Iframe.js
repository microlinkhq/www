import React from 'react'

import Flex from '../Flex'
import CodeEditor from '../CodeEditor/CodeEditor'

export default props => (
  <Flex
    as='iframe'
    mx='auto'
    width={CodeEditor.width}
    frameBorder='0'
    target='_parent'
    {...props}
  />
)
