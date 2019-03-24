import styled from 'styled-components'

import Button from './ButtonBase'

const ButtonSecondary = styled(Button)([])

ButtonSecondary.defaultProps = {
  ...Button.defaultProps,
  bg: 'link',
  color: 'white'
}

export default ButtonSecondary
