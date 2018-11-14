import Text from './Text'
import sys from '@rebass/components'

const Heading = sys({ extend: Text })

Heading.defaultProps = {
  is: 'h2',
  lineHeight: 1,
  textAlign: 'center',
  fontWeight: 'regular',
  fontSize: [4, 6],
  variant: 'gradient'
}

export default Heading
