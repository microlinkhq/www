import React from 'react'
import { theme, colors, gradient, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import { GradientText } from 'components/patterns/ProductStory'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import {
  FIRECRAWL_CARD_FACTS,
  FIRECRAWL_CARD_FOOTNOTE,
  LIVE_MARKDOWN_URL,
  LIVE_MARKDOWN_ORIGIN,
  LIVE_MARKDOWN_SUBDOMAIN,
  LIVE_MARKDOWN_DOMAIN,
  MICROLINK_CARD_FACTS,
  MICROLINK_CARD_FOOTNOTE
} from './shared'

const PriceCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    flex: 1,
    minWidth: '260px'
  })}
`

const PriceAmount = styled(Text)`
  ${theme({
    fontSize: [4, 5, 5, 5],
    fontWeight: 'bold',
    lineHeight: 0
  })}
  font-variant-numeric: tabular-nums;
`

const HeroPlanCard = styled(PriceCard)`
  &[data-featured='true'] {
    ${theme({ boxShadow: 2 })}
    border: 2px solid transparent;
    background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
      ${gradient} border-box;
  }
`

const PlanBadge = styled(Text).attrs({ as: 'span' })`
  ${theme({
    alignSelf: 'flex-start',
    mb: 3,
    px: 2,
    borderRadius: 5,
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 2,
    bg: 'black05',
    color: 'black'
  })}
`

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

const HeroFactList = styled(Box).attrs({ as: 'ul' })`
  ${theme({ m: 0, pt: 3, pl: 0, listStyle: 'none' })}
`

const HeroFact = ({ featured, children }) => (
  <Flex as='li' css={theme({ alignItems: 'flex-start', gap: 2, pb: 2 })}>
    <FeatherIcon
      aria-hidden='true'
      icon={CheckIcon}
      size='16px'
      css={theme({
        flexShrink: 0,
        mt: '6px',
        color: 'black'
      })}
    />
    <Text
      as='span'
      css={theme({
        fontSize: 1,
        lineHeight: 2,
        color: 'black',
        textWrap: 'pretty'
      })}
    >
      {children}
    </Text>
  </Flex>
)

const HeroFacts = ({ featured, items }) => (
  <HeroFactList>
    {items.map(item => (
      <HeroFact key={item} featured={featured}>
        {item}
      </HeroFact>
    ))}
  </HeroFactList>
)

const HeroCardFootnote = ({ children }) => (
  <Text
    css={theme({
      mt: 'auto',
      pt: 2,
      fontSize: 1,
      color: 'black',
      lineHeight: 2
    })}
  >
    {children}
  </Text>
)

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
        The Firecrawl <GradientText>alternative</GradientText>{' '}
        <Box
          as='br'
          css={theme({ display: ['none', 'none', 'block', 'block'] })}
        />
        for one flat price per&nbsp;request
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black'
        })}
      >
        Firecrawl credits multiply with the output: LLM formats add 4 per page,
        PDFs bill per&nbsp;page. Microlink returns markdown, metadata, and
        screenshots at one flat price per request, proxy&nbsp;included.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-firecrawl:hero'
        secondaryHref='/markdown'
        secondaryLabel='Explore the Markdown API'
        onClick={() =>
          trackEvent('alternative cta', { competitor: 'firecrawl' })}
      />

      <Flex
        css={theme({
          width: '100%',
          maxWidth: '960px',
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'stretch'
        })}
      >
        <HeroPlanCard data-featured='true' css={theme({ minWidth: 0 })}>
          <PlanBadge>Microlink</PlanBadge>
          <PriceAmount>
            1
            <Text
              as='span'
              css={theme({
                fontSize: 2,
                color: 'black',
                fontWeight: 'normal'
              })}
            >
              &nbsp;request
            </Text>
          </PriceAmount>
          <HeroFacts featured items={MICROLINK_CARD_FACTS} />
          <HeroCardFootnote>{MICROLINK_CARD_FOOTNOTE}</HeroCardFootnote>
        </HeroPlanCard>

        <HeroPlanCard css={theme({ bg: 'white', minWidth: 0 })}>
          <PlanBadge>Firecrawl</PlanBadge>
          <PriceAmount>
            1+
            <Text
              as='span'
              css={theme({
                fontSize: 2,
                color: 'black',
                fontWeight: 'normal'
              })}
            >
              &nbsp;credits
            </Text>
          </PriceAmount>
          <HeroFacts items={FIRECRAWL_CARD_FACTS} />
          <HeroCardFootnote>{FIRECRAWL_CARD_FOOTNOTE}</HeroCardFootnote>
        </HeroPlanCard>
      </Flex>

      <Text
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: 1,
          color: 'black',
          textAlign: 'center'
        })}
      >
        Try that one request right now on <b>firecrawl.dev</b>&nbsp;itself:
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
          href={LIVE_MARKDOWN_URL}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${LIVE_MARKDOWN_URL}. Convert firecrawl.dev to Markdown with the Microlink API (opens in a new tab)`}
        >
          {LIVE_MARKDOWN_ORIGIN}/
          <Box
            as='span'
            css={theme({ display: ['none', 'inline', 'inline', 'inline'] })}
          >
            {LIVE_MARKDOWN_SUBDOMAIN}
          </Box>
          {LIVE_MARKDOWN_DOMAIN}
        </HeroCodeLink>
      </Text>
    </Flex>
  </BluePrintBackground>
)
