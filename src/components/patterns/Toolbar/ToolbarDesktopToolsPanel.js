import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { ChevronRight } from 'react-feather'
import React from 'react'

import { theme } from 'theme'

import { TOOLS_INTEGRATIONS_ITEMS } from './ToolbarLinks'
import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  TOOLBAR_TOP_LEVEL_TEXT_STYLES
} from './ToolbarStyles'

import {
  LABEL_STYLE,
  RESOURCE_MENU_ITEM_ICON_CLASSNAME,
  ResourcesMegaMenuItemLink,
  ToolsIntegrationsColumn,
  ToolsLayout,
  ToolsListColumn
} from './ToolbarDesktopStyles'

import ToolbarDesktopSectionItemsGrid from './ToolbarDesktopSectionItemsGrid'
import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const ToolbarDesktopToolsPanel = ({ section, onItemClick }) => (
  <ToolsLayout>
    <ToolsListColumn>
      <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
      <ToolbarDesktopSectionItemsGrid
        items={section.items}
        columns={section.columns}
        onItemClick={onItemClick}
      />
    </ToolsListColumn>
    {TOOLS_INTEGRATIONS_ITEMS.length > 0 && (
      <ToolsIntegrationsColumn>
        <Box
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
            Integrations
            <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
          </Caps>
        </Box>
        <Flex
          as='ul'
          css={theme({
            flexDirection: 'column',
            gap: '4px',
            ...TOOLBAR_LIST_RESET_STYLES
          })}
        >
          {TOOLS_INTEGRATIONS_ITEMS.map(
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
                    top: '-2px',
                    color: 'black60'
                  })}
                />
                <Flex
                  as='span'
                  css={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: '0.25em'
                  }}
                >
                  <Text
                    as='span'
                    className='menu-item-title'
                    css={theme({
                      ...TOOLBAR_MENU_ITEM_TITLE_STYLES,
                      display: 'inline'
                    })}
                  >
                    {label}
                  </Text>
                  <Text
                    as='span'
                    className='menu-item-description'
                    css={theme({
                      ...TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES,
                      fontSize: '16px'
                    })}
                  >
                    &nbsp;{description}
                  </Text>
                </Flex>
              </ResourcesMegaMenuItemLink>
            )
          )}
        </Flex>
      </ToolsIntegrationsColumn>
    )}
  </ToolsLayout>
)

export default ToolbarDesktopToolsPanel
