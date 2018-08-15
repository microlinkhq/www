import Text from './Text'
import system from 'system-components'

const Heading = system({ is: Text })

Heading.defaultProps = {
  is: 'h2',
  lineHeight: 1,
  textAlign: 'center',
  fontWeight: 'regular',
  fontSize: [4, 6],
  variant: 'gradient'
}

export default Heading
