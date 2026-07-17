import {
  theme,
  transition,
  layout,
  touchTargets,
  accentBand,
  accentBorder,
  accentBorderHover,
  accentText
} from 'theme'
import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'
import { hideScrollbar } from 'helpers/style'
import FeatherIcon from 'components/icons/Feather'
import styled from 'styled-components'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import React from 'react'

import { useActiveSection } from 'components/hook/use-active-section'

import { NAV_HEIGHT } from './constants'

const Chip = styled(Text).attrs({ as: 'a' })`
  white-space: nowrap;
  transition: background-color ${transition.medium},
    border-color ${transition.medium}, color ${transition.medium};
`

const ChipScroller = styled(Flex)`
  ${hideScrollbar};
`

const CategoryChip = ({ category, isActive }) => (
  <Chip
    href={`#${category.id}`}
    aria-current={isActive ? 'true' : undefined}
    css={theme({
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 3,
      py: 2,
      minHeight: touchTargets.minHeight,
      border: 1,
      borderColor: isActive ? accentBorder(category.accent) : 'black10',
      borderRadius: 3,
      bg: isActive ? accentBand(category.accent) : 'white',
      color: isActive ? accentText(category.accent) : 'black60',
      fontSize: 0,
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: 'none',
      '&:hover': {
        borderColor: isActive ? accentBorderHover(category.accent) : 'black20',
        color: isActive ? accentText(category.accent) : 'black'
      }
    })}
  >
    <FeatherIcon
      icon={category.icon}
      size={0}
      aria-hidden='true'
      color={isActive ? accentText(category.accent) : 'black60'}
    />
    {`${category.title} (${category.skills.length})`}
  </Chip>
)

const CategoryNav = ({ categories }) => {
  const ids = categories.map(category => category.id)
  const activeId = useActiveSection(ids)

  return (
    <Flex
      as='nav'
      aria-label='Browse skills by workflow category'
      css={theme({
        position: 'sticky',
        top: TOOLBAR_PRIMARY_HEIGHTS,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: NAV_HEIGHT,
        bg: 'white'
      })}
    >
      <ChipScroller
        css={theme({
          justifyContent: ['flex-start', 'flex-start', 'center', 'center'],
          alignItems: 'center',
          width: '100%',
          maxWidth: layout.large,
          px: [3, 3, 0, 0],
          gap: 2,
          overflowX: 'auto'
        })}
      >
        {categories.map(category => (
          <CategoryChip
            key={category.id}
            category={category}
            isActive={category.id === activeId}
          />
        ))}
      </ChipScroller>
    </Flex>
  )
}

export default CategoryNav
