import React from 'react'
import { Subhead } from 'components/elements'

export default props => (
  <Subhead
    pt={[2, 0]}
    lineHeight={[2, 4]}
    color='gray'
    textAlign='center'
    fontWeight='normal'
    fontSize={[2, 4]}
    {...props}
  />
)
