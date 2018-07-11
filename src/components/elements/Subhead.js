import system from 'system-components'
import { Heading as HeadingBase } from 'rebass'

export const Subhead = system(
  { is: HeadingBase },
  'space',
  'lineHeight',
  'textAlign',
  'color',
  'fontWeight',
  'fontSize'
)

Subhead.displayName = 'Subhead'

Subhead.defaultProps = {
  is: 'h3',
  fontSize: 4
}

export default Subhead
