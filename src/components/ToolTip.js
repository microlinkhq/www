import React from 'react'
import ReactARIAToolTip from 'react-aria-tooltip'
import {keyframes} from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Tooltip = ReactARIAToolTip.extend`
cursor: help;

.ra-tooltip {
  animation ${fadeIn} .35s forwards cubic-bezier(.215,.61,.355,1);
}
`

export default ({content, children, ...props}) => (
  <Tooltip
    eventType='hover'
    message={[content]}>
    {children}
  </Tooltip>
)
