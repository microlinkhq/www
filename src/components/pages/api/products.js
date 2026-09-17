import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

import {
  BUILD,
  CardDocsLink,
  CardGrid,
  CardHeading,
  CardText,
  IconTile,
  SectionBlock,
  StretchedCard
} from './shared'

export const Products = () => (
  <SectionBlock
    id='products'
    bg='pinky'
    title='Everything you can build with the API'
    caption='Every product runs on the same endpoint. Open its page to see what it does, or jump straight to the guide.'
  >
    <CardGrid $columns={4}>
      {BUILD.map(product => (
        <Box as='li' key={product.label} css={theme({ minWidth: 0 })}>
          <StretchedCard $accent={product.tile.color}>
            <Flex
              css={theme({
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 3
              })}
            >
              <IconTile icon={product.icon} tile={product.tile} />
              {product.isPro && (
                <Box className='card-above' css={theme({ flexShrink: 0 })}>
                  <ProBadge />
                </Box>
              )}
            </Flex>
            <CardHeading href={product.href}>{product.label}</CardHeading>
            <CardText>{product.description}</CardText>
            <CardDocsLink href={product.docs.href}>
              {product.docs.label}
            </CardDocsLink>
          </StretchedCard>
        </Box>
      ))}
    </CardGrid>
  </SectionBlock>
)
