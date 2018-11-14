import sys from '@rebass/components'

import Flex from 'components/elements/Flex'
import { layout } from 'theme'

export const TOOLBAR_SIZE = '67px'

const Toolbar = sys(
  {
    extends: Flex,
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  'minHeight',
  'justifyContent',
  'alignContent',
  'color',
  'display',
  'space',
  'maxWidth',
  'height'
)

Toolbar.defaultProps = {
  is: 'header',
  color: 'black50',
  bg: 'white',
  display: 'flex',
  px: 0,
  height: TOOLBAR_SIZE,
  maxWidth: layout
}

export default Toolbar
