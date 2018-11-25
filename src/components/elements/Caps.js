import Text from './Text'
import { system } from 'helpers'

const Caps = system(
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
