import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'

import {
  BodyText,
  ChipRow,
  Eyebrow,
  Node,
  NodeActive,
  NodeLabel,
  NodeSub,
  ScenarioHeader,
  ScenarioRow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'
import Subhead from 'components/elements/Subhead'

import { ProviderGraph } from './provider-graph'

const FINGERPRINT_SIGNALS = [
  'IP reputation',
  'HTTP consistency',
  'TLS fingerprints (JA3)',
  'behavioral heuristics',
  'JS fingerprinting'
]

const statusFlicker = keyframes`
  0%, 28% {
    opacity: 1;
  }

  30% {
    opacity: 0.25;
  }

  33.333%, 100% {
    opacity: 0;
  }
`

const StatusFlicker = styled('span')`
  display: inline-grid;
  vertical-align: baseline;
  ${theme({
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'red8'
  })}

  > span {
    grid-area: 1 / 1;
    opacity: 0;
  }

  > span:first-child {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    > span {
      animation: ${statusFlicker} 3.6s linear infinite;
      opacity: 0;
    }

    > span:nth-child(2) {
      animation-delay: 1.2s;
    }

    > span:nth-child(3) {
      animation-delay: 2.4s;
    }
  }
`

const StatusCycle = () => (
  <StatusFlicker aria-label='429 Too Many Requests, 401 Unauthorized, or 403 Forbidden'>
    <span aria-hidden='true'>429 TOO_MANY_REQUESTS</span>
    <span aria-hidden='true'>401 UNAUTHORIZED</span>
    <span aria-hidden='true'>403 FORBIDDEN</span>
  </StatusFlicker>
)

export const Why = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          +700M requests every month
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>
          Every scraper is fighting defenses built to stop it
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          When your infrastructure takes a URL as input, you are constantly
          interacting with systems designed to keep automation out. A request
          can experience <StatusCycle /> — followed by a challenge page. A
          CAPTCHA. A JavaScript puzzle.
        </BodyText>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Modern antibot systems operate at multiple layers, often before the
          request even reaches the application code, fingerprinting every hop
          along the way:
        </BodyText>
        <ChipRow items={FINGERPRINT_SIGNALS} />
        <BodyText>
          Detection does something fundamental: it tells you when a non-success
          resolution happens and who triggered it, so the next decision — retry,
          reroute, escalate — is made with real information instead of a blind
          retry loop.
        </BodyText>
      </Box>

      <ProviderGraph />

      <Box css={theme({ pt: [4, 4, 5, 5] })}>
        <ScenarioHeader
          title='Every response, classified'
          status='detection · every request'
        />
        <ScenarioRow>
          <Node>
            <NodeLabel>Allowed</NodeLabel>
            <NodeSub>heuristics say human — passed through</NodeSub>
          </Node>
          <Node>
            <NodeLabel>Blocked</NodeLabel>
            <NodeSub>403 or 429 — refused immediately</NodeSub>
          </Node>
          <NodeActive>
            <NodeLabel css={theme({ color: 'secondary' })}>
              Challenged
            </NodeLabel>
            <NodeSub>CAPTCHA or JavaScript interstitial to resolve</NodeSub>
          </NodeActive>
        </ScenarioRow>
      </Box>
    </SectionInner>
  </Section>
)
