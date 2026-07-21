import { fonts, fontSizes, fontWeights, lineHeights, space, theme } from 'theme'

import styled from 'styled-components'

import { TerminalText } from 'components/elements/Terminal/Terminal'

export const fontStyles = {
  fontFamily: fonts.mono,
  fontSize: fontSizes[0],
  lineHeight: lineHeights[4],
  letterSpacing: '0px',
  fontWeight: fontWeights.normal,
  tabSize: 2
}

export const Content = styled(TerminalText)`
  padding: 0 ${space[2]};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  ${theme(fontStyles)}

  code {
    ${theme({ display: 'block', whiteSpace: 'pre' })}
  }

  .code-line {
    ${theme({ display: 'inline-block', width: '100%', mb: 1 })}
  }
`
