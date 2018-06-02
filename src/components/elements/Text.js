import { Text as TextBase } from 'rebass'
import { textAlign, lineHeight } from 'styled-system'
import { maxWidth } from 'helpers/style'

const Text = TextBase.extend`
  ${textAlign};
  ${lineHeight};
  ${maxWidth};
`

Text.defaultProps = {
  blacklist: [
    ...Object.keys(TextBase.propTypes),
    'maxWidth',
    'textAlign',
    'lineHeight'
  ]
}

export default Text
