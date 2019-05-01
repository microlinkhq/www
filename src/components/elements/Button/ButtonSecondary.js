import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { rgba } from 'polished'

import Button from './ButtonPrimary'
import { BOX_SHADOW } from './ButtonBase'

const style = css`
  box-shadow: ${BOX_SHADOW} ${({ theme }) => rgba(theme.colors.link, 0.5)};
`

const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  `
})

const ButtonSecondary = styled(Button)`
  ${style};
  ${disabledStyle};
`

ButtonSecondary.defaultProps = {
  ...Button.defaultProps,
  bg: 'link',
  color: 'white'
}

export default ButtonSecondary
