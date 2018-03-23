import { ButtonOutline as Outline } from 'rebass'
import styled from 'styled-components'
import { colors } from 'theme'

import baseStyle from './base'

const OutlineButton = styled(Outline)`
  ${baseStyle} transition: color, background-color .15s;

  &:hover {
    color: ${props => colors[props.bg]};
    background-color: ${props => colors[props.color]};
  }
`

OutlineButton.defaultProps = {
  bg: 'white',
  color: 'primary',
  borderRadius: 2
}

export default OutlineButton
