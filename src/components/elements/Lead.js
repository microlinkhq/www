import Text from './Text'
import system from 'system-components'

const Lead = system({ is: Text })

Lead.defaultProps = {
  is: 'p',
  lineHeight: 3,
  fontWeight: 'normal',
  fontSize: [3, 4]
}

export default Lead
