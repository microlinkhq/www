import { Box, Subhead, CodeEditor } from 'components/elements'
import React from 'react'

export function Story ({ name, children, code, ...props }) {
  return (
    <>
      <Subhead fontSize={3} textAlign='left' titleExclude={[name]}>
        {`<${name} />`}
      </Subhead>
      <Box pt={4} pb={4} pl={4} as='article' {...props}>
        <Box display={['block', 'inline']}>{children}</Box>
      </Box>
      {code && <CodeEditor ml={4} language='jsx' children={code} />}
      <Box pb={5} />
    </>
  )
}
