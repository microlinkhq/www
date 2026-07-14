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
        <span css={theme({ color: 'secondary' })}>Data extraction:</span> turn
        any page into structured JSON
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
        Describe the fields you want with CSS selectors and the{' '}
        <CodeInline>data</CodeInline> parameter does the rest — no headless
        browser to run, no HTML to parse. Works on the free tier; Pro adds
        automatic proxy resolution when targets fight back.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/data-extraction'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Read the data extraction guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Visual: extraction pipeline diagram ────────────────────────────────── */

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
            title='Selectors in, JSON out'
            status='data · every plan'
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Your code</NodeLabel>
              <NodeSub>data extraction rules</NodeSub>
            </Node>
            <Arrow />
            <Node>
              <NodeLabel>Microlink API</NodeLabel>
              <NodeSub>headless Chrome, prerender</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                Rules applied
              </NodeLabel>
              <NodeSub>selector · attr · type · evaluate</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>Structured JSON</NodeLabel>
              <NodeSub>data payload in the response</NodeSub>
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
          Each key inside <CodeInline>data</CodeInline> becomes a field in the
          response — validated by <CodeInline>type</CodeInline> on the way out.
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
        Your output schema
      </Eyebrow>
      <BodyText>
        The <CodeInline>data</CodeInline> object you send is the shape of the
        JSON you get back. Point a <CodeInline>selector</CodeInline> at an
        element, pick what to read with <CodeInline>attr</CodeInline> — text, an
        attribute, HTML, even markdown — and validate the result with{' '}
        <CodeInline>type</CodeInline>: <CodeInline>url</CodeInline>,{' '}
        <CodeInline>number</CodeInline>, <CodeInline>date</CodeInline>,{' '}
        <CodeInline>image</CodeInline>, and more.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Pages change and selectors break — so a rule can also be an array of
        fallbacks, tried in priority order until one succeeds. When CSS alone is
        not enough, <CodeInline>evaluate</CodeInline> runs a JavaScript function
        against the page to compute the value.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Microlink runs the headless browser, waits for the content, applies your
        rules, and returns clean JSON — the same request can also capture the
        screenshot, render the PDF, or read the metadata of the page.
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Three rule shapes ──────────────────────────────────────────────────── */

const ATTR_EXAMPLES = [
  "attr: 'text'",
  "attr: 'href'",
  "type: 'url'",
  "type: 'number'"
]

const COLLECTION_EXAMPLES = ['headlines', 'prices', 'reviews', 'job listings']

const COMPUTED_EXAMPLES = ['evaluate', "type: 'date'", 'fallback arrays']

const RuleShapes = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Three rule shapes → one parameter
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          From a single field to a full collection
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Every extraction rule is built from the same five properties —{' '}
          <CodeInline>selector</CodeInline>,{' '}
          <CodeInline>selectorAll</CodeInline>, <CodeInline>attr</CodeInline>,{' '}
          <CodeInline>type</CodeInline>, and <CodeInline>evaluate</CodeInline>.
          Combine them to match the shape of the data you are after.
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
            <CardKicker>01 · selector</CardKicker>
            <CardTitle>Single values</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Point a CSS selector at one element and read what you need:
              visible text, an attribute like <CodeInline>href</CodeInline> or{' '}
              <CodeInline>src</CodeInline>, inner HTML, or a markdown rendition.
              Add <CodeInline>type</CodeInline> to validate and normalize the
              value before it reaches your code.
            </CardBody>
            <ChipRow items={ATTR_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/data'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the data reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · selectorAll</CardKicker>
            <CardTitle>Collections</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Match every element on the page and get an array back. Nest{' '}
              <CodeInline>attr</CodeInline> rules inside and each match becomes
              a structured object — title, link, price — instead of a flat
              string. One request, the whole listing.
            </CardBody>
            <ChipRow items={COLLECTION_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/data-extraction/defining-rules'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the rule-modeling guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · evaluate</CardKicker>
            <CardTitle>Computed values</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              When CSS alone cannot express it, run a JavaScript function
              against the page and return the result as the field value. Combine
              with <CodeInline>type</CodeInline> validation and fallback arrays
              so extraction keeps working when pages change.
            </CardBody>
            <ChipRow items={COMPUTED_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/mql/data/evaluate'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the evaluate reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Code examples ──────────────────────────────────────────────────────── */

const CodeExampleSingle = () => (
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
        Your first extraction, two rules
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Each key inside <CodeInline>data</CodeInline> is a field in the
        response. Here <CodeInline>headline</CodeInline> reads the text and{' '}
        <CodeInline>link</CodeInline> reads the <CodeInline>href</CodeInline>,
        validated as a URL — no parsing on your side.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql('https://news.ycombinator.com', {
  data: {
    headline: { selector: '.titleline > a', attr: 'text' },
    link: { selector: '.titleline > a', attr: 'href', type: 'url' }
  }
})

console.log(data.headline, data.link)`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/data-extraction'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Full data extraction guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const CodeExampleCollection = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Collections</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Every match, as structured objects
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        <CodeInline>selectorAll</CodeInline> turns the rule into an array;
        nested <CodeInline>attr</CodeInline> rules run against each match. Add{' '}
        <CodeInline>meta: false</CodeInline> to skip metadata and get just your
        fields back.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`const { data } = await mql('https://news.ycombinator.com', {
  data: {
    stories: {
      selectorAll: '.athing',
      attr: {
        title: { selector: '.titleline > a', attr: 'text' },
        href: { selector: '.titleline > a', attr: 'href', type: 'url' }
      }
    }
  },
  meta: false
})`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/data-extraction/defining-rules'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Model rules for any page shape
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Pro: when targets fight back ───────────────────────────────────────── */

const ANTIBOT_EXAMPLES = ['Cloudflare', 'DataDome', 'Akamai', 'PerimeterX']

const PRIVATE_HEADER_EXAMPLES = ['cookie', 'authorization', 'x-csrf-token']

const ProSection = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          When targets fight back
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Pro adds the unblocking layer
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Extraction rules are half the job — the other half is getting the page
          to render at all. Every Pro plan bundles the pieces that keep scraping
          working in production: automatic proxy resolution against antibots,
          custom headers for login walls, and configurable{' '}
          <Link href='/features/ttl'>cache TTL</Link> so repeated extractions
          cost nothing.
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
            <CardKicker>01 · proxy</CardKicker>
            <CardTitle>Antibot resolution, zero configuration</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              When a target blocks the request, Microlink identifies the antibot
              provider and routes through a dedicated resolution path — no proxy
              pool to manage, no CAPTCHA solver to integrate. The resolution
              layer is well-tested across the Top 500 most popular sites
              worldwide.
            </CardBody>
            <ChipRow items={ANTIBOT_EXAMPLES} />
            <CardBody>
              <CodeInline>EPROXYNEEDED</CodeInline> is the signal a target
              requires it; a response served through the proxy layer carries{' '}
              <CodeInline>x-fetch-mode: fetch-proxy</CodeInline>. You can also
              bring your own exit IP with the <CodeInline>proxy</CodeInline>{' '}
              parameter.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/features/proxy'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                See how the proxy works
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · x-api-header-*</CardKicker>
            <CardTitle>Extraction behind login walls</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Scrape the logged-in version of a page by forwarding the session:
              send <CodeInline>x-api-header-cookie</CodeInline> as a request
              header and Microlink forwards the original{' '}
              <CodeInline>cookie</CodeInline> to the target — the credential
              rides inside HTTPS and never touches the URL.
            </CardBody>
            <ChipRow items={PRIVATE_HEADER_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/features/headers'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                See how custom headers work
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
    question: 'Do I need to run a headless browser?',
    text: 'No. Microlink runs headless Chrome on its infrastructure and applies your CSS selectors server-side — you send a data object and receive JSON back. For client-rendered content, control the rendering with prerender and wait for dynamic elements with waitForSelector before the rules are applied.',
    answer: (
      <>
        <div>
          No. Microlink runs headless Chrome on its infrastructure and applies
          your CSS selectors server-side — you send a{' '}
          <CodeInline>data</CodeInline> object and receive JSON back.
        </div>
        <div>
          For client-rendered content, control the rendering with{' '}
          <CodeInline>prerender</CodeInline> and wait for dynamic elements with{' '}
          <CodeInline>waitForSelector</CodeInline> before the rules are applied
          — see the{' '}
          <Link href='/docs/guides/data-extraction/page-preparation'>
            page preparation guide
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'Is data extraction available on the free plan?',
    text: 'Yes. Every rule type — selector, selectorAll, attr, type, evaluate, fallbacks — works on the free tier, which includes 25 requests per day without an API key. Pro plans start at 14,000 requests per month and add automatic proxy resolution, custom headers, and configurable TTL on top.',
    answer: (
      <>
        <div>
          Yes. Every rule type — <CodeInline>selector</CodeInline>,{' '}
          <CodeInline>selectorAll</CodeInline>, <CodeInline>attr</CodeInline>,{' '}
          <CodeInline>type</CodeInline>, <CodeInline>evaluate</CodeInline>,
          fallbacks — works on the free tier, which includes 25 requests per day
          without an API key.
        </div>
        <div>
          <Link href='/pricing'>Pro plans</Link> start at 14,000 requests per
          month and add automatic proxy resolution, custom headers, and
          configurable TTL on top.
        </div>
      </>
    )
  },
  {
    question: "What happens when a selector doesn't match?",
    text: 'Define a rule as an array of fallbacks and Microlink tries each one in priority order until a value passes the type validation — for example og:title, then <title>, then the first <h1>. If nothing matches, the field comes back empty rather than failing the request, and the troubleshooting guide covers how to diagnose selector, timing, and prerender issues.',
    answer: (
      <>
        <div>
          Define a rule as an array of fallbacks and Microlink tries each one in
          priority order until a value passes the <CodeInline>type</CodeInline>{' '}
          validation — for example <CodeInline>og:title</CodeInline>, then{' '}
          <CodeInline>title</CodeInline>, then the first{' '}
          <CodeInline>h1</CodeInline>.
        </div>
        <div>
          If nothing matches, the field comes back empty rather than failing the
          request — the{' '}
          <Link href='/docs/guides/data-extraction/troubleshooting'>
            troubleshooting guide
          </Link>{' '}
          covers how to diagnose selector, timing, and prerender issues.
        </div>
      </>
    )
  },
  {
    question: 'Can I scrape sites behind Cloudflare or DataDome?',
    text: 'Yes, on Pro plans. Microlink detects the antibot provider protecting the target — Cloudflare, DataDome, Akamai, PerimeterX, and more — and automatically routes the request through a dedicated resolution path, tested across the Top 500 most popular sites worldwide. If a target requires it, the API returns EPROXYNEEDED; proxied responses carry x-fetch-mode ending in -proxy.',
    answer: (
      <>
        <div>
          Yes, on Pro plans. Microlink detects the antibot provider protecting
          the target — Cloudflare, DataDome, Akamai, PerimeterX, and more — and
          automatically routes the request through a dedicated resolution path,
          tested across the Top 500 most popular sites worldwide.
        </div>
        <div>
          If a target requires it, the API returns{' '}
          <CodeInline>EPROXYNEEDED</CodeInline>; proxied responses carry{' '}
          <CodeInline>x-fetch-mode</CodeInline> ending in{' '}
          <CodeInline>-proxy</CodeInline>. See{' '}
          <Link href='/features/proxy'>how the proxy works</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Can I extract data behind a login?',
    text: 'Yes — forward the session as a request header on your Microlink call using x-api-header-cookie (a Pro feature). The credential travels inside HTTPS request headers, never in the URL, so it does not end up in logs or embeds. The private pages guide walks through cookies, basic auth, and bearer tokens.',
    answer: (
      <>
        <div>
          Yes — forward the session as a request header on your Microlink call
          using <CodeInline>x-api-header-cookie</CodeInline> (a{' '}
          <Link href='/features/headers'>Pro feature</Link>). The credential
          travels inside HTTPS request headers, never in the URL, so it does not
          end up in logs or embeds.
        </div>
        <div>
          The{' '}
          <Link href='/docs/guides/data-extraction/private-pages'>
            private pages guide
          </Link>{' '}
          walks through cookies, basic auth, and bearer tokens.
        </div>
      </>
    )
  },
  {
    question: 'How does caching affect what I pay?',
    text: 'Responses are cached at the edge and any response served from cache does not count against your plan quota — only the request that warms the cache is billed. Tune the lifetime per request with ttl (from 1 minute to 31 days) and keep serving stale content while revalidating with staleTtl, which makes recurring extraction jobs dramatically cheaper.',
    answer: (
      <>
        <div>
          Responses are cached at the edge and any response served from cache
          does not count against your plan quota — only the request that warms
          the cache is billed.
        </div>
        <div>
          Tune the lifetime per request with{' '}
          <Link href='/features/ttl'>
            <CodeInline>ttl</CodeInline>
          </Link>{' '}
          (from 1 minute to 31 days) and serve stale content while revalidating
          with <CodeInline>staleTtl</CodeInline> — the{' '}
          <Link href='/docs/guides/data-extraction/caching-and-performance'>
            caching guide
          </Link>{' '}
          shows the patterns for recurring extraction jobs.
        </div>
      </>
    )
  },
  {
    question: 'Can I transform values during extraction?',
    text: 'Yes. The evaluate property runs a JavaScript function against the page and uses its return value as the field — useful for computed values, JSON embedded in scripts, or anything CSS selectors cannot reach. Combine it with type so the output is validated before it reaches your code. When a single rule is not enough, the function parameter runs your code with full Puppeteer access.',
    answer: (
      <>
        <div>
          Yes. The <CodeInline>evaluate</CodeInline> property runs a JavaScript
          function against the page and uses its return value as the field —
          useful for computed values, JSON embedded in scripts, or anything CSS
          selectors cannot reach.
        </div>
        <div>
          Combine it with <CodeInline>type</CodeInline> so the output is
          validated before it reaches your code — see the{' '}
          <Link href='/docs/api/parameters/data'>
            <CodeInline>data</CodeInline> reference
          </Link>
          . When a single rule is not enough,{' '}
          <Link href='/features/function'>browser functions</Link> run your code
          with full Puppeteer access.
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
        Selectors in, <span css={theme({ color: 'secondary' })}>JSON out.</span>
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
        Prototype on the free tier — 25 requests a day, no API key. When you go
        to production, Pro plans start at 14,000 requests per month and bundle
        proxy resolution, custom headers, and configurable TTL.
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
          Start extracting structured data
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const ScrapingFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <RuleShapes />
      <CodeExampleSingle />
      <CodeExampleCollection />
      <ProSection />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Web Scraping API: Structured Data Extraction'
    description='Extract structured data from any URL with CSS selectors using the data parameter — single values, collections, and computed fields returned as clean JSON. Works on the free tier; Pro plans add automatic proxy resolution against Cloudflare, DataDome, and Akamai antibots, custom headers for login walls, and configurable cache TTL.'
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

export default ScrapingFeaturePage
