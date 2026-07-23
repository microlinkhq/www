import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import { Link } from 'components/elements/Link'

import { CodeInline } from 'components/markdown/CodeInline'

import {
  BodyText,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { SectionIntro } from './shared'

export const Privacy = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <SectionIntro
        eyebrow='Secrets & privacy'
        title='Your secrets stay secret'
      >
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Credentials never reach the logs. <CodeInline>x-api-key</CodeInline>{' '}
          and <CodeInline>authorization</CodeInline> values are redacted before
          anything is written, and every forwarded{' '}
          <CodeInline>x-api-header-*</CodeInline> secret is masked the same way.
        </BodyText>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Cached responses cannot cross credential boundaries either: cache keys
          are SHA-512 hashes that incorporate the headers a request was made
          with, so a page fetched with your session cookie is never served to a
          request without it. Cache lifetime is under your control, from
          1&nbsp;minute to 31&nbsp;days.
        </BodyText>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          On the way out, every request carries{' '}
          <CodeInline>sec-gpc: 1</CodeInline> and{' '}
          <CodeInline>dnt: 1</CodeInline>, forwarding Global Privacy Control and
          Do-Not-Track signals to the sites being rendered. For the compliance
          side — GDPR, data processing, subprocessors — see our{' '}
          <Link href='/security'>security practices</Link>,{' '}
          <Link href='/dpa'>DPA</Link>, and{' '}
          <Link href='/privacy'>privacy policy</Link>.
        </BodyText>
      </SectionIntro>
    </SectionInner>
  </Section>
)
