import Text from './Text'
import system from 'system-components'

const Caps = system(
  {
    is: Text,
    letterSpacing: '0.2em'
  },
  {
    textTransform: 'uppercase'
  }
)

Caps.defaultProps = {
  is: 'p',
  fontSize: 1,
  blacklist: [...Object.keys(Text.propTypes)]
}

export default Caps
