import React from 'react'
import { theme, shadows, breakpoints, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { GradientText } from 'components/patterns/ProductStory'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import RaceContainer from 'components/patterns/RaceContainer/RaceContainer'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import styled from 'styled-components'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import {
  COMPETITOR_PRICE,
  MICROLINK_REQUESTS,
  COMPETITOR_RENDERS,
  SPEED,
  BENCHMARK_DATA,
  SERVICE_COLORS
} from './shared'

const RaceHero = styled(Box)`
  width: 100%;
  max-width: 960px;

  ${theme({
    borderRadius: 4,
    bg: 'white',
    p: [3, 3, 4, 4],
    boxShadow: `${shadows[4]}`
  })}

  & > div {
    min-height: 220px;

    @media (max-width: ${breakpoints[0]}) {
      min-height: 190px;
    }
  }
`

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
        The Urlbox <GradientText>alternative</GradientText>{' '}
        <Box
          as='br'
          css={theme({ display: ['none', 'none', 'block', 'block'] })}
        />
        for better cost per&nbsp;render
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black'
        })}
      >
        For the same ${COMPETITOR_PRICE}, Microlink gives you{' '}
        {MICROLINK_REQUESTS}&nbsp;requests against {COMPETITOR_RENDERS} on
        Urlbox Hi&#8209;Fi, and is {SPEED.averageRatio}&times; faster on average
        in our&nbsp;benchmark.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-urlbox:hero'
        secondaryHref='/screenshot'
        secondaryLabel='Explore the Screenshot API'
        onClick={() => trackEvent('alternative cta', { competitor: 'urlbox' })}
      />

      <Flex
        css={theme({
          width: '100%',
          justifyContent: 'center',
          pt: [4, 4, 5, 5]
        })}
      >
        <RaceHero aria-label='Live benchmark race: Microlink vs Urlbox screenshot speed'>
          <RaceContainer
            benchmarkData={BENCHMARK_DATA}
            serviceColors={SERVICE_COLORS}
            highlightKey='microlink'
            flat
            compact
          />
        </RaceHero>
      </Flex>
    </Flex>
  </BluePrintBackground>
)
