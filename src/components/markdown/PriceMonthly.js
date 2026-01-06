import React from 'react'
import PriceMonthlyBase from 'components/elements/PriceMonthly'
import Text from 'components/elements/Text'

export const PriceMonthly = props => (
  <Text
    as='span'
    css={`
      label {
        font-family: inherit;
        font-size: inherit;
      }
    `}
  >
    <PriceMonthlyBase {...props} />
  </Text>
)
