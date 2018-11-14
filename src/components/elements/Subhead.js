import sys from '@rebass/components'
import Text from './Text'

const Subhead = sys({ extend: Text })

Subhead.displayName = 'Subhead'

Subhead.defaultProps = {
  is: 'h3',
  lineHeight: 4,
  fontWeight: 'regular',
  fontSize: [2, 4]
}

export default Subhead
