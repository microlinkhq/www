import Box from 'components/elements/Box'
import SubheadBase from 'components/elements/Subhead'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { withTitle } from 'helpers/hoc/with-title'
import React from 'react'

const Subhead = withTitle(SubheadBase)

export function Story ({ name, children, code, ...props }) {
  return (
    <>
      <Subhead titleize={false} fontSize={3} textAlign='left'>
        {`<${name} />`}
      </Subhead>
      <Box data-story='content' py={4} {...props}>
        <Box display={['block', 'inline']}>
          {children}
        </Box>
      </Box>
      {code && (
        <Box mt={3}>
          <CodeEditor language='jsx'>
            {code}
          </CodeEditor>
        </Box>
      )}
      <Box pb={5} />
    </>
  )
}
