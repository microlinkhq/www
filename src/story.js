import React, { Fragment } from 'react'
import { Box, Subhead, CodeEditor } from 'components/elements'

export function Story ({ name, children, code, ...props }) {
  return (
    <Fragment>
      <Subhead textAlign='left'>{`<${name} />`}</Subhead>
      <Box as='article' mt={3} mb={4} {...props}>
        <Box display={['block', 'inline']}>{children}</Box>
      </Box>
      {code && <CodeEditor language='jsx'>{code}</CodeEditor>}
      <Box pb={2} mb={4} />
    </Fragment>
  )
}
