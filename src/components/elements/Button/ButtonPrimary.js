import styled, { css } from 'styled-components'
import { createCssState } from 'helpers'

import Button from './ButtonBase'

const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    opacity: 0.8;
  `
})

const ButtonPrimary = styled(Button)`
  ${disabledStyle};
`

ButtonPrimary.defaultProps = {
  ...Button.defaultProps
}

export default ButtonPrimary
