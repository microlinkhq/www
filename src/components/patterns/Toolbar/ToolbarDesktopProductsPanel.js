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
  LABEL_STYLE,
  ProductsChangelogEntryLink,
  ProductsChangelogPageLink
} from './ToolbarDesktopStyles'
import ToolbarDesktopSectionItemsGrid from './ToolbarDesktopSectionItemsGrid'

const ToolbarDesktopProductsPanel = ({
  section,
  latestChangelogEntry,
  onItemClick
}) => (
  <>
    <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
    <ToolbarDesktopSectionItemsGrid
      items={section.items}
      columns={section.columns}
      onItemClick={onItemClick}
    />
    {latestChangelogEntry && (
      <Box
        css={theme({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
          mt: 3,
          pt: 3,
          borderTop: 1,
          borderTopColor: 'black10',
          minWidth: 0
        })}
      >
        <ProductsChangelogEntryLink
          forwardedAs='div'
          href={latestChangelogEntry.href}
          data-event-location='Toolbar'
          data-event-name={`Changelog: ${latestChangelogEntry.product}`}
          onClick={onItemClick}
        >
          <Text
            as='span'
            className='menu-item-title'
            css={theme({
              flexShrink: 0,
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black80'
            })}
          >
            New: {latestChangelogEntry.product}
          </Text>
          <Text
            as='span'
            className='menu-item-description'
            css={theme({
              fontSize: 0,
              color: 'black60',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            })}
          >
            {latestChangelogEntry.description}
          </Text>
        </ProductsChangelogEntryLink>
        <ProductsChangelogPageLink
          forwardedAs='div'
          href='/changelog'
          data-event-location='Toolbar'
          data-event-name='Changelog'
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
            Changelog
            <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
          </Caps>
        </ProductsChangelogPageLink>
      </Box>
    )}
  </>
)

export default ToolbarDesktopProductsPanel
