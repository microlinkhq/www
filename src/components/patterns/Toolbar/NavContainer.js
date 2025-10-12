import { hideScrollbar } from 'helpers/style'
import Flex from 'components/elements/Flex'
import styled from 'styled-components'

import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'

const NavContainer = styled(Flex)`
  height: ${TOOLBAR_PRIMARY_HEIGHT};
  overflow-x: auto;
  overflow-y: hidden;
  ${hideScrollbar};
`

export default NavContainer
