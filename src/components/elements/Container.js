import sys from '@rebass/components'

import Box from 'components/elements/Box'
import { layout } from 'theme'

const ContainerBase = sys(
  {
    extend: Box,
    px: 3,
    mx: 'auto',
    maxWidth: 1024
  },
  'maxWidth'
)

ContainerBase.displayName = 'Container'

const Container = sys({ extend: ContainerBase })

Container.defaultProps = {
  maxWidth: layout
}

export default Container
