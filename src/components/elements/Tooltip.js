import system from 'system-components'
import { Tooltip as TooltipBase } from 'rebass'
import styled, { keyframes } from 'styled-components'
import { space, lineHeights, fontWeights, fontSizes, transition } from 'theme'

const Tooltip = system({ is: TooltipBase }, 'space')

const fadeIn = keyframes`
from {
  opacity:0;
} to {
  opacity:1;
}
`

export default styled(Tooltip)`
  &::after {
    animation: ${fadeIn} ${transition.medium};
  }
  &::before {
    animation: ${fadeIn} ${transition.medium};
    width: 300px;
    padding: ${space[3]}px;
    line-height: ${lineHeights[3]};
    letter-spacing: normal;
    text-align: center;
    font-size: ${fontSizes[0]}px;
    white-space: inherit;
    font-weight: ${fontWeights.normal};
  }
`
