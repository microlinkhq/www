import system from 'system-components'
import { Image as ImageBase } from 'rebass'

const Img = system(
  { is: ImageBase },
  'maxWidth',
  'display',
  'textAlign',
  'borderRadius'
)

export default Img
