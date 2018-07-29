import { Toolbar as ToolbarBase } from 'rebass'
import system from 'system-components'

export const TOOLBAR_SIZE = '67px'

const Toolbar = system({
  is: ToolbarBase,
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
  height: TOOLBAR_SIZE
}

export default Toolbar
