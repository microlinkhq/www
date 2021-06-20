import React from 'react'
import { Hide } from 'components/elements'
import ToolbarMobile from './ToolbarMobile'
import ToolbarDesktop from './ToolbarDesktop'

const Toolbar = props => (
  <>
    <Hide breakpoints={[0, 1]}>
      <ToolbarDesktop {...props} />
    </Hide>
    <Hide breakpoints={[2, 3]}>
      <ToolbarMobile {...props} />
    </Hide>
  </>
)

export default Toolbar
