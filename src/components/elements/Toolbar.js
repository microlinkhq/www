import styled from 'styled-components'
import { layout } from 'theme'

import Flex from './Flex'

export const TOOLBAR_HEIGHT = '67px'

const Toolbar = styled(Flex)({
  overflowX: 'auto',
  overflowY: 'hidden'
})

Toolbar.defaultProps = {
  as: 'header',
  color: 'black60',
  display: 'flex',
  px: 0,
  height: TOOLBAR_HEIGHT,
  maxWidth: layout.large
}

export default Toolbar
