import styled from 'styled-components'
import { theme } from 'theme'
import { fieldChrome, fieldChromeTokens } from '../field-chrome'
import React from 'react'

import Box from '../Box'

const arrow = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='currentcolor'> <path d='M0 6 L32 6 L16 28 z' /> </svg>"
)

const ARROW_SIZE = '7px'

const StyledSelect = styled(Box)(
  fieldChromeTokens,
  fieldChrome({
    focus: '&:focus-visible',
    invalid: "&[aria-invalid='true']",
    disabled: '&:disabled'
  }),
  {
    width: 'inherit',
    cursor: 'pointer',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    appearance: 'none',
    backgroundImage: `url("${arrow}")`,
    backgroundPosition: `calc(100% - ${ARROW_SIZE}) center`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${ARROW_SIZE} ${ARROW_SIZE}`,
    '&:focus-visible': {
      outline: 'none'
    }
  },
  theme({
    pl: 2,
    pr: '20px',
    m: 0,
    fontFamily: 'sans'
  })
)

const Select = props => <StyledSelect as='select' {...props} />

export default Select
