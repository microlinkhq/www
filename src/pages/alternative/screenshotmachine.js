import {
  borders,
  colors,
  layout,
  theme,
  textGradient,
  space,
  radii,
  breakpoints
} from 'theme'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Faq from 'components/patterns/Faq/Faq'
import ArrowLink from 'components/patterns/ArrowLink'
import RaceContainer from 'components/patterns/RaceContainer/RaceContainer'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { cdnUrl } from 'helpers/cdn-url'
import styled, { css } from 'styled-components'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { extractDomain } from 'helpers/extract-domain'

const RaceHero = styled(Box)`
  width: 100%;
  max-width: 960px;

  ${theme({
    borderRadius: 4,
    bg: 'white',
    p: [3, 3, 4, 4],
    boxShadow: `0 25px 50px ${colors.black10}, 0 0 0 1px ${colors.black05}`
  })}

  & > div {
    min-height: 220px;

    @media (max-width: ${breakpoints[0]}) {
      min-height: 190px;
    }
  }
`

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_12 = `calc(${space[3]} - ${space[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`

const BENCHMARK_DATA = {
  timestamp: '2026-03',
  testUrls: [
    {
      url: 'https://vercel.com',
      width: 1920,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://example.com',
      width: 1280,
      height: 800,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://stripe.com',
      width: 393,
      height: 852,
      fullPage: false,
      format: 'jpeg'
    },
    {
      url: 'https://screenshotone.com',
      width: 1920,
      fullPage: true,
      format: 'png'
    },
    {
      url: 'https://news.ycombinator.com',
      width: 1440,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://github.com/trending',
      width: 768,
      height: 1024,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://www.framer.com',
      width: 1920,
      height: 1800,
      fullPage: false,
      format: 'jpeg'
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 4111.84,
        totalColdDuration: 28782.87
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6361.22 },
        { url: 'https://example.com', coldDuration: 967.96 },
        { url: 'https://stripe.com', coldDuration: 3217.22 },
        { url: 'https://screenshotone.com', coldDuration: 5474.39 },
        { url: 'https://news.ycombinator.com', coldDuration: 3435.08 },
        { url: 'https://github.com/trending', coldDuration: 3059.69 },
        { url: 'https://www.framer.com', coldDuration: 6267.31 }
      ]
    },
    screenshotmachine: {
      name: 'ScreenshotMachine',
      summary: {
        avgColdDuration: 6099.77,
        totalColdDuration: 42698.4
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 9790.6 },
        { url: 'https://example.com', coldDuration: 1321.19 },
        { url: 'https://stripe.com', coldDuration: 3167.16 },
        { url: 'https://screenshotone.com', coldDuration: 12403.69 },
        { url: 'https://news.ycombinator.com', coldDuration: 4328.76 },
        { url: 'https://github.com/trending', coldDuration: 3898.21 },
        { url: 'https://www.framer.com', coldDuration: 7788.79 }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotmachine: colors.blue6
}

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const SERVICES = Object.keys(BENCHMARK_DATA.results)
const SORTED_SERVICES = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.avgColdDuration -
    BENCHMARK_DATA.results[b].summary.avgColdDuration
)

/* ---------------------------------------------------------------------------
 * Styled primitives
 * --------------------------------------------------------------------------- */

const Section = styled(Box)`
  ${theme({
    py: [5, 5, 6, 6],
    px: [3, 3, 4, 4]
  })}
`

const SectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0
  })}
`

const Badge = styled(Caps)`
  display: inline-flex;
  align-items: center;
  ${theme({
    fontSize: '11px',
    fontWeight: 'bold',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    letterSpacing: '0.08em'
  })}
`

const GradientText = styled('span')`
  ${css`
    ${textGradient}
  `}
`

/* ---------------------------------------------------------------------------
 * Comparison Table (benchmark-style)
 * --------------------------------------------------------------------------- */

const FeatureTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  th,
  td {
    padding: ${SPACE_10} ${SPACE_14};
    ${theme({ textAlign: 'left', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      padding: ${space[2]} ${SPACE_10};
      white-space: normal;
      word-break: break-word;
    }
  }

  th {
    font-weight: 600;
    text-transform: uppercase;
    ${theme({ color: 'black', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black10};
  }

  td {
    ${theme({ color: 'black' })};
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`

const Check = () => (
  <span
    css={theme({
      color: 'green7',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center'
    })}
    aria-label='Yes'
    role='img'
  >
    ✓
  </span>
)

const Cross = () => (
  <span
    css={theme({
      color: 'red5',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center',
      opacity: 0.7
    })}
    aria-label='No'
    role='img'
  >
    ✕
  </span>
)

const Partial = ({ children }) => (
  <span
    css={theme({
      color: 'yellow7',
      fontFamily: 'mono',
      fontSize: 0,
      display: 'block',
      textAlign: 'center'
    })}
  >
    {children || '~'}
  </span>
)

const COMPARISON_DATA = [
  { feature: 'Screenshot capture', microlink: true, screenshotmachine: true },
  {
    feature: 'Full-page screenshots',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'Device emulation (desktop/tablet/phone)',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'Custom delay before capture',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'Hide elements (CSS selectors)',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'Click interactions',
    microlink: true,
    screenshotmachine: true
  },
  { feature: 'Zoom control', microlink: true, screenshotmachine: true },
  { feature: 'PNG / JPEG output', microlink: true, screenshotmachine: true },
  {
    feature: 'Built-in response cache',
    microlink: true,
    screenshotmachine: true,
    note: 'ScreenshotMachine caches for up to 14\u00a0days.'
  },
  {
    feature: 'Signed request URLs (hash security)',
    microlink: true,
    screenshotmachine: true
  },
  {
    feature: 'Custom CSS injection',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Custom JS injection',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Custom HTTP headers',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Custom cookies',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Wait for CSS selector',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'HTML rendering (raw HTML input)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Dark/light mode capture',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Custom proxy support',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK (React/Vue/JS)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  {
    feature: 'MCP server',
    microlink: true,
    screenshotmachine: false,
    highlight: true
  },
  { feature: 'Markdown conversion', microlink: true, screenshotmachine: false },
  {
    feature: 'Cookie banner blocking',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Ad blocking',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'GIF output (from API)',
    microlink: false,
    screenshotmachine: true,
    note: 'ScreenshotMachine supports GIF as a direct output format.'
  },
  {
    feature: 'Region cropping (x, y, w, h)',
    microlink: false,
    screenshotmachine: true
  }
]

const CellValue = ({ value }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  if (value === 'partial' || value === 'on demand') {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    return <Partial>{capitalized}</Partial>
  }
  return <span>{value}</span>
}

const ComparisonTable = () => (
  <Box
    css={theme({
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: 4,
      border: `${borders[1]} ${colors.black10}`,
      bg: 'white'
    })}
  >
    <FeatureTable>
      <thead>
        <tr>
          <th css={{ minWidth: '220px' }}>Feature</th>
          <th css={[theme({ textAlign: 'center' }), { minWidth: '120px' }]}>
            <span css={textGradient}>Microlink</span>
          </th>
          <th
            css={[
              theme({ textAlign: 'center', color: 'black60' }),
              { minWidth: '120px' }
            ]}
          >
            ScreenshotMachine
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotmachine, highlight, note }) => (
            <tr
              key={feature}
              css={{
                background: highlight
                  ? 'rgba(6, 125, 247, 0.03)'
                  : 'transparent'
              }}
            >
              <td css={theme({ fontWeight: 'regular' })}>
                {feature}
                {note && (
                  <Text
                    css={theme({
                      fontSize: '11px',
                      color: 'black40',
                      pt: 1,
                      lineHeight: 1
                    })}
                    as='div'
                  >
                    {note}
                  </Text>
                )}
              </td>
              <td css={theme({ textAlign: 'center' })}>
                <CellValue value={microlink} />
              </td>
              <td css={theme({ textAlign: 'center' })}>
                <CellValue value={screenshotmachine} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </FeatureTable>
  </Box>
)

/* ---------------------------------------------------------------------------
 * Speed Benchmark Table (benchmark-style per-URL breakdown)
 * --------------------------------------------------------------------------- */

const PerUrlTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  th,
  td {
    padding: ${space[2]} ${SPACE_12};
    ${theme({ textAlign: 'right', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    text-transform: uppercase;
    ${theme({ color: 'black', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black10};
  }

  th:first-child,
  td:first-child {
    text-align: left;
    font-weight: 500;
    ${theme({ color: 'black' })};
  }

  th:last-child,
  td:last-child {
    @media (max-width: ${BREAKPOINT_COMPACT_MAX}) {
      display: none;
    }
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`

const CellHighlight = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'green7' })};
`

const CellLoser = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'red8' })};
`

const MobileCards = styled('div')`
  ${theme({ display: 'none', flexDirection: 'column', width: '100%' })};
  gap: ${SPACE_12};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ display: 'flex' })};
  }
`

const MobileCard = styled('div')`
  ${theme({ borderRadius: 4, bg: 'white' })};
  border: ${borders[1]} ${colors.black10};
  overflow: hidden;
`

const MobileCardHeader = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    bg: 'black05'
  })};
  color: ${colors.black} !important;
  padding: ${SPACE_10} ${SPACE_14};
  border-bottom: ${borders[1]} ${colors.black10};
`

const MobileCardRow = styled('div')`
  ${theme({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'mono',
    fontSize: 0
  })};
  padding: ${space[2]} ${SPACE_14};
  font-variant-numeric: tabular-nums;
  border-bottom: ${borders[1]} ${colors.black05};

  &:last-child {
    border-bottom: 0;
  }
`

const MobileCardName = styled('span')`
  ${theme({ color: 'black' })};
  font-weight: 500;
`

const MobileCardTime = styled('span')`
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  color: ${({ $isMin, $isMax }) =>
    $isMin ? colors.green7 : $isMax ? colors.red8 : colors.black};
`

/* ---------------------------------------------------------------------------
 * Pricing Comparison
 * --------------------------------------------------------------------------- */

const PriceCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    flex: 1,
    minWidth: '260px'
  })}
`

const PriceAmount = styled(Text)`
  ${theme({
    fontSize: [4, 5, 5, 5],
    fontWeight: 'bold',
    lineHeight: 0
  })}
  font-variant-numeric: tabular-nums;
`

const FAQ_ITEMS = [
  {
    question: 'Is there a free Screenshot Machine alternative?',
    answer: (
      <>
        <div>
          Yes. Microlink's <Link href='/#pricing'>free tier</Link> gives you
          50&nbsp;requests/day with no credit card and no time limit. Same API,
          same quality, same 240+ edge network as paid plans.
        </div>
        <div>
          Screenshot Machine also offers a free tier with 100&nbsp;fresh
          screenshots per month. Microlink's daily-reset model gives you up to
          1,500&nbsp;requests/month on free, which is 15&times; more volume and
          easier to test with real traffic patterns.
        </div>
      </>
    ),
    text: "Yes. Microlink's free tier gives you 50 requests/day with no credit card and no time limit. Same API, same quality, same 240+ edge network as paid plans. Screenshot Machine also offers a free tier with 100 fresh screenshots per month. Microlink's daily-reset model gives you up to 1,500 requests/month on free, which is 15\u00d7 more volume."
  },
  {
    question:
      'How does Microlink compare to Screenshot Machine for screenshot quality?',
    answer: (
      <>
        <div>
          Both services produce screenshots using Chromium. Microlink serves
          maximum quality with optimal compression by default and delivers
          results 33% faster on average. Screenshot Machine also delivers good
          quality and supports JPG, PNG, and GIF output formats.
        </div>
      </>
    ),
    text: 'Both services produce screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and delivers results 33% faster on average. Screenshot Machine also delivers good quality and supports JPG, PNG, and GIF output formats.'
  },
  {
    question: 'Can I migrate from Screenshot Machine to Microlink easily?',
    answer: (
      <>
        <div>
          Yes. Screenshot Machine uses a simple GET API with parameters like{' '}
          <i>url</i>, <i>dimension</i>, <i>device</i>, <i>format</i>,{' '}
          <i>delay</i>, and <i>zoom</i>. Microlink accepts the same capture
          concepts under its own parameter names. Most migrations involve
          updating the API endpoint and key. The{' '}
          <Link href='/docs/api/parameters/screenshot'>screenshot docs</Link>{' '}
          cover every parameter with examples.
        </div>
        <div>
          Paste your existing code into any LLM and ask it to migrate to
          Microlink. Or email{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> and
          we'll help directly.
        </div>
      </>
    ),
    text: "Yes. Screenshot Machine uses a simple GET API with parameters like url, dimension, device, format, delay, and zoom. Microlink accepts the same capture concepts under its own parameter names. Most migrations involve updating the API endpoint and key. The screenshot docs cover every parameter with examples. Paste your existing code into any LLM and ask it to migrate to Microlink. Or email hello@microlink.io and we'll help directly."
  },
  {
    question:
      'What does \u201Cplatform vs. point solution\u201D mean in practice?',
    answer: (
      <>
        <div>
          Screenshot Machine is focused on two things: website screenshots and
          website-to-PDF conversion. It does those well and simply.
        </div>
        <div>
          Microlink gives you screenshots, PDF generation, metadata/Open Graph
          extraction, link previews (via SDK), remote JavaScript execution, and
          Lighthouse audits from one API key and one integration. When your
          workflow grows beyond screenshots, you don't need a second vendor.
        </div>
      </>
    ),
    text: "Screenshot Machine is focused on website screenshots and website-to-PDF conversion. Microlink gives you screenshots, PDF generation, metadata/Open Graph extraction, link previews (via SDK), remote JavaScript execution, and Lighthouse audits from one API key. When your workflow grows beyond screenshots, you don't need a second vendor."
  },
  {
    question: 'Is Microlink really open source?',
    answer: (
      <>
        <div>
          The core engine components are MIT-licensed on GitHub:{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            Metascraper
          </Link>{' '}
          (metadata extraction),{' '}
          <Link href='https://github.com/microlinkhq/mql'>MQL</Link> (Microlink
          Query Language), and{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            Browserless
          </Link>{' '}
          (headless browser). Enterprise teams can audit, fork, and contribute.
        </div>
        <div>
          Screenshot Machine is closed-source. There is no way to inspect or
          audit the engine processing your requests.
        </div>
      </>
    ),
    text: 'The core engine components are MIT-licensed on GitHub: Metascraper (metadata extraction), MQL (Microlink Query Language), and Browserless (headless browser). Enterprise teams can audit, fork, and contribute. Screenshot Machine is closed-source. There is no way to inspect or audit the engine processing your requests.'
  },
  {
    question: 'How much does Screenshot Machine cost compared to Microlink?',
    answer: (
      <>
        <div>
          Screenshot Machine Pro is \u20AC59/month (~$64) for
          20,000&nbsp;screenshots with \u20AC0.003 per extra screenshot.
          Microlink is $39/month for 46,000&nbsp;requests &mdash; 2.3&times;
          more volume for 40% less money &mdash; with no per-minute rate limit.
        </div>
        <div>
          Enterprise clients running millions of requests fund the
          infrastructure, which is how indie devs get the same global edge
          network at these prices.
        </div>
      </>
    ),
    text: 'Screenshot Machine Pro is \u20ac59/month (~$64) for 20,000 screenshots with \u20ac0.003 per extra screenshot. Microlink is $39/month for 46,000 requests \u2014 2.3\u00d7 more volume for 40% less money \u2014 with no per-minute rate limit. Enterprise clients running millions of requests fund the infrastructure.'
  },
  {
    question: 'Does Microlink have rate limits?',
    answer: (
      <>
        <div>
          Paid plans have no requests-per-minute cap &mdash; burst as high as
          your concurrency allows. The only limit is your monthly request quota.
        </div>
        <div>
          Screenshot Machine does not publish explicit per-minute rate limits,
          but its pricing tiers are based on fresh screenshots per month. Cached
          screenshots (up to 14&nbsp;days) are not billed.
        </div>
      </>
    ),
    text: 'Paid plans have no requests-per-minute cap \u2014 burst as high as your concurrency allows. The only limit is your monthly request quota. Screenshot Machine does not publish explicit per-minute rate limits, but its pricing tiers are based on fresh screenshots per month. Cached screenshots (up to 14 days) are not billed.'
  },
  {
    question: 'How does Microlink handle sites with cookie banners or ads?',
    answer: (
      <>
        <div>
          Microlink supports ad blocking via the{' '}
          <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter and
          custom CSS/JS injection to dismiss consent dialogs before the
          screenshot is taken. Screenshot Machine supports hiding elements via
          CSS selectors but does not have dedicated ad blocking or cookie banner
          removal.
        </div>
        <div>
          Use{' '}
          <Link href='/docs/api/parameters/screenshot/hide'>
            screenshot.hide
          </Link>{' '}
          to remove specific elements by CSS selector &mdash; sticky banners,
          chat widgets, or any overlay that clutters the capture.
        </div>
      </>
    ),
    text: 'Microlink supports ad blocking via the adblock parameter and custom CSS/JS injection to dismiss consent dialogs. Screenshot Machine supports hiding elements via CSS selectors but does not have dedicated ad blocking or cookie banner removal. Use screenshot.hide to remove specific elements by CSS selector.'
  },
  {
    question: 'What uptime and SLA does Microlink guarantee?',
    answer: (
      <>
        <div>
          Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are
          served from 240+ Cloudflare edge nodes worldwide. Screenshot Machine
          advertises 99.99% uptime on its SLA page, which is a strong
          availability commitment.
        </div>
      </>
    ),
    text: 'Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are served from 240+ Cloudflare edge nodes worldwide. Screenshot Machine advertises 99.99% uptime on its SLA page, which is a strong availability commitment.'
  }
]

/* ---------------------------------------------------------------------------
 * Hero Section
 * --------------------------------------------------------------------------- */

const Hero = () => (
  <BluePrintBackground as='section'>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: 3,
        pb: [4, 4, 5, 5],
        px: 4
      })}
    >
      <Heading
        variant={null}
        css={theme({
          textAlign: 'center',
          maxWidth: '100%',
          fontSize: [4, 4, 5, 5],
          color: 'black'
        })}
      >
        The <GradientText>Screenshot Machine</GradientText> alternative that
        does&nbsp;more
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black80'
        })}
        titleize={false}
      >
        <b>Screenshot Machine</b> is a reliable, no-frills screenshot API. When
        you need lower latency, more features, and a platform that goes beyond
        screenshots and PDFs, <b>Microlink</b> is <b>33% faster on average</b>{' '}
        and covers screenshots, PDFs, metadata, link previews, and more in
        one&nbsp;API.
      </Caption>

      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [3, 3, 4, 4],
          fontSize: [2, 2, 3, 3],
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink href='/screenshot'>Get Started Free</ArrowLink>
      </Flex>

      <Flex
        css={theme({
          width: '100%',
          justifyContent: 'center',
          my: [3, 3, 4, 4],
          pb: [3, 3, 4, 4]
        })}
      >
        <RaceHero aria-label='Live benchmark race: Microlink vs Screenshot Machine screenshot speed'>
          <RaceContainer
            benchmarkData={BENCHMARK_DATA}
            serviceColors={SERVICE_COLORS}
            highlightKey='microlink'
            flat
            compact
          />
        </RaceHero>
      </Flex>
    </Flex>
  </BluePrintBackground>
)

/* ---------------------------------------------------------------------------
 * Comparison Table Section
 * --------------------------------------------------------------------------- */

const ComparisonSection = () => (
  <Section
    as='section'
    id='comparison'
    css={theme({
      borderTop: `${borders[1]} ${colors.black05}`,
      borderBottom: `${borders[1]} ${colors.black05}`,
      py: 5
    })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4], pt: 3 })}
        titleize={false}
      >
        <GradientText>Feature-by-Feature</GradientText> Comparison
      </Subhead>
      <Caption
        css={theme({
          pt: 2,
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal,
          color: 'black60'
        })}
        titleize={false}
      >
        An honest look at what each API offers.
      </Caption>
      <ComparisonTable />
      <Text
        css={theme({
          pt: 4,
          pb: 4,
          fontSize: '12px',
          color: 'black40',
          textAlign: 'center',
          fontFamily: 'mono'
        })}
      >
        Last verified: April&nbsp;2026. See each product's docs for the latest.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Speed Section (benchmark data tables)
 * --------------------------------------------------------------------------- */

const SpeedSection = () => {
  const micro = BENCHMARK_DATA.results.microlink
  const microAvg = micro.summary.avgColdDuration

  return (
    <Section
      as='section'
      id='speed'
      css={theme({ bg: 'white', pt: [3, 3, 4, 4] })}
    >
      <SectionInner>
        <Subhead
          css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4] })}
          titleize={false}
        >
          <GradientText>Up to 2.3&times; faster</GradientText> response times
        </Subhead>

        <Caption
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black80',
            fontSize: 3
          })}
          titleize={false}
        >
          Same request. Same URL. Same output format.
        </Caption>

        <Text
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black60',
            fontSize: 2,
            lineHeight: 2,
            textAlign: 'center',
            mx: 'auto'
          })}
        >
          We ran identical screenshot requests against both APIs from a New York
          server and measured cold-start latency &mdash; no cache, no warm-up.
          The numbers below are averages from 10&nbsp;independent benchmark runs
          at different hours. The biggest gap was on screenshotone.com, where
          Screenshot Machine took over 12&nbsp;seconds while Microlink finished
          in 5.5&nbsp;seconds.
        </Text>

        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            gap: [3, 3, 4, 4],
            alignItems: 'flex-start',
            width: '100%'
          })}
        >
          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <Text
              css={theme({
                fontSize: 2,
                fontWeight: 'bold',
                letterSpacing: 0,
                color: 'black',
                pb: 3
              })}
            >
              Cold-start latency by&nbsp;URL
            </Text>
            <Box
              css={theme({
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: 4,
                border: `${borders[1]} ${colors.black10}`,
                bg: 'white',
                display: ['none', 'block']
              })}
            >
              <PerUrlTable>
                <thead>
                  <tr>
                    <th css={theme({ textAlign: 'left' })}>URL</th>
                    {SORTED_SERVICES.map(key => (
                      <th
                        key={key}
                        css={theme({
                          color:
                            key === 'microlink' ? colors.green7 : colors.black
                        })}
                      >
                        {BENCHMARK_DATA.results[key].name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARK_DATA.testUrls.map(({ url }) => {
                    const times = SORTED_SERVICES.map(
                      key =>
                        BENCHMARK_DATA.results[key].perUrl.find(
                          p => p.url === url
                        )?.coldDuration || 0
                    )
                    const minTime = Math.min(...times)
                    const maxTime = Math.max(...times)

                    return (
                      <tr key={url}>
                        <td>{extractDomain(url)}</td>
                        {SORTED_SERVICES.map((key, i) => {
                          const isMin = times[i] === minTime
                          const isMax = times[i] === maxTime
                          return (
                            <td key={key}>
                              {isMin
                                ? (
                                  <CellHighlight>
                                    {formatMs(times[i])}
                                  </CellHighlight>
                                  )
                                : isMax
                                  ? (
                                    <CellLoser>{formatMs(times[i])}</CellLoser>
                                    )
                                  : (
                                      formatMs(times[i])
                                    )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {(() => {
                    const totals = SORTED_SERVICES.map(
                      key =>
                        BENCHMARK_DATA.results[key].summary.totalColdDuration
                    )
                    const minTotal = Math.min(...totals)
                    const maxTotal = Math.max(...totals)

                    return (
                      <tr>
                        <td
                          css={theme({
                            fontWeight: 'bold',
                            color: 'black',
                            borderTop: `${borders[1]} ${colors.black10}`
                          })}
                        >
                          Total
                        </td>
                        {SORTED_SERVICES.map((key, i) => {
                          const isMin = totals[i] === minTotal
                          const isMax = totals[i] === maxTotal
                          return (
                            <td
                              key={key}
                              css={theme({
                                fontWeight: 'bold',
                                borderTop: `${borders[1]} ${colors.black10}`,
                                color: isMin
                                  ? colors.green7
                                  : isMax
                                    ? colors.red8
                                    : colors.black
                              })}
                            >
                              {(totals[i] / 1000).toFixed(1)}&thinsp;s
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })()}
                </tbody>
              </PerUrlTable>
            </Box>

            <MobileCards>
              {BENCHMARK_DATA.testUrls.map(({ url }) => {
                const times = SORTED_SERVICES.map(
                  key =>
                    BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
                      ?.coldDuration || 0
                )
                const minTime = Math.min(...times)
                const maxTime = Math.max(...times)

                return (
                  <MobileCard key={url}>
                    <MobileCardHeader>{extractDomain(url)}</MobileCardHeader>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = times[i] === minTime
                      const isMax = times[i] === maxTime
                      return (
                        <MobileCardRow key={key}>
                          <MobileCardName>
                            {BENCHMARK_DATA.results[key].name}
                          </MobileCardName>
                          <MobileCardTime
                            $highlight={isMin || isMax}
                            $isMin={isMin}
                            $isMax={isMax}
                          >
                            {formatMs(times[i])}&thinsp;ms
                          </MobileCardTime>
                        </MobileCardRow>
                      )
                    })}
                  </MobileCard>
                )
              })}
            </MobileCards>
          </Box>

          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <Text
              css={theme({
                fontSize: 2,
                fontWeight: 'bold',
                letterSpacing: 0,
                color: 'black',
                pb: 3
              })}
            >
              Average cold-start latency
            </Text>
            <Box
              css={theme({
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: 4,
                border: `${borders[1]} ${colors.black10}`,
                bg: 'white'
              })}
            >
              <FeatureTable>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th css={theme({ textAlign: 'right' })}>
                      Avg Cold Duration
                    </th>
                    <th css={theme({ textAlign: 'right' })}>
                      vs.&nbsp;Microlink
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SORTED_SERVICES.map(key => {
                    const svc = BENCHMARK_DATA.results[key]
                    const avg = svc.summary.avgColdDuration
                    const delta = avg - microAvg
                    const pctSlower =
                      microAvg > 0 ? ((delta / microAvg) * 100).toFixed(0) : 0
                    const isMicrolink = key === 'microlink'

                    return (
                      <tr key={key}>
                        <td>
                          <span
                            css={theme({
                              fontWeight: isMicrolink ? 'bold' : 'normal',
                              color: isMicrolink ? colors.green7 : 'black'
                            })}
                          >
                            {svc.name}
                          </span>
                        </td>
                        <td
                          css={theme({
                            textAlign: 'right',
                            fontWeight: isMicrolink ? 'bold' : 'normal',
                            color: isMicrolink ? colors.green7 : undefined
                          })}
                        >
                          {formatMsDecimal(avg)}&thinsp;ms
                        </td>
                        <td
                          css={theme({
                            textAlign: 'right',
                            color: isMicrolink ? colors.green7 : 'black'
                          })}
                        >
                          {isMicrolink ? '—' : `+${pctSlower}% slower`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </FeatureTable>
            </Box>
            <Box
              css={theme({
                mt: 4,
                p: 1,
                borderColor: 'black10',
                bg: 'white'
              })}
            >
              <Text
                css={theme({
                  fontSize: [1, 1, 2, 2],
                  color: 'black90',
                  lineHeight: 2
                })}
              >
                See the full benchmark with all 6&nbsp;providers and 7&nbsp;URLs
                on the{' '}
                <Link href='/benchmarks/screenshot-api'>
                  Screenshot API Benchmark
                </Link>{' '}
                page.
              </Text>
            </Box>
            <Text
              css={theme({
                pt: 4,
                fontSize: 0,
                color: 'black40',
                fontFamily: 'mono',
                lineHeight: 2
              })}
            >
              Averages from 10&nbsp;benchmark runs taken from a New York server
              at different hours. The{' '}
              <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
                benchmark repo
              </Link>{' '}
              is open — run it yourself and see. Last run: March&nbsp;2026.
            </Text>
          </Box>
        </Flex>
      </SectionInner>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
 * Why Developers Switch
 * --------------------------------------------------------------------------- */

const WhySwitchSection = () => (
  <Section as='section' id='why-switch' css={theme({ bg: 'gray0' })}>
    <SectionInner>
      <Subhead
        css={theme({ color: 'black', pb: [1, 2, 2, 2] })}
        titleize={false}
      >
        Why <GradientText>Developers</GradientText> Switch
      </Subhead>
      <Caption
        css={theme({
          color: 'black60',
          pb: [4, 4, 5, 5],
          maxWidth: layout.normal
        })}
        titleize={false}
      >
        The top reasons teams move from Screenshot Machine to Microlink.
      </Caption>

      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          gap: [3, 3, 4, 4],
          width: '100%',
          maxWidth: layout.large,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {[
          {
            number: '01',
            title: 'A modern API surface, not just query params',
            description:
              'Screenshot Machine\u2019s API has no support for custom headers, cookies, JS injection, CSS injection, or waiting for a selector. Microlink covers all of these out of the box, so you can capture SPAs, auth-gated pages, and dynamic content without workarounds.'
          },
          {
            number: '02',
            title: '2.3\u00d7 more requests, 40%\u00a0less money',
            description:
              'Screenshot Machine Pro: 20,000 screenshots for \u20ac59/month (~$64). Microlink: 46,000 requests for $39. More than double the volume for significantly less spend.'
          },
          {
            number: '03',
            title: 'One API key, not five',
            description:
              'Microlink handles screenshots, PDFs, metadata extraction, link previews, and remote JS in a single integration. Screenshot Machine covers screenshots and PDFs only \u2014 anything else requires a separate service.'
          },
          {
            number: '04',
            title: '33% faster on cold starts',
            description:
              'In the March 2026 benchmark, Microlink averaged 4,112\u2009ms and Screenshot Machine averaged 6,100\u2009ms across 7 real-world URLs. On heavy pages like screenshotone.com, the gap reached 2.3\u00d7.'
          },
          {
            number: '05',
            title: 'Proxy and antibot\u00a0built\u2011in, zero\u00a0config',
            description:
              'Microlink auto-rotates residential proxies and detects 30+\u00a0antibot providers (Cloudflare, DataDome, Akamai\u2026) on every request. Screenshot Machine does not offer proxy support or antibot\u00a0detection.'
          },
          {
            number: '06',
            title: 'Open-source, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed. Inspect the core engine, fork it, or self-host. Screenshot Machine is closed-source with no way to audit what runs against your\u00a0URLs.'
          }
        ].map(({ number, title, description }) => (
          <Flex
            key={number}
            css={theme({
              flexDirection: 'column',
              p: 4,
              borderRadius: 3,
              border: 1,
              borderColor: 'black05',
              bg: 'white',
              boxShadow: `0 1px 3px ${colors.black05}`,
              width: ['100%', '100%', 'calc(50% - 16px)', 'calc(50% - 16px)'],
              minWidth: '280px'
            })}
          >
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: '14px',
                color: 'black30',
                pb: 2
              })}
            >
              {number}
            </Text>
            <Text
              css={theme({
                fontWeight: 'bold',
                fontSize: [2, 2, 3, 3],
                color: 'black',
                pb: 2,
                lineHeight: 1
              })}
            >
              {title}
            </Text>
            <Text
              css={theme({ fontSize: '18px', color: 'black60', lineHeight: 2 })}
            >
              {description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Where Screenshot Machine Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotmachine-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Screenshot Machine</GradientText>
        <br /> Might Be the Right Choice
      </Subhead>

      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr'],
          gap: 3,
          maxWidth: layout.normal,
          width: '100%',
          mx: 'auto'
        })}
      >
        {[
          {
            title: 'You want the simplest possible API',
            description:
              'Screenshot Machine\u2019s API is a single GET endpoint with a handful of parameters. If you only need basic screenshots and PDFs with no advanced browser control, that simplicity is genuinely\u00a0appealing.'
          },
          {
            title: 'You need region cropping built in',
            description:
              'Screenshot Machine lets you crop a specific rectangle (x, y, width, height) from the viewport in a single API call. Microlink captures full viewports or CSS-selected elements, but does not have built-in pixel-coordinate\u00a0cropping.'
          },
          {
            title: 'You rely on cached impressions being free',
            description:
              'Screenshot Machine caches screenshots for up to 14\u00a0days and serves cached impressions at no cost. If your use case involves hot-linking the same URLs repeatedly, that caching model can save\u00a0money.'
          },
          {
            title: 'EUR billing is a requirement',
            description:
              'Screenshot Machine bills in euros (EUR) with EU VAT support for business customers. If your accounting is EUR-native, that removes a currency conversion\u00a0step.'
          },
          {
            title: 'You need GIF output directly from the API',
            description:
              'Screenshot Machine supports GIF as a direct output format alongside JPG and PNG. Microlink supports animated GIF capture but focuses on JPG, PNG, and WebP for still\u00a0screenshots.'
          }
        ].map(({ title, description }) => (
          <Flex
            key={title}
            css={theme({
              p: [3, 4, 4, 4],
              borderRadius: 3,
              border: 1,
              borderColor: 'black10',
              flexDirection: 'column',
              bg: 'white'
            })}
          >
            <Text
              css={theme({ fontWeight: 'bold', fontSize: [1, 1, 2, 2], pb: 2 })}
            >
              {title}
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
              {description}
            </Text>
          </Flex>
        ))}
      </Box>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Pricing Section
 * --------------------------------------------------------------------------- */

const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More requests. <GradientText>Less money.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Get <b>2.3&times; more</b> volume for 40%&nbsp;less.
      </Caption>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        <Box
          css={theme({
            borderRadius: 3,
            flex: 1,
            minWidth: ['100%', '400px']
          })}
          style={{
            background:
              'linear-gradient(90deg, rgb(247, 102, 152), rgb(192, 63, 162) 60%, rgb(140, 27, 171) 100%)',
            padding: '2px'
          }}
        >
          <PriceCard
            style={{
              border: 'none',
              borderRadius: '6px',
              flex: 1,
              minWidth: 0,
              background: 'white'
            }}
          >
            <Badge
              css={{
                background: colors.blue0,
                color: colors.blue8,
                alignSelf: 'flex-start',
                marginBottom: '12px'
              }}
            >
              Microlink
            </Badge>
            <PriceAmount>
              $39
              <Text
                as='span'
                css={theme({
                  fontSize: 1,
                  color: 'black50',
                  fontWeight: 'normal'
                })}
              >
                /mo
              </Text>
            </PriceAmount>
            <Text
              css={theme({
                fontSize: 2,
                color: 'black80',
                pt: 2,
                pb: 3,
                fontWeight: 'bold'
              })}
            >
              46,000&nbsp;requests/month
            </Text>
            <Box as='ul' css={theme({ pl: 3, m: 0 })}>
              {[
                'Screenshots, PDF, metadata, link previews, remote\u00a0JS',
                'Free: 50\u00a0requests/day, no credit card, no expiry',
                'No per-minute cap on paid plans',
                '240+ edge nodes, 99.9%\u00a0SLA',
                'Open-source core (MIT licensed)',
                '~$0.00085/request on this tier'
              ].map(item => (
                <Text
                  as='li'
                  key={item}
                  css={theme({
                    fontSize: 1,
                    color: 'black70',
                    pb: 2,
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              ))}
            </Box>
            <Box css={theme({ pt: 3 })}>
              <Button
                href='/#pricing'
                css={theme({ fontSize: 1, width: '100%', textAlign: 'center' })}
              >
                <Caps>Start for free</Caps>
              </Button>
            </Box>
          </PriceCard>
        </Box>

        <PriceCard>
          <Badge
            css={{
              background: colors.gray1,
              color: colors.gray7,
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}
          >
            Screenshot Machine
          </Badge>
          <PriceAmount>
            &euro;59
            <Text
              as='span'
              css={theme({
                fontSize: 1,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              /mo
            </Text>
          </PriceAmount>
          <Text
            css={theme({
              fontSize: 2,
              color: 'black80',
              pt: 2,
              pb: 3,
              fontWeight: 'bold'
            })}
          >
            20,000&nbsp;screenshots/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Screenshots and PDF only \u2014 no metadata, previews, or remote\u00a0JS',
              '\u20ac0.003 per additional screenshot',
              'Unlimited impressions from cache (14\u00a0days)',
              'No custom headers, cookies, or JS injection',
              '99.99% uptime SLA'
            ].map(item => (
              <Text
                as='li'
                key={item}
                css={theme({
                  fontSize: 1,
                  color: 'black70',
                  pb: 2,
                  lineHeight: 2
                })}
              >
                {item}
              </Text>
            ))}
          </Box>
        </PriceCard>
      </Flex>

      <Text
        css={theme({
          pt: 4,
          fontSize: 1,
          color: 'black60',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        We can keep prices this low because our{' '}
        <Link href='/enterprise'>enterprise clients</Link> cover the
        infrastructure cost. We want to help indie devs and startups{' '}
        <b>squeeze every drop of value</b> out of their budget.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * CTA Section
 * --------------------------------------------------------------------------- */

const CTASection = () => (
  <Section
    as='section'
    id='get-started'
    css={theme({
      backgroundImage: `radial-gradient(
        circle at center right,
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`,
      py: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center'
      })}
    >
      <Subhead
        css={theme({
          color: 'white',
          pb: [2, 2, 3, 3],
          fontSize: [3, 3, 4, 4]
        })}
        titleize={false}
      >
        Switch from Screenshot Machine in minutes
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pb: [3, 3, 4, 4],
          maxWidth: layout.large,
          fontSize: 2
        })}
        titleize={false}
      >
        Replace your Screenshot Machine endpoint. Keep your code.
        <br />
        Your first{' '}
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day are free</b> —
        no credit card, no commitment.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink
          href='/screenshot'
          css={theme({ fontSize: 3, px: 5, py: 3, color: 'white' })}
        >
          Start Building Free
        </ArrowLink>
      </Flex>
    </Flex>
  </Section>
)

/* ---------------------------------------------------------------------------
 * FAQ Section
 * --------------------------------------------------------------------------- */

const FAQSection = () => (
  <Faq
    css={theme({
      pt: [4, 4, 5, 5],
      pb: [5, 5, 6, 6],
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))}
  />
)

/* ---------------------------------------------------------------------------
 * Head / SEO
 * --------------------------------------------------------------------------- */

export const Head = () => (
  <Meta
    title='Screenshot Machine Alternative — 33% Faster Screenshot API | Microlink'
    description='Microlink captures screenshots 33% faster than Screenshot Machine on average, gives you 46,000 requests for $39 vs 20,000 for ~$64, and adds metadata, link previews, and built-in antibot tooling. Free to start.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Screenshot Machine Alternative — 33% Faster Screenshot API | Microlink',
        description:
          'Compare Microlink and Screenshot Machine screenshot APIs. Microlink is 33% faster on average — up to 2.3\u00d7 faster on heavy pages — with screenshots, PDF generation, metadata extraction, and more in one API.',
        url: 'https://microlink.io/alternative/screenshotmachine',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'Microlink',
          applicationCategory: ['DeveloperApplication', 'WebApplication'],
          url: 'https://microlink.io',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          }
        }
      },
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

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

const ScreenshotMachinePage = () => (
  <Layout>
    <Hero />
    <SpeedSection />
    <WhySwitchSection />
    <PricingSection />
    <CTASection />
    <ComparisonSection />
    <HonestySection />
    <FAQSection />
  </Layout>
)

export default ScreenshotMachinePage
