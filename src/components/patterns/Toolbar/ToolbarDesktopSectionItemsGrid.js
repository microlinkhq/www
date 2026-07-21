import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import React from 'react'

import { theme } from 'theme'

import {
  TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES,
  TOOLBAR_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  getMenuItemMediaStyles
} from './ToolbarStyles'

import {
  MegaMenuItemLink,
  MenuItemIcon,
  getMegaMenuGridStyles
} from './ToolbarDesktopStyles'

import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const ToolbarDesktopSectionItemsGrid = ({ items, columns, onItemClick }) => (
  <Flex as='ul' css={getMegaMenuGridStyles(columns)}>
    {items.map(
      ({
        label,
        href,
        actively,
        title,
        externalIcon,
        logo,
        description,
        icon: Icon
      }) => (
        <MegaMenuItemLink
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
            '> a': { padding: '12px' },
            whiteSpace: 'normal'
          })}
        >
          <MenuItemIcon as='span'>
            <ToolbarMenuItemMedia
              label={label}
              logo={logo}
              icon={Icon}
              iconCss={theme(getMenuItemMediaStyles(label))}
              imageCss={TOOLBAR_MENU_ITEM_MEDIA_STYLES}
            />
          </MenuItemIcon>
          <Box as='span'>
            <Text
              as='span'
              className='menu-item-title'
              css={theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)}
            >
              {label}
            </Text>
            <Text
              as='span'
              className='menu-item-description'
              css={theme(TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES)}
            >
              {description}
            </Text>
          </Box>
        </MegaMenuItemLink>
      )
    )}
  </Flex>
)

export default ToolbarDesktopSectionItemsGrid
