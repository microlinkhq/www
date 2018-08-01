import { Text as TextBase } from 'rebass'
import { variant } from 'styled-system'
import system from 'system-components'

const textStyle = variant({ key: 'textStyle' })

const Text = system({ is: TextBase }, 'maxWidth', textStyle)

Text.defaultProps = {
  is: 'p',
  fontFamily: 'sans',
  lineHeight: 3
}

export default Text
