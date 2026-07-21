import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { ChevronRight } from 'react-feather'
import React from 'react'

import { theme } from 'theme'

import { ToolbarNavLink } from './ToolbarLinks'
import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_MENU_ITEM_ICON_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  TOOLBAR_TOP_LEVEL_TEXT_STYLES
} from './ToolbarStyles'

import {
  LABEL_STYLE,
  RESOURCE_MENU_ITEM_ICON_CLASSNAME,
  ResourcesBlogColumn,
  ResourcesLayout,
  ResourcesListColumn,
  ResourcesListGrid,
  ResourcesMegaMenuItemLink
} from './ToolbarDesktopStyles'

import ToolbarDesktopLatestPostItem from './ToolbarDesktopLatestPostItem'
import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const ToolbarDesktopResourcesPanel = ({
  section,
  latestPosts,
  onItemClick
}) => (
  <ResourcesLayout>
    <ResourcesListColumn>
      <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
      <ResourcesListGrid as='ul'>
        {section.items.flatMap(
          ({ label, href, actively, title, externalIcon, logo, icon: Icon }) =>
            label === 'Blog'
              ? (
                  []
                )
              : (
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
                    whiteSpace: 'normal'
                  })}
                >
                  <ToolbarMenuItemMedia
                    label={label}
                    logo={logo}
                    icon={Icon}
                    iconClassName={RESOURCE_MENU_ITEM_ICON_CLASSNAME}
                    iconCss={theme(TOOLBAR_MENU_ITEM_ICON_STYLES)}
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
      </ResourcesListGrid>
    </ResourcesListColumn>
    {latestPosts.length > 0 && (
      <ResourcesBlogColumn>
        <ToolbarNavLink
          forwardedAs='div'
          href='/blog'
          data-event-location='Toolbar'
          data-event-name='Blog'
          onClick={onItemClick}
          css={theme({
            mb: 3,
            ...TOOLBAR_TOP_LEVEL_TEXT_STYLES
          })}
        >
          <Caps
            as='span'
            css={theme({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              ...TOOLBAR_TOP_LEVEL_CAPS_STYLES
            })}
          >
            Blog
            <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
          </Caps>
        </ToolbarNavLink>
        <Flex
          as='ul'
          css={theme({
            flexDirection: 'column',
            listStyle: 'none',
            m: 0,
            p: 0,
            gap: 2
          })}
        >
          {latestPosts.map(post => (
            <ToolbarDesktopLatestPostItem
              key={post.slug}
              post={post}
              onItemClick={onItemClick}
            />
          ))}
        </Flex>
      </ResourcesBlogColumn>
    )}
  </ResourcesLayout>
)

export default ToolbarDesktopResourcesPanel
