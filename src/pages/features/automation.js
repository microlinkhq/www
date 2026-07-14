import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import Faq from 'components/patterns/Faq/Faq'
import {
  Arrow,
  BodyText,
  Caption,
  Card,
  CardBody,
  CardKicker,
  CardMain,
  CardSide,
  CardTitle,
  ChipRow,
  DashedGridOverlay,
  Eyebrow,
  Node,
  NodeActive,
  NodeLabel,
  NodeSub,
  PlanTag,
  ScenarioHeader,
  ScenarioRow,
  Section,
  SectionInner,
  SECTION_MAX_WIDTH,
  SECTION_PX,
  SECTION_PY
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <PlanTag>Core feature · free tier</PlanTag>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0
        })}
      >
        <span css={theme({ color: 'secondary' })}>Browser automation:</span>{' '}
        shape the page before you capture it
      </Text>
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
        Click, scroll, wait, emulate devices, and inject CSS or JavaScript — 30+
        query parameters that control the headless browser on every request. The
        page state you shape is the page every output sees.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/blog/browser-automation'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Explore all the browser parameters
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Visual: render pipeline diagram ────────────────────────────────────── */

const Diagram = () => (
  <Section css={theme({ pt: 1 })}>
    <SectionInner>
      <Box
        css={theme({
          bg: 'transparent',
          pt: [3, 4, 4, 5],
          px: [3, 3, 4, 4],
          pb: 0
        })}
      >
        <Box>
          <ScenarioHeader
            title='One render pipeline'
            status='every plan · every output'
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Request</NodeLabel>
              <NodeSub>url + browser parameters</NodeSub>
            </Node>
            <Arrow />
            <Node>
              <NodeLabel>Emulate</NodeLabel>
              <NodeSub>device · viewport · colorScheme</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                Interact
              </NodeLabel>
              <NodeSub>click · scroll · waitForSelector</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>Capture</NodeLabel>
              <NodeSub>screenshot · pdf · data · meta</NodeSub>
            </Node>
          </ScenarioRow>
        </Box>

        <Text
          as='p'
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: 0,
            color: 'black60',
            fontFamily: 'mono',
            textAlign: 'left'
          })}
        >
          The same parameters apply to every workflow — automate once, capture
          in any format.
        </Text>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        Shape the page state
      </Eyebrow>
      <BodyText>
        Every request can run through headless Chrome —{' '}
        <CodeInline>prerender</CodeInline> decides automatically when a target
        needs it. Before anything is captured, you control what the browser
        does: <CodeInline>click</CodeInline> DOM elements,{' '}
        <CodeInline>scroll</CodeInline> to a section, and wait for dynamic
        content with <CodeInline>waitForSelector</CodeInline>,{' '}
        <CodeInline>waitUntil</CodeInline>, or{' '}
        <CodeInline>waitForTimeout</CodeInline>.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        You also control what the browser <em>is</em>:{' '}
        <CodeInline>device</CodeInline> presets set the right viewport, user
        agent, and resolution in one word; <CodeInline>colorScheme</CodeInline>{' '}
        forces light or dark mode; <CodeInline>mediaType</CodeInline> switches
        to print CSS. Inject your own <CodeInline>styles</CodeInline>,{' '}
        <CodeInline>scripts</CodeInline>, or ES <CodeInline>modules</CodeInline>{' '}
        before the page renders.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        And some things are handled before you ask: the built-in{' '}
        <CodeInline>adblock</CodeInline> engine strips advertisements, trackers,
        and cookie-consent banners by default, and CSS{' '}
        <CodeInline>animations</CodeInline> are frozen so captures come out
        consistent every time.
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Three control planes ───────────────────────────────────────────────── */

const INTERACT_EXAMPLES = ['click', 'scroll', 'waitForSelector', 'waitUntil']

const EMULATE_EXAMPLES = ['device', 'viewport', 'colorScheme', 'mediaType']

const REWRITE_EXAMPLES = ['styles', 'scripts', 'modules', 'adblock']

const ControlPlanes = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Three control planes → one request
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Interact, emulate, rewrite
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Each parameter is one query-string key — compose as many as you need
          on a single request, no scripting required. When declarative
          parameters stop being enough,{' '}
          <Link href='/features/function'>browser functions</Link> give you full
          Puppeteer access.
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
            <CardKicker>01 · interact &amp; wait</CardKicker>
            <CardTitle>Get the page into the right state</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Click DOM elements by CSS selector to open tabs, dismiss overlays,
              or trigger navigation; scroll to the section you care about; and
              hold the capture until the content actually exists — wait for a
              selector, a browser lifecycle event, or a fixed amount of time.
            </CardBody>
            <ChipRow items={INTERACT_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/click'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the click reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · emulate</CardKicker>
            <CardTitle>Render as any device, any preference</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              One <CodeInline>device</CodeInline> keyword sets the matching
              viewport, user agent, and resolution — or tune{' '}
              <CodeInline>viewport</CodeInline> by hand. Force{' '}
              <CodeInline>colorScheme: 'dark'</CodeInline> to capture the dark
              theme, or <CodeInline>mediaType: 'print'</CodeInline> to render
              print stylesheets.
            </CardBody>
            <ChipRow items={EMULATE_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/device'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the device reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · rewrite</CardKicker>
            <CardTitle>Change the page before it renders</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Inject inline CSS or external stylesheets with{' '}
              <CodeInline>styles</CodeInline>, run your own JavaScript with{' '}
              <CodeInline>scripts</CodeInline> or ES{' '}
              <CodeInline>modules</CodeInline> — hide elements, override themes,
              stub APIs. Meanwhile <CodeInline>adblock</CodeInline> keeps ads,
              trackers, and cookie banners out by default.
            </CardBody>
            <ChipRow items={REWRITE_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/styles'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the styles reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Code examples ──────────────────────────────────────────────────────── */

const CodeExampleEmulate = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Code</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Dark mode, on an iPhone, without owning one
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Device emulation and color-scheme forcing are single parameters — the
        screenshot below renders exactly what a dark-mode iPhone user would see.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  screenshot: true,
  device: 'iPhone 15 Pro',
  colorScheme: 'dark',
  meta: false
})

console.log(data.screenshot.url)`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/screenshot/browser-settings'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Browser settings for screenshots
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const CodeExampleInteract = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Interaction</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Click first, wait, then extract
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Interaction parameters compose with every output — here the browser
        clicks a tab, waits for the price to exist in the DOM, and only then
        runs the <Link href='/features/scraping'>data extraction</Link> rules.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`const { data } = await mql('https://example.com/pricing', {
  click: '.tab-annual',
  waitForSelector: '.price',
  data: {
    price: { selector: '.price', attr: 'text', type: 'number' }
  }
})

console.log(data.price)`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/data-extraction/page-preparation'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Page preparation for extraction
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Clean captures + Pro pairing ───────────────────────────────────────── */

const ADBLOCK_EXAMPLES = ['ads', 'trackers', 'cookie banners']

const PRO_PAIR_EXAMPLES = ['proxy', 'x-api-header-*', 'ttl']

const CleanCaptures = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Included on every plan
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Clean by default, unblockable on Pro
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Every automation parameter on this page works on the free tier — they
          are part of the core rendering engine, not an add-on. Pro plans matter
          when the target itself pushes back.
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
            <CardKicker>01 · adblock</CardKicker>
            <CardTitle>No cookie banners in your screenshots</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Third-party requests for advertisements, trackers, and
              cookie-consent services are blocked by default — they bloat
              response times and clutter the interface. The engine is powered by
              Cliqz, and one boolean turns it off when you want the page
              untouched.
            </CardBody>
            <ChipRow items={ADBLOCK_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/adblock'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the adblock reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · pro pairing</CardKicker>
            <CardTitle>When the page fights back</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Automation shapes the page — Pro gets you to it.{' '}
              <Link href='/features/proxy'>Automatic proxy resolution</Link>{' '}
              handles antibots like Cloudflare and DataDome,{' '}
              <Link href='/features/headers'>custom headers</Link> carry your
              session past login walls, and{' '}
              <Link href='/features/ttl'>configurable TTL</Link> caches the
              shaped result so repeats cost nothing.
            </CardBody>
            <ChipRow items={PRO_PAIR_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/pricing'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Compare the plans
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: 'Can I click or scroll before the capture happens?',
    text: 'Yes. The click parameter clicks DOM elements matching CSS selectors — accept a modal, switch a tab, trigger navigation — and scroll brings a specific element into view. Both mutate the browser page state before any output is produced, and they compose with screenshots, PDFs, metadata, and data extraction alike.',
    answer: (
      <>
        <div>
          Yes. The <CodeInline>click</CodeInline> parameter clicks DOM elements
          matching CSS selectors — accept a modal, switch a tab, trigger
          navigation — and <CodeInline>scroll</CodeInline> brings a specific
          element into view.
        </div>
        <div>
          Both mutate the browser page state before any output is produced, and
          they compose with screenshots, PDFs, metadata, and data extraction
          alike.
        </div>
      </>
    )
  },
  {
    question: 'How do I wait for dynamic content to render?',
    text: 'Three tools, from precise to blunt: waitForSelector pauses until a specific element exists in the DOM; waitUntil waits for browser lifecycle events; waitForTimeout waits a fixed number of milliseconds. For SPAs, prerender (enabled automatically when needed) makes sure client-rendered content is executed before capture.',
    answer: (
      <>
        <div>
          Three tools, from precise to blunt:{' '}
          <CodeInline>waitForSelector</CodeInline> pauses until a specific
          element exists in the DOM; <CodeInline>waitUntil</CodeInline> waits
          for browser lifecycle events; <CodeInline>waitForTimeout</CodeInline>{' '}
          waits a fixed number of milliseconds.
        </div>
        <div>
          For SPAs, <CodeInline>prerender</CodeInline> (enabled automatically
          when needed) makes sure client-rendered content is executed before
          capture — see the{' '}
          <Link href='/docs/api/parameters/prerender'>prerender reference</Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'Can I emulate a mobile device or dark mode?',
    text: "Yes. A single device value — like 'iPhone 15 Pro' or 'iPad' — sets the matching viewport, user agent, and screen resolution; viewport lets you fine-tune by hand. colorScheme forces the prefers-color-scheme media feature to light or dark, and mediaType switches the page to its print stylesheets.",
    answer: (
      <>
        <div>
          Yes. A single <CodeInline>device</CodeInline> value — like{' '}
          <CodeInline>'iPhone 15 Pro'</CodeInline> or{' '}
          <CodeInline>'iPad'</CodeInline> — sets the matching viewport, user
          agent, and screen resolution; <CodeInline>viewport</CodeInline> lets
          you fine-tune by hand.
        </div>
        <div>
          <CodeInline>colorScheme</CodeInline> forces the{' '}
          <CodeInline>prefers-color-scheme</CodeInline> media feature to light
          or dark, and <CodeInline>mediaType</CodeInline> switches the page to
          its print stylesheets.
        </div>
      </>
    )
  },
  {
    question: 'How do I get rid of cookie banners and ads?',
    text: 'You usually do not have to do anything: adblock is enabled by default and blocks third-party requests for advertisements, trackers, and cookie-consent services before they load. For anything site-specific that survives, inject a styles rule to hide it, or use click to dismiss it explicitly.',
    answer: (
      <>
        <div>
          You usually do not have to do anything:{' '}
          <CodeInline>adblock</CodeInline> is enabled by default and blocks
          third-party requests for advertisements, trackers, and cookie-consent
          services before they load.
        </div>
        <div>
          For anything site-specific that survives, inject a{' '}
          <CodeInline>styles</CodeInline> rule to hide it, or use{' '}
          <CodeInline>click</CodeInline> to dismiss it explicitly.
        </div>
      </>
    )
  },
  {
    question: 'Can I inject my own CSS or JavaScript?',
    text: 'Yes. styles accepts inline CSS or URLs to external stylesheets; scripts injects plain JavaScript and modules injects ES modules — all applied before the capture. When injection is not expressive enough, the function parameter runs your code with full Puppeteer access inside the same browser.',
    answer: (
      <>
        <div>
          Yes. <CodeInline>styles</CodeInline> accepts inline CSS or URLs to
          external stylesheets; <CodeInline>scripts</CodeInline> injects plain
          JavaScript and <CodeInline>modules</CodeInline> injects ES modules —
          all applied before the capture.
        </div>
        <div>
          When injection is not expressive enough, the{' '}
          <Link href='/features/function'>function parameter</Link> runs your
          code with full Puppeteer access inside the same browser.
        </div>
      </>
    )
  },
  {
    question: 'Do these parameters work on the free plan?',
    text: 'Yes — every parameter on this page is part of the core rendering engine and works on the free tier, across every output. Pro plans add the layers around it: automatic proxy resolution against antibots, custom headers for authenticated pages, and configurable TTL so repeated captures serve from cache.',
    answer: (
      <>
        <div>
          Yes — every parameter on this page is part of the core rendering
          engine and works on the free tier, across every output.
        </div>
        <div>
          <Link href='/pricing'>Pro plans</Link> add the layers around it:{' '}
          <Link href='/features/proxy'>automatic proxy resolution</Link> against
          antibots, <Link href='/features/headers'>custom headers</Link> for
          authenticated pages, and{' '}
          <Link href='/features/ttl'>configurable TTL</Link> so repeated
          captures serve from cache.
        </div>
      </>
    )
  }
]

const FAQSection = () => (
  <Box
    css={theme({
      bg: 'pinky',
      borderTop: 1,
      borderTopColor: 'pinkest',
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_PY,
          px: SECTION_PX
        })}
        questions={FAQ_ITEMS}
      />
    </Box>
  </Box>
)

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <SubheadBase
        css={theme({
          color: 'black',
          fontSize: ['28px', '32px', '40px', '46px'],
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Set the stage,{' '}
        <span css={theme({ color: 'secondary' })}>then capture it.</span>
      </SubheadBase>
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
        Every browser parameter works on the free tier, across every output.
        When targets push back, Pro plans add proxy resolution, custom headers,
        and configurable TTL around the same requests.
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
          Start automating the browser
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const AutomationFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <ControlPlanes />
      <CodeExampleEmulate />
      <CodeExampleInteract />
      <CleanCaptures />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Browser Automation API: Control the Page Before Capture'
    description='Control a headless browser via query parameters — click elements, scroll, wait for dynamic content, emulate devices and dark mode, inject CSS or JavaScript, and block ads and cookie banners by default. The same parameters apply to screenshots, PDFs, metadata, and data extraction, and they all work on the free tier.'
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text
          }
        }))
      }
    ]}
  />
)

export default AutomationFeaturePage
