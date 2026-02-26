import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import { theme } from 'theme'
import styled from 'styled-components'
import React from 'react'

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

const Toolbar = props => (
  <>
    <MobileOnly>
      <ToolbarMobile {...props} />
    </MobileOnly>
    <DesktopOnly>
      <ToolbarDesktop {...props} />
    </DesktopOnly>
  </>
)

export default Toolbar
