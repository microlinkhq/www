import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import { CodeInline } from 'components/markdown/CodeInline'

import {
  BodyText,
  Card,
  CardBody,
  CardKicker,
  CardMain,
  CardSide,
  CardTitle,
  ChipRow,
  Eyebrow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

const STATUS_EXAMPLES = ['LinkedIn · 999', 'Reddit · 403']

const HEADER_EXAMPLES = ['cf-mitigated: challenge', 'server: cloudflare']

const COOKIE_EXAMPLES = ['mitigation cookies', 'challenge tokens']

const HTML_EXAMPLES = [
  'CAPTCHA widgets',
  'interstitial templates',
  'verification scripts'
]

const URL_EXAMPLES = ['challenge redirects', 'verification paths']

export const HowItWorks = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Five signals → one verdict
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>
          How detection works
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Every response is inspected across five signals — headers, cookies,
          HTML, URL, and status code. Each provider leaves a distinct
          combination of fingerprints; checks run in priority order and the
          first match wins. The result is deterministic and fast — designed to
          run on every request without becoming the bottleneck.
        </BodyText>
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
            <CardKicker>01 · status code</CardKicker>
            <CardTitle>Unusual status patterns</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Certain platforms use unusual status codes when blocking
              automation — LinkedIn can return <CodeInline>999</CodeInline> and
              Reddit can return <CodeInline>403</CodeInline> on challenge flows.
              The status code alone is often enough to classify the block.
            </CardBody>
            <ChipRow items={STATUS_EXAMPLES} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · headers</CardKicker>
            <CardTitle>Mitigation headers</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Blocking responses usually expose hints in response headers —
              Cloudflare commonly surfaces{' '}
              <CodeInline>cf-mitigated: challenge</CodeInline>, while other
              providers rely on provider-specific header combinations.
            </CardBody>
            <ChipRow items={HEADER_EXAMPLES} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · cookies</CardKicker>
            <CardTitle>Challenge tokens in cookies</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Many antibot systems drop mitigation cookies or challenge tokens
              before serving a block page. Matching those cookie names and
              values identifies the provider even when headers stay quiet.
            </CardBody>
            <ChipRow items={COOKIE_EXAMPLES} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>04 · html</CardKicker>
            <CardTitle>Known challenge signatures</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Challenge pages include recognizable artifacts — CAPTCHA widgets,
              interstitial templates, challenge tokens, or provider-specific
              script references embedded in the response body.
            </CardBody>
            <ChipRow items={HTML_EXAMPLES} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>05 · url</CardKicker>
            <CardTitle>Provider-specific redirect fingerprints</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Many CAPTCHA vendors resolve challenges on dedicated verification
              URLs. When a request lands on one of those paths instead of the
              target page, the provider is identified from the response URL
              itself.
            </CardBody>
            <ChipRow items={URL_EXAMPLES} />
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)
