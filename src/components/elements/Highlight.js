'use strict'

import React, { useState, useCallback } from 'react'
import { highlight } from 'components/keyframes'
import styled, { css } from 'styled-components'
import { usePrevious } from 'components/hook'
import { Box } from 'components/elements'

const HIGHLIGHT_DURATION = 1000

const highlightCss = css`
  animation-name: ${highlight};
  animation-duration: ${HIGHLIGHT_DURATION}ms;
`

const HighlightBase = styled(Box)`
  ${props => props.$isHighlight && highlightCss};
`

const Highlight = ({ sx, ...props }) => {
  const [, updateState] = useState()
  const previous = usePrevious(props.children)
  const forceUpdate = useCallback(() => updateState({}), [])

  const isHighlight = previous ? props.children !== previous : false
  if (isHighlight) setTimeout(forceUpdate, HIGHLIGHT_DURATION)

  return <HighlightBase $isHighlight={isHighlight} {...props} />
}

export default Highlight
