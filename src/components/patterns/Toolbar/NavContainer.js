import { Flex } from 'components/elements'
import styled from 'styled-components'

import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'

const NavContainer = styled(Flex)`
  height: ${TOOLBAR_HEIGHT};
  overflow-x: auto;
  overflow-y: hidden;
`

export default NavContainer
