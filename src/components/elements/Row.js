import sys from '@rebass/components'
import { Flex } from 'components/elements/Flex'

const Row = sys({
  extend: Flex,
  mx: -3
})

Row.displayName = 'Row'

export default Row
