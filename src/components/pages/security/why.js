import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'

import {
  BodyText,
  ChipRow,
  Node,
  NodeActive,
  NodeLabel,
  NodeSub,
  ScenarioHeader,
  ScenarioRow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { SectionIntro } from './shared'

const ATTACK_SURFACES = [
  'other tenants',
  'internal networks',
  'cloud metadata',
  'leftover state'
]

export const Why = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <SectionIntro
        eyebrow='URLs are untrusted input'
        title='A cloud browser is a security boundary'
      >
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          When you send a URL to a browser API, that page runs real JavaScript
          inside a real Chromium on someone else&rsquo;s infrastructure. It can
          redirect, load subresources, open WebSockets — everything any web page
          can do. Which makes every request a set of questions worth asking
          about what that page can reach:
        </BodyText>
        <ChipRow items={ATTACK_SURFACES} />
        <BodyText>
          Microlink&rsquo;s answer is structural: the blast radius of a request
          is the request itself. Isolation and network screening are enforced
          inside the rendering engine on every request — not by policy, not by
          plan tier.
        </BodyText>
      </SectionIntro>

      <Box css={theme({ pt: [4, 4, 5, 5] })}>
        <ScenarioHeader
          title='Every request, contained'
          status='isolation · every request'
        />
        <ScenarioRow>
          <Node>
            <NodeLabel>Other requests</NodeLabel>
            <NodeSub>separate browser contexts — nothing shared</NodeSub>
          </Node>
          <Node>
            <NodeLabel>Private networks</NodeLabel>
            <NodeSub>reserved IP ranges blocked at fetch and render</NodeSub>
          </Node>
          <NodeActive>
            <NodeLabel css={theme({ color: 'secondary' })}>
              Your request
            </NodeLabel>
            <NodeSub>its own incognito browser, destroyed at the end</NodeSub>
          </NodeActive>
        </ScenarioRow>
      </Box>
    </SectionInner>
  </Section>
)
