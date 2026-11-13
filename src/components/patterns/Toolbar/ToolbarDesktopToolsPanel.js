import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import React from 'react'

import { theme } from 'theme'

import {
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES
} from './ToolbarStyles'

import {
  LABEL_STYLE,
  RESOURCE_MENU_ITEM_ICON_CLASSNAME,
  ResourcesMegaMenuItemLink,
  ToolsGroupsGrid,
  getToolsGroupColumnStyles,
  getToolsGroupHeadingStyles,
  toSectionDomId
} from './ToolbarDesktopStyles'

import ToolbarDesktopSectionItemsGrid from './ToolbarDesktopSectionItemsGrid'
import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const ToolbarDesktopCompactItems = ({ items, onItemClick, ...props }) => (
  <Flex
    as='ul'
    css={theme({
      flexDirection: 'column',
      gap: '4px',
      ...TOOLBAR_LIST_RESET_STYLES
    })}
    {...props}
  >
    {items.map(
      ({ label, href, actively, title, externalIcon, logo, icon: Icon }) => (
        <ResourcesMegaMenuItemLink
          key={label}
          forwardedAs='li'
          href={href}
          title={title}
          actively={actively}
          externalIcon={externalIcon}
          data-event-location='Toolbar'
          data-event-name={label}
          onClick={onItemClick}
          css={theme({
            '> a': {
              padding: '6px 12px',
              alignItems: 'center'
            },
            whiteSpace: 'nowrap'
          })}
        >
          <ToolbarMenuItemMedia
            label={label}
            logo={logo}
            icon={Icon}
            iconClassName={RESOURCE_MENU_ITEM_ICON_CLASSNAME}
            iconCss={theme({
              ...TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES,
              color: 'black60'
            })}
          />
          <Text
            as='span'
            className='menu-item-title'
            css={theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)}
          >
            {label}
          </Text>
        </ResourcesMegaMenuItemLink>
      )
    )}
  </Flex>
)

const ToolbarDesktopToolsGroup = ({ label, compact, items, onItemClick }) => {
  const headingId = toSectionDomId(`tools-${label}`)
  const listProps = { items, onItemClick, 'aria-labelledby': headingId }

  return (
    <Box css={getToolsGroupColumnStyles(compact)}>
      <Caps
        as='p'
        id={headingId}
        css={theme({
          ...TOOLBAR_TOP_LEVEL_CAPS_STYLES,
          m: 0,
          ...getToolsGroupHeadingStyles(compact)
        })}
      >
        {label}
      </Caps>
      {compact
        ? (
          <ToolbarDesktopCompactItems {...listProps} />
          )
        : (
          <ToolbarDesktopSectionItemsGrid columns={1} {...listProps} />
          )}
    </Box>
  )
}

const ToolbarDesktopToolsPanel = ({ section, onItemClick }) => (
  <>
    <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
    <ToolsGroupsGrid>
      {section.groups.map(group => (
        <ToolbarDesktopToolsGroup
          key={group.label}
          {...group}
          onItemClick={onItemClick}
        />
      ))}
    </ToolsGroupsGrid>
  </>
)

export default ToolbarDesktopToolsPanel
