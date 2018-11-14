import sys from '@rebass/components'
import { Box as BoxBase } from 'rebass'
import { variant } from 'styled-system'

const boxStyle = variant({ key: 'boxStyle' })

const Box = sys(
  { extend: BoxBase },
  'textAlign',
  'maxWidth',
  'boxShadow',
  'display',
  boxStyle
)

export default Box
