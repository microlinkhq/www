import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
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

import { LABEL_STYLE, ProductsChangelogLink } from './ToolbarDesktopStyles'
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
          mt: 3,
          pt: 3,
          borderTop: 1,
          borderTopColor: 'black10',
          minWidth: 0
        })}
      >
        <ProductsChangelogLink
          forwardedAs='div'
          href='/changelog'
          data-event-location='Toolbar'
          data-event-name='Changelog'
          onClick={onItemClick}
        >
          <Flex
            as='span'
            css={theme({
              alignItems: 'baseline',
              gap: 2,
              minWidth: 0,
              flex: 1,
              maxWidth: '80%'
            })}
          >
            <Text
              as='span'
              css={theme({
                flexShrink: 0,
                fontSize: 0,
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              New: {latestChangelogEntry.product}
            </Text>
            <Text
              as='span'
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
          </Flex>
          <Caps
            as='span'
            css={theme({
              ...TOOLBAR_TOP_LEVEL_CAPS_STYLES,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
              color: 'link'
            })}
          >
            Changelog
            <FeatherIcon icon={ChevronRight} size={TOOLBAR_CHEVRON_ICON_SIZE} />
          </Caps>
        </ProductsChangelogLink>
      </Box>
    )}
  </>
)

export default ToolbarDesktopProductsPanel
