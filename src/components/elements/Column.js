import sys from '@rebass/components'
import Box from 'components/elements/Box'

const Column = sys(
  {
    extend: Box,
    px: 3,
    mb: 4,
    flex: '1 1 auto'
  },
  'flex'
)

Column.displayName = 'Column'

export default Column
