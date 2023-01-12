import { useBreakpoint } from 'context/breakpoint'
import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import { createElement } from 'react'

const Toolbar = props =>
  createElement(useBreakpoint() === 0 ? ToolbarMobile : ToolbarDesktop, props)

export default Toolbar
