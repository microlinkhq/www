import Box from 'components/elements/Box'
import React from 'react'

import { theme } from 'theme'

import { NAVIGATION_SECTIONS } from './ToolbarLinks'
import {
  MegaMenuPanel,
  MegaMenuSection,
  toSectionDomId
} from './ToolbarDesktopStyles'

import ToolbarDesktopProductsPanel from './ToolbarDesktopProductsPanel'
import ToolbarDesktopResourcesPanel from './ToolbarDesktopResourcesPanel'
import ToolbarDesktopToolsPanel from './ToolbarDesktopToolsPanel'

const ToolbarDesktopMegaMenu = ({
  isPanelVisible,
  renderedSection,
  latestPosts,
  latestChangelogEntry,
  onMouseEnter,
  onMouseLeave,
  onItemClick
}) => (
  <MegaMenuPanel
    isVisible={isPanelVisible}
    id='toolbar-mega-menu'
    role='dialog'
    aria-label='Primary navigation submenu'
    aria-hidden={!isPanelVisible}
    inert={!isPanelVisible ? '' : undefined}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {NAVIGATION_SECTIONS.map(section => {
      const isSectionActive = renderedSection === section.label

      return (
        <MegaMenuSection
          key={section.label}
          id={toSectionDomId(section.label)}
          isActive={isSectionActive}
          aria-hidden={!isSectionActive}
        >
          <Box
            css={theme({
              px: [3, 3, 4, 4],
              py: [3, 3, 4, 4]
            })}
          >
            {section.label === 'Products' && (
              <ToolbarDesktopProductsPanel
                section={section}
                latestChangelogEntry={latestChangelogEntry}
                onItemClick={onItemClick}
              />
            )}
            {section.label === 'Tools' && (
              <ToolbarDesktopToolsPanel
                section={section}
                onItemClick={onItemClick}
              />
            )}
            {section.label === 'Resources' && (
              <ToolbarDesktopResourcesPanel
                section={section}
                latestPosts={latestPosts}
                onItemClick={onItemClick}
              />
            )}
          </Box>
        </MegaMenuSection>
      )
    })}
  </MegaMenuPanel>
)

export default ToolbarDesktopMegaMenu
