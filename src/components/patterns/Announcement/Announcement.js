import { Box, Badge, Link } from 'components/elements'
import { theme } from 'theme'
import React from 'react'

const Announcement = ({ href, children, ...props }) => (
  <Box {...props}>
    <Link css={theme({ whiteSpace: 'pre-wrap', color: 'black' })} href={href}>
      <>
        <Badge css={theme({ mr: 2 })}>new</Badge>
        {children}
        {/* {' →'} */}
      </>
    </Link>

  </Box>

)

export default Announcement
