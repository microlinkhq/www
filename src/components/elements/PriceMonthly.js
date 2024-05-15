import { childrenText } from 'helpers'
import styled from 'styled-components'
import React from 'react'
import { theme } from 'theme'

import Label, { labelStyle } from './Label'

const Price = styled(Label)`
  font-weight: bold;

  // TODO: it could be [1, 2]
  ${theme({ fontSize: [1, 2, 2, 2] })}

  &::before {
    content: '€';
    ${labelStyle};
    position: relative;
    top: -5px;
    left: 0;
  }
`

const PriceMonthly = props => {
  return (
    <Price
      aria-label={`${childrenText(props.children)} euros per month`}
      suffix='/month'
      {...props}
    />
  )
}

export default PriceMonthly
