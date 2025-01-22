import { Hide, Box, Badge, Link } from 'components/elements'
import { theme } from 'theme'
import React from 'react'

const Announcement = ({ href, children, ...props }) => (
  <Hide breakpoints={[0]}>
    <Box {...props}>
      <Link css={theme({ whiteSpace: 'pre-wrap', color: 'black' })} href={href}>
        <Badge css={theme({ mr: 2 })}>new</Badge>
        {children}
        {/* {' →'} */}
      </Link>
    </Box>
  </Hide>
)

export default Announcement
