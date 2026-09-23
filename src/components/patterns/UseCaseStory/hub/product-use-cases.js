import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'

import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'

import { CardGrid, UseCaseCard } from './use-case-card'
import {
  getUseCase,
  getVertical,
  pathToUseCase,
  verticalUseCases
} from '../use-cases'

export const ProductUseCases = ({
  vertical: verticalSlug,
  title,
  caption,
  limit = 6,
  slugs,
  ...props
}) => {
  const vertical = getVertical(verticalSlug)
  const entries = (
    slugs ? slugs.map(getUseCase).filter(Boolean) : verticalUseCases(verticalSlug)
  ).slice(0, limit)
  if (!entries.length) return null

  return (
    <Container
      as='section'
      id='use-cases'
      css={theme({
        alignItems: 'center',
        px: 4,
        py: SECTION_VERTICAL_SPACING,
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
      {...props}
    >
      <Box css={theme({ textAlign: 'left', width: '100%' })}>{title}</Box>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [3, 3, 4, 4],
          width: '100%',
          textAlign: 'left'
        })}
      >
        {caption}
      </Caption>
      <CardGrid>
        {entries.map(entry => (
          <UseCaseCard key={entry.slug} entry={entry} />
        ))}
      </CardGrid>
      <Box css={theme({ pt: [3, 3, 4, 4], width: '100%' })}>
        <ArrowLink
          href={pathToUseCase(vertical.slug)}
          css={theme({ color: 'link', fontWeight: 'bold', fontSize: [1, 2, 2, 2] })}
        >
          All {vertical.name.toLowerCase()} use cases
        </ArrowLink>
      </Box>
    </Container>
  )
}
