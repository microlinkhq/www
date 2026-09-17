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
import { UseCaseBreadcrumbs } from '../landing/hero'
import { VerticalIconTile } from '../landing/vertical-icon'
import { MoreUseCases } from '../MoreUseCases'
import { ACCENT, VERTICALS, useCasesByVertical } from '../use-cases'

const linkStyle = size => theme({ color: 'link', fontWeight: 'bold', fontSize: size })

const startHereLinks = vertical =>
  [
    { href: vertical.productHref, label: `Microlink ${vertical.product}` },
    { href: vertical.docsHref, label: vertical.docsLabel },
    vertical.toolHref && { href: vertical.toolHref, label: vertical.toolLabel },
    { href: '/docs', label: 'Microlink docs' }
  ].filter(Boolean)

const otherVerticalSlugs = vertical =>
  VERTICALS.filter(other => other.slug !== vertical.slug).flatMap(other =>
    useCasesByVertical(other.slug)
      .slice(0, 2)
      .map(entry => entry.slug)
  )

export const VerticalHub = ({ vertical }) => {
  const entries = useCasesByVertical(vertical.slug)

  return (
    <Layout css={theme({ position: 'relative' })}>
      <DashedGridOverlay aria-hidden='true' />
      <Box css={theme({ position: 'relative', zIndex: 1 })}>
        <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
          <SectionInner>
            <UseCaseBreadcrumbs
              crumbs={[
                { label: 'Use cases', href: '/use-cases' },
                { label: vertical.name }
              ]}
            />
            <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
              <VerticalIconTile vertical={vertical} size={40} />
              <Text
                css={theme({
                  color: 'black',
                  fontSize: 2,
                  fontWeight: 'bold',
                  lineHeight: 1
                })}
              >
                {vertical.product}
              </Text>
            </Flex>
            <Heading
              variant={null}
              css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
            >
              {vertical.hub.h1}
            </Heading>
            <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
              {vertical.hub.intro}
            </Text>
            <Box css={theme({ pt: [3, 3, 4, 4] })}>
              <ArrowLink href={vertical.productHref} css={linkStyle([2, 2, 3, 3])}>
                Start with the {vertical.product}
              </ArrowLink>
            </Box>
          </SectionInner>
        </Section>

        <Section id='use-cases' css={theme({ scrollMarginTop: 4 })}>
          <SectionInner>
            <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
              Use cases
            </Eyebrow>
            <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
              Pick the problem you are solving
            </Subhead>
            <CardGrid>
              {entries.map(entry => (
                <UseCaseCard key={entry.slug} entry={entry} />
              ))}
            </CardGrid>
          </SectionInner>
        </Section>

        <Section css={theme({ pt: 0 })}>
          <SectionInner>
            <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
              Start here
            </Eyebrow>
            <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
              Docs and resources
            </Subhead>
            <Flex css={theme({ flexDirection: 'column', gap: 3 })}>
              {startHereLinks(vertical).map(({ href, label }) => (
                <ArrowLink key={href} href={href} css={linkStyle([1, 2, 2, 2])}>
                  {label}
                </ArrowLink>
              ))}
            </Flex>
          </SectionInner>
        </Section>

        <CtaSection accent={ACCENT} href={vertical.productHref} {...vertical.hub.cta} />
        <MoreUseCases
          accent={ACCENT}
          slugs={otherVerticalSlugs(vertical)}
          eyebrow='Other use cases'
          title='Explore the other Microlink APIs'
        />
      </Box>
    </Layout>
  )
}
