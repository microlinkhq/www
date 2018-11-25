import { system } from 'helpers'
import Text from './Text'

const Subhead = system({ extend: Text })

Subhead.displayName = 'Subhead'

Subhead.defaultProps = {
  as: 'h3',
  lineHeight: 4,
  fontWeight: 'regular',
  fontSize: [2, 4]
}

export default Subhead
