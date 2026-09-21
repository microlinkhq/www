import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'
import { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
import { CustomerCard } from 'components/patterns/CustomerStory/CustomerCard'
import {
  CUSTOMERS,
  CUSTOMERS_HUB
} from 'components/patterns/CustomerStory/customers'
import {
  CardGrid,
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'
import { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
import Layout from 'components/patterns/Layout'

import { UseCaseBreadcrumbs } from '../landing/hero'
import { MoreUseCases } from '../MoreUseCases'
import { ACCENT, VERTICALS, verticalUseCases } from '../use-cases'

const USE_CASES_PER_VERTICAL = 2

const featuredUseCaseSlugs = () =>
  VERTICALS.flatMap(vertical =>
    verticalUseCases(vertical.slug)
      .slice(0, USE_CASES_PER_VERTICAL)
      .map(entry => entry.slug)
  )

export const CustomersHub = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
        <SectionInner>
          <UseCaseBreadcrumbs
            crumbs={[
              { label: 'Use cases', href: '/use-cases' },
              { label: CUSTOMERS_HUB.name }
            ]}
          />
          <StoryTag
            accent={ACCENT}
            css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
          >
            {CUSTOMERS_HUB.name}
          </StoryTag>
          <Heading
            variant={null}
            css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
          >
            {CUSTOMERS_HUB.h1}
          </Heading>
          <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
            {CUSTOMERS_HUB.intro}
          </Text>
        </SectionInner>
      </Section>

      <Section id='stories' css={theme({ scrollMarginTop: 4 })}>
        <SectionInner>
          <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
            Stories
          </Eyebrow>
          <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
            Pick a story close to your product
          </Subhead>
          <CardGrid>
            {CUSTOMERS.map(entry => (
              <CustomerCard key={entry.slug} entry={entry} />
            ))}
          </CardGrid>
        </SectionInner>
      </Section>

      <CtaSection accent={ACCENT} {...CUSTOMERS_HUB.cta} />
      <MoreUseCases
        accent={ACCENT}
        slugs={featuredUseCaseSlugs()}
        eyebrow='Use cases'
        title='Find the recipe for your own product'
      />
    </Box>
  </Layout>
)
