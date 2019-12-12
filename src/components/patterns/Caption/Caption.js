import React from 'react'
import { Subhead } from 'components/elements'

export default props => (
  <Subhead
    pt={[0, 0, 2, 2]}
    lineHeight={2}
    textAlign='center'
    fontWeight='light'
    color='black80'
    fontSize={[3, 4, 4, 5]}
    {...props}
  />
)
