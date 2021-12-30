import CodeCopyBase from 'react-codecopy'
import styled from 'styled-components'
import { cx } from 'theme'
import React from 'react'

const CodeCopyWrapper = styled('div')`
  .codecopy_button {
    &:hover {
      box-shadow: none;
    }

    svg {
      fill: ${({ theme }) => cx(theme === 'dark' ? 'white50' : 'black20')};

      &:hover {
        fill: ${({ theme }) => cx(theme === 'dark' ? 'white' : 'black')};
      }
    }

    background: none;
    border: 0;
    padding: 0;
    position: relative;
    top: -2px;
    left: 0;
    right: 0;
  }
`

const CodeCopy = props => (
  <CodeCopyWrapper {...props}>
    <CodeCopyBase {...props} />
  </CodeCopyWrapper>
)

export default CodeCopy
