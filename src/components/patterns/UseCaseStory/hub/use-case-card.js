import { colors, theme, shadows, transition } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { accentOf, pathToUseCase } from '../use-cases'

export { CardGrid } from 'components/patterns/CustomerStory/primitives'

const FALLBACK_CTA = 'View use case'
const WASH_TONE = '1'
const WASH_FADE_TONE = '0'
const WASH_OVERHANG = '-32px'
const CARD_ROWS = 3

const toneOf = (accent, tone) => accent.replace(/\d+$/, tone)

const Arrow = styled('span')`
  display: inline-block;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transition.short};
  }
`

const Card = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$accent'
})`
  display: grid;
  grid-row: span ${CARD_ROWS};
  grid-template-rows: subgrid;
  row-gap: 0;
  overflow: hidden;
  isolation: isolate;
  box-shadow: ${shadows[1]};
  transition: border-color ${transition.medium},
    box-shadow ${transition.medium};

  ${theme({
    position: 'relative',
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    minWidth: 0
  })}

  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto 1fr auto;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: color-mix(
        in srgb,
        ${({ $accent }) => colors[$accent]} 55%,
        transparent
      );
      box-shadow: ${shadows[3]};
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: border-color ${transition.medium},
        box-shadow ${transition.medium}, transform ${transition.medium};

      &:hover {
        transform: translateY(-2px);
      }

      &:hover ${Arrow} {
        transform: translateX(3px);
      }
    }
  }
`

const Band = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$accent'
})`
  &::after {
    content: '';
    z-index: -1;
    background-image: linear-gradient(
      180deg,
      ${({ $accent }) => colors[toneOf($accent, WASH_TONE)]} 0%,
      ${({ $accent }) => colors[toneOf($accent, WASH_FADE_TONE)]} 50%,
      ${colors.white} 100%
    );

    ${theme({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: WASH_OVERHANG,
      left: 0
    })}
  }

  ${theme({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    px: [3, 3, 4, 4],
    pt: 4
  })}

  &::before {
    content: '';
    background-image: radial-gradient(
      color-mix(in srgb, ${({ $accent }) => colors[$accent]} 45%, transparent)
        1px,
      transparent 1.5px
    );
    background-size: 10px 10px;
    mask-image: radial-gradient(
      ellipse at top right,
      black 0%,
      transparent 65%
    );

    ${theme({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })}
  }
`

const AccentMark = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$accent'
})`
  ${({ $accent }) =>
    theme({
      position: 'relative',
      width: '24px',
      height: '3px',
      borderRadius: 2,
      bg: $accent
    })}
`

const CardLink = styled(Link)`
  ${theme({ fontWeight: 'bold', fontSize: [0, 1, 1, 1] })}

  a::after {
    content: '';
    ${theme({ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 })}
  }
`

const KeepTogether = styled('span')`
  white-space: nowrap;
`

const splitLastWord = label => {
  const index = label.lastIndexOf(' ')
  return index === -1
    ? ['', label]
    : [label.slice(0, index + 1), label.slice(index + 1)]
}

export const UseCaseCard = ({ entry }) => {
  const accent = accentOf(entry)
  const [lead, lastWord] = splitLastWord(entry.cta || FALLBACK_CTA)

  return (
    <Card $accent={accent}>
      <Band $accent={accent}>
        <AccentMark $accent={accent} aria-hidden='true' />
        <Text
          as='h3'
          css={theme({
            position: 'relative',
            m: 0,
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            minWidth: 0
          })}
        >
          {entry.name}
        </Text>
      </Band>
      <Text
        css={theme({
          color: 'black70',
          fontSize: 1,
          lineHeight: 2,
          px: [3, 3, 4, 4],
          pt: 4
        })}
      >
        {entry.blurb}
      </Text>
      <Box css={theme({ px: [3, 3, 4, 4], pt: 3, pb: [3, 3, 4, 4] })}>
        <CardLink
          href={pathToUseCase(entry.slug)}
          css={theme({ color: 'link' })}
        >
          {lead}
          <KeepTogether>
            {lastWord}&nbsp;<Arrow aria-hidden='true'>→</Arrow>
          </KeepTogether>
        </CardLink>
      </Box>
    </Card>
  )
}
