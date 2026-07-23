import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
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
      <Heading variant={null} css={theme({ textAlign: 'left' })}>
        <span css={theme({ color: 'secondary' })}>Browser functions:</span> your
        code, our headless browser
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
        Run any JavaScript remotely with the{' '}
        <Link href='/docs/api/parameters/function'>function</Link> parameter —
        full Puppeteer access, npm packages installed on the fly, and zero
        infrastructure. No Lambda bundle, no browser fleet, no server to manage.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/function'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Read the functions guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Visual: execution pipeline diagram ─────────────────────────────────── */

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
            title='Your function, executed remotely'
            status='function · every plan'
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Your code</NodeLabel>
              <NodeSub>plain JavaScript function</NodeSub>
            </Node>
            <Arrow />
            <Node>
              <NodeLabel>
                <Link href='https://www.npmjs.com/package/@microlink/function'>
                  @microlink
                  <br />
                  /function
                </Link>
              </NodeLabel>
              <NodeSub>serialize · compress · send</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                Microlink sandbox
              </NodeLabel>
              <NodeSub>npm install · headless Chrome</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>
                <Link href='/docs/guides/function/writing-functions'>
                  result.value
                </Link>
              </NodeLabel>
              <NodeSub>plus execution profiling</NodeSub>
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
          Reference{' '}
          <Link href='/docs/guides/function/browser-interaction'>page</Link> and
          a browser starts with full Puppeteer access — skip it and your
          function runs faster.
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
        Send a function, get the result
      </Eyebrow>
      <BodyText>
        Write a normal JavaScript function and run it remotely in a sandboxed
        Node.js runtime. The return value comes back at{' '}
        <Link href='/docs/guides/function/writing-functions'>result.value</Link>
        ; if the function throws,{' '}
        <Link href='/docs/guides/function/troubleshooting'>
          result.isFulfilled
        </Link>{' '}
        is <CodeInline>false</CodeInline> and the error details take its place.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        When the function references{' '}
        <Link href='/docs/guides/function/browser-interaction'>page</Link>,
        Microlink spawns headless Chrome, navigates to the target URL, and hands
        you the full Puppeteer API — click, type, evaluate, capture. When it
        does not, no browser is started and execution is faster and cheaper.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Need a library? <CodeInline>require()</CodeInline> any npm package —
        dependencies are detected from your code, installed into the sandbox on
        the fly, and cached so subsequent runs skip the install entirely.
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Three execution shapes ─────────────────────────────────────────────── */

const PLAIN_EXAMPLES = ['result.value', 'custom parameters', 'no browser']

const PAGE_EXAMPLES = ['page.title()', 'page.click()', 'page.evaluate()']

const NPM_EXAMPLES = ["require('cheerio@1.0.0')", 'lodash', 'install cache']

const ExecutionShapes = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Three execution shapes → one parameter
        </Eyebrow>
        <Subhead
          css={theme({
            textAlign: 'left'
          })}
        >
          From a one-liner to full browser automation
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Every function runs in the same sandboxed runtime — what you reference
          inside it decides how much machinery spins up. Pay the browser cost
          only when you actually need a browser.
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
            <CardKicker>01 · plain functions</CardKicker>
            <CardTitle>Compute and orchestrate</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Return strings, numbers, arrays, or objects from plain JavaScript
              — no browser started. Any extra parameter on the request is
              forwarded to the function, so one function is reusable across
              different requests without changing its code.
            </CardBody>
            <ChipRow items={PLAIN_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/function/writing-functions'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the writing-functions guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · page</CardKicker>
            <CardTitle>Full Puppeteer access</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Reference{' '}
              <Link href='/docs/guides/function/browser-interaction'>page</Link>{' '}
              and Microlink boots headless Chrome, navigates to the target URL,
              and passes you the live Puppeteer page — click, type, wait,
              evaluate, or capture anything the built-in parameters cannot
              express.
            </CardBody>
            <ChipRow items={PAGE_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/function/browser-interaction'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the browser-interaction guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · require()</CardKicker>
            <CardTitle>Any npm package, on the fly</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Call <CodeInline>require()</CodeInline> inside your function and
              the runtime detects the dependencies, installs them into the
              sandbox, bundles, and caches the result — pin a version with{' '}
              <CodeInline>require('cheerio@1.0.0')</CodeInline> when you need
              reproducibility.
            </CardBody>
            <ChipRow items={NPM_EXAMPLES} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/function/profiling-and-performance'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the profiling guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Code examples ──────────────────────────────────────────────────────── */

const CodeExampleBrowser = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Code</Eyebrow>
      <Subhead
        css={theme({
          textAlign: 'left'
        })}
      >
        Puppeteer, without the infrastructure
      </Subhead>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        The{' '}
        <Link href='https://www.npmjs.com/package/@microlink/function'>
          @microlink/function
        </Link>{' '}
        library handles serialization, compression, and the API call. Your
        function receives{' '}
        <Link href='/docs/guides/function/browser-interaction'>page</Link> — a
        live Puppeteer instance already navigated to the target URL.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`const microlink = require('@microlink/function')

const fn = microlink(({ page }) => page.title())
const result = await fn('https://example.com')

console.log(result.isFulfilled) // true
console.log(result.value) // 'Example Domain'`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/function'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Full functions guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const CodeExampleNpm = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>npm</Eyebrow>
      <Subhead
        css={theme({
          textAlign: 'left'
        })}
      >
        Dependencies, resolved for you
      </Subhead>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Write <CodeInline>require()</CodeInline> as if you were on your own
        machine. The first run installs and caches; subsequent runs skip the
        install phase — check{' '}
        <Link href='/docs/guides/function/profiling-and-performance'>
          result.profiling.phases
        </Link>{' '}
        to see exactly where the time goes.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`const microlink = require('@microlink/function')

const fn = microlink(() => {
  const { kebabCase } = require('lodash')
  return kebabCase('Hello World')
})

const result = await fn('https://example.com')
console.log(result.value) // 'hello-world'`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/function/writing-functions'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Write your first function
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Plans: prototype free, scale on Pro ────────────────────────────────── */

const FREE_LIMIT_CHIPS = ['5s timeout', '16 MB memory', '1024-byte code']

const PRO_LIMIT_CHIPS = [
  '28s timeout',
  '32 MB memory',
  'unlimited code size',
  'unlimited concurrency'
]

const PlansSection = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Prototype free, scale on Pro
        </Eyebrow>
        <Subhead
          css={theme({
            textAlign: 'left'
          })}
        >
          The same runtime on every plan
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Functions run on the free tier — enough to prototype workflows and
          every example on this page. Pro raises the execution limits and
          unlocks the parameters production scraping needs alongside your code.
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
            <CardKicker>01 · execution limits</CardKicker>
            <CardTitle>More time, more memory, more at once</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Free runs cap at 5 seconds, 16 MB, 1024 bytes of code, and one
              concurrent execution per IP. Pro extends the timeout up to 28
              seconds, doubles the memory, and removes the code-size and
              concurrency caps.
            </CardBody>
            <ChipRow items={FREE_LIMIT_CHIPS} />
            <ChipRow items={PRO_LIMIT_CHIPS} />
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/function/profiling-and-performance'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                See the plan limits
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · pro parameters</CardKicker>
            <CardTitle>Combine with the unblocking layer</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              On Pro, your function composes with{' '}
              <Link href='/features/proxy'>automatic proxy resolution</Link>{' '}
              when antibots block the target,{' '}
              <Link href='/features/headers'>custom headers</Link> for pages
              behind a login, and{' '}
              <Link href='/features/ttl'>configurable TTL</Link> so repeated
              executions serve from cache instead of your quota.
            </CardBody>
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
    question: 'What can I run inside a function?',
    text: 'Any JavaScript. Plain functions run in a sandboxed Node.js runtime and can return strings, numbers, arrays, or objects. Reference page and Microlink starts headless Chrome with full Puppeteer access, already navigated to the target URL. You can also require() any npm package — dependencies are installed on the fly and cached.',
    answer: (
      <>
        <div>
          Any JavaScript. Plain functions run in a sandboxed Node.js runtime and
          can return strings, numbers, arrays, or objects. Reference{' '}
          <Link href='/docs/guides/function/browser-interaction'>page</Link> and
          Microlink starts headless Chrome with full Puppeteer access, already
          navigated to the target URL.
        </div>
        <div>
          You can also <CodeInline>require()</CodeInline> any npm package —
          dependencies are installed on the fly and cached.
        </div>
      </>
    )
  },
  {
    question: 'Is the function parameter available on the free plan?',
    text: 'Yes. Free runs get a 5-second timeout, 16 MB of memory, 1024 bytes of code, and one concurrent execution per IP — enough to prototype workflows. Pro plans extend the timeout up to 28 seconds, raise memory to 32 MB, and remove the code-size and concurrency limits.',
    answer: (
      <>
        <div>
          Yes. Free runs get a 5-second timeout, 16 MB of memory, 1024 bytes of
          code, and one concurrent execution per IP — enough to prototype
          workflows.
        </div>
        <div>
          <Link href='/pricing'>Pro plans</Link> extend the timeout up to 28
          seconds, raise memory to 32 MB, and remove the code-size and
          concurrency limits.
        </div>
      </>
    )
  },
  {
    question: 'When should I use function instead of data?',
    text: 'Start with data — declarative CSS-selector rules are shorter, easier to maintain, and easier to reuse. Escalate to function when you need to click, wait, compute, reshape, or orchestrate custom logic that rules cannot express. For injecting CSS or JavaScript before another workflow, the styles, scripts, and modules parameters are lighter than a full function.',
    answer: (
      <>
        <div>
          Start with <Link href='/features/scraping'>data</Link> — declarative
          CSS-selector rules are shorter, easier to maintain, and easier to
          reuse. Escalate to{' '}
          <Link href='/docs/api/parameters/function'>function</Link> when you
          need to click, wait, compute, reshape, or orchestrate custom logic
          that rules cannot express.
        </div>
        <div>
          For injecting CSS or JavaScript before another workflow, the{' '}
          <Link href='/docs/api/parameters/styles'>styles</Link>,{' '}
          <Link href='/docs/api/parameters/scripts'>scripts</Link>, and{' '}
          <Link href='/docs/api/parameters/modules'>modules</Link> parameters
          are lighter than a full function — see{' '}
          <Link href='/features/automation'>browser automation</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What happens if my function throws?',
    text: 'The request still succeeds: result.isFulfilled comes back false and result.value contains the error details — name, code, and message — so you can handle failures in your own code. Security-restricted operations, such as spawning child processes, return an ERR_ACCESS_DENIED error.',
    answer: (
      <>
        <div>
          The request still succeeds:{' '}
          <Link href='/docs/guides/function/troubleshooting'>
            result.isFulfilled
          </Link>{' '}
          comes back <CodeInline>false</CodeInline> and{' '}
          <Link href='/docs/guides/function/writing-functions'>
            result.value
          </Link>{' '}
          contains the error details — name, code, and message — so you can
          handle failures in your own code.
        </div>
        <div>
          Security-restricted operations, such as spawning child processes,
          return an{' '}
          <Link href='/docs/guides/function/writing-functions'>
            ERR_ACCESS_DENIED
          </Link>{' '}
          error — see the{' '}
          <Link href='/docs/guides/function/troubleshooting'>
            troubleshooting guide
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How do I make functions run faster?',
    text: 'Skip page when you do not need a browser — plain functions execute without booting Chrome. Check result.profiling.phases to see where time goes: a high install value means dependencies were installed for the first time and will be cached for subsequent runs; a high run value means the function itself is doing heavy work.',
    answer: (
      <>
        <div>
          Skip{' '}
          <Link href='/docs/guides/function/browser-interaction'>page</Link>{' '}
          when you do not need a browser — plain functions execute without
          booting Chrome.
        </div>
        <div>
          Check{' '}
          <Link href='/docs/guides/function/profiling-and-performance'>
            result.profiling.phases
          </Link>{' '}
          to see where time goes: a high <CodeInline>install</CodeInline> value
          means dependencies were installed for the first time and will be
          cached for subsequent runs; a high <CodeInline>run</CodeInline> value
          means the function itself is doing heavy work — see the{' '}
          <Link href='/docs/guides/function/profiling-and-performance'>
            profiling guide
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'Can functions reach pages behind antibots or logins?',
    text: 'Yes, on Pro plans. Combine function with automatic proxy resolution to get past Cloudflare, DataDome, or Akamai, and forward session cookies with x-api-header-cookie for pages behind a login — the browser your function receives is already unblocked and authenticated.',
    answer: (
      <>
        <div>
          Yes, on Pro plans. Combine{' '}
          <Link href='/docs/api/parameters/function'>function</Link> with{' '}
          <Link href='/features/proxy'>automatic proxy resolution</Link> to get
          past Cloudflare, DataDome, or Akamai, and forward session cookies with{' '}
          <Link href='/docs/guides/common/private-pages#sensitive-headers-and-cookies'>
            x-api-header-cookie
          </Link>{' '}
          for pages behind a login — see{' '}
          <Link href='/features/headers'>custom headers</Link>.
        </div>
        <div>
          The browser your function receives is already unblocked and
          authenticated.
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
      <Subhead
        css={theme({
          color: 'black'
        })}
      >
        Your code, <span css={theme({ color: 'secondary' })}>our browser.</span>
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
        Prototype on the free tier — no API key, no setup. When your workload
        grows, Pro plans raise the execution limits and add{' '}
        <Link href='/features/proxy'>proxy resolution</Link>,{' '}
        <Link href='/features/headers'>custom headers</Link>, and{' '}
        <Link href='/features/ttl'>configurable TTL</Link> around your code.
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
          Run your first function
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const FunctionFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <ExecutionShapes />
      <CodeExampleBrowser />
      <CodeExampleNpm />
      <PlansSection />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Browser Functions API: Serverless Puppeteer'
    description='Run any JavaScript remotely inside Microlink’s headless browser with the function parameter — full Puppeteer access, npm packages installed on the fly, and zero infrastructure to manage. Works on the free tier; Pro plans raise execution limits and add automatic proxy resolution, custom headers, and configurable cache TTL.'
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

export default FunctionFeaturePage
