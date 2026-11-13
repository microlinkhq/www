import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { ChevronRight } from 'react-feather'
import React from 'react'

import { theme } from 'theme'

import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES
} from './ToolbarStyles'

import {
  PANEL_FOOTER_STYLES,
  ProductsChangelogPageLink
} from './ToolbarDesktopStyles'

import ToolbarDesktopGroupedPanel from './ToolbarDesktopGroupedPanel'

const ToolbarDesktopToolsPanel = ({ section, onItemClick }) => (
  <>
    <ToolbarDesktopGroupedPanel section={section} onItemClick={onItemClick} />
    <Box css={theme(PANEL_FOOTER_STYLES)}>
      <ProductsChangelogPageLink
        forwardedAs='div'
        href={section.footer.href}
        data-event-location='Toolbar'
        data-event-name={section.footer.label}
        onClick={onItemClick}
      >
        <Caps
          as='span'
          css={theme({
            ...TOOLBAR_TOP_LEVEL_CAPS_STYLES,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'link'
          })}
        >
          {section.footer.label}
          <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
        </Caps>
      </ProductsChangelogPageLink>
    </Box>
  </>
)

export default ToolbarDesktopToolsPanel
