import React from 'react'
import Tippy from '@tippy.js/react'
import { Box, Text } from 'components/elements'
import { speed } from 'theme'

const TooltipText = props => (
  <Text fontSize={1} fontWeight='normal' {...props} />
)

const Tooltip = ({ content, children, ...props }) => {
  if (!content) return children

  return (
    <Tippy
      content={
        typeof content === 'string'
          ? TooltipText({ children: content })
          : content
      }
      {...props}
    >
      <Box
        css={`
          outline: 0;
          cursor: help;
        `}
      >
        {children}
      </Box>
    </Tippy>
  )
}

Tooltip.defaultProps = {
  ...Tippy.defaultProps,
  duration: speed.medium,
  arrow: true,
  animation: 'fade',
  hideOnClick: false
}

export default Tooltip
