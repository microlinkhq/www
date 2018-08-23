import { Button as ButtonBase } from 'rebass'
import styled from 'styled-components'
import { transition } from 'theme'

const Button = styled(ButtonBase)`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: opacity ${transition.short};

  &:hover:not([disabled]) {
    opacity: 0.8;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.8;
  }
`

Button.defaultProps = {
  bg: 'primary',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 2
}

export default Button
