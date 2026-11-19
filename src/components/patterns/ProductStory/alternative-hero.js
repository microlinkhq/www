import React from 'react'
import { layout, theme } from 'theme'

import Flex from 'components/elements/Flex'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'

import { AlternativeHeroActions } from './alternative-hero-actions'
import { EDITOR_FRAME, HeroEditor } from './hero-parts'
import { GradientText } from './section'
import { Caption, Heading } from './shared'

export const AlternativeHero = ({
  competitor,
  tagline,
  description,
  cta,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  children,
  ...props
}) => (
  <BluePrintBackground as='section' id='hero'>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: 3,
        pb: [4, 4, 5, 5],
        px: [3, 3, 4, 4]
      })}
    >
      <Heading
        variant={null}
        css={theme({ maxWidth: layout.large, color: 'black' })}
      >
        The {competitor} <GradientText>alternative</GradientText>
        <br />
        {tagline}
      </Heading>
      <Caption
        forwardedAs='h2'
        css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.normal })}
      >
        {description}
      </Caption>
      <AlternativeHeroActions
        cta={cta}
        ctaLabel={ctaLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
      />
      <Flex
        css={[
          theme({
            width: '100%',
            maxWidth: layout.large,
            justifyContent: 'center',
            pt: [4, 4, 5, 5]
          }),
          EDITOR_FRAME
        ]}
      >
        {children || <HeroEditor {...props} />}
      </Flex>
    </Flex>
  </BluePrintBackground>
)
