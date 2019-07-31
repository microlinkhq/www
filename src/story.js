import React, { Fragment } from 'react'
import { Box, Subhead, CodeEditor } from 'components/elements'

export function Story ({ name, children, code, ...props }) {
  return (
    <Fragment>
      <Subhead fontSize={3} textAlign='left'>{`<${name} />`}</Subhead>
      <Box pt={4} pb={4} pl={4} as='article' {...props}>
        <Box display={['block', 'inline']}>{children}</Box>
      </Box>
      {code && (
        <Box pl={4}>
          <CodeEditor language='jsx'>{code}</CodeEditor>
        </Box>
      )}
      <Box pb={5} />
    </Fragment>
  )
}
