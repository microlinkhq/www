import React from 'react'
import { theme, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { GradientText } from 'components/patterns/ProductStory'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import styled from 'styled-components'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Terminal from 'components/elements/Terminal/Terminal'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import {
  MICROLINK_OFFER,
  COMPETITOR_OFFER,
  MICROLINK_CURL,
  UNAVATAR_SCREENSHOT_URL,
  UNAVATAR_SCREENSHOT_LABEL,
  UNAVATAR_SCREENSHOT_FLAGS
} from './shared'

const HeroCodeLink = styled('a')`
  ${theme({
    color: 'link',
    fontFamily: 'mono',
    fontSize: [0, 1, 1, 1],
    whiteSpace: 'nowrap'
  })}
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    text-decoration: underline;
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
        The URL2PNG <GradientText>alternative</GradientText>{' '}
        <Box
          as='br'
          css={theme({ display: ['none', 'none', 'block', 'block'] })}
        />
        for screenshots, PDF, and&nbsp;metadata
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black'
        })}
      >
        Microlink gives you {MICROLINK_OFFER} against URL2PNG’s{' '}
        {COMPETITOR_OFFER}, plus PDFs, metadata, and&nbsp;previews.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-url2png:hero'
        secondaryHref='/screenshot'
        secondaryLabel='Explore the Screenshot API'
        onClick={() => trackEvent('alternative cta', { competitor: 'url2png' })}
      />

      <Box
        css={theme({
          width: '100%',
          maxWidth: '960px',
          minWidth: 0,
          pt: [4, 4, 5, 5]
        })}
      >
        <Caps
          css={theme({
            fontSize: 0,
            color: 'black60',
            pb: 2,
            display: 'block',
            textAlign: 'center'
          })}
        >
          Microlink
        </Caps>
        <Terminal blinkCursor={false} autoHeight>
          {MICROLINK_CURL}
        </Terminal>
        <Text
          css={theme({
            pt: 2,
            fontSize: 0,
            color: 'black60',
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          One response: metadata, a screenshot URL, and a PDF URL, all
          CDN&#8209;hosted.
        </Text>
      </Box>

      <Box
        css={theme({
          pt: [3, 3, 4, 4],
          width: '100%',
          maxWidth: layout.large
        })}
      >
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black',
            lineHeight: 2,
            textAlign: 'center',
            maxWidth: '42em',
            mx: 'auto'
          })}
        >
          URL2PNG asks you to email them to create an account and does not offer
          a free trial. Microlink lets you test the screenshot API immediately
          with a free API key and{' '}
          <b>{FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day</b>, renews daily,
          no credit&nbsp;card.
        </Text>

        <Text
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: 1,
            color: 'black',
            textAlign: 'center'
          })}
        >
          Quick test on the <b>unavatar.io</b> homepage: click the URL below to
          generate the&nbsp;screenshot.
        </Text>

        <Text
          css={theme({
            pt: 2,
            fontSize: 1,
            lineHeight: 2,
            textAlign: 'center',
            maxWidth: layout.large,
            mx: 'auto'
          })}
        >
          <HeroCodeLink
            href={UNAVATAR_SCREENSHOT_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${UNAVATAR_SCREENSHOT_URL}. Generate a live screenshot of unavatar.io with the Microlink API (opens in a new tab)`}
          >
            <Box
              as='span'
              css={theme({ display: ['inline', 'none', 'none', 'none'] })}
            >
              Open the screenshot URL
            </Box>
            <Box
              as='span'
              css={theme({ display: ['none', 'inline', 'inline', 'inline'] })}
            >
              {UNAVATAR_SCREENSHOT_LABEL}
              {UNAVATAR_SCREENSHOT_FLAGS}
            </Box>
          </HeroCodeLink>
        </Text>
      </Box>
    </Flex>
  </BluePrintBackground>
)
