import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { UseCaseCard } from './use-case-card'
import { getUseCase } from '../use-cases'

export const RelatedUseCasesSection = ({
  useCases = [],
  eyebrow = 'Use cases',
  title = 'See it solve a real problem.'
}) => {
  const entries = useCases.map(getUseCase).filter(Boolean)
  if (!entries.length) return null

  return (
    <FeatureSection id='use-cases'>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        {title}
      </Subhead>
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            'minmax(0, 1fr)',
            'minmax(0, 1fr)',
            'repeat(2, minmax(0, 1fr))',
            'repeat(2, minmax(0, 1fr))'
          ],
          gap: 3
        })}
      >
        {entries.map(entry => (
          <UseCaseCard key={entry.slug} entry={entry} />
        ))}
      </Box>
    </FeatureSection>
  )
}
