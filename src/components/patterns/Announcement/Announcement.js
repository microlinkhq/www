import Hide from 'components/elements/Hide'
import Box from 'components/elements/Box'
import Badge from 'components/elements/Badge/Badge'
import { Link } from 'components/elements/Link/base'
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
