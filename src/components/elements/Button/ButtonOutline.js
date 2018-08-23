import { ButtonOutline as OutlineBase } from 'rebass'
import styled from 'styled-components'
import { transition, colors } from 'theme'

const ButtonOutline = styled(OutlineBase)`
  transition: color, background-color ${transition.short};

  &:hover:not([disabled]) {
    cursor: pointer;
    box-shadow: none;
    color: ${props => colors[props.bg]};
    background-color: ${props => colors[props.color]};
  }

  &:disabled {
    opacity: 0.8;
  }
`

ButtonOutline.defaultProps = {
  bg: 'white',
  color: 'primary',
  borderRadius: 2
}

export default ButtonOutline
