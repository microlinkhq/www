import { theme, transition, layout, touchTargets } from 'theme'
import FeatherIcon from 'components/icons/Feather'
import styled from 'styled-components'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import React, { useRef } from 'react'

import { useActiveSection } from 'components/hook/use-active-section'

import { NAV_TOP } from './constants'
import {
  accentBand,
  accentBorder,
  accentBorderHover,
  accentText
} from './taxonomy'

const Chip = styled(Text).attrs({ as: 'a' })`
  white-space: nowrap;
  transition: background-color ${transition.medium},
    border-color ${transition.medium}, color ${transition.medium};
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
  const navRef = useRef(null)
  const ids = categories.map(category => category.id)
  const activeId = useActiveSection(ids, navRef)

  return (
    <Flex
      ref={navRef}
      as='nav'
      aria-label='Browse skills by workflow category'
      css={theme({
        position: 'sticky',
        top: NAV_TOP,
        zIndex: 1,
        justifyContent: 'center',
        width: '100%',
        py: 2,
        bg: 'white'
      })}
    >
      <Flex
        css={theme({
          justifyContent: ['flex-start', 'flex-start', 'center', 'center'],
          width: '100%',
          maxWidth: layout.large,
          px: [3, 3, 0, 0],
          gap: 2,
          flexWrap: ['nowrap', 'nowrap', 'wrap', 'wrap'],
          overflowX: ['auto', 'auto', 'visible', 'visible']
        })}
      >
        {categories.map(category => (
          <CategoryChip
            key={category.id}
            category={category}
            isActive={category.id === activeId}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoryNav
