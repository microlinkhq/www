import styled from 'styled-components'

import Box from '../Box'

import { transition, colors, fonts } from 'theme'

const arrow = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='currentcolor'> <path d='M0 6 L32 6 L16 28 z' /> </svg>"
)

const ARROW_SIZE = '7px'

const Select = styled(Box)({
  fontFamily: fonts.sans,
  cursor: 'pointer',
  transition: `border-color ${transition.medium}`,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  appearance: 'none',
  border: `1px solid ${colors.black20}`,
  backgroundImage: `url("${arrow}")`,
  backgroundPosition: `calc(100% - ${ARROW_SIZE}) center`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${ARROW_SIZE} ${ARROW_SIZE}`,
  '&:disabled': {
    opacity: 1 / 4
  },
  '&:focus': {
    outline: 'none',
    border: `1px solid ${colors.black80}`
  },
  '&:hover': {
    border: `1px solid ${colors.black80}`
  }
})

Select.defaultProps = {
  as: 'select',
  pl: '8px',
  pr: '4px',
  mt: 0,
  mb: 0,
  mr: 0,
  ml: 0,
  width: 'inherit',
  borderRadius: 2,
  color: 'inherit',
  bg: 'transparent'
}

export default Select
