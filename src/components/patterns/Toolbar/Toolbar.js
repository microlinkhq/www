import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import { theme } from 'theme'
import React from 'react'

const Toolbar = props => (
  <>
    <Box css={theme({ display: ['block', 'none', 'none', 'none'] })}>
      <ToolbarMobile {...props} />
    </Box>
    <Box css={theme({ display: ['none', 'block', 'block', 'block'] })}>
      <ToolbarDesktop {...props} />
    </Box>
  </>
)

export default Toolbar
