import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'

import {
  INTEGRATIONS,
  CardDocsLink,
  CardGrid,
  CardHeading,
  CardText,
  IconTile,
  SectionBlock,
  StretchedCard,
  tileColors
} from './shared'

export const Integrations = () => (
  <SectionBlock
    id='integrations'
    bg='pinky'
    title='Use it from code, a terminal, a workflow, or an agent'
    caption='The endpoint is HTTP. These are the wrappers when you do not want to compose the query string by hand.'
  >
    <CardGrid $columns={4}>
      {INTEGRATIONS.map(item => {
        const tile = tileColors(item.hue)
        return (
          <Box as='li' key={item.href} css={theme({ minWidth: 0 })}>
            <StretchedCard $accent={tile.color}>
              <IconTile icon={item.icon} tile={tile} />
              <CardHeading href={item.href}>{item.label}</CardHeading>
              <CardText>{item.description}</CardText>
              <CardDocsLink href={item.docs.href}>
                {item.docs.label}
              </CardDocsLink>
            </StretchedCard>
          </Box>
        )
      })}
    </CardGrid>
  </SectionBlock>
)
