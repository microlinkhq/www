import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import { Link } from 'components/elements/Link'

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
        Isolated by default,{' '}
        <span css={theme({ color: 'secondary' })}>
          dedicated when you need it.
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
        Every plan runs on the same isolation model — one incognito browser per
        request, SSRF screening on every URL. When your compliance team needs
        physical separation, Enterprise puts the whole API on your own hardware.
        Read our <Link href='/security'>security practices</Link> for the full
        picture.
      </Caption>
      <Flex
        css={theme({
          py: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/enterprise'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Talk to us about Enterprise
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)
