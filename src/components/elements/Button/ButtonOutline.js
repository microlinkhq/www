import styled, { css } from 'styled-components'
import { transition, colors } from 'theme'
import { themeGet } from 'styled-system'

import Button from './Button'

const style = css`
  transition: color, background-color ${transition.short};

  &:hover:not([disabled]) {
    cursor: pointer;
    box-shadow: none;
    color: ${props => colors[props.bg]};
    background-color: ${props => colors[props.color]};
  }
`

const ButtonOutline = styled(Button)(
  props => ({
    boxShadow: `inset 0 0 0 2px ${themeGet(
      'colors.' + props.color,
      props.color
    )(props)}`
  }),
  props => ({
    '&:hover:not([disabled])': {
      opacity: 1
    }
  }),
  style
)

ButtonOutline.defaultProps = {
  ...Button.defaultProps,
  bg: 'white',
  color: 'primary'
}

export default ButtonOutline
