import { breakpoints, theme, shadows, transition, shadowInk } from 'theme'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Clock,
  Code,
  Globe,
  List,
  Lock,
  MousePointer,
  Shield,
  Zap
} from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

import {
  Caption,
  Eyebrow,
  FEATURES,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

const ICON_MAP = {
  globe: Globe,
  code: Code,
  js: Code,
  mouse: MousePointer,
  shield: Shield,
  radar: Activity,
  clock: Clock,
  list: List,
  lock: Lock
}

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 3, 3] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Card = styled(Link)(
  theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    p: [3, 3, '20px', '20px'],
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    color: 'black',
    textDecoration: 'none',
    boxShadow: shadows[2],
    _hover: { color: 'black' }
  }),
  css`
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium}, transform ${transition.medium};

    > a {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${props => props.$accent};
        box-shadow: ${CARD_HOVER_SHADOW};
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-3px);
        }
      }
    }
  `
)

const ArrowIndicator = ({ isHover }) => {
  const Icon = isHover ? ArrowRight : ChevronRight

  return (
    <Flex
      aria-hidden='true'
      css={theme({
        color: isHover ? 'black80' : 'black40',
        flexShrink: 0,
        transition: `color ${transition.medium}`
      })}
    >
      <Icon size={18} strokeWidth={2} />
    </Flex>
  )
}

const IconTile = ({ name, bg, color }) => {
  const Icon = ICON_MAP[name] || Globe

  return (
    <Flex
      aria-hidden='true'
      css={theme({
        width: '40px',
        height: '40px',
        borderRadius: 3,
        bg,
        color,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      })}
    >
      {name === 'js' && (
        <Text
          css={theme({
            fontFamily: 'mono',
            fontSize: 1,
            fontWeight: 'bold',
            lineHeight: 1,
            color
          })}
        >
          JS
        </Text>
      )}
      {name === 'shield' && (
        <Box css={theme({ position: 'relative', display: 'flex' })}>
          <Shield size={18} strokeWidth={2} />
          <Box
            css={theme({
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color
            })}
          >
            <Zap size={9} fill='currentColor' strokeWidth={0} />
          </Box>
        </Box>
      )}
      {name !== 'js' && name !== 'shield' && <Icon size={18} strokeWidth={2} />}
    </Flex>
  )
}

const FeatureCard = ({ feature }) => {
  const href = `/features/${feature.slug}`
  const tileColor = feature.icon === 'js' ? 'black' : 'white'
  const [isHover, setIsHover] = useState(false)

  return (
    <Card
      href={href}
      $accent={feature.iconBg}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Flex
        css={theme({
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          pb: 3
        })}
      >
        <IconTile name={feature.icon} bg={feature.iconBg} color={tileColor} />
        <Flex css={theme({ alignItems: 'center', gap: 2, flexShrink: 0 })}>
          {feature.tag === 'PRO' && (
            <Box
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onMouseDown={e => e.stopPropagation()}
            >
              <ProBadge />
            </Box>
          )}
          <ArrowIndicator isHover={isHover} />
        </Flex>
      </Flex>

      <Text
        as='h3'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: 2,
          fontWeight: 'bold',
          lineHeight: 1
        })}
      >
        {feature.name}
      </Text>

      <Text
        css={theme({
          color: 'black60',
          fontSize: 1,
          lineHeight: 2,
          pt: 2,
          flex: '1 1 auto'
        })}
      >
        {feature.oneLiner}
      </Text>
    </Card>
  )
}

export const FeaturesGrid = () => (
  <Section id='features' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Box css={theme({ textAlign: 'center', pb: [4, 4, 5, 5] })}>
        <Eyebrow css={theme({ pb: 3, display: 'block' })}>Engineering</Eyebrow>
        <Subhead>The principles behind every Microlink product.</Subhead>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            pt: [3, 3, 3, 3],
            mx: 'auto',
            maxWidth: '36em',
            color: 'black60'
          })}
        >
          Scraping, proxy, caching, headers, and security aren’t bolted onto one
          product — they’re shared primitives every Microlink request can use.
        </Caption>
      </Box>

      <Grid>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.slug} feature={feature} />
        ))}
      </Grid>
    </SectionInner>
  </Section>
)
