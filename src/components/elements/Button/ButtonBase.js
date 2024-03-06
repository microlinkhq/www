import { transition, theme } from 'theme'
import styled from 'styled-components'
import Text from '../Text'

const getColor = ({ theme, variant }, propName) =>
  theme.colors[theme.variants.button[variant][propName]]

export const getColorVariant = propName => props => getColor(props, propName)

const Button = styled(Text).withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop)
})(
  props => {
    return {
      transition: `background-color ${transition.medium}, color ${transition.medium}, box-shadow ${transition.medium}`,
      appearance: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 16 / 14,
      textDecoration: 'none',
      verticalAlign: 'middle',
      WebkitFontSmoothing: 'antialiased',
      whiteSpace: 'nowrap',
      outline: 0,
      '&:hover': {
        cursor: 'pointer'
      },
      color: getColorVariant('color'),
      background: getColorVariant('background'),
      boxShadow: props.variant === 'white' ? '0 0 0 1px black' : undefined
    }
  },
  theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    px: 3,
    py: 2,
    border: 0,
    borderRadius: 2
  })
)

Button.defaultProps = {
  as: 'button',
  variant: 'base'
}

export default Button
