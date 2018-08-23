import { Flex as FlexBase } from 'rebass'
import system from 'system-components'

export const Flex = system(
  { is: FlexBase },
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
