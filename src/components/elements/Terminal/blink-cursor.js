import { css } from 'styled-components'

import { blink } from 'components/keyframes'
import { colors } from 'theme'

export const blinkCursorLayoutStyle = css`
  && {
    display: inline-block;
    width: auto;
    max-width: 100%;
    vertical-align: top;
  }
`

export const blinkCursorCodeLayoutStyle = css`
  ${blinkCursorLayoutStyle}

  pre {
    display: inline;
    margin: 0;
    vertical-align: top;
  }

  code {
    display: inline;
    white-space: pre;
  }
`

export const blinkCursorStyle = css`
  &::after {
    left: -8px;
    content: '';
    animation-name: ${blink};
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
    animation-duration: 1s;
    display: inline-block;
    width: 1px;
    height: 14px;
    background: ${colors.secondary};
    margin-left: 4px;
    position: relative;
    top: 2px;
    margin-right: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 1;
    }
  }
`
