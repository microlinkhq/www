import CodeCopyBase from 'react-codecopy'
import styled from 'styled-components'
import { cx } from 'theme'
import React from 'react'

const CodeCopyWrapper = styled('div')`
  .codecopy__button {
    box-shadow: none;
    background: none;
    border: 0;
    padding: 0;
    position: relative;
    top: -2px;
    left: 0;
    right: 0;

    &[aria-label='Copied!']::after {
      right: 30px;
    }

    &[aria-label='Copy to clipboard']::after {
      right: 56px;
    }

    &:hover {
      background: none;
    }
  }

  .codecopy__button__light::before {
    border-bottom-color: black;
  }
  .codecopy__button__light::after {
    background: black;
  }

  .codecopy__button__dark::before {
    border-bottom-color: white;
  }
  .codecopy__button__dark::after {
    background: white;
    color: black;
  }

  .codecopy__icon {
    fill: ${({ isDark }) => cx(isDark ? 'white50' : 'black20')};

    &:hover {
      fill: ${({ isDark }) => cx(isDark ? 'white' : 'black')};
    }
  }
`

const CodeCopy = ({ isDark, ...props }) => (
  <CodeCopyWrapper isDark={isDark} {...props}>
    <CodeCopyBase theme={isDark ? 'dark' : 'light'} interactive {...props} />
  </CodeCopyWrapper>
)

export default CodeCopy
