import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import { Link } from 'components/elements/Link'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  Eyebrow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

export const Resolve = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Detection → resolution
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>
          Knowing who blocked you is half the job
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          On Pro plans, detection is wired straight into resolution: once the
          provider is identified, the request is routed through the resolution
          path that protection layer requires — rotating residential IPs, full
          browser rendering, retries — well-tested across the{' '}
          <Link href='/blog/microlink-proxy-how-it-works'>
            Top 500 most popular sites worldwide
          </Link>
          .
        </BodyText>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          A response served through the proxy layer carries{' '}
          <Link href='/docs/guides/common/proxy#verify-proxy-is-active'>
            x-fetch-mode
          </Link>{' '}
          prefixed with <CodeInline>proxy-</CodeInline>; when a target requires
          it and the plan does not include it, the API returns{' '}
          <Link href='/docs/api/basics/error-codes#eproxyneeded'>
            EPROXYNEEDED
          </Link>{' '}
          — so a block is never silent. Available on{' '}
          <Link href='/docs/api/parameters/meta'>metadata</Link>,{' '}
          <Link href='/docs/guides/content-conversion/url-to-html'>HTML</Link>,
          and <Link href='/markdown'>markdown</Link> requests.
        </BodyText>
        <Box css={theme({ pt: [3, 3, 4, 4] })}>
          <ArrowLink
            href='/features/proxy'
            css={theme({
              color: 'link',
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2]
            })}
          >
            See how automatic proxy resolution works
          </ArrowLink>
        </Box>
      </Box>
    </SectionInner>
  </Section>
)
