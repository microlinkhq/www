import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import { breakpoints, theme, toRaw } from 'theme'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

const MOBILE_MAX_WIDTH = toRaw(breakpoints[0]) - 1

const MobileOnly = styled(Box)`
  ${({ $alone }) =>
    theme({
      display: $alone ? 'block' : ['block', 'none', 'none', 'none']
    })};
`

const DesktopOnly = styled(Box)`
  ${({ $alone }) =>
    theme({
      display: $alone ? 'block' : ['none', 'block', 'block', 'block']
    })};
`

const Toolbar = ({ animated, ...props }) => {
  const [mode, setMode] = useState(null)
  const [didSwitch, setDidSwitch] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const sync = () => setMode(media.matches ? 'mobile' : 'desktop')
    sync()
    const onChange = () => {
      setDidSwitch(true)
      sync()
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const showMobile = mode !== 'desktop'
  const showDesktop = mode !== 'mobile'
  const animate = animated && !didSwitch

  return (
    <>
      {showMobile && (
        <MobileOnly $alone={mode === 'mobile'}>
          <ToolbarMobile animated={animate} {...props} />
        </MobileOnly>
      )}
      {showDesktop && (
        <DesktopOnly $alone={mode === 'desktop'}>
          <ToolbarDesktop animated={animate} {...props} />
        </DesktopOnly>
      )}
    </>
  )
}

export default Toolbar
