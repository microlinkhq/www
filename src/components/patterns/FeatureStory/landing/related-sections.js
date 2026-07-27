import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Faq from 'components/patterns/Faq/Faq'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'

import { ExamplesSwitcher } from './examples-switcher'
import { FeatureCard } from './feature-card'

import {
  SECTION_MAX_WIDTH,
  SECTION_PX
} from 'components/patterns/CustomerStory/primitives'

import { ACCENT, getFeature, getRelatedFeatures } from '../features'
import { Card, CardBody, CardTitle, Eyebrow } from '../primitives'
import { FeatureIcon } from './feature-icon'
import { FeatureSection } from './shell'

export const ExamplesSection = ({
  eyebrow = 'Examples',
  title,
  examples,
  moreHref,
  samples,
  sampleAliases,
  panels
}) => (
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
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>{title}</Subhead>
      </Box>
      {moreHref && (
        <ArrowLink
          href={moreHref}
          css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
        >
          More examples
        </ArrowLink>
      )}
    </Flex>
    {panels
      ? (
        <ExamplesSwitcher panels={panels} />
        )
      : samples
        ? (
          <Box css={theme({ width: '100%', minWidth: 0 })}>
            <MultiCodeEditor
              languages={samples}
              aliases={sampleAliases}
              storageKey='feature-examples-samples'
              defaultIndex={0}
            />
          </Box>
          )
        : (
          <Box
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              gap: [3, 3, 4, 4]
            })}
          >
            {examples.map(({ title: exampleTitle, description, snippet, href }) => (
              <Card key={exampleTitle} css={theme({ minWidth: 0 })}>
                <CardTitle as='h3' css={theme({ fontFamily: 'sans' })}>
                  {exampleTitle}
                </CardTitle>
                <CardBody
                  css={theme({ fontFamily: 'sans', fontSize: [1, 1, 2, 2] })}
                >
                  {description}
                </CardBody>
                {snippet && (
                  <Box
                    as='pre'
                    css={theme({
                      m: 0,
                      p: [3, 3, 4, 4],
                      bg: 'gray1',
                      borderRadius: 2,
                      fontFamily: 'mono',
                      fontSize: 1,
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
                      css={theme({
                        color: 'link',
                        fontWeight: 'bold',
                        fontSize: 1
                      })}
                    >
                      View example
                    </ArrowLink>
                  </Box>
                )}
              </Card>
            ))}
          </Box>
          )}
  </FeatureSection>
)

export const UseCasesSection = ({ eyebrow = 'Use cases', title, useCases }) => (
  <FeatureSection id='use-cases'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
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
        gap: [4, 4, 5, 5]
      })}
    >
      {useCases.map(({ title, description, icon }) => (
        <Box key={title} css={theme({ minWidth: 0 })}>
          <Flex css={theme({ alignItems: 'center', gap: 2, pb: 2 })}>
            <FeatureIcon name={icon || 'globe'} color='secondary' size={20} />
            <Text
              css={theme({
                fontFamily: 'sans',
                fontWeight: 'bold',
                fontSize: 2,
                color: 'black'
              })}
            >
              {title}
            </Text>
          </Flex>
          <Text
            css={theme({
              fontFamily: 'sans',
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </Box>
      ))}
    </Box>
  </FeatureSection>
)

export const RelatedFeaturesSection = ({
  slug,
  relatedSlugs,
  eyebrow = 'Related features',
  title = 'Compose with these next.'
}) => {
  const related = relatedSlugs?.length
    ? relatedSlugs.flatMap(id => {
      const feature = getFeature(id)
      return feature ? [feature] : []
    })
    : getRelatedFeatures(slug)
  return (
    <FeatureSection id='related'>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
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
          gap: [3, 3, 3, 3]
        })}
      >
        {related.map(feature => (
          <FeatureCard key={feature.slug} feature={feature} />
        ))}
      </Box>
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
          py: SECTION_VERTICAL_SPACING,
          px: SECTION_PX
        })}
        title='FAQ'
        questions={questions}
      />
      {moreHref && (
        <Box
          css={theme({
            px: SECTION_PX,
            pb: SECTION_VERTICAL_SPACING,
            textAlign: 'center'
          })}
        >
          <ArrowLink
            href={moreHref}
            css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
          >
            View all FAQs
          </ArrowLink>
        </Box>
      )}
    </Box>
  </Box>
)
