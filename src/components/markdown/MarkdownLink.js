import React from 'react'
import { useLocation } from '@gatsbyjs/reach-router'

import { Link } from 'components/elements/Link'
import { DashboardLink } from 'components/patterns/SignupLink'
import { dashboardPathFromHref, eventLocation } from 'helpers/dashboard-url'

const DashboardMarkdownLink = ({ dashboardPath, ...props }) => {
  const { pathname } = useLocation()
  return (
    <DashboardLink
      dashboardPath={dashboardPath}
      cta={`${eventLocation(pathname)}:content`}
      {...props}
    />
  )
}

export const MarkdownLink = ({ href, ...props }) => {
  const dashboardPath = dashboardPathFromHref(href)
  return dashboardPath
    ? (
      <DashboardMarkdownLink dashboardPath={dashboardPath} {...props} />
      )
    : (
      <Link href={href} {...props} />
      )
}
