import { theme } from 'theme'
import React from 'react'
import { ChevronRight } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Button from 'components/elements/Button/Button'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'
import ArrowLink from 'components/patterns/ArrowLink'

import { SectionTitle } from './section-title'
import { NEXT_STEPS } from './shared'

const CtaLabel = ({ children }) => (
  <Flex as='span' css={theme({ alignItems: 'center', gap: 1 })}>
    {children}
    <FeatherIcon icon={ChevronRight} />
  </Flex>
)

export const NextSteps = () => (
  <FeatureSection id='next-steps'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>
      {NEXT_STEPS.eyebrow}
    </Eyebrow>
    <SectionTitle>{NEXT_STEPS.title}</SectionTitle>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black70',
        lineHeight: 2,
        pb: [3, 3, 4, 4],
        maxWidth: '36em'
      })}
    >
      {NEXT_STEPS.description}
    </Text>
    <Flex css={theme({ gap: 3, flexWrap: 'wrap', alignItems: 'center' })}>
      <Button
        as={Link}
        href={NEXT_STEPS.primaryCta.href}
        variant='gradient'
        css={theme({ textDecoration: 'none' })}
      >
        <CtaLabel>{NEXT_STEPS.primaryCta.label}</CtaLabel>
      </Button>
      <ArrowLink
        href={NEXT_STEPS.secondaryCta.href}
        css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
      >
        {NEXT_STEPS.secondaryCta.label}
      </ArrowLink>
    </Flex>
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: 1,
          color: 'black60',
          lineHeight: 2
        })}
      >
        Or jump into a primitive above — each card opens a focused teaching
        page.
      </Text>
    </Box>
  </FeatureSection>
)
