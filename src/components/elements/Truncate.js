import sys from '@rebass/components'

import Text from 'components/elements/Text'

const Truncate = sys(
  {
    extend: Text
  },
  {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
)

Truncate.displayName = 'Truncate'

export default Truncate
