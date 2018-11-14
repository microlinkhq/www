import Text from './Text'
import sys from '@rebass/components'

const Caps = sys(
  { extend: Text },
  {
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  }
)

Caps.defaultProps = {
  fontSize: [0, 1]
}

export default Caps
