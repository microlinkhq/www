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
        <PlanTag>Pro feature</PlanTag>
      </Flex>
      <Heading variant={null} css={theme({ textAlign: 'left' })}>
        <span css={theme({ color: 'secondary' })}>Antibot detection:</span> know
        who blocked your request — and why
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
        The API detects antibot and CAPTCHA challenges from 30+ providers in
        every HTTP response — reading headers, cookies, HTML, URL, and status
        code — then routes the request through the resolution path that specific
        provider requires. No configuration, no retry loops to write.
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
          Start resolving blocks with Pro
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)
