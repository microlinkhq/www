import styled from 'styled-components'

import Button from './ButtonBase'

const ButtonSecondary = styled(Button)([])

ButtonSecondary.defaultProps = {
  ...Button.defaultProps,
  bg: 'primary',
  color: 'white'
}

export default ButtonSecondary
