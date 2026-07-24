import { theme, shadows } from 'theme'
import React from 'react'
import { ChevronRight } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Faq from 'components/patterns/Faq/Faq'

import {
  SECTION_MAX_WIDTH,
  SECTION_PX,
  SECTION_PY
} from 'components/patterns/CustomerStory/primitives'

import { ACCENT, getRelatedFeatures } from '../features'
import { Card, CardBody, CardTitle, Eyebrow } from '../primitives'
import { FeatureIcon } from './feature-icon'
import { FeatureSection } from './shell'

export const ExamplesSection = ({ examples, moreHref }) => (
  <FeatureSection id='examples'>
    <Flex
      css={theme({
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        gap: 3,
        pb: [3, 3, 4, 4]
      })}
    >
      <Box>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>Examples</Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>Common patterns.</Subhead>
      </Box>
      {moreHref && (
        <ArrowLink
          href={moreHref}
          css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
        >
          More examples →
        </ArrowLink>
      )}
    </Flex>
    <Flex
      css={theme({
        gap: 3,
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch'
      })}
    >
      {examples.map(({ title, description, snippet, href }) => (
        <Card key={title} css={theme({ flex: '1 1 0', minWidth: 0 })}>
          <CardTitle as='h3'>{title}</CardTitle>
          <CardBody>{description}</CardBody>
          {snippet && (
            <Box
              as='pre'
              css={theme({
                m: 0,
                p: 3,
                bg: 'black025',
                borderRadius: 2,
                fontFamily: 'mono',
                fontSize: 0,
                color: 'black70',
                overflowX: 'auto',
                lineHeight: 2
              })}
            >
              {snippet}
            </Box>
          )}
          {href && (
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href={href}
                css={theme({ color: 'link', fontWeight: 'bold', fontSize: 0 })}
              >
                View example →
              </ArrowLink>
            </Box>
          )}
        </Card>
      ))}
    </Flex>
  </FeatureSection>
)

export const UseCasesSection = ({ useCases }) => (
  <FeatureSection id='use-cases'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>Use cases</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      Where teams use it.
    </Subhead>
    <Flex
      css={theme({
        gap: [3, 3, 4, 4],
        flexWrap: 'wrap',
        alignItems: 'stretch'
      })}
    >
      {useCases.map(({ title, description, icon }) => (
        <Box
          key={title}
          css={theme({
            flex: ['1 1 100%', '1 1 45%', '1 1 0', '1 1 0'],
            minWidth: [0, 0, '140px', '140px']
          })}
        >
          <Flex css={theme({ alignItems: 'center', gap: 2, pb: 2 })}>
            <FeatureIcon name={icon || 'globe'} color='secondary' size={18} />
            <Text
              css={theme({ fontWeight: 'bold', fontSize: 1, color: 'black' })}
            >
              {title}
            </Text>
          </Flex>
          <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
            {description}
          </Text>
        </Box>
      ))}
    </Flex>
  </FeatureSection>
)

export const RelatedFeaturesSection = ({ slug }) => {
  const related = getRelatedFeatures(slug)
  return (
    <FeatureSection id='related'>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>
        Related features
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        Compose with these next.
      </Subhead>
      <Flex
        css={theme({
          gap: 3,
          flexDirection: ['column', 'column', 'row', 'row'],
          flexWrap: 'wrap'
        })}
      >
        {related.map(feature => (
          <Link
            key={feature.slug}
            href={`/features/${feature.slug}`}
            css={theme({
              textDecoration: 'none',
              color: 'inherit',
              flex: ['1 1 100%', '1 1 45%', '1 1 0', '1 1 0'],
              minWidth: 0
            })}
          >
            <Flex
              css={theme({
                alignItems: 'center',
                gap: 3,
                p: 3,
                bg: 'white',
                border: 1,
                borderColor: 'black10',
                borderRadius: 3,
                height: '100%'
              })}
              style={{ boxShadow: shadows[0] }}
            >
              <FeatureIcon
                name={feature.icon}
                color={feature.iconColor}
                size={20}
              />
              <Box css={theme({ flex: '1 1 auto', minWidth: 0 })}>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: 1,
                    color: 'black'
                  })}
                >
                  {feature.name}
                </Text>
                <Text
                  css={theme({
                    fontSize: 0,
                    color: 'black60',
                    lineHeight: 2,
                    pt: 1
                  })}
                >
                  {feature.oneLiner}
                </Text>
              </Box>
              <Box aria-hidden='true' css={theme({ color: 'black40' })}>
                <ChevronRight size={18} />
              </Box>
            </Flex>
          </Link>
        ))}
      </Flex>
    </FeatureSection>
  )
}

export const FeatureFaqSection = ({ questions, moreHref }) => (
  <Box
    css={theme({
      bg: ACCENT.bgSoft,
      borderTop: 1,
      borderTopColor: ACCENT.bgEdge,
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_PY,
          px: SECTION_PX
        })}
        title='FAQ'
        questions={questions}
      />
      {moreHref && (
        <Box
          css={theme({
            px: SECTION_PX,
            pb: SECTION_PY,
            textAlign: 'center'
          })}
        >
          <ArrowLink
            href={moreHref}
            css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
          >
            View all FAQs →
          </ArrowLink>
        </Box>
      )}
    </Box>
  </Box>
)
