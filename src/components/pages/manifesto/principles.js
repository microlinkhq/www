import { layout, SECTION_VERTICAL_SPACING, space, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'
import { Eyebrow } from 'components/patterns/FeatureStory'

import { AnatomyFigure } from './anatomy/figure'
import { IsoStyle } from './anatomy/iso-style'
import { CLOSING_LINKS, PRINCIPLES } from './shared'

const FLUID_COLUMN = 'minmax(0, 1fr)'
const FIGURE_COLUMN = '400px'

const ordinal = index => String(index + 1).padStart(2, '0')

const Principle = ({ id, index, name, tagline, body, figure }) => (
  <Box
    as='li'
    id={id}
    aria-labelledby={`${id}-name`}
    css={theme({
      display: 'grid',
      gridTemplateColumns: [
        FLUID_COLUMN,
        FLUID_COLUMN,
        FLUID_COLUMN,
        `${FLUID_COLUMN} ${FIGURE_COLUMN}`
      ],
      gap: [3, 3, 4, 4],
      alignItems: 'start',
      py: [4, 4, 5, 5],
      borderTop: 1,
      borderTopColor: 'black10',
      scrollMarginTop: space[5]
    })}
  >
    <Box>
      <Eyebrow forwardedAs='p' aria-hidden='true'>
        {ordinal(index)}
      </Eyebrow>
      <Subhead
        id={`${id}-name`}
        css={theme({ textAlign: 'left', textWrap: 'balance' })}
      >
        {name}
      </Subhead>
      <Caption
        forwardedAs='p'
        css={theme({ pt: 2, textAlign: 'left', color: 'black60' })}
      >
        {tagline}
      </Caption>
      <Text css={theme({ pt: [3, 3, 4, 4], color: 'black80', lineHeight: 2 })}>
        {body}
      </Text>
    </Box>
    <Box css={theme({ width: '100%', maxWidth: layout.small })}>
      <AnatomyFigure figure={figure} />
    </Box>
  </Box>
)

export const Principles = () => (
  <Box
    as='section'
    id='principles'
    aria-label='Principles'
    css={theme({ pb: SECTION_VERTICAL_SPACING })}
  >
    <IsoStyle />
    <Box as='ol' css={theme({ listStyle: 'none', p: 0, m: 0 })}>
      {PRINCIPLES.map((principle, index) => (
        <Principle key={principle.id} index={index} {...principle} />
      ))}
    </Box>
    <Box
      css={theme({
        pt: [4, 4, 5, 5],
        borderTop: 1,
        borderTopColor: 'black10',
        display: 'flex',
        flexWrap: 'wrap',
        gap: [3, 3, 4, 4],
        fontSize: [1, 1, 2, 2]
      })}
    >
      {CLOSING_LINKS.map(({ label, href }) => (
        <ArrowLink key={href} href={href}>
          {label}
        </ArrowLink>
      ))}
    </Box>
  </Box>
)
