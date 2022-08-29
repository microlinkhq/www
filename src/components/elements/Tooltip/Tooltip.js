import { Box, Text } from 'components/elements'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import React from 'react'

import { space, radii, colors, shadows, speed } from 'theme'

const TOOLTIPS_OPTS = {
  arrow: true,
  duration: [speed.normal, speed.quickly],
  hideOnClick: false,
  interactive: true
}

const TippyTheme = styled(Tippy)`
  box-shadow: ${shadows[0]};
  border-radius: ${radii[2]};
  background-color: ${colors.white};
  position: relative;
  top: ${({ $top }) => $top};

  .tippy-arrow {
    width: 16px;
    height: 16px;
    color: ${colors.white};
  }

  .tippy-arrow:before {
    content: '';
    position: absolute;
    border-color: transparent;
    border-style: solid;
  }

  .tippy-content {
    position: relative;
    padding: ${space[2]} ${space[3]};
    z-index: 1;
  }

  &[data-placement^='top'] > .tippy-arrow {
    bottom: 0;
  }

  &[data-placement^='top'] > .tippy-arrow:before {
    bottom: -7px;
    left: 0;
    border-width: 8px 8px 0;
    border-top-color: initial;
    transform-origin: center top;
  }

  &[data-animation='fade'][data-state='hidden'] {
    opacity: 0;
  }
`

const TippyContainer = styled(Box)`
  outline: 0;
  cursor: help;
`

const TooltipContent = props => <Text fontSize={0} {...props} />

const Tooltip = ({
  content,
  children,
  tooltipsOpts,
  containerProps,
  top,
  ...props
}) => {
  return (
    <TippyTheme
      $top={top}
      content={content}
      {...Object.assign(TOOLTIPS_OPTS, tooltipsOpts)}
    >
      <TippyContainer {...props}>{children}</TippyContainer>
    </TippyTheme>
  )
}

Tooltip.Content = TooltipContent

export default Tooltip
