import React from 'react'
import { theme, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import styled from 'styled-components'
import { GradientText } from 'components/patterns/ProductStory'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Terminal from 'components/elements/Terminal/Terminal'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import {
  MICROLINK_CURL,
  CLOUDFLARE_CURL,
  LIVE_SCREENSHOT_URL,
  LIVE_SCREENSHOT_HOST,
  LIVE_SCREENSHOT_QUERY,
  LIVE_SCREENSHOT_FLAG
} from './shared'

const HeroCodeLink = styled('a')`
  ${theme({
    color: 'link',
    fontFamily: 'mono',
    fontSize: [0, 1, 1, 1]
  })}
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;

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
        The <GradientText>Cloudflare</GradientText> alternative
        <Box
          as='span'
          css={theme({ display: ['inline', 'inline', 'inline', 'none'] })}
        >
          &nbsp;
        </Box>
        <Box
          as='br'
          css={theme({ display: ['none', 'none', 'none', 'block'] })}
        />
        for screenshots with no&nbsp;setup
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black80'
        })}
      >
        Cloudflare rents you a raw headless browser. Microlink returns the
        finished capture, cookie banners removed, proxy&nbsp;included.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-cloudflare:hero'
        secondaryHref='/screenshot'
        secondaryLabel='Explore the Screenshot API'
        onClick={() =>
          trackEvent('alternative cta', { competitor: 'cloudflare' })}
      />

      <Flex
        css={theme({
          width: '100%',
          maxWidth: '960px',
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: 'column'
        })}
      >
        <Box css={theme({ width: '100%', minWidth: 0 })}>
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
            Returns a CDN&#8209;hosted URL, cookie banners already&nbsp;gone.
          </Text>
        </Box>
        <Box css={theme({ width: '100%', minWidth: 0 })}>
          <Caps
            css={theme({
              fontSize: 0,
              color: 'black60',
              pb: 2,
              display: 'block',
              textAlign: 'center'
            })}
          >
            Cloudflare Browser Run
          </Caps>
          <Terminal blinkCursor={false} autoHeight>
            {CLOUDFLARE_CURL}
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
            Returns raw binary. Storing, caching, and serving it is on&nbsp;you.
          </Text>
        </Box>
      </Flex>

      <Text
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: 1,
          color: 'black60',
          textAlign: 'center'
        })}
      >
        Try it right now, even on <b>cloudflare.com</b>&nbsp;itself:
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
          href={LIVE_SCREENSHOT_URL + '&embed=screenshot.url'}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${LIVE_SCREENSHOT_HOST}${LIVE_SCREENSHOT_QUERY}${LIVE_SCREENSHOT_FLAG} (opens a live screenshot of cloudflare.com in a new tab)`}
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
            {LIVE_SCREENSHOT_HOST}
            {LIVE_SCREENSHOT_QUERY}
            {LIVE_SCREENSHOT_FLAG}
          </Box>
        </HeroCodeLink>
      </Text>
    </Flex>
  </BluePrintBackground>
)
