import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import { breakpoints, theme, toRaw } from 'theme'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

const MOBILE_MAX_WIDTH = toRaw(breakpoints[0]) - 1

const MobileOnly = styled(Box)`
  ${theme({
    display: ['block', 'none', 'none', 'none']
  })};
`

const DesktopOnly = styled(Box)`
  ${theme({
    display: ['none', 'block', 'block', 'block']
  })};
`

const Toolbar = props => {
  const [mode, setMode] = useState('both')

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const sync = () => setMode(media.matches ? 'mobile' : 'desktop')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (mode === 'mobile') return <ToolbarMobile {...props} />
  if (mode === 'desktop') return <ToolbarDesktop {...props} />

  return (
    <>
      <MobileOnly>
        <ToolbarMobile {...props} />
      </MobileOnly>
      <DesktopOnly>
        <ToolbarDesktop {...props} />
      </DesktopOnly>
    </>
  )
}

export default Toolbar
