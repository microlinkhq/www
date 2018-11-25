import { system } from 'helpers'
import { Flex } from 'components/elements/Flex'

const Row = system({
  extend: Flex,
  mx: -3
})

Row.displayName = 'Row'

export default Row
