import { hideScrollbar } from 'helpers/style'
import Flex from 'components/elements/Flex'
import styled from 'styled-components'
import { theme } from 'theme'

import {
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_MOBILE_HEIGHT
} from 'components/elements/Toolbar'

const NavContainer = styled(Flex)`
  ${theme({
    height: [
      TOOLBAR_PRIMARY_MOBILE_HEIGHT,
      TOOLBAR_PRIMARY_HEIGHT,
      TOOLBAR_PRIMARY_HEIGHT,
      TOOLBAR_PRIMARY_HEIGHT
    ]
  })}
  overflow-x: auto;
  overflow-y: hidden;
  ${hideScrollbar};
`

export default NavContainer
