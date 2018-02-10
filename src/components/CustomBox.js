import {textAlign, alignSelf} from 'styled-system'
import {Box} from 'rebass'
import {maxWidth} from '../theme'

export default Box.extend`
  ${alignSelf}
  ${textAlign}
  ${maxWidth}
`
