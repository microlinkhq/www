import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  ChipRow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { SectionIntro } from './shared'

const EXECUTION_CEILINGS = [
  'execution timeout',
  'memory ceiling',
  'code size cap',
  'cross-origin egress blocked'
]

export const Sandbox = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <SectionIntro
        eyebrow='Untrusted code, contained'
        title='Sandboxed execution with hard ceilings'
      >
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          The <Link href='/docs/api/parameters/function'>function</Link>{' '}
          parameter runs your JavaScript against the live page — inside a VM
          with an execution timeout and a memory ceiling. On the free plan, code
          size is capped and cross-origin <CodeInline>fetch</CodeInline>,{' '}
          <CodeInline>xhr</CodeInline>, and <CodeInline>websocket</CodeInline>{' '}
          calls are blocked, so anonymous code cannot use the platform as an
          egress proxy.
        </BodyText>
        <ChipRow items={EXECUTION_CEILINGS} />
        <BodyText>
          The same discipline applies to every request, code or no code: hard
          time limits and concurrency caps mean one heavy render can never
          starve another customer&rsquo;s traffic, and anonymous traffic is{' '}
          <Link href='/docs/api/basics/rate-limit'>
            rate-limited per client IP
          </Link>
          .
        </BodyText>
        <Box css={theme({ pt: [3, 3, 4, 4] })}>
          <ArrowLink
            href='/features/function'
            css={theme({
              color: 'link',
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2]
            })}
          >
            See how browser functions work
          </ArrowLink>
        </Box>
      </SectionIntro>
    </SectionInner>
  </Section>
)
