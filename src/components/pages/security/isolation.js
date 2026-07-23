import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

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

const CONTEXT_SCOPE = ['dedicated context', 'keyed by request id']

const NEVER_SHARED = ['cookies', 'localStorage', 'cache', 'profile', 'sessions']

const TEARDOWN_TRIGGERS = ['on completion', 'on timeout', 'on disconnect']

export const Isolation = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5] })}>
        <SectionIntro
          eyebrow='One request, one browser'
          title='Request isolation by construction'
        >
          <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
            Isolation is not a setting you enable — it is how the engine
            allocates browsers. Every request gets a context that exists only
            for that request, and the engine tears it down the moment the
            request ends, whichever way it ends.
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
            <CardKicker>01 · allocation</CardKicker>
            <CardTitle>One browser context per request</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Each request is assigned its own browser context, keyed by its
              request identifier. The context is created when the request starts
              and is never handed to another request — there is no sharing model
              to configure and no sharing model to get wrong.
            </CardBody>
            <ChipRow items={CONTEXT_SCOPE} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · state</CardKicker>
            <CardTitle>Incognito, always</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Every context is incognito. Cookies, local storage, caches, and
              profile state live and die with the request that created them.
              Nothing a page sets during one render is visible to any other
              render — yours or anyone else&rsquo;s.
            </CardBody>
            <ChipRow items={NEVER_SHARED} />
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · teardown</CardKicker>
            <CardTitle>Destroyed, not recycled</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              When the request finishes — success, timeout, or client disconnect
              — its context is destroyed. A per-session watchdog force-closes
              anything that outlives its deadline, so state cannot linger even
              when a render goes sideways.
            </CardBody>
            <ChipRow items={TEARDOWN_TRIGGERS} />
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)
