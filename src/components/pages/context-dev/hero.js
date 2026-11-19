import React from 'react'
import { theme, colors, gradient, layout } from 'theme'
import Caption from 'components/patterns/Caption/Caption'
import { AlternativeHeroActions } from 'components/patterns/ProductStory/alternative-hero-actions'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/gtag'
import styled from 'styled-components'
import { Check as CheckIcon, Minus as MinusIcon } from 'react-feather'
import { isMissing } from 'components/patterns/ProductStory/price-comparison'
import FeatherIcon from 'components/icons/Feather'
import { GradientText } from 'components/patterns/ProductStory'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import {
  BRAND_CREDITS,
  BUNDLE_CREDITS,
  CONTEXT_DEV_CARD_FACTS,
  CONTEXT_DEV_CARD_FOOTNOTE,
  LIVE_METADATA_URL,
  LIVE_METADATA_LABEL,
  MICROLINK_CARD_FACTS,
  MICROLINK_CARD_FOOTNOTE
} from './shared'

const HeroCodeLink = styled('a')`
  ${theme({
    color: 'link',
    fontFamily: 'mono'
  })}
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

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
    color: 'black70'
  })}

  [data-featured='true'] > & {
    ${theme({ bg: 'pink0', color: 'secondary' })}
  }
`

const HeroFactList = styled(Box).attrs({ as: 'ul' })`
  ${theme({ m: 0, pt: 3, pl: 0, listStyle: 'none' })}
`

const HeroFact = ({ featured, absent, children }) => (
  <Flex as='li' css={theme({ alignItems: 'flex-start', gap: 2, pb: 2 })}>
    <FeatherIcon
      aria-hidden='true'
      icon={absent ? MinusIcon : CheckIcon}
      size='16px'
      css={theme({
        flexShrink: 0,
        mt: '6px',
        color: featured ? 'secondary' : 'black40'
      })}
    />
    <Text
      as='span'
      css={theme({
        fontSize: 1,
        lineHeight: 2,
        color: featured ? 'black80' : 'black70',
        textWrap: 'pretty'
      })}
    >
      {children}
    </Text>
  </Flex>
)

const HeroFacts = ({ featured, items }) => (
  <HeroFactList>
    {items.map(item => {
      const absent = isMissing(item)
      const text = absent ? item.text : item
      return (
        <HeroFact key={text} featured={featured} absent={absent}>
          {text}
        </HeroFact>
      )
    })}
  </HeroFactList>
)

const HeroCardFootnote = ({ children }) => (
  <Text
    css={theme({
      mt: 'auto',
      pt: 2,
      fontSize: 1,
      color: 'black50',
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
        The Context.dev <GradientText>alternative</GradientText>
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
        for brand data in one&nbsp;request
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black80'
        })}
      >
        Context.dev bills brand data as a separate {BRAND_CREDITS}&#8209;credit
        call on top of every scrape. Microlink returns markdown, screenshot,
        metadata, and logo in one flat&#8209;priced&nbsp;request.
      </Caption>

      <AlternativeHeroActions
        cta='alternative-context-dev:hero'
        secondaryHref='/metadata'
        secondaryLabel='Explore the Metadata API'
        onClick={() =>
          trackEvent('alternative cta', { competitor: 'context-dev' })}
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
                color: 'black50',
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
          <PlanBadge>Context.dev</PlanBadge>
          <PriceAmount>
            {BUNDLE_CREDITS}
            <Text
              as='span'
              css={theme({
                fontSize: 2,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              &nbsp;credits
            </Text>
          </PriceAmount>
          <HeroFacts items={CONTEXT_DEV_CARD_FACTS} />
          <HeroCardFootnote>{CONTEXT_DEV_CARD_FOOTNOTE}</HeroCardFootnote>
        </HeroPlanCard>
      </Flex>

      <Text
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: 1,
          color: 'black60',
          textAlign: 'center'
        })}
      >
        See the brand data for <b>context.dev</b>&nbsp;itself:
      </Text>
      <Text
        css={theme({
          pt: 2,
          fontSize: [0, 1, 1, 1],
          lineHeight: 2,
          textAlign: 'center',
          maxWidth: layout.large,
          mx: 'auto'
        })}
      >
        <HeroCodeLink
          href={LIVE_METADATA_URL}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${LIVE_METADATA_URL}. Fetch live brand and metadata for context.dev from the Microlink API (opens in a new tab)`}
        >
          {LIVE_METADATA_LABEL}
        </HeroCodeLink>
      </Text>
    </Flex>
  </BluePrintBackground>
)
