import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  ChipRow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { SectionIntro } from './shared'

const ENTERPRISE_GUARANTEES = [
  'dedicated endpoint',
  'isolated browser pool',
  '8 regions',
  '99.9% uptime SLA',
  { label: 'GDPR-compliant DPA', href: '/dpa' }
]

export const Enterprise = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <SectionIntro
        eyebrow='Beyond shared infrastructure'
        title='Enterprise: isolation down to the hardware'
      >
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Everything above is the default on the public API. Microlink
          Enterprise moves the boundary one level down: your own API endpoint
          running on hardware that serves only you, backed by a dedicated pool
          of always-ready browsers. No shared capacity, no noisy neighbors — and
          you choose which of 8 locations the hardware lives in.
        </BodyText>
        <ChipRow items={ENTERPRISE_GUARANTEES} />
        <BodyText>
          The data terms are just as explicit: your content is never used to
          train or fine-tune AI models, you own what you process, and we delete
          it within 60&nbsp;days of your request — all backed by a
          GDPR-compliant <Link href='/dpa'>Data Processing Agreement</Link>{' '}
          ready for your legal team.
        </BodyText>
        <Box css={theme({ pt: [3, 3, 4, 4] })}>
          <ArrowLink
            href='/enterprise'
            css={theme({
              color: 'link',
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2]
            })}
          >
            Explore Microlink Enterprise
          </ArrowLink>
        </Box>
      </SectionIntro>
    </SectionInner>
  </Section>
)
