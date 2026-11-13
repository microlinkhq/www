import React from 'react'

import ToolbarDesktopGroupedPanel from './ToolbarDesktopGroupedPanel'
import ToolbarDesktopPanelFooter from './ToolbarDesktopPanelFooter'

const LATEST_TOOL_LABEL = 'New:'

const toLatestToolEntry = ({ label, description, href, externalIcon }) => ({
  label: LATEST_TOOL_LABEL,
  description: `${label}. ${description}.`,
  href,
  externalIcon,
  eventName: `New tool: ${label}`
})

const findLatestTool = ({ items, footer }) =>
  items.find(({ label }) => label === footer.latest)

const ToolbarDesktopToolsPanel = ({ section, onItemClick }) => {
  const latestTool = findLatestTool(section)

  return (
    <>
      <ToolbarDesktopGroupedPanel section={section} onItemClick={onItemClick} />
      <ToolbarDesktopPanelFooter
        entry={latestTool && toLatestToolEntry(latestTool)}
        page={section.footer}
        onItemClick={onItemClick}
      />
    </>
  )
}

export default ToolbarDesktopToolsPanel
