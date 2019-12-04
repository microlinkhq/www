import React from 'react'

import Flex from '../Flex'
import CodeEditor from '../CodeEditor/CodeEditor'

export default props => (
  <Flex
    as='iframe'
    width={CodeEditor.width}
    height={CodeEditor.height}
    frameBorder='0'
    target='_parent'
    {...props}
  />
)
