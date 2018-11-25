import Text from './Text'
import { system } from 'helpers'

const Lead = system({ extend: Text })

Lead.defaultProps = {
  as: 'p',
  lineHeight: 3,
  fontWeight: 'normal',
  fontSize: [1, 4]
}

export default Lead
