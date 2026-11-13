import React from 'react'

import { changelogBannerLabel } from 'helpers/parse-latest-changelog-entry'

import ToolbarDesktopGroupedPanel from './ToolbarDesktopGroupedPanel'
import ToolbarDesktopPanelFooter from './ToolbarDesktopPanelFooter'

const CHANGELOG_PAGE = { label: 'Changelog', href: '/changelog' }

const toChangelogEntry = ({ product, href, description }) => ({
  label: changelogBannerLabel(product),
  description,
  href,
  eventName: `Changelog: ${product}`
})

const ToolbarDesktopProductsPanel = ({
  section,
  latestChangelogEntry,
  onItemClick
}) => (
  <>
    <ToolbarDesktopGroupedPanel section={section} onItemClick={onItemClick} />
    {latestChangelogEntry && (
      <ToolbarDesktopPanelFooter
        entry={toChangelogEntry(latestChangelogEntry)}
        page={CHANGELOG_PAGE}
        onItemClick={onItemClick}
      />
    )}
  </>
)

export default ToolbarDesktopProductsPanel
