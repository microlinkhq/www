import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'

import {
  ENTERPRISE_ITEMS,
  CardGrid,
  CardText,
  CardTitle,
  IconTile,
  SectionBlock,
  StaticCard,
  tileColors
} from './shared'

export const Enterprise = () => (
  <SectionBlock
    id='enterprise'
    bg='pinky'
    title='Enterprise API controls, contracts, and support'
    caption='Business is the Pro API, bought the way your company buys. Enterprise is the same API on hardware that serves only you.'
  >
    <CardGrid $columns={3}>
      {ENTERPRISE_ITEMS.map(item => (
        <Box as='li' key={item.title} css={theme({ minWidth: 0 })}>
          <StaticCard>
            <IconTile icon={item.icon} tile={tileColors(item.hue)} />
            <CardTitle>{item.title}</CardTitle>
            <CardText>{item.description}</CardText>
          </StaticCard>
        </Box>
      ))}
    </CardGrid>
  </SectionBlock>
)
