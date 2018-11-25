import { system } from 'helpers'
import { Box as BoxBase } from 'rebass'
import { variant } from 'styled-system'

const boxStyle = variant({ key: 'boxStyle' })

const Box = system(
  { extend: BoxBase },
  'textAlign',
  'maxWidth',
  'boxShadow',
  'display',
  boxStyle
)

export default Box
