import { useBreakpoint } from 'components/hook'
import React from 'react'

import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'

const Toolbar = props => {
  const component = useBreakpoint([
    ToolbarMobile,
    ToolbarDesktop,
    ToolbarDesktop,
    ToolbarDesktop
  ])

  return React.createElement(component, props)
}

export default Toolbar
