import Text from './Text'
import sys from '@rebass/components'

const Lead = sys({ extend: Text })

Lead.defaultProps = {
  is: 'p',
  lineHeight: 3,
  fontWeight: 'normal',
  fontSize: [1, 4]
}

export default Lead
