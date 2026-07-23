import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  Caption,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

export const Cta = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <Subhead css={theme({ color: 'black' })}>
        Detect the block,{' '}
        <span css={theme({ color: 'secondary' })}>
          resolve it automatically.
        </span>
      </Subhead>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Every Pro plan bundles antibot detection with automatic proxy resolution
        — no proxy pool to manage, no CAPTCHA solver to integrate, no retry
        loops to write.
      </Caption>
      <Flex
        css={theme({
          py: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
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
      </Flex>
    </SectionInner>
  </Section>
)
