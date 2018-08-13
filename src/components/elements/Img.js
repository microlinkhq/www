import system from 'system-components'
import { Img as ImgBase } from 'rebass'

const Img = system(
  { is: ImgBase },
  'maxWidth',
  'display',
  'textAlign',
  'borderRadius'
)

export default Img
