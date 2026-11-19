import React from 'react'
import { theme, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import { GradientText, MICROLINK_PLAN } from 'components/patterns/ProductStory'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { InteractiveExample } from 'components/pages/embed'
import {
  SAME_PRICE,
  COMPETITOR_PRICE,
  MICROLINK_VOLUME,
  IFRAMELY_VOLUME
} from './shared'

export const Hero = () => (
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
        css={theme({
          textAlign: 'center',
          maxWidth: '100%',
          color: 'black'
        })}
      >
        The <GradientText>Iframely</GradientText> alternative{' '}
        <Box
          as='br'
          css={theme({ display: ['none', 'none', 'block', 'block'] })}
        />
        for pricing by the&nbsp;request
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black80'
        })}
      >
        {SAME_PRICE
          ? `For the same $${COMPETITOR_PRICE}/month, Microlink gives you ${MICROLINK_VOLUME} requests against Iframely’s ${IFRAMELY_VOLUME} hits`
          : `For $${MICROLINK_PLAN.price}/month, Microlink gives you ${MICROLINK_VOLUME} requests against Iframely’s ${IFRAMELY_VOLUME} hits for $${COMPETITOR_PRICE}`}
        , with no rate limit on paid&nbsp;plans.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-iframely:hero'
        secondaryHref='/embed'
        secondaryLabel='Explore the Embed API'
        onClick={() =>
          trackEvent('alternative cta', { competitor: 'iframely' })}
      />

      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          width: '100%',
          maxWidth: layout.large,
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <InteractiveExample flat hideFooter />
      </Flex>
    </Flex>
  </BluePrintBackground>
)
