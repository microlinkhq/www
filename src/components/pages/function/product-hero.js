import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import {
  Caption,
  Heading,
  GradientText
} from 'components/patterns/ProductStory'

import { HERO } from './product-shared'
import { FunctionExamplesGrid } from './examples-grid'

export const FunctionProductHero = () => (
  <Container
    as='section'
    id='hero'
    css={theme({
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
      pt: [4, 4, 4, 5],
      pb: SECTION_VERTICAL_SPACING,
      px: [3, 3, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center'
      })}
    >
      <Heading
        variant={null}
        css={theme({
          color: 'black'
        })}
      >
        {HERO.title}
        <LineBreak />
        <GradientText css={theme({ fontSize: 'inherit' })}>
          {HERO.titleAccent}
        </GradientText>
      </Heading>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 3, 3],
          mx: 'auto',
          maxWidth: layout.normal
        })}
      >
        {HERO.description}
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [2, 2, 3, 3],
          justifyContent: 'center'
        })}
      >
        <ArrowLink css={theme({ pr: [2, 4, 4, 4] })} href={HERO.ctaHref}>
          {HERO.ctaLabel}
        </ArrowLink>
        <ArrowLink href={HERO.docsHref}>{HERO.docsLabel}</ArrowLink>
      </Flex>
    </Flex>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: `calc(${layout.large} * 1.15)`,
        mx: 'auto',
        pt: [5, 5, 5, 5],
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <Text
        css={theme({
          color: 'black60',
          textAlign: 'center',
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal
        })}
      >
        {HERO.glanceCaption}
      </Text>
      <FunctionExamplesGrid />
    </Flex>
  </Container>
)
