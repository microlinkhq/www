import styled from 'styled-components'
import { colors } from 'theme'
import Text from './Text'

const Input = styled(Text)(
  {
    display: 'block',
    maxWidth: '100%'
  },
  prop => ({
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

Input.defaultProps = {
  ...Text.defaultProps,
  as: 'input',
  type: 'text',
  lineHeight: 'inherit',
  px: 1,
  py: 2,
  m: 0,
  width: 1,
  border: 0,
  borderColor: 'gray',
  color: 'inherit',
  bg: 'transparent'
}

export default Input
