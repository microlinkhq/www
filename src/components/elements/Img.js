import sys from '@rebass/components'
import { Image as ImageBase } from 'rebass'

const Img = sys(
  { extend: ImageBase },
  'maxWidth',
  'display',
  'textAlign',
  'borderRadius'
)

export default Img
