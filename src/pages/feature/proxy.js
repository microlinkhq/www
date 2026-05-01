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
        <span css={theme({ color: 'secondary' })}>Residential Proxy API:</span>{' '}
        Bypass Antibots & CAPTCHAs
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
        Zero-config web unblocker. The API auto-detects when a target is
        blocking, routes the call through a rotating residential pool, and picks
        the resolution path for that specific antibot or CAPTCHA provider —
        well-tested across the Top 500 most popular sites worldwide. Available
        on metadata, HTML, and markdown requests.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start Scraping with Pro
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Inline figure ──────────────────────────────────────────────────────── */

const Figure = styled('figure')`
  ${theme({
    m: 0,
    py: [4, 4, 5, 5]
  })}
`

const FigureImage = styled('img')`
  ${theme({
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    mx: 'auto'
  })}
`

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        The Web Unblocker
      </Eyebrow>
      <BodyText>
        When the API detects that a target site is blocking a request, the call
        is automatically routed through a rotating residential proxy pool. The
        same pipeline absorbs antibot challenges and CAPTCHA gates, so metadata,
        HTML, and markdown responses keep arriving even when the target sits
        behind Cloudflare, DataDome, or Akamai. Today this runs on metadata,
        HTML scraping, and markdown — for screenshots and PDFs, see the FAQ
        below.
      </BodyText>
      <Figure>
        <FigureImage
          src='/images/proxy-diagram.png'
          alt='Microlink Pro proxy: rotating residential pool, antibot bypass and CAPTCHA handling on a single API'
          width='1200'
          height='870'
          loading='lazy'
          decoding='async'
        />
      </Figure>
      <BodyText>
        It is included on every <Link href='/pricing'>Pro plan</Link>. No
        separate vendor, no per-challenge surcharge, no infrastructure to
        maintain on your end. The same behavior covers the{' '}
        <Link href='/blog/microlink-proxy-how-it-works'>
          Top 500 most popular sites worldwide
        </Link>
        .
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

const CardLink = styled(Link)`
  ${theme({
    color: 'secondary',
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const ChipRow = ({ items }) => (
  <Flex css={theme({ flexWrap: 'wrap', gap: 2, py: 3 })}>
    {items.map(item => (
      <ProviderChip key={item}>{item}</ProviderChip>
    ))}
  </Flex>
)

const ANTIBOT_PROVIDERS = [
  'Cloudflare',
  'DataDome',
  'Akamai Bot Manager',
  'PerimeterX',
  'Kasada',
  'Imperva / Incapsula',
  'AWS WAF',
  'Vercel Attack Mode',
  'Shape Security'
]

const CAPTCHA_PROVIDERS = [
  'reCAPTCHA v2',
  'reCAPTCHA v3',
  'hCaptcha',
  'FunCaptcha',
  'GeeTest',
  'Cloudflare Turnstile'
]

const ThreeInOne = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Three subscriptions → one parameter
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Stop paying three vendors for one job
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          A residential proxy, an antibot detector, and a CAPTCHA solver are
          typically three separate vendor contracts, three SDKs in your{' '}
          <CodeInline>package.json</CodeInline>, and three lines on your monthly
          bill. Pro folds them into the same API key — fewer integration paths,
          fewer renewals to negotiate, lower stack complexity per request.
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
            <CardKicker>01 · Proxy rotation</CardKicker>
            <CardTitle>Rotating residential pool</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              A fresh residential IP per request, with automatic retry from a
              different IP on block or throttle. Geo-aware routing kicks in when
              the target serves different content per region — no setup
              required.
            </CardBody>
            <CardBody>
              <strong>Success rate:</strong> well-tested across the{' '}
              <Link href='/blog/microlink-proxy-how-it-works'>
                Top 500 most popular sites worldwide
              </Link>
              .
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · Antibot detection</CardKicker>
            <CardTitle>
              Identify the blocker, pick the resolution path
            </CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The missing piece isn't bypassing antibot systems — it's knowing
              when you've hit one. The detection layer identifies which provider
              is blocking a request and routes it through the exact resolution
              path required for that protection layer — including:
            </CardBody>
            <ChipRow items={ANTIBOT_PROVIDERS} />
            <CardBody>
              Audit it yourself: the detection logic is open source as{' '}
              <Link href='https://github.com/microlinkhq/is-antibot'>
                is-antibot
              </Link>
              . It does detection only — telling you which provider blocked you,
              not how to solve a challenge. The resolution paths (alternative
              IPs, full browser rendering, retries) live inside the API. Result:
              fewer retries, cleaner data, predictable behavior at scale.
            </CardBody>
            <CardLink href='/blog/antibot-detection-at-scale'>
              Read the antibot breakdown →
            </CardLink>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · CAPTCHA handling</CardKicker>
            <CardTitle>Challenges, not in your billing</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Most CAPTCHAs never appear when requests look like a real browser
              with a clean residential IP. When a challenge does surface, the
              detect-and-route pipeline adapts — escalating to full browser
              rendering or alternative IPs — so you never need a third-party
              CAPTCHA solver in your stack.
            </CardBody>
            <ChipRow items={CAPTCHA_PROVIDERS} />
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Visual: request flow + response inspector ──────────────────────────── */

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

const ShieldChip = styled(Text).attrs({ as: 'span' })`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  ${theme({
    bg: 'white',
    color: 'black70',
    border: 1,
    borderColor: 'black10',
    borderRadius: 5,
    fontFamily: 'mono',
    fontSize: '11px',
    fontWeight: 'bold',
    px: 2,
    py: 1
  })}

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.secondary};
  }
`

const ResponseCard = styled(Box)`
  ${theme({
    bg: 'black',
    color: 'white',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2
  })}
  white-space: pre;
  overflow-x: auto;
`

const ResponseLine = ({ children, highlight, comment }) => (
  <Flex css={theme({ gap: 3, alignItems: 'baseline', whiteSpace: 'nowrap' })}>
    <Text
      as='span'
      css={theme({
        color: highlight ? 'pink3' : 'white',
        fontFamily: 'mono',
        fontSize: 0
      })}
    >
      {children}
    </Text>
    {comment && (
      <Text
        as='span'
        css={theme({
          color: 'white60',
          fontFamily: 'mono',
          fontSize: 0
        })}
      >
        ← {comment}
      </Text>
    )}
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
        <Flex
          css={theme({
            alignItems: 'stretch',
            gap: [2, 2, 3, 3],
            flexDirection: ['column', 'column', 'row', 'row']
          })}
        >
          <Node>
            <NodeLabel>Your code</NodeLabel>
            <NodeSub>metadata · html · markdown</NodeSub>
          </Node>
          <Arrow />
          <NodeActive>
            <NodeLabel css={theme({ color: 'secondary' })}>
              Microlink Pro
            </NodeLabel>
            <NodeSub>detects need for proxy</NodeSub>
          </NodeActive>
          <Arrow />
          <Node>
            <NodeLabel>Residential pool</NodeLabel>
            <NodeSub>rotating IPs</NodeSub>
          </Node>
          <Arrow />
          <Node>
            <NodeLabel>Target site</NodeLabel>
            <NodeSub>behind WAF / CAPTCHA</NodeSub>
          </Node>
        </Flex>

        <Flex
          css={theme({
            gap: 2,
            flexWrap: 'wrap',
            pt: [3, 4, 4, 4],
            justifyContent: ['flex-start', 'flex-end', 'flex-end', 'flex-end']
          })}
        >
          <Text
            as='span'
            css={theme({
              fontSize: 0,
              color: 'black60',
              fontFamily: 'mono',
              alignSelf: 'center',
              pr: 1
            })}
          >
            shields passed:
          </Text>
          <ShieldChip>Cloudflare</ShieldChip>
          <ShieldChip>DataDome</ShieldChip>
          <ShieldChip>Akamai</ShieldChip>
          <ShieldChip>+ 6 more</ShieldChip>
        </Flex>
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
        Default: automatic resolution
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Send the request as you normally would. On any Pro metadata, HTML, or
        markdown request, the proxy layer engages automatically when the target
        requires it.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql(
  'https://www.bloomberg.com',
  { apiKey: process.env.MICROLINK_API_KEY }
)`}
      </CodeEditor>
    </SectionInner>
  </Section>
)

/* ─── Bring your own proxy ───────────────────────────────────────────────── */

const BringYourOwn = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>
        Bring your own proxy
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Already paying for a residential proxy?
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        If you have a dedicated provider or need a fixed country IP, pass the
        proxy URL on the <CodeInline>proxy</CodeInline> parameter. Microlink
        routes every sub-request — redirects, assets, dynamic fetches — through
        the same server.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql('https://geolocation.microlink.io', {
  proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
})`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/common/proxy#bring-your-own-proxy'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Full bring-your-own proxy guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Verifying ──────────────────────────────────────────────────────────── */

const Verifying = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Verify</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        How to confirm a request was proxied
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Every proxied response carries an <CodeInline>x-fetch-mode</CodeInline>{' '}
        header ending in <CodeInline>-proxy</CodeInline>. That suffix is your
        proof the request went through the resolution layer — and that you are
        being billed under the Pro plan.
      </BodyText>

      <ResponseCard aria-label='Example response headers when a proxy was used'>
        <ResponseLine>HTTP/2 200</ResponseLine>
        <ResponseLine highlight comment='Pro plan active'>
          x-pricing-plan: pro
        </ResponseLine>
        <ResponseLine highlight comment='request went through proxy'>
          x-fetch-mode: fetch-proxy
        </ResponseLine>
        <ResponseLine>x-cache-ttl: 86400000</ResponseLine>
        <ResponseLine>x-cache-status: BYPASS</ResponseLine>
      </ResponseCard>
    </SectionInner>
  </Section>
)

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: 'Do I need to bring my own proxy?',
    text: 'No — the residential proxy is included on every Pro plan, so you cancel one vendor contract on day one. If you already have a dedicated residential proxy you want to keep using (for example a fixed country IP), pass it on the proxy parameter; see the bring-your-own proxy guide at /docs/guides/common/proxy#bring-your-own-proxy.',
    answer: (
      <>
        <div>
          No — the residential proxy is included on every{' '}
          <Link href='/pricing'>Pro plan</Link>, so the default request needs no
          extra configuration and one residential-proxy bill comes off your
          stack on day one.
        </div>
        <div>
          If you already have a dedicated residential proxy you want to keep
          using — for example a fixed country IP — pass it on the{' '}
          <CodeInline>proxy</CodeInline> parameter. The{' '}
          <Link href='/docs/guides/common/proxy#bring-your-own-proxy'>
            bring-your-own proxy guide
          </Link>{' '}
          covers the URL format and credential handling.
        </div>
      </>
    )
  },
  {
    question: 'Does this work with screenshots and PDFs too?',
    text: 'Not yet. Automatic proxy resolution currently runs on metadata, HTML scraping, and markdown requests. For screenshots and PDFs we recommend bringing your own proxy via the proxy parameter, or contacting us at hello@microlink.io so we can enable your use case.',
    answer: (
      <>
        <div>
          Not yet. Automatic proxy resolution currently runs on metadata, HTML
          scraping, and markdown requests — the use cases that ship with most
          scraping pipelines.
        </div>
        <div>
          For screenshots and PDFs we recommend two options: pass your own
          residential proxy on the <CodeInline>proxy</CodeInline> parameter (see
          the{' '}
          <Link href='/docs/guides/common/proxy#bring-your-own-proxy'>
            bring-your-own proxy guide
          </Link>
          ), or write to us at{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> so we
          can enable your use case.
        </div>
      </>
    )
  },
  {
    question: 'Which antibot systems does Microlink bypass?',
    text: 'Nine major providers: Cloudflare, DataDome, Akamai Bot Manager, PerimeterX, Kasada, Imperva / Incapsula, AWS WAF, Vercel Attack Mode and Shape Security. The detection logic is open source as is-antibot, so you can audit it yourself. Resolution is well-tested across the Top 500 most popular sites worldwide — read the engineering breakdown at /blog/antibot-detection-at-scale.',
    answer: (
      <>
        <div>
          Nine major providers: Cloudflare, DataDome, Akamai Bot Manager,
          PerimeterX, Kasada, Imperva / Incapsula, AWS WAF, Vercel Attack Mode
          and Shape Security. The detection logic is open source as{' '}
          <Link href='https://github.com/microlinkhq/is-antibot'>
            is-antibot
          </Link>
          , so you can audit the matchers yourself.
        </div>
        <div>
          Resolution is well-tested across the{' '}
          <Link href='/blog/microlink-proxy-how-it-works'>
            Top 500 most popular sites worldwide
          </Link>
          . For the engineering breakdown, see{' '}
          <Link href='/blog/antibot-detection-at-scale'>
            antibot detection at scale
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'Does this bypass CAPTCHAs too?',
    text: 'Yes — and you remove a second vendor from your stack. Most CAPTCHAs never surface when requests look like a real browser routed through a clean residential IP, including reCAPTCHA v2, reCAPTCHA v3, hCaptcha, FunCaptcha, GeeTest and Cloudflare Turnstile. When a challenge does appear, the detect-and-route pipeline adapts — escalating to full browser rendering or alternative IPs — so a third-party CAPTCHA solver is never needed in your stack.',
    answer: (
      <>
        <div>
          Yes — and you remove a second vendor from your stack. Most CAPTCHAs
          never surface when requests look like a real browser routed through a
          clean residential IP — including reCAPTCHA v2, reCAPTCHA v3, hCaptcha,
          FunCaptcha, GeeTest and Cloudflare Turnstile.
        </div>
        <div>
          When a challenge does appear, the detect-and-route pipeline adapts —
          escalating to full browser rendering or alternative IPs — so a
          third-party CAPTCHA solver is never needed in your stack.
        </div>
      </>
    )
  },
  {
    question: 'How do I confirm a proxy was actually used?',
    text: 'Check the x-fetch-mode response header. Any value ending in -proxy (for example fetch-proxy) means the request was routed through the proxy layer. The x-pricing-plan header on the same response will read pro.',
    answer: (
      <>
        <div>
          Check the <CodeInline>x-fetch-mode</CodeInline> response header. Any
          value ending in <CodeInline>-proxy</CodeInline> — for example{' '}
          <CodeInline>fetch-proxy</CodeInline> — means the request was routed
          through the proxy layer.
        </div>
        <div>
          The <CodeInline>x-pricing-plan</CodeInline> header on the same
          response will read <CodeInline>pro</CodeInline>, confirming the
          request was billed against your Pro plan.
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
        Stop renting{' '}
        <span css={theme({ color: 'secondary' })}>three vendors</span> for one
        job.
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
        Pick the volume that matches your traffic. Automatic proxy resolution,
        antibot detection, and CAPTCHA handling are included on every Pro plan
        for metadata, HTML, and markdown requests.
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
          Start Scraping with Pro
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const ProxyFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <ThreeInOne />
      <CodeExample />
      <BringYourOwn />
      <Verifying />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Residential Proxy API: Bypass Antibots & CAPTCHAs'
    description='Residential Proxy API that bypasses Cloudflare, DataDome, Akamai antibots and reCAPTCHA, hCaptcha, Cloudflare Turnstile on metadata, HTML and markdown scraping requests. Zero-config web unblocker — one parameter replaces three vendors.'
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

export default ProxyFeaturePage
