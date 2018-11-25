import { system } from 'helpers'
import { Image as ImageBase } from 'rebass'

const Img = system(
  { extend: ImageBase },
  'maxWidth',
  'display',
  'textAlign',
  'borderRadius'
)

export default Img
