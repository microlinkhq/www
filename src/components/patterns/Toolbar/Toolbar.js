import { Hide } from 'components/elements'
import React from 'react'

import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'

const Toolbar = props => {
  return (
    <>
      <Hide breakpoints={[1, 2, 3]}>
        <ToolbarMobile {...props} />
      </Hide>
      <Hide breakpoints={[0]}>
        <ToolbarDesktop {...props} />
      </Hide>
    </>
  )
}

export default Toolbar
