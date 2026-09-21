import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Text from 'components/elements/Text'

import { inline } from './inline-links'
import { ACCENT } from '../use-cases'

export const CodeStep = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

export const CodeBlock = ({ step, language = 'js', note, children }) => (
  <Box css={theme({ width: '100%', minWidth: 0 })}>
    <CodeStep css={theme({ color: ACCENT.text, pb: 2, display: 'block' })}>
      {step}
    </CodeStep>
    <CodeEditor
      language={language}
      autoHeight
      showFade={false}
      blinkCursor={false}
      css={theme({ width: '100%', maxWidth: '100%' })}
    >
      {children}
    </CodeEditor>
    {note && (
      <Text
        as='p'
        css={theme({ color: 'black70', fontSize: 1, lineHeight: 2, pt: 3 })}
      >
        {inline(note)}
      </Text>
    )}
  </Box>
)
