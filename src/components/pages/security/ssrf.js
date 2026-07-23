import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import { Link } from 'components/elements/Link'

import {
  BodyText,
  Card,
  CardBody,
  CardKicker,
  CardMain,
  CardSide,
  CardTitle,
  ChipRow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { SectionIntro } from './shared'

const BLOCKED_RANGES = [
  '127.0.0.1',
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
  '169.254.169.254'
]

const RENDER_CHECKS = ['redirects', 'subresources', 'in-page navigations']

export const Ssrf = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5] })}>
        <SectionIntro
          eyebrow='Server-side request forgery'
          title='SSRF protection at two layers'
        >
          <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
            Checking the input URL once is not enough — a page can redirect or
            load resources into places its URL never mentioned. Microlink
            validates the destination before the fetch and keeps validating
            while the page renders.
          </BodyText>
        </SectionIntro>
      </Box>

      <Flex
        css={theme({
          gap: 3,
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <Card>
          <CardSide>
            <CardKicker>01 · before the fetch</CardKicker>
            <CardTitle>Resolved before it&rsquo;s fetched</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The hostname is resolved via DNS and its IP address is checked
              against reserved ranges. Anything that does not resolve to a
              public unicast address — loopback, private networks, link-local,
              cloud metadata endpoints — is refused with{' '}
              <Link href='/docs/api/basics/error-codes#eforbiddenurl'>
                EFORBIDDENURL
              </Link>{' '}
              before a single byte is fetched. HTTP redirects are re-checked hop
              by hop, so a URL cannot 302 its way into an internal address.
            </CardBody>
            <ChipRow items={BLOCKED_RANGES} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · during rendering</CardKicker>
            <CardTitle>Enforced while it renders</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              A Chromium request interceptor validates every origin the page
              touches while it renders. If the page navigates or is redirected
              into a reserved range mid-render, the request is aborted on the
              spot — the same guarantee holds for what the page does, not just
              for the URL you sent.
            </CardBody>
            <ChipRow items={RENDER_CHECKS} />
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)
