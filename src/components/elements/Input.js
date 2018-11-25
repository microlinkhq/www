import { system } from 'helpers'
import { colors } from 'theme'

export const Input = system(
  {
    as: 'input',
    type: 'text',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    px: 1,
    py: 2,
    m: 0,
    width: 1,
    border: 0,
    borderColor: 'gray',
    // boxShadow: 1,
    borderRadius: 2,
    color: 'inherit',
    bg: 'transparent'
  },
  props => ({
    fontFamily: 'inherit',
    display: 'inline-block',
    verticalAlign: 'middle',
    border: 0,
    appearance: 'none',
    '&:focus': {
      outline: 'none',
      boxShadow: `inset 0 0 0 1px ${colors.blue500}`
    },
    '&:disabled': {
      opacity: 1 / 4
    }
  })
)

Input.displayName = 'Input'

export default Input
