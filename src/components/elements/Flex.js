import sys from '@rebass/components'
import { Flex as FlexBase } from 'rebass'

const Flex = sys(
  { extend: FlexBase },
  'alignContent',
  'justifyContent',
  'flexDirection',
  'alignItems',
  'flexWrap',
  'maxWidth',
  'lineHeight',
  'borderRadius',
  'boxShadow'
)

Flex.displayName = 'Flex'

export default Flex
