import { childrenText } from 'helpers'
import styled from 'styled-components'
import React from 'react'

import Label, { labelStyle } from './Label'

const Price = styled(Label)`
  font-weight: bold;

  &::before {
    content: '€';
    ${labelStyle};
    position: relative;
    top: -5px;
    left: 0;
  }
`

Price.defaultProps = {
  fontSize: [1, 2, 2, 2]
}

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
