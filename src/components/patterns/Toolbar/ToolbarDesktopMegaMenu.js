import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import React from 'react'

import { theme } from 'theme'

import { NAVIGATION_SECTIONS } from './ToolbarLinks'
import {
  LABEL_STYLE,
  MegaMenuPanel,
  MegaMenuSection,
  toSectionDomId
} from './ToolbarDesktopStyles'

import ToolbarDesktopProductsPanel from './ToolbarDesktopProductsPanel'
import ToolbarDesktopResourcesPanel from './ToolbarDesktopResourcesPanel'
import ToolbarDesktopSectionItemsGrid from './ToolbarDesktopSectionItemsGrid'
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
      const isProductsSection = section.label === 'Products'
      const isResourcesSection = section.label === 'Resources'
      const isToolsSection = section.label === 'Tools'

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
            {isProductsSection && (
              <ToolbarDesktopProductsPanel
                section={section}
                latestChangelogEntry={latestChangelogEntry}
                onItemClick={onItemClick}
              />
            )}
            {isToolsSection && (
              <ToolbarDesktopToolsPanel
                section={section}
                onItemClick={onItemClick}
              />
            )}
            {isResourcesSection && (
              <ToolbarDesktopResourcesPanel
                section={section}
                latestPosts={latestPosts}
                onItemClick={onItemClick}
              />
            )}
            {!isProductsSection && !isResourcesSection && !isToolsSection && (
              <>
                <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
                <ToolbarDesktopSectionItemsGrid
                  items={section.items}
                  columns={section.columns}
                  onItemClick={onItemClick}
                />
              </>
            )}
          </Box>
        </MegaMenuSection>
      )
    })}
  </MegaMenuPanel>
)

export default ToolbarDesktopMegaMenu
