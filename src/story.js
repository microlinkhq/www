import { Box, Subhead, CodeEditor } from 'components/elements'
import { theme } from 'theme'
import React from 'react'

export function Story ({ name, children, code, ...props }) {
  return (
    <>
      <Subhead
        data-story='title'
        titleize={false}
        css={theme({
          fontSize: 3,
          textAlign: 'left'
        })}
      >
        {`<${name} />`}
      </Subhead>
      <Box
        data-story='content'
        css={theme({
          py: 4
        })}
        {...props}
      >
        <Box
          css={theme({
            display: ['block', 'inline']
          })}
        >
          {children}
        </Box>
      </Box>
      {code && (
        <CodeEditor
          css={theme({
            ml: 4
          })}
          language='jsx'
        >
          {code}
        </CodeEditor>
      )}
      <Box
        css={theme({
          pb: 5
        })}
      />
    </>
  )
}
