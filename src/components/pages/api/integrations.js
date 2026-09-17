import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'

import {
  INTEGRATIONS,
  CardGrid,
  CardText,
  CardTitle,
  IconTile,
  LinkCard,
  SectionBlock,
  tileColors
} from './shared'

export const Integrations = () => (
  <SectionBlock
    id='integrations'
    bg='pinky'
    title='Use it from code, a terminal, or an agent'
    caption='The endpoint is HTTP. These are the wrappers when you do not want to compose the query string by hand.'
  >
    <CardGrid $columns={4}>
      {INTEGRATIONS.map(item => {
        const tile = tileColors(item.hue)
        return (
          <Box as='li' key={item.href} css={theme({ minWidth: 0 })}>
            <LinkCard href={item.href} $accent={tile.color}>
              <IconTile icon={item.icon} tile={tile} />
              <CardTitle>{item.label}</CardTitle>
              <CardText>{item.description}</CardText>
            </LinkCard>
          </Box>
        )
      })}
    </CardGrid>
  </SectionBlock>
)
