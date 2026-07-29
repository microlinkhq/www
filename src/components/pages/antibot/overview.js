import { layout, theme } from 'theme'
import React from 'react'
import { Check } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { ProviderGraph } from './provider-graph'
import { StatusFlicker } from './status-flicker'

const SIGNALS = [
  {
    title: 'IP reputation',
    body: 'Data-center IPs are flagged by default. Residential traffic behaves differently.'
  },
  {
    title: 'HTTP consistency',
    body: 'Headers must match a real browser profile — not just User-Agent, but the full set.'
  },
  {
    title: 'TLS fingerprints (JA3)',
    body: 'The way a client negotiates TLS leaks whether it is a browser or a script.'
  },
  {
    title: 'Behavioral heuristics',
    body: 'Timing, navigation order, and interaction patterns matter.'
  },
  {
    title: 'JavaScript fingerprinting',
    body: 'Canvas, WebGL, fonts, screen size — small inconsistencies are enough.'
  }
]

const OUTCOMES = [
  {
    title: 'Allowed',
    body: 'Heuristics indicate a legitimate visitor — the request passes through to the target.'
  },
  {
    title: 'Blocked',
    body: 'The request looks highly suspicious and is refused immediately with 403 or 429.'
  },
  {
    title: 'Challenged',
    body: 'The system is unsure and serves a CAPTCHA or JavaScript interstitial before content.'
  }
]

const CheckItem = ({ title, body }) => (
  <Flex as='li' css={theme({ gap: 2, alignItems: 'flex-start' })}>
    <Flex
      aria-hidden='true'
      css={theme({
        color: 'link',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: [1, 1, 2, 2],
        height: '2em'
      })}
    >
      <Check size={18} />
    </Flex>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black80',
        lineHeight: 2
      })}
    >
      <Text as='strong' css={theme({ color: 'black', fontWeight: 'bold' })}>
        {title}
      </Text>
      {': '}
      {body}
    </Text>
  </Flex>
)

export const Overview = () => (
  <FeatureSection id='overview'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>Why</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      When a request fails, know who stopped it.
    </Subhead>
    <Box css={theme({ maxWidth: layout.large })}>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [2, 2, 2, 2],
          lineHeight: 2,
          color: 'black',
          pb: 3
        })}
      >
        Microlink handles +700M requests every month. When you build
        infrastructure that takes a URL as input, you are constantly interacting
        with defenses designed to stop you.
      </Text>
      <Box css={theme({ pb: [3, 3, 4, 4] })}>
        <StatusFlicker />
      </Box>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [2, 2, 2, 2],
          lineHeight: 2,
          color: 'black',
          pb: 3
        })}
      >
        Modern antibot systems operate at multiple layers, often before your
        request even reaches application code. Detection does something
        fundamental: it tells you when a non-success resolution happens and who
        triggered it, so you can make a better decision about what to do next.
      </Text>
      <ProviderGraph />
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [2, 2, 2, 2],
          lineHeight: 2,
          color: 'black',
          fontWeight: 'bold',
          pt: [2, 2, 3, 3],
          pb: 3
        })}
      >
        Common signals include:
      </Text>
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          pb: [4, 4, 4, 4]
        })}
      >
        {SIGNALS.map(item => (
          <CheckItem key={item.title} title={item.title} body={item.body} />
        ))}
      </Box>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [2, 2, 2, 2],
          lineHeight: 2,
          color: 'black',
          fontWeight: 'bold',
          pb: 3
        })}
      >
        Based on these signals, a request is either:
      </Text>
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        })}
      >
        {OUTCOMES.map(item => (
          <CheckItem key={item.title} title={item.title} body={item.body} />
        ))}
      </Box>
    </Box>
  </FeatureSection>
)
