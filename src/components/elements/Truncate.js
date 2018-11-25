import { system } from 'helpers'

import Text from 'components/elements/Text'

const Truncate = system(
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
