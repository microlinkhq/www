import { Box, Subhead, CodeEditor } from 'components/elements'
import { theme } from 'theme'
import React from 'react'

export function Story ({ name, children, code, ...props }) {
  return (
    <>
      <Subhead
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
        <CodeEditor language='jsx' css={theme({ ml: 4 })}>
          {code}
        </CodeEditor>
      )}
      <Box css={theme({ pb: 5 })} />
    </>
  )
}
