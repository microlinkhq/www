import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
import {
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'
import { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
import Layout from 'components/patterns/Layout'

import { CardGrid, UseCaseCard } from './use-case-card'
import { UseCaseFaqSection } from '../landing/faq'
import { UseCaseBreadcrumbs } from '../landing/hero'
import { inline } from '../landing/inline-links'
import { WhySection } from '../landing/why'
import { ACCENT, INDUSTRIES, getUseCase, pathToUseCase } from '../use-cases'

const linkStyle = size => theme({ color: 'link', fontWeight: 'bold', fontSize: size })

const otherIndustries = industry =>
  INDUSTRIES.filter(other => other.slug !== industry.slug)

const IndustryHeader = ({ industry }) => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <UseCaseBreadcrumbs
        crumbs={[
          { label: 'Use cases', href: '/use-cases' },
          { label: industry.name }
        ]}
      />
      <Heading variant={null} css={theme({ textAlign: 'left', scrollMarginTop: 4 })}>
        {industry.h1}
      </Heading>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {inline(industry.intro)}
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink href={industry.productHref} css={linkStyle([2, 2, 3, 3])}>
          {industry.productLabel}
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const IndustryUseCases = ({ industry }) => (
  <Section id='use-cases' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Recipes
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        Pick the job you are automating
      </Subhead>
      <CardGrid>
        {industry.useCases.map(getUseCase).map(entry => (
          <UseCaseCard key={entry.slug} entry={entry} />
        ))}
      </CardGrid>
    </SectionInner>
  </Section>
)

const IndustryBuild = ({ build }) => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Scope
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        {build.title}
      </Subhead>
      <Flex css={theme({ flexDirection: 'column', gap: 3 })}>
        {build.paragraphs.map(paragraph => (
          <Text as='p' key={paragraph} css={theme({ color: 'black70', lineHeight: 2 })}>
            {inline(paragraph)}
          </Text>
        ))}
      </Flex>
    </SectionInner>
  </Section>
)

const OtherIndustries = ({ industry }) => (
  <Section>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Other industries
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        Web data for other teams
      </Subhead>
      <Flex css={theme({ flexDirection: 'column', gap: 3 })}>
        {otherIndustries(industry).map(other => (
          <ArrowLink
            key={other.slug}
            href={pathToUseCase(other.slug)}
            css={linkStyle([1, 2, 2, 2])}
          >
            {other.h1}
          </ArrowLink>
        ))}
      </Flex>
    </SectionInner>
  </Section>
)

export const IndustryHub = ({ industry }) => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <IndustryHeader industry={industry} />
      <IndustryUseCases industry={industry} />
      <WhySection why={industry.pipeline} eyebrow='How it fits together' />
      <IndustryBuild build={industry.build} />
      <OtherIndustries industry={industry} />
      <UseCaseFaqSection questions={industry.faq} />
      <CtaSection accent={ACCENT} {...industry.ctaSection} />
    </Box>
  </Layout>
)
