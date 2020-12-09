'use strict'

import { highlight } from 'components/keyframes'
import styled, { css } from 'styled-components'
import { Box } from 'components/elements'

const HIGHLIGHT_DURATION = 1000

const highlightCss = css`
  animation-name: ${highlight};
  animation-duration: ${HIGHLIGHT_DURATION}ms;
`

const Highlight = styled(Box)`
  ${props => props.isHighlight && highlightCss};
`

Highlight.HIGHLIGHT_DURATION = HIGHLIGHT_DURATION

export default Highlight
