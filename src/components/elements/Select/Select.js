import styled from 'styled-components'
import { theme, transition, fonts } from 'theme'
import React from 'react'

import Box from '../Box'

const arrow = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='currentcolor'> <path d='M0 6 L32 6 L16 28 z' /> </svg>"
)

const ARROW_SIZE = '7px'

const StyledSelect = styled(Box)(
  {
    background: 'transparent',
    color: 'inherit',
    width: 'inherit',
    cursor: 'pointer',
    transition: `border-color ${transition.medium}`,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    appearance: 'none',
    backgroundImage: `url("${arrow}")`,
    backgroundPosition: `calc(100% - ${ARROW_SIZE}) center`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${ARROW_SIZE} ${ARROW_SIZE}`
  },
  theme({
    pl: '8px',
    pr: '4px',
    m: 0,
    border: 1,
    borderRadius: 2,
    fontFamily: fonts.sans,
    borderColor: 'black20',
    _hover: {
      '&:hover': {
        borderColor: 'black80'
      }
    },
    _focus: {
      borderColor: 'black80'
    },
    _disabled: {
      opacity: 1 / 4
    }
  })
)

const Select = props => <StyledSelect as='select' {...props} />

export default Select
