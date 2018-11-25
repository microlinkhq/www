import { system } from 'helpers'
import { Flex as FlexBase } from 'rebass'

const Flex = system(
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
