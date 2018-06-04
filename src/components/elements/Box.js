import { textAlign } from 'styled-system'
import { Box as BoxBase } from 'rebass'

import { maxWidth } from 'helpers/style'

const Box = BoxBase.extend`
  ${textAlign} ${maxWidth};
`

Box.defaultProps = {
  blacklist: [...Object.keys(BoxBase.propTypes), 'maxWidth', 'textAlign']
}

export default Box
