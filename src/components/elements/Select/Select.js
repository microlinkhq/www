import styled from 'styled-components'
import { lighten } from 'polished'

import Box from '../Box'

import { colors, fonts } from 'theme'

const arrow = encodeURI(
  'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewbox=\'0 0 32 32\' fill=\'currentcolor\'> <path d=\'M0 6 L32 6 L16 28 z\' /> </svg>'
)

const ARROW_SIZE = '7px'

const Select = styled(Box)(
  {
    fontFamily: fonts.sans,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    appearance: 'none',
    border: 0,
    backgroundImage: `url("${arrow}")`,
    backgroundPosition: `calc(100% - ${ARROW_SIZE}) center`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${ARROW_SIZE} ${ARROW_SIZE}`,
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  props => ({
    '&:focus': {
      outline: 'none',
      boxShadow: `inset 0 0 0 1px ${lighten(0.15, colors.link)}`
    }
  })
)

Select.defaultProps = {
  as: 'select',
  py: '2px',
  pl: '8px',
  pr: '4px',
  mt: 0,
  mb: 0,
  mr: 0,
  ml: 0,
  width: 'inherit',
  borderColor: 'gray',
  boxShadow: 1,
  borderRadius: 2,
  color: 'inherit',
  bg: 'transparent'
}

export default Select
