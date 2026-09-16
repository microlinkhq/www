import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'
import { breakpoints, theme, toRaw } from 'theme'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

const MOBILE_MAX_WIDTH = toRaw(breakpoints[0]) - 1

const ToolbarShell = styled(Box)`
  ${theme({
    position: 'fixed',
    zIndex: 101,
    top: 0,
    left: 0,
    right: 0,
    height: TOOLBAR_PRIMARY_HEIGHTS
  })}
`

const Toolbar = props => {
  const [mode, setMode] = useState(null)

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const sync = () => setMode(media.matches ? 'mobile' : 'desktop')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (mode === 'mobile') return <ToolbarMobile {...props} />
  if (mode === 'desktop') return <ToolbarDesktop {...props} />
  return <ToolbarShell aria-hidden />
}

export default Toolbar
