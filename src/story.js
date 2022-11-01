import { Box, Subhead, CodeEditor } from 'components/elements'
import React from 'react'

export function Story ({ name, children, code, ...props }) {
  return (
    <>
      <Subhead
        data-story='title'
        fontSize={3}
        textAlign='left'
        titleize={false}
      >
        {`<${name} />`}
      </Subhead>
      <Box data-story='content' py={4} {...props}>
        <Box display={['block', 'inline']}>{children}</Box>
      </Box>
      {code && (
        <CodeEditor ml={4} language='jsx'>
          {code}
        </CodeEditor>
      )}
      <Box pb={5} />
    </>
  )
}
