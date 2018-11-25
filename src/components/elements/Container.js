import { system } from 'helpers'

import Box from 'components/elements/Box'
import { layout } from 'theme'

const ContainerBase = system(
  {
    extend: Box,
    px: 3,
    mx: 'auto',
    maxWidth: 1024
  },
  'maxWidth'
)

ContainerBase.displayName = 'Container'

const Container = system({ extend: ContainerBase })

Container.defaultProps = {
  maxWidth: layout
}

export default Container
