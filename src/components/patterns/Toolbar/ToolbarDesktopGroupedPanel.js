import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import React from 'react'

import { theme } from 'theme'

import {
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES
} from './ToolbarStyles'

import {
  GroupedMenuColumn,
  GroupedMenuItemLink,
  RESOURCE_MENU_ITEM_ICON_CLASSNAME,
  getGroupedMenuGridStyles,
  toSectionDomId
} from './ToolbarDesktopStyles'

import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const GROUP_HEADING_STYLES = {
  fontSize: 0,
  color: 'black50',
  m: 0,
  pb: 2,
  px: '12px'
}

const ITEM_DESCRIPTION_STYLES = {
  display: 'block',
  fontSize: 0,
  color: 'black50'
}

const GroupedMenuItem = ({
  label,
  href,
  actively,
  title,
  externalIcon,
  description,
  logo,
  icon,
  compact,
  onItemClick
}) => (
  <GroupedMenuItemLink
    forwardedAs='li'
    href={href}
    title={title}
    actively={actively}
    externalIcon={externalIcon}
    data-event-location='Toolbar'
    data-event-name={label}
    onClick={onItemClick}
    compact={compact}
  >
    <ToolbarMenuItemMedia
      label={label}
      logo={logo}
      icon={icon}
      iconClassName={RESOURCE_MENU_ITEM_ICON_CLASSNAME}
      iconCss={theme({
        ...(compact
          ? TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES
          : TOOLBAR_MENU_ITEM_MEDIA_STYLES),
        flexShrink: 0
      })}
      imageCss={TOOLBAR_MENU_ITEM_MEDIA_STYLES}
    />
    <Box as='span'>
      <Text
        as='span'
        className='menu-item-title'
        css={theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)}
      >
        {label}
      </Text>
      {!compact && description && (
        <Text
          as='span'
          className='menu-item-description'
          css={theme(ITEM_DESCRIPTION_STYLES)}
        >
          {description}
        </Text>
      )}
    </Box>
  </GroupedMenuItemLink>
)

const GroupedMenuGroup = ({ section, label, compact, items, onItemClick }) => {
  const headingId = toSectionDomId(`${section}-${label}`)

  return (
    <GroupedMenuColumn>
      <Text as='p' id={headingId} css={theme(GROUP_HEADING_STYLES)}>
        {label}
      </Text>
      <Flex
        as='ul'
        aria-labelledby={headingId}
        css={theme({
          flexDirection: 'column',
          gap: compact ? 0 : 1,
          ...TOOLBAR_LIST_RESET_STYLES
        })}
      >
        {items.map(item => (
          <GroupedMenuItem
            key={item.label}
            {...item}
            compact={compact}
            onItemClick={onItemClick}
          />
        ))}
      </Flex>
    </GroupedMenuColumn>
  )
}

const ToolbarDesktopGroupedPanel = ({
  section,
  dividers = true,
  onItemClick
}) => (
  <Box css={getGroupedMenuGridStyles(section.groups, dividers)}>
    {section.groups.map(group => (
      <GroupedMenuGroup
        key={group.label}
        section={section.label}
        {...group}
        onItemClick={onItemClick}
      />
    ))}
  </Box>
)

export default ToolbarDesktopGroupedPanel
