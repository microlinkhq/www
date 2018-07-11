import { Flex as FlexBase } from 'rebass'
import system from 'system-components'

export const Flex = system(
  { is: FlexBase },
  'alignContent',
  'justifyContent',
  'flexDirection',
  'alignItems',
  'flexWrap'
)

Flex.displayName = 'Flex'

Flex.defaultProps = {}

export default Flex
