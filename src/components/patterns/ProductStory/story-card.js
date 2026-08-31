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
  theme
} from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

export const StoryCardGrid = styled(Box).attrs({ as: 'ul' })`
  ${theme({ display: 'grid', gap: [3, 3, 4, 4], width: '100%', listStyle: 'none', p: 0, m: 0 })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(${({ $columns }) => Math.min($columns, 2)}, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  }
`

const CardBox = styled(Box).attrs({ as: 'li' })`
  ${({ $accent }) =>
    theme({
      bg: 'white',
      border: 1,
      borderColor: accentBorder($accent),
      borderRadius: 3,
      boxShadow: 1,
      p: [3, 3, 4, 4]
    })}

  @media (prefers-reduced-motion: no-preference) {
    transition: box-shadow 0.25s ease, transform 0.25s ease,
      border-color 0.25s ease;

    &:hover {
      ${({ $accent }) =>
        theme({ boxShadow: 3, borderColor: accentBorderHover($accent) })}
      transform: translateY(-2px);
    }
  }
`

const Badge = styled(Text)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  ${({ $accent }) =>
    theme({
      bg: accentTile($accent),
      color: accentText($accent),
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
  ${({ $accent }) => theme({ bg: accentTile($accent), borderRadius: 3 })}
  color: ${({ $accent }) => colors[accentIcon($accent)]};
`

export const StoryCard = ({ accent, index, icon: Icon, title, description }) => (
  <CardBox $accent={accent}>
    {index !== undefined && (
      <Badge $accent={accent} aria-hidden='true'>
        {String(index + 1).padStart(2, '0')}
      </Badge>
    )}
    {Icon && (
      <Tile $accent={accent} aria-hidden='true'>
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
        color: 'black'
      })}
    >
      {title}
    </Text>
    <Text css={theme({ pt: 2, fontSize: 1, lineHeight: 2, color: 'black70' })}>
      {description}
    </Text>
  </CardBox>
)
