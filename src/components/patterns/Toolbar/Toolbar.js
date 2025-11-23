import ToolbarDesktop from './ToolbarDesktop'
import ToolbarMobile from './ToolbarMobile'
import Box from 'components/elements/Box'
import React from 'react'

const Toolbar = props => (
  <>
    <Box display={['block', 'none', 'none', 'none']}>
      <ToolbarMobile {...props} />
    </Box>
    <Box display={['none', 'block', 'block', 'block']}>
      <ToolbarDesktop {...props} />
    </Box>
  </>
)

export default Toolbar
