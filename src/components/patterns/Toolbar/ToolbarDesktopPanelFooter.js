import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
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
  PanelFooterEntryLink,
  PanelFooterPageLink
} from './ToolbarDesktopStyles'

const ENTRY_LABEL_STYLES = {
  flexShrink: 0,
  fontSize: 0,
  fontWeight: 'bold',
  color: 'black80',
  textTransform: 'none'
}

const ENTRY_DESCRIPTION_STYLES = {
  fontSize: 0,
  color: 'black60',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const PAGE_LINK_STYLES = {
  ...TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  color: 'link'
}

const ToolbarDesktopPanelFooter = ({ entry, page, onItemClick }) => (
  <Box css={theme(PANEL_FOOTER_STYLES)}>
    {entry && (
      <PanelFooterEntryLink
        forwardedAs='div'
        href={entry.href}
        externalIcon={entry.externalIcon}
        data-event-location='Toolbar'
        data-event-name={entry.eventName}
        onClick={onItemClick}
      >
        <Text
          as='span'
          className='menu-item-title'
          css={theme(ENTRY_LABEL_STYLES)}
        >
          {entry.label}
        </Text>
        <Text
          as='span'
          className='menu-item-description'
          css={theme(ENTRY_DESCRIPTION_STYLES)}
        >
          {entry.description}
        </Text>
      </PanelFooterEntryLink>
    )}
    <PanelFooterPageLink
      forwardedAs='div'
      href={page.href}
      data-event-location='Toolbar'
      data-event-name={page.label}
      onClick={onItemClick}
    >
      <Caps as='span' css={theme(PAGE_LINK_STYLES)}>
        {page.label}
        <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
      </Caps>
    </PanelFooterPageLink>
  </Box>
)

export default ToolbarDesktopPanelFooter
