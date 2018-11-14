import sys from '@rebass/components'

import Img from 'components/elements/Img'

const Avatar = sys(
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
