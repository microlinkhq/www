import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  Caption,
  PlanTag,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

export const Hero = () => (
  <Section
    as='header'
    css={theme({ pt: [3, 3, 4, 4], pb: SECTION_VERTICAL_SPACING })}
  >
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <PlanTag>Every plan</PlanTag>
      </Flex>
      <Heading variant={null} css={theme({ textAlign: 'left' })}>
        <span css={theme({ color: 'secondary' })}>Request security:</span> one
        isolated browser per request
      </Heading>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          textAlign: 'left',
          maxWidth: layout.large,
          mx: 0
        })}
      >
        Every API call gets its own incognito browser context — created for that
        request, destroyed when it finishes. No cookies, caches, or profiles are
        ever shared between requests, and every URL is screened against reserved
        IP ranges before and during rendering, so a request can never reach a
        private network.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Isolation included on every plan
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)
