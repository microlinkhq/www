import React from 'react'
import { Link } from 'components/elements'

const Announcement = ({ href, children }) => (
  <Link color='black' href={href}>
    <>
      {children}
      {' →'}
    </>
  </Link>
)

export default Announcement
