import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import React from 'react'

import { theme } from 'theme'

import {
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES
} from './ToolbarStyles'

import {
  GroupedMenuColumn,
  GroupedMenuItemLink,
  MENU_ITEM_ICON_CLASSNAME,
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
  >
    <ToolbarMenuItemMedia
      label={label}
      logo={logo}
      icon={icon}
      iconClassName={MENU_ITEM_ICON_CLASSNAME}
      iconCss={theme({
        ...TOOLBAR_MENU_ITEM_MEDIA_STYLES,
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
      {description && (
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

const GROUP_STACK_GAP = 4

const toColumns = groups =>
  groups.reduce(
    (columns, group) =>
      group.stacked && columns.length > 0
        ? [...columns.slice(0, -1), [...columns[columns.length - 1], group]]
        : [...columns, [group]],
    []
  )

const GroupedMenuGroup = ({
  section,
  label,
  items,
  isStacked,
  onItemClick
}) => {
  const headingId = toSectionDomId(`${section}-${label}`)

  return (
    <Box css={theme({ mt: isStacked ? GROUP_STACK_GAP : 0 })}>
      <Text as='p' id={headingId} css={theme(GROUP_HEADING_STYLES)}>
        {label}
      </Text>
      <Flex
        as='ul'
        aria-labelledby={headingId}
        css={theme({
          flexDirection: 'column',
          gap: 1,
          ...TOOLBAR_LIST_RESET_STYLES
        })}
      >
        {items.map(item => (
          <GroupedMenuItem
            key={item.label}
            {...item}
            onItemClick={onItemClick}
          />
        ))}
      </Flex>
    </Box>
  )
}

const ToolbarDesktopGroupedPanel = ({ section, onItemClick }) => {
  const columns = toColumns(section.groups)

  return (
    <Box css={getGroupedMenuGridStyles(columns)}>
      {columns.map(groups => (
        <GroupedMenuColumn key={groups[0].label}>
          {groups.map((group, index) => (
            <GroupedMenuGroup
              key={group.label}
              section={section.label}
              {...group}
              isStacked={index > 0}
              onItemClick={onItemClick}
            />
          ))}
        </GroupedMenuColumn>
      ))}
    </Box>
  )
}

export default ToolbarDesktopGroupedPanel
