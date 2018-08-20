import Text from './Text'
import system from 'system-components'

const Caps = system(
  { is: Text },
  {
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  }
)

Caps.defaultProps = {
  fontSize: [0, 1]
}

export default Caps
