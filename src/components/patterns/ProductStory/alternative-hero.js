import React from 'react'
import { layout, theme } from 'theme'

import Flex from 'components/elements/Flex'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'

import { EDITOR_FRAME, HeroActions, HeroEditor } from './hero-parts'
import { GradientText } from './section'
import { Caption, Heading } from './shared'

export const AlternativeHero = ({
  competitor,
  tagline,
  description,
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
        The <GradientText>{competitor}</GradientText> alternative
        <br />
        {tagline}
      </Heading>
      <Caption
        forwardedAs='h2'
        css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.normal })}
      >
        {description}
      </Caption>
      <HeroActions {...props} justifyContent='center' />
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
