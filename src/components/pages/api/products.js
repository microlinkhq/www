import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

import {
  BUILD,
  CardGrid,
  CardText,
  CardTitle,
  IconTile,
  LinkCard,
  SectionBlock
} from './shared'

export const Products = () => (
  <SectionBlock
    id='products'
    bg='pinky'
    title='Everything you can build with the API'
    caption='Every product runs on the same endpoint. Pick a workflow, then read the page behind it.'
  >
    <CardGrid $columns={4}>
      {BUILD.map(product => (
        <Box as='li' key={product.label} css={theme({ minWidth: 0 })}>
          <LinkCard href={product.href} $accent={product.tile.color}>
            <Flex
              css={theme({
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 3
              })}
            >
              <IconTile icon={product.icon} tile={product.tile} />
              {product.isPro && (
                <Box
                  css={theme({ flexShrink: 0 })}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onMouseDown={e => e.stopPropagation()}
                >
                  <ProBadge />
                </Box>
              )}
            </Flex>
            <CardTitle>{product.label}</CardTitle>
            <CardText>{product.description}</CardText>
          </LinkCard>
        </Box>
      ))}
    </CardGrid>
  </SectionBlock>
)
