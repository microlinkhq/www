import React from 'react'
import { Link } from 'components/elements'
import { theme } from 'theme'

const Announcement = ({ href, children }) => (
  <Link css={theme({ color: 'black' })} href={href}>
    <>
      {children}
      {' →'}
    </>
  </Link>
)

export default Announcement
