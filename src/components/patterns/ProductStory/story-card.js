import React from 'react'
import styled from 'styled-components'
import {
  accentBorder,
  accentBorderHover,
  accentIcon,
  accentText,
  accentTile,
  breakpoints,
  colors,
  theme,
  transition
} from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const ACCENT = 'pink'

export const StoryCardGrid = styled(Box).attrs({ as: 'ul' })`
  ${theme({
    display: 'grid',
    gap: [3, 3, 4, 4],
    width: '100%',
    listStyle: 'none',
    p: 0,
    m: 0
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(
      ${({ $columns }) => Math.min($columns, 2)},
      minmax(0, 1fr)
    );
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(
      ${({ $columns }) => $columns},
      minmax(0, 1fr)
    );
  }
`

const CardBox = styled(Box).attrs({ as: 'li' })`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: accentBorder(ACCENT),
    borderRadius: 3,
    boxShadow: 1,
    p: [3, 3, 4, 4]
  })}

  transition: box-shadow ${transition.short}, border-color ${transition.short};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${theme({ boxShadow: 3, borderColor: accentBorderHover(ACCENT) })}
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: box-shadow ${transition.short}, transform ${transition.short},
        border-color ${transition.short};

      &:hover {
        transform: translateY(-1px);
      }
    }
  }
`

const Badge = styled(Text)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  ${theme({
    bg: accentTile(ACCENT),
    color: accentText(ACCENT),
    borderRadius: 5,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 0
  })}
`

const Tile = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  ${theme({ bg: accentTile(ACCENT), borderRadius: 3 })}
  color: ${colors[accentIcon(ACCENT)]};
`

export const StoryCard = ({ index, icon: Icon, title, description }) => (
  <CardBox>
    {index !== undefined && (
      <Badge aria-hidden='true'>{String(index + 1).padStart(2, '0')}</Badge>
    )}
    {Icon && (
      <Tile aria-hidden='true'>
        <Icon size={20} />
      </Tile>
    )}
    <Text
      as='h3'
      css={theme({
        pt: index !== undefined || Icon ? 3 : 0,
        m: 0,
        fontFamily: 'sans',
        fontSize: 2,
        fontWeight: 'bold',
        lineHeight: 1,
        color: 'black',
        textWrap: 'balance'
      })}
    >
      {title}
    </Text>
    <Text
      css={theme({
        pt: 2,
        fontSize: 1,
        lineHeight: 2,
        color: 'black70',
        textWrap: 'pretty'
      })}
    >
      {description}
    </Text>
  </CardBox>
)
