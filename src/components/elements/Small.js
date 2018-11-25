import React from 'react'
import { system } from 'helpers'

import Text from 'components/elements/Text'

const Base = props => <Text {...props} as='small' />

export const Small = system({
  extend: Base,
  fontSize: 0
})

Small.displayName = 'Small'

export default Small
