import React from 'react'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  layout,
  breakpoints,
  shadows,
  theme,
  transition
} from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { Subhead, Caption, NARROW_MAX_WIDTH } from './shared'

const CARD_HOVER_SHADOW = shadows[3]

const Cards = styled(Box)`
  ${theme({
    display: 'grid',
    gap: 3,
    width: '100%',
    pt: [4, 4, 5, 5]
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Card = styled(Box)(
  theme({
    p: 4,
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 4,
    boxShadow: shadows[1]
  }),
  `
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--capability-accent);
        box-shadow: ${CARD_HOVER_SHADOW};
      }
    }
  `
)

const IconTile = styled(Flex)(
  theme({
    width: '44px',
    height: '44px',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    mb: 3
  }),
  `
    background: var(--capability-tile-bg);
    color: var(--capability-accent);
  `
)

const CardTitle = styled(Text).attrs({ as: 'h3' })(
  theme({ fontSize: 2, fontWeight: 'bold', lineHeight: 0, color: 'black' })
)

const CardDescription = styled(Text).attrs({ as: 'p' })(
  theme({ fontSize: 1, lineHeight: 2, pt: 2, color: 'black70' })
)

export const ProductCapabilities = ({
  title,
  caption,
  items,
  accent,
  tileBg
}) => (
  <Container
    as='section'
    id='capabilities'
    style={{
      '--capability-accent': accent,
      '--capability-tile-bg': tileBg
    }}
    css={theme({
      alignItems: 'flex-start',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [4, 4, 4, 0],
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
    })}
  >
    <Subhead css={theme({ width: '100%', textAlign: 'left' })}>{title}</Subhead>
    <Caption
      forwardedAs='p'
      css={theme({
        pt: [3, 3, 4, 4],
        width: '100%',
        textAlign: 'left',
        maxWidth: NARROW_MAX_WIDTH,
        mx: 0
      })}
    >
      {caption}
    </Caption>
    <Cards>
      {items.map(({ icon: Icon, title: cardTitle, description }) => (
        <Card key={cardTitle}>
          <IconTile aria-hidden='true'>
            <Icon size={22} />
          </IconTile>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </Card>
      ))}
    </Cards>
  </Container>
)
