import { system } from 'helpers'
import Box from 'components/elements/Box'

const Column = system(
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
