import { theme } from 'theme'
import React from 'react'

import Subhead from 'components/elements/Subhead'

import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'

import { CardGrid, UseCaseCard } from './hub/use-case-card'
import { USE_CASES, getUseCase, verticalUseCases } from './use-cases'

const FALLBACK_LIMIT = 6

const notCurrent = currentSlug => entry => entry && entry.slug !== currentSlug

const resolveEntries = ({ currentSlug, slugs }) => {
  if (Array.isArray(slugs)) {
    return slugs.map(getUseCase).filter(notCurrent(currentSlug))
  }
  const current = getUseCase(currentSlug)
  const siblings =
    current && current.vertical
      ? verticalUseCases(current.vertical).filter(notCurrent(currentSlug))
      : []
  if (siblings.length >= 2) return siblings
  return USE_CASES.filter(notCurrent(currentSlug)).slice(0, FALLBACK_LIMIT)
}

export const MoreUseCases = ({
  accent,
  currentSlug,
  slugs,
  eyebrow = 'More use cases',
  title = 'Explore more ways to build with Microlink',
  mt = 5
}) => {
  const list = resolveEntries({ currentSlug, slugs })
  if (list.length < 2) return null
  return (
    <Section css={theme({ mt })}>
      <SectionInner>
        <Eyebrow accent={accent} css={theme({ pb: 2, display: 'block' })}>
          {eyebrow}
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
          {title}
        </Subhead>
        <CardGrid>
          {list.map(entry => (
            <UseCaseCard key={entry.slug} entry={entry} />
          ))}
        </CardGrid>
      </SectionInner>
    </Section>
  )
}
