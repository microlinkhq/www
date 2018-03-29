import { textAlign } from 'styled-system'
import { Box as BoxBase } from 'rebass'

import { maxWidth } from '../helpers'

const Box = BoxBase.extend`
  ${textAlign} ${maxWidth};
`

Box.defaultProps = {
  blacklist: [...BoxBase.defaultProps.blacklist, 'maxWidth', 'textAlign']
}

export default Box
