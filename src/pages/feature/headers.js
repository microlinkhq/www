import { breakpoints, colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Caption = withTitle(CaptionBase)

/* ─── Layout primitives ──────────────────────────────────────────────────── */

const SECTION_PX = [3, 3, 4, 4]
const SECTION_PY = [3, 3, 4, 5]
const SECTION_MAX_WIDTH = layout.large

const Section = styled(Box)`
  ${theme({
    py: SECTION_PY,
    px: SECTION_PX,
    width: '100%'
  })}
`

const SectionInner = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: SECTION_MAX_WIDTH,
    mx: 'auto'
  })}
`

const Eyebrow = styled(Text)`
  ${theme({
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        fontSize: [1, 2, 2, 2],
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

const ProTag = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'pinkest',
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <ProTag>Pro feature</ProTag>
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
        <span css={theme({ color: 'secondary' })}>Custom HTTP Headers:</span>{' '}
        Forward any header, keep secrets safe
      </Text>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.large,
          mx: 0
        })}
      >
        Stop scraping the logged-out version. Public values go in{' '}
        <CodeInline>headers</CodeInline>; secrets ride as{' '}
        <CodeInline>x-api-header-*</CodeInline> request headers and never touch
        the URL.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start scraping behind login walls
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        Forward any header
      </Eyebrow>
      <BodyText>
        Forward any HTTP header to the target page —{' '}
        <CodeInline>Accept-Language</CodeInline>,{' '}
        <CodeInline>User-Agent</CodeInline>, <CodeInline>Cookie</CodeInline>,{' '}
        <CodeInline>Authorization</CodeInline>, or any custom value. Same
        pattern across every Microlink output.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Two channels: <CodeInline>headers</CodeInline> for non-sensitive values
        that are safe in the URL; <CodeInline>x-api-header-*</CodeInline> for
        cookies, tokens, and other secrets — Microlink strips the prefix and
        forwards the original header to the target without ever logging the
        value into the public query string.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        That's everything you need to reach logged-in dashboards, localized
        variants, A/B test cohorts, basic-auth staging environments, or any
        header-shaped page variant — without leaking credentials.
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Three-in-one cards ─────────────────────────────────────────────────── */

const ProviderChip = styled(Text).attrs({ as: 'span' })`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'white',
    color: 'black',
    border: 1,
    borderColor: 'black10',
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: 1
  })}
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: [3, 3, 4, 4],
    alignItems: 'stretch'
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardSide = styled(Box)`
  ${theme({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  })}
`

const CardMain = styled(Box)`
  ${theme({
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
`

const CardTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

const CardKicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'secondary',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

const CardBody = styled(Text)`
  ${theme({
    fontSize: [1, 1, 1, 1],
    lineHeight: 2,
    color: 'black70'
  })}
`

const ChipRow = ({ items }) => (
  <Flex css={theme({ flexWrap: 'wrap', gap: 2, py: 3 })}>
    {items.map(item => (
      <ProviderChip key={item}>{item}</ProviderChip>
    ))}
  </Flex>
)

const PUBLIC_HEADER_EXAMPLES = [
  'Accept-Language',
  'User-Agent',
  'Referer',
  'X-Custom-*'
]

const PRIVATE_HEADER_EXAMPLES = [
  'cookie',
  'authorization',
  'x-csrf-token',
  'x-session-id'
]

const TwoChannels = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Two channels → one feature
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Public values stay public, secrets stay private
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          The split exists for one reason: query strings are publicly visible —
          in browser history, in server logs, in URL embeds — while HTTPS
          request headers are not. Pick the channel that matches the sensitivity
          of the value, and Microlink does the right thing on the way out.
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
            <CardKicker>01 · headers</CardKicker>
            <CardTitle>Non-sensitive request shaping</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Pass <CodeInline>headers</CodeInline> as a JSON object on the MQL
              request: locale, user-agent, referer, custom headers — anything
              safe to put in a public URL. Microlink applies them verbatim when
              fetching the target.
            </CardBody>
            <ChipRow items={PUBLIC_HEADER_EXAMPLES} />
            <CardBody>
              <strong>Trade-off:</strong> values are serialized into the request
              URL's query string, so anyone with the URL can read them. Never
              put cookies or authorization tokens here.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/headers'
                css={theme({
                  color: 'secondary',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the headers reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · x-api-header-*</CardKicker>
            <CardTitle>Sensitive credentials, never in the URL</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Pass cookies, bearer tokens, basic-auth values, CSRF tokens — any
              header you can name — as request headers on your Microlink call,
              prefixed with <CodeInline>x-api-header-</CodeInline>. Microlink
              strips the prefix and forwards the original header to the target.
            </CardBody>
            <ChipRow items={PRIVATE_HEADER_EXAMPLES} />
            <CardBody>
              The value lives inside the HTTPS request body, never in the URL —
              so it doesn't end up in browser history, embed markup, server
              logs, or analytics.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/common/private-pages#sensitive-headers-and-cookies'
                css={theme({
                  color: 'secondary',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the sensitive-headers guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Visual: two-path diagram ───────────────────────────────────────────── */

const Node = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    px: [3, 3, 3, 3],
    py: [3, 3, 3, 3],
    width: ['100%', '100%', 'auto', 'auto'],
    minWidth: [0, 0, '0', '0'],
    flex: ['0 0 auto', '0 0 auto', '1 1 0', '1 1 0']
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  text-align: center;
`

const NodeActive = styled(Node)`
  ${theme({
    bg: 'pinkest',
    borderColor: 'secondary'
  })}
`

const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

const Arrow = () => (
  <Flex
    aria-hidden='true'
    css={`
      ${theme({
        color: 'black30',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center'
      })}
      @media (max-width: calc(${breakpoints[1]} - 1px)) {
        transform: rotate(90deg);
      }
    `}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  </Flex>
)

const ScenarioHeader = ({ title, status }) => (
  <Flex
    css={theme({
      alignItems: 'baseline',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2,
      pb: [2, 2, 3, 3]
    })}
  >
    <Text
      as='span'
      css={theme({
        fontFamily: 'mono',
        fontSize: 1,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: '0.04em'
      })}
    >
      {title}
    </Text>
    <Box
      css={theme({
        bg: 'white',
        color: 'black70',
        border: 1,
        borderColor: 'black10',
        borderRadius: 5,
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: 'bold',
        px: 2,
        py: 1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      })}
    >
      {status}
    </Box>
  </Flex>
)

const ScenarioRow = ({ children }) => (
  <Flex
    css={theme({
      alignItems: 'stretch',
      gap: [2, 2, 3, 3],
      flexDirection: ['column', 'column', 'row', 'row']
    })}
  >
    {children}
  </Flex>
)

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
            title='Secrets, never in the URL'
            status='x-api-header-* · request headers'
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Your code</NodeLabel>
              <NodeSub>any workflow</NodeSub>
            </Node>
            <Arrow />
            <Node>
              <NodeLabel>x-api-header-cookie</NodeLabel>
              <NodeSub>HTTPS request header</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                Microlink Pro
              </NodeLabel>
              <NodeSub>strip prefix, forward</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>Target page</NodeLabel>
              <NodeSub>cookie: session=…</NodeSub>
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
          Microlink strips the <CodeInline>x-api-header-</CodeInline> prefix on
          the way out — the credential never lands in a URL.
        </Text>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Code example ───────────────────────────────────────────────────────── */

const CodeExample = () => (
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
        Recommended: server-side, secrets in process env
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Public values go in the second argument (
        <CodeInline>headers</CodeInline>); private ones go in MQL's third
        argument (<CodeInline>httpOptions.headers</CodeInline>) prefixed with{' '}
        <CodeInline>x-api-header-</CodeInline>. Both reach the target page; only
        secrets stay off the URL.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql(
  'https://example.com/dashboard',
  {
    screenshot: true,
    meta: false,
    headers: {
      'accept-language': 'es-ES'
    }
  },
  {
    headers: {
      'x-api-key': process.env.MICROLINK_API_KEY,
      'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`,
      'x-api-header-authorization': \`Bearer \${process.env.AUTH_TOKEN}\`
    }
  }
)`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/common/private-pages'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Full private-pages guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: 'What is the difference between headers and x-api-header-*?',
    text: 'Both forward an HTTP header to the target page. The headers parameter goes through the URL query string and is publicly visible — fine for locale, user-agent, or referer. The x-api-header-* pattern is sent as a request header on the Microlink call itself, so cookies, bearer tokens, basic-auth values, and any other secret never appear in the URL or in logs. Microlink strips the x-api-header- prefix and forwards the original header name to the target.',
    answer: (
      <>
        <div>
          Both forward an HTTP header to the target page. The{' '}
          <CodeInline>headers</CodeInline> parameter goes through the URL query
          string and is publicly visible — fine for locale, user-agent, or
          referer.
        </div>
        <div>
          The <CodeInline>x-api-header-*</CodeInline> pattern is sent as a
          request header on the Microlink call itself, so cookies, bearer
          tokens, basic-auth values, and any other secret never appear in the
          URL or in logs. Microlink strips the{' '}
          <CodeInline>x-api-header-</CodeInline> prefix and forwards the
          original header name to the target.
        </div>
      </>
    )
  },
  {
    question: 'Can I forward cookies and authorization tokens?',
    text: 'Yes — through x-api-header-* only. Send x-api-header-cookie or x-api-header-authorization as request headers on your Microlink call; Microlink forwards the original cookie or authorization header to the target page. Putting cookies or tokens in the public headers parameter would leak them via the URL, so the API treats x-api-header-* as the safe path for any credential.',
    answer: (
      <>
        <div>
          Yes — through <CodeInline>x-api-header-*</CodeInline> only. Send{' '}
          <CodeInline>x-api-header-cookie</CodeInline> or{' '}
          <CodeInline>x-api-header-authorization</CodeInline> as request headers
          on your Microlink call; Microlink forwards the original{' '}
          <CodeInline>cookie</CodeInline> or{' '}
          <CodeInline>authorization</CodeInline> header to the target.
        </div>
        <div>
          Putting cookies or tokens in the public{' '}
          <CodeInline>headers</CodeInline> parameter would leak them via the
          URL, so the API treats <CodeInline>x-api-header-*</CodeInline> as the
          safe path for any credential.
        </div>
      </>
    )
  },
  {
    question: 'Does this work for screenshots and PDFs too?',
    text: 'Yes — and for every other Microlink output. headers and x-api-header-* apply uniformly to screenshots, PDFs, metadata, HTML, markdown, insights, and data extraction. The same authenticated session that lets metadata read a logged-in dashboard also captures the logged-in screenshot or PDF of the same page.',
    answer: (
      <>
        <div>
          Yes — and for every other Microlink output.{' '}
          <CodeInline>headers</CodeInline> and{' '}
          <CodeInline>x-api-header-*</CodeInline> apply uniformly to
          screenshots, PDFs, metadata, HTML, markdown, insights, and data
          extraction.
        </div>
        <div>
          The same authenticated session that lets metadata read a logged-in
          dashboard also captures the logged-in screenshot or PDF of the same
          page.
        </div>
      </>
    )
  },
  {
    question: 'How do I keep API keys out of client-side code?',
    text: 'Always make Microlink calls from your backend. Use MQL\u2019s third argument (httpOptions) to pass x-api-key and any x-api-header-* values from environment variables. If you need to consume Microlink from a browser, put @microlink/proxy or @microlink/edge-proxy in front so the API key and any forwarded headers never reach client-side code or public embed URLs.',
    answer: (
      <>
        <div>
          Always make Microlink calls from your backend. Use MQL's third
          argument (<CodeInline>httpOptions</CodeInline>) to pass{' '}
          <CodeInline>x-api-key</CodeInline> and any{' '}
          <CodeInline>x-api-header-*</CodeInline> values from environment
          variables.
        </div>
        <div>
          If you need to consume Microlink from a browser, put{' '}
          <Link href='https://github.com/microlinkhq/proxy'>
            @microlink/proxy
          </Link>{' '}
          or{' '}
          <Link href='https://github.com/microlinkhq/edge-proxy'>
            @microlink/edge-proxy
          </Link>{' '}
          in front so the API key and any forwarded headers never reach
          client-side code or public embed URLs.
        </div>
      </>
    )
  },
  {
    question: 'What if the target also blocks headless browsers?',
    text: 'Use proxy alongside headers. When the page needs both authentication and a residential exit IP — for example a logged-in dashboard hosted behind Cloudflare — pass cookies via x-api-header-cookie and combine with the proxy parameter (or the automatic proxy resolution included in Pro). If the API returns EPROXYNEEDED, the target requires a proxy-backed request.',
    answer: (
      <>
        <div>
          Use <Link href='/feature/proxy'>proxy</Link> alongside headers. When
          the page needs both authentication and a residential exit IP — for
          example a logged-in dashboard hosted behind Cloudflare — pass cookies
          via <CodeInline>x-api-header-cookie</CodeInline> and combine with the{' '}
          <CodeInline>proxy</CodeInline> parameter (or the automatic proxy
          resolution included in Pro).
        </div>
        <div>
          If the API returns <CodeInline>EPROXYNEEDED</CodeInline>, the target
          requires a proxy-backed request.
        </div>
      </>
    )
  },
  {
    question: 'Do headers and x-api-header-* work on free plans?',
    text: 'No. Both are Pro features. Free-tier requests can target any public URL but cannot forward custom HTTP headers — the headers parameter is rejected, and x-api-header-* values are ignored. Upgrade to Pro to unlock both channels on every workflow.',
    answer: (
      <>
        <div>
          No. Both are <Link href='/pricing'>Pro</Link> features. Free-tier
          requests can target any public URL but cannot forward custom HTTP
          headers — the <CodeInline>headers</CodeInline> parameter is rejected,
          and <CodeInline>x-api-header-*</CodeInline> values are ignored.
        </div>
        <div>Upgrade to Pro to unlock both channels on every workflow.</div>
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
        Public values,{' '}
        <span css={theme({ color: 'secondary' })}>private secrets.</span>
      </SubheadBase>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Pick the volume that matches your traffic. Custom HTTP headers — both{' '}
        <CodeInline>headers</CodeInline> and{' '}
        <CodeInline>x-api-header-*</CodeInline> — are included on every Pro
        plan, across every workflow.
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
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start scraping behind login walls
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const HeadersFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <TwoChannels />
      <CodeExample />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Custom HTTP Headers API'
    description='Forward any HTTP header to the target page on Microlink Pro. Use the headers parameter for non-sensitive values like Accept-Language and User-Agent; use x-api-header-* request headers for cookies, bearer tokens, and other secrets that must never appear in the URL. Works uniformly across metadata, HTML, markdown, screenshots, PDFs, insights, and data extraction.'
    image={cdnUrl('banner/screenshot.jpeg')}
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

export default HeadersFeaturePage
