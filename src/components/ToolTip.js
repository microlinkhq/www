import React from 'react'
import {Tooltip} from 'react-lightweight-tooltip'
import styled, {keyframes} from 'styled-components'

const tooltipAnimation = keyframes`
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const TooltipWrapper = styled.div`
  > div {
    line-height: normal;
    font-weight: inherit;

    > div {
      animation ${tooltipAnimation} .35s forwards cubic-bezier(.215,.61,.355,1);
      font-weight: normal;
    }
  }
`

const STYLES = {
  wrapper: {
    color: 'inherit'
  },
  tooltip: {
    width: '300px',
    padding: '0 8px',
    lineHeight: '1.6',
    borderRadius: '2px',
    letterSpacing: 'normal'
    // fontSize: '.85rem'
  }
}

export default ({content, children, ...props}) => (
  <TooltipWrapper>
    <Tooltip
      styles={STYLES}
      content={content}>
      {children}
    </Tooltip>
  </TooltipWrapper>
)
