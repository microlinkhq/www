import { Text as TextBase } from 'rebass'
import { textAlign, lineHeight } from 'styled-system'

const Text = TextBase.extend`
  ${textAlign};
  ${lineHeight};
  max-width: ${props => props.maxWidth};
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
