import React from 'react'
import sys from '@rebass/components'

import Text from 'components/elements/Text'

const Base = props => <Text {...props} as='small' />

export const Small = sys({
  extend: Base,
  fontSize: 0
})

Small.displayName = 'Small'

export default Small
