import { useBreakpoint } from 'context/breakpoint'
import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import { createElement } from 'react'

const Toolbar = props => {
  const breakpoint = useBreakpoint()
  return createElement(breakpoint === 0 ? ToolbarMobile : ToolbarDesktop, props)
}

export default Toolbar
