'use strict'

import styled, { css, keyframes } from 'styled-components'
import { Box } from 'components/elements'

const HIGHLIGHT_DURATION = 1000

const animateHighlight = keyframes`
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
`

const highlightCss = css`
  animation-name: ${animateHighlight};
  animation-duration: ${HIGHLIGHT_DURATION}ms;
  animation-fill-mode: forwards;
`

const Highlight = styled(Box)`
  ${props => props.isHighlight && highlightCss};
`

Highlight.HIGHLIGHT_DURATION = HIGHLIGHT_DURATION

// export default (props) => (
//   <Highlight px={3} isHighlight={isHighlight} >
//     {children}
//   </Highlight>
// )

export default Highlight
