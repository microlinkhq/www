import { Heading as HeadingBase } from 'rebass'
import { maxWidth, lineHeight } from 'helpers/style'

const Heading = HeadingBase.extend`
  ${lineHeight};
  ${maxWidth};
`

Heading.defaultProps = {
  fontWeight: 'bold',
  blacklist: [...Object.keys(HeadingBase.propTypes), 'maxWidth', 'lineHeight'],
  maxWidth: 'inherit'
}

export default Heading
