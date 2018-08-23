import system from 'system-components'
import { Box as BoxBase } from 'rebass'
import { variant } from 'styled-system'

const boxStyle = variant({ key: 'boxStyle' })

const Box = system(
  { is: BoxBase },
  'textAlign',
  'maxWidth',
  'boxShadow',
  'display',
  boxStyle
)

export default Box
