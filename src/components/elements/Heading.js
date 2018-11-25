import Text from './Text'
import { system } from 'helpers'

const Heading = system({ extend: Text })

Heading.defaultProps = {
  is: 'h2',
  lineHeight: 1,
  textAlign: 'center',
  fontWeight: 'regular',
  fontSize: [4, 6],
  variant: 'gradient'
}

export default Heading
