import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'

import { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
import { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
import Layout from 'components/patterns/Layout'

import { UseCaseFaqSection } from './faq'
import { UseCaseHero } from './hero'
import { HowSection } from './how'
import { ProblemSection } from './problem'
import { WhySection } from './why'
import { MoreUseCases } from '../MoreUseCases'
import { ACCENT, getUseCase, getVertical } from '../use-cases'

export const UseCaseLanding = ({ content }) => {
  const entry = getUseCase(content.slug)
  const vertical = getVertical(entry.vertical)

  return (
    <Layout css={theme({ position: 'relative' })}>
      <DashedGridOverlay aria-hidden='true' />
      <Box css={theme({ position: 'relative', zIndex: 1 })}>
        <UseCaseHero vertical={vertical} hero={content.hero} />
        <ProblemSection problem={content.problem} />
        <HowSection how={content.how} />
        <WhySection why={content.why} />
        <UseCaseFaqSection questions={content.faq} />
        <MoreUseCases
          accent={ACCENT}
          currentSlug={content.slug}
          slugs={entry.related}
          eyebrow='Related use cases'
          title='Solve the next problem with the same API'
          mt={0}
        />
        <CtaSection accent={ACCENT} mt={0} {...content.cta} />
      </Box>
    </Layout>
  )
}
