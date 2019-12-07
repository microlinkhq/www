import React from 'react'
import { Subhead } from 'components/elements'

export default props => (
  <Subhead
    pt={[2, 0]}
    lineHeight={[2, 2, 2, 4]}
    textAlign='center'
    fontWeight='light'
    color='black80'
    fontSize={[4, 4, 4, 5]}
    {...props}
  />
)
