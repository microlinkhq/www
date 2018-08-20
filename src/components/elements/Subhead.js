import system from 'system-components'
import Text from './Text'

const Subhead = system({ is: Text })

Subhead.displayName = 'Subhead'

Subhead.defaultProps = {
  is: 'h3',
  lineHeight: 4,
  fontWeight: 'regular',
  fontSize: [2, 4]
}

export default Subhead
