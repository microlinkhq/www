import React from 'react'

import Flex from '../Flex'
import CodeEditor from '../CodeEditor/CodeEditor'

export default ({
  width = CodeEditor.width,
  height = CodeEditor.height,
  ...props
}) => (
  <Flex
    as='iframe'
    mx='auto'
    frameBorder='0'
    target='_parent'
    height={height}
    width={width}
    {...props}
  />
)
