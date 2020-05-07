import React from 'react'
import Tippy from '@tippyjs/react'
import { Box, Text } from 'components/elements'
import { speed } from 'theme'
import styled from 'styled-components'

import 'tippy.js/dist/tippy.css'

const TooltipText = props => (
  <Text fontSize={1} fontWeight='normal' {...props} />
)

const TippyContainer = styled(Box)`
  outline: 0;
  cursor: help;
`

const Tooltip = ({ content, children, tooltipsOpts, ...props }) => {
  if (!content) return children

  return (
    <Tippy
      content={
        typeof content === 'string'
          ? TooltipText({ children: content })
          : content
      }
      {...tooltipsOpts}
    >
      <TippyContainer {...props}>{children}</TippyContainer>
    </Tippy>
  )
}

Tooltip.defaultProps = {
  tooltipsOpts: {
    arrow: true,
    animation: 'fade',
    duration: speed.normal,
    hideOnClick: false
  }
}

export default Tooltip
