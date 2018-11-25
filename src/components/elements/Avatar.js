import { system } from 'helpers'

import Img from 'components/elements/Img'

const Avatar = system(
  {
    extend: Img,
    size: 48,
    borderRadius: '99999px'
  },
  {
    display: 'inline-block'
  },
  'borderRadius',
  'space',
  'color',
  'size'
)

Avatar.displayName = 'Avatar'

export default Avatar
