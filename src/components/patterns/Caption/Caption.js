import React from 'react'
import { Subhead } from 'components/elements'

const Caption = props => (
  <Subhead
    as='h3'
    lineHeight={2}
    textAlign='center'
    fontWeight='normal'
    {...props}
  />
)

Caption.defaultProps = {
  fontSize: [2, 2, 3, 3]
}

export default Caption
