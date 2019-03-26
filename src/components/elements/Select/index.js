import { themeGet } from 'styled-system'
import styled from 'styled-components'

import Box from '../Box'

const arrow = encodeURI(
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='currentcolor'> <path d='M0 6 L32 6 L16 28 z' /> </svg>`
)

const Select = styled(Box)(
  {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    appearance: 'none',
    border: 0,
    backgroundImage: `url("${arrow}")`,
    backgroundPosition: 'calc(100% - 8px) center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '8px 8px',
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  props => ({
    '&:focus': {
      outline: 'none',
      boxShadow: `inset 0 0 0 1px ${themeGet('colors.blue')(props)}`
    }
  })
)

Select.defaultProps = {
  ...Box.defaultProps,
  as: 'select',
  pt: '2px',
  pb: '2px',
  pr: 1,
  pl: '8px',
  m: 0,
  width: 1,
  borderColor: 'gray',
  boxShadow: 1,
  borderRadius: 2,
  color: 'inherit',
  bg: 'transparent'
}

export default Select
