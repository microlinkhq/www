import React from 'react'

import ToolbarDesktopGroupedPanel from './ToolbarDesktopGroupedPanel'
import ToolbarDesktopPanelFooter from './ToolbarDesktopPanelFooter'

const LATEST_POST_LABEL = 'Latest:'

const toLatestPostEntry = ({ title, slug }) => ({
  label: LATEST_POST_LABEL,
  description: title,
  href: slug,
  eventName: `Blog Post: ${title}`
})

const ToolbarDesktopResourcesPanel = ({
  section,
  latestPosts = [],
  onItemClick
}) => {
  const [latestPost] = latestPosts

  return (
    <>
      <ToolbarDesktopGroupedPanel section={section} onItemClick={onItemClick} />
      <ToolbarDesktopPanelFooter
        entry={latestPost && toLatestPostEntry(latestPost)}
        page={section.footer}
        onItemClick={onItemClick}
      />
    </>
  )
}

export default ToolbarDesktopResourcesPanel
