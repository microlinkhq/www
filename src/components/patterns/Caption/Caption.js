import React from 'react'
import { Subhead } from 'components/elements'

export default props => (
  <Subhead
    as='h3'
    lineHeight={2}
    textAlign='center'
    fontWeight='light'
    color='black80'
    fontSize={[3, 4, 4, 5]}
    {...props}
  />
)
