import React from 'react'
import sys from 'system-components'
import { Heading } from 'rebass'

const Base = props => <Heading is='h3' {...props} />

export const Subhead = sys(
  {
    is: Base,
    fontSize: 4
  },
  'space'
)

Subhead.displayName = 'Subhead'

export default Subhead
