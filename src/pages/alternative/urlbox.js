import {
  borders,
  colors,
  layout,
  theme,
  textGradient,
  fontSizes,
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
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { extractDomain } from 'helpers/extract-domain'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { useBreakpoint } from 'components/hook/use-breakpoint'

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
const SPACE_6 = `calc(${space[2]} - ${radii[1]})`

const CTA_TITLE_FONT_SIZE = [
  `calc(${fontSizes[3]} + ${space[3]} - ${space[1]})`,
  `calc(${fontSizes[4]} - ${space[1]})`,
  fontSizes[4],
  `calc(${fontSizes[4]} + ${SPACE_6})`
]

const CTA_LINK_FONT_SIZE = [
  `calc(${fontSizes[2]} + ${space[1]})`,
  fontSizes[3],
  `calc(${fontSizes[3]} + ${radii[1]})`,
  `calc(${fontSizes[3]} + ${space[1]})`
]

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
    urlbox: {
      name: 'Urlbox',
      summary: {
        avgColdDuration: 7334.22,
        totalColdDuration: 51339.56
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 14952.83 },
        { url: 'https://example.com', coldDuration: 2331.45 },
        { url: 'https://stripe.com', coldDuration: 3678.79 },
        { url: 'https://screenshotone.com', coldDuration: 14975.56 },
        { url: 'https://news.ycombinator.com', coldDuration: 4748.08 },
        { url: 'https://github.com/trending', coldDuration: 4266.84 },
        { url: 'https://www.framer.com', coldDuration: 6386.01 }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  urlbox: colors.teal6
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
  { feature: 'Screenshot capture', microlink: true, urlbox: true },
  { feature: 'Full-page screenshots', microlink: true, urlbox: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    urlbox: true
  },
  { feature: 'PDF generation', microlink: true, urlbox: true },
  { feature: 'HTML rendering', microlink: true, urlbox: true },
  { feature: 'Dark/light mode capture', microlink: true, urlbox: true },
  { feature: 'Device emulation presets', microlink: true, urlbox: true },
  { feature: 'Custom JS/CSS injection', microlink: true, urlbox: true },
  { feature: 'Custom HTTP headers', microlink: true, urlbox: true },
  { feature: 'Custom cookies', microlink: true, urlbox: true },
  {
    feature: 'Hide elements (CSS selectors)',
    microlink: true,
    urlbox: true
  },
  { feature: 'Click/scroll interactions', microlink: true, urlbox: true },
  { feature: 'Wait for selector', microlink: true, urlbox: true },
  { feature: 'Cookie banner blocking', microlink: true, urlbox: true },
  { feature: 'Ad blocking', microlink: true, urlbox: true },
  { feature: 'Signed request URLs', microlink: true, urlbox: true },
  { feature: 'Built-in response cache', microlink: true, urlbox: true },
  { feature: 'Custom proxy support', microlink: true, urlbox: true },
  { feature: 'Render links (direct embed)', microlink: true, urlbox: true },
  { feature: 'Video output', microlink: true, urlbox: true },
  { feature: 'Animated GIF output', microlink: true, urlbox: true },
  { feature: 'Markdown extraction', microlink: true, urlbox: true },
  { feature: 'Metadata extraction (JSON)', microlink: true, urlbox: true },
  { feature: 'Retina / HiDPI screenshots', microlink: true, urlbox: true },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK (React/Vue/JS)',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  { feature: 'MCP server', microlink: true, urlbox: false, highlight: true },
  {
    feature: 'Lighthouse audits',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Technology detection',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Color palette extraction',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'Free tier (50 req/day, no expiry)',
    microlink: true,
    urlbox: false,
    highlight: true
  },
  {
    feature: 'GPU rendering',
    microlink: 'on demand',
    urlbox: true
  },
  {
    feature: 'SVG output',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'LLM integration (GPT-4V, Claude\u2026)',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'Scrolling video capture',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'Cloud storage integrations (plan-gated)',
    microlink: false,
    urlbox: true,
    note: 'Urlbox documents S3-compatible storage plus newer Azure and GCS workflows with plan/configuration nuance.'
  },
  {
    feature: 'Bulk screenshot tool (CaptureDeck)',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'Scheduled screenshot workflows',
    microlink: false,
    urlbox: true,
    note: 'Recurring capture flows are documented through Zapier and no-code automation.'
  },
  {
    feature: 'No-code integrations (Zapier, Airtable\u2026)',
    microlink: 'partial',
    urlbox: true
  },
  {
    feature: 'SOC 2 Type 2 audit started',
    microlink: false,
    urlbox: true
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
            Urlbox
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, urlbox, highlight, note }) => (
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
                <CellValue value={urlbox} />
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
    question: 'Is there a free Urlbox alternative?',
    answer: (
      <>
        <div>
          Yes. Microlink's <Link href='/#pricing'>free tier</Link> includes
          50&nbsp;requests/day with no credit card and no time limit. Same API,
          same quality, same 240+ edge network as paid plans.
        </div>
        <div>
          Urlbox does not offer a free plan. Its entry point is a 7-day free
          trial on paid plans, after which you need a subscription starting at
          $19/month.
        </div>
      </>
    ),
    text: "Yes. Microlink's free tier includes 50 requests/day with no credit card and no time limit. Same API, same quality, same 240+ edge network as paid plans. Urlbox does not offer a free plan. Its entry point is a 7-day free trial on paid plans, after which you need a subscription starting at $19/month."
  },
  {
    question: 'How does Microlink compare to Urlbox for screenshot quality?',
    answer: (
      <>
        <div>
          Both services produce high-quality screenshots using Chromium. Urlbox
          emphasizes pixel-perfect rendering with macOS-quality emoji and
          webfont support, plus optional GPU rendering for WebGL-heavy sites.
          Microlink serves maximum quality with optimal compression by default
          and is 44% faster on average.
        </div>
      </>
    ),
    text: 'Both services produce high-quality screenshots using Chromium. Urlbox emphasizes pixel-perfect rendering with macOS-quality emoji and webfont support, plus optional GPU rendering for WebGL-heavy sites. Microlink serves maximum quality with optimal compression by default and is 44% faster on average.'
  },
  {
    question: 'Can I migrate from Urlbox to Microlink easily?',
    answer: (
      <>
        <div>
          Yes. Urlbox uses render links and a REST API with parameters like{' '}
          <i>url</i>, <i>width</i>, <i>full_page</i>, <i>format</i>, and{' '}
          <i>selector</i>. Microlink accepts the same capture concepts under its
          own parameter names. Most migrations are endpoint-and-key swaps. The{' '}
          <Link href='/docs/guides/screenshot'>screenshot docs</Link> cover
          every parameter with examples.
        </div>
        <div>
          Paste your Urlbox integration into any LLM and ask it to migrate to
          Microlink. Or email{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> and
          we'll help directly.
        </div>
      </>
    ),
    text: "Yes. Urlbox uses render links and a REST API with parameters like url, width, full_page, format, and selector. Microlink accepts the same capture concepts under its own parameter names. Most migrations are endpoint-and-key swaps. The screenshot docs cover every parameter with examples. Paste your Urlbox integration into any LLM and ask it to migrate to Microlink. Or email hello@microlink.io and we'll help directly."
  },
  {
    question: 'When is Microlink the better value than Urlbox?',
    answer: (
      <>
        <div>
          Urlbox is feature-rich and a strong fit when you need screenshot-first
          extras like SVG output, scrolling video, LLM analysis, or CaptureDeck.
        </div>
        <div>
          Microlink becomes the better value when you want lower cost per render
          plus screenshots, PDF generation, metadata/Open Graph extraction, link
          previews (via SDK), remote JavaScript execution, and Lighthouse audits
          from one API key and one integration.
        </div>
      </>
    ),
    text: 'Urlbox is feature-rich and a strong fit when you need screenshot-first extras like SVG output, scrolling video, LLM analysis, or CaptureDeck. Microlink becomes the better value when you want lower cost per render plus screenshots, PDF generation, metadata/Open Graph extraction, link previews (via SDK), remote JavaScript execution, and Lighthouse audits from one API key and one integration.'
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
          Urlbox is closed-source. There is no way to inspect or audit the
          engine processing your requests.
        </div>
      </>
    ),
    text: 'The core engine components are MIT-licensed on GitHub: Metascraper (metadata extraction), MQL (Microlink Query Language), and Browserless (headless browser). Enterprise teams can audit, fork, and contribute. Urlbox is closed-source. There is no way to inspect or audit the engine processing your requests.'
  },
  {
    question: 'How much does Urlbox cost compared to Microlink?',
    answer: (
      <>
        <div>
          Urlbox Hi-Fi is $49/month for 5,000 renders ($9.80 per 1,000). Urlbox
          Ultra is $99/month for 15,000 renders ($6.60 per 1,000). Microlink is
          $45/month for 46,000 requests ($0.98 per 1,000) with no per-minute
          rate limit.
        </div>
        <div>
          At the $49 price point, Microlink delivers 9.2&times; more volume.
          Enterprise clients running millions of requests fund the
          infrastructure, which is how indie devs get the same global edge
          network at these prices.
        </div>
      </>
    ),
    text: 'Urlbox Hi-Fi is $49/month for 5,000 renders ($9.80 per 1,000). Urlbox Ultra is $99/month for 15,000 renders ($6.60 per 1,000). Microlink is $45/month for 46,000 requests ($0.98 per 1,000) with no per-minute rate limit. At the $49 price point, Microlink delivers 9.2\u00d7 more volume.'
  },
  {
    question: 'Does Microlink have rate limits?',
    answer: (
      <>
        <div>
          Paid plans have no requests-per-minute cap — burst as high as your
          concurrency allows. The only limit is your monthly request quota.
        </div>
        <div>
          Urlbox does not publish explicit per-minute rate limits, but its
          pricing tiers are based on successful renders, and higher throughput
          requires higher-tier plans.
        </div>
      </>
    ),
    text: 'Paid plans have no requests-per-minute cap — burst as high as your concurrency allows. The only limit is your monthly request quota. Urlbox does not publish explicit per-minute rate limits, but its pricing tiers are based on successful renders, and higher throughput requires higher-tier plans.'
  },
  {
    question: 'How does Microlink handle sites with cookie banners or ads?',
    answer: (
      <>
        <div>
          Both Microlink and Urlbox support ad blocking and cookie banner
          removal. Microlink uses the{' '}
          <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter and
          custom CSS/JS injection to dismiss consent dialogs before the
          screenshot is taken.
        </div>
        <div>
          Use{' '}
          <Link href='/docs/api/parameters/screenshot/hide'>
            screenshot.hide
          </Link>{' '}
          to remove specific elements by CSS selector — sticky banners, chat
          widgets, or any overlay that clutters the capture.
        </div>
      </>
    ),
    text: 'Both Microlink and Urlbox support ad blocking and cookie banner removal. Microlink uses the adblock parameter and custom CSS/JS injection to dismiss consent dialogs before the screenshot is taken. You can also use screenshot.hide to remove specific elements by CSS selector.'
  },
  {
    question: 'What uptime and SLA does Microlink guarantee?',
    answer: (
      <>
        <div>
          Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are
          served from 240+ Cloudflare edge nodes worldwide, so latency and
          availability stay consistent regardless of where the caller is
          located.
        </div>
      </>
    ),
    text: 'Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are served from 240+ Cloudflare edge nodes worldwide, so latency and availability stay consistent regardless of where the caller is located.'
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
        The <GradientText>Urlbox</GradientText> alternative
        <br />
        for better cost per render
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
        <b>Urlbox</b> is a respected screenshot service with 10+&nbsp;years of
        experience. If you care about cost per render and broader browser
        workflows under one key, <b>Microlink</b> gives you 46,000&nbsp;requests
        for $45 versus 5,000 on Urlbox Hi-Fi for $49, while still benchmarking{' '}
        <b>44% faster on average</b>.
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
        <RaceHero aria-label='Live benchmark race: Microlink vs Urlbox screenshot speed'>
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
        css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4], pt: 4 })}
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
          <GradientText>Up to 2.4&times; faster</GradientText> response times
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
          at different hours.
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

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: '9.2× more requests, $4\u00a0less',
    description: (
      <>
        Urlbox Hi-Fi: 5,000 renders for <b>$49/month</b>. Microlink:{' '}
        <b>46,000 requests for $45</b>. That{'\u2019'}s the volume Urlbox
        charges $498&nbsp;for on its Business plan.
      </>
    )
  },
  {
    number: '02',
    title: 'API latency compounds at scale',
    description: (
      <>
        At 100k screenshots/month, saving ~3.2{'\u2009'}s per request recovers
        over <b>88&nbsp;hours of pipeline time</b>. Microlink is{' '}
        <b>44% faster on average</b> — and up to <b>2.4× faster</b> on heavy
        DOMs like vercel.com.
      </>
    )
  },
  {
    number: '03',
    title: 'One API key, not five',
    description: (
      <>
        Microlink handles screenshots, PDFs, metadata extraction, link previews,
        and remote JS in <b>a single integration</b>. One bill, one set of docs,{' '}
        <b>no glue code</b> between services.
      </>
    )
  },
  {
    number: '04',
    title: 'A free tier that never expires',
    description: (
      <>
        Microlink gives you <b>50 requests/day</b> with no credit card and no
        time limit. Urlbox only offers a <b>7-day trial</b> — after that, you
        {'\u2019'}re on a paid plan or locked out.
      </>
    )
  },
  {
    number: '05',
    title: 'Proxy and antibot\u00a0built\u2011in, zero\u00a0config',
    description: (
      <>
        Microlink <b>auto-rotates residential proxies</b> and detects{' '}
        <b>30+&nbsp;antibot providers</b> (Cloudflare, DataDome, Akamai
        {'\u2026'}) on every request. Urlbox supports custom proxies but does
        not include built-in rotating&nbsp;proxies.
      </>
    )
  },
  {
    number: '06',
    title: 'Open-source, fully auditable',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT-licensed</b>. Inspect the
        core engine, fork it, or self-host.{' '}
        <b>No black boxes, no vendor lock-in</b> — just code you can&nbsp;read.
      </>
    )
  }
]

const WhySwitchTimeline = styled(Flex)`
  position: relative;
  ${theme({
    flexDirection: 'column',
    alignItems: 'flex-start'
  })}
`

const WhySwitchItem = styled(Flex)`
  ${theme({
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0
  })}
`

const WhySwitchRail = styled('div')`
  ${theme({ flexShrink: 0, position: 'relative', mr: [3, 3, 4, 4] })}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;

  @media (min-width: ${breakpoints[1]}) {
    width: 40px;
  }
`

const WhySwitchConnector = styled('div')`
  width: 1px;
  flex: 1;
  ${theme({ bg: 'black10', mt: 2, mb: 2 })}
`

const WhySwitchNumber = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: [3, 3, 4, 4],
    fontWeight: 'bold',
    lineHeight: 0,
    flexShrink: 0
  })}
  ${css`
    ${textGradient}
  `}
  opacity: 0.90;
`

const WhySwitchSection = () => (
  <Section as='section' id='why-switch' css={theme({ bg: 'pinky' })}>
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
        The top reasons teams move from Urlbox to Microlink.
      </Caption>

      <WhySwitchTimeline
        css={theme({
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        {WHY_SWITCH_ITEMS.map(({ number, title, description }, index) => {
          const isLast = index === WHY_SWITCH_ITEMS.length - 1
          return (
            <WhySwitchItem key={number}>
              <WhySwitchRail>
                <WhySwitchNumber aria-hidden='true'>{number}</WhySwitchNumber>
                {!isLast && <WhySwitchConnector />}
              </WhySwitchRail>
              <Box
                css={theme({
                  flex: 1,
                  minWidth: 0,
                  pb: isLast ? 0 : [3, 3, 4, 4]
                })}
              >
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
                  css={theme({
                    fontSize: [1, 1, 2, 2],
                    color: 'black90',
                    lineHeight: 2,
                    maxWidth: '40em'
                  })}
                >
                  {description}
                </Text>
              </Box>
            </WhySwitchItem>
          )
        })}
      </WhySwitchTimeline>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Where Urlbox Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'GPU rendering',
    description:
      'Urlbox offers built-in GPU rendering for sites that rely on WebGL, Canvas, or heavy 3D scenes. Microlink supports GPU rendering on demand but does not include it by\u00a0default.'
  },
  {
    title: 'LLM-powered screenshot analysis',
    description:
      'Urlbox integrates with OpenAI, Anthropic, Google AI, and more — analyze a screenshot with an LLM prompt in a single API call. Microlink does not have built-in LLM\u00a0integration.'
  },
  {
    title: 'Screenshots sent to your own bucket',
    description:
      'Urlbox documents cloud-storage workflows for S3-compatible storage, with newer Azure Blob and Google Cloud options carrying plan and configuration nuance. Microlink returns the image in the API response and does not include native storage upload.'
  },
  {
    title: 'Bulk screenshots from a dashboard',
    description:
      "Urlbox's CaptureDeck tool lets you upload CSVs or paste URL lists and download zip archives without writing code. For recurring captures, Urlbox documents Zapier-driven automation flows. Microlink is API-first and does not have a bulk dashboard."
  },
  {
    title: 'SOC 2 compliance',
    description:
      'Urlbox has started its SOC 2 Type 2 audit and published a Trust Center. If SOC 2 is a hard requirement in your buying process, Urlbox is further along on that\u00a0path.'
  },
  {
    title: 'SVG or scrolling video output',
    description:
      'Urlbox can output SVG images and record scrolling videos (WebM/MP4/GIF) of page content. Microlink supports video and GIF but does not produce SVG or scrolling video\u00a0captures.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='urlbox-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Urlbox</GradientText>
        <br /> Might Be the Right Choice
      </Subhead>

      <Box
        css={theme({
          maxWidth: layout.normal,
          width: '100%',
          mx: 'auto'
        })}
      >
        {HONESTY_ITEMS.map(({ title, description }, index) => {
          const isLast = index === HONESTY_ITEMS.length - 1
          return (
            <Flex
              key={title}
              css={theme({
                flexDirection: 'row',
                alignItems: 'baseline',
                py: [3, 3, 3, 3],
                borderBottom: isLast ? 0 : 1,
                borderBottomColor: 'black05'
              })}
            >
              <Text
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: 'black20',
                  flexShrink: 0,
                  mr: [3, 3, 4, 4],
                  minWidth: '24px'
                })}
                aria-hidden='true'
              >
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Box css={theme({ flex: 1, minWidth: 0 })}>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2],
                    color: 'black',
                    pb: 1
                  })}
                >
                  {title}
                </Text>
                <Text
                  css={theme({
                    fontSize: [0, 0, 1, 1],
                    color: 'black50',
                    lineHeight: 2,
                    maxWidth: '40em'
                  })}
                >
                  {description}
                </Text>
              </Box>
            </Flex>
          )
        })}
      </Box>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Pricing Section
 * --------------------------------------------------------------------------- */

/* Pricing sources:
 * Urlbox pricing: https://www.urlbox.io/pricing
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
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
        Get <b>9.2&times; more</b> volume for $4&nbsp;less per month.
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
              $45
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
                'Screenshots + PDF + metadata + previews + remote\u00a0JS',
                'Free tier: 50\u00a0requests/day, no credit card',
                'No requests-per-minute cap',
                '240+ edge nodes, 99.9%\u00a0SLA',
                'Open-source core (MIT)',
                '$0.98 per 1,000 requests'
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
              <Link
                href='/screenshot'
                css={theme({ fontSize: 1, width: '100%', textAlign: 'center' })}
              >
                <Caps>Start for free</Caps>
              </Link>
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
            Urlbox
          </Badge>
          <PriceAmount>
            $49
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
            5,000&nbsp;renders/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Screenshots, PDF, metadata, markdown, and video',
              'No free plan (7-day trial only)',
              '$9.80 per 1,000 renders',
              'Cloud storage workflows with plan/config nuance',
              'GPU rendering available'
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
          mb: 4,
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
        Cut Urlbox cost per render
        <br /> without trimming features
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pb: [3, 3, 4, 4],
          maxWidth: layout.large,
          fontSize: 3
        })}
        titleize={false}
      >
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
 * Try It Section (code editor + call-to-action)
 * --------------------------------------------------------------------------- */

const TryItSection = () => {
  const breakpoint = useBreakpoint()
  return (
    <Section as='section' css={theme({ py: [5, 5, 6, 6] })}>
      <SectionInner>
        <Subhead
          css={theme({
            fontSize: CTA_TITLE_FONT_SIZE,
            textAlign: 'center'
          })}
        >
          Ship <span css='color: #fa5252;'>faster</span> screenshots
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: 'center'
          })}
        >
          50&nbsp;requests/day free — no account, no credit card. Start
          capturing screenshots at the speed your users&nbsp;deserve.
        </Caption>
        <Flex
          css={[
            theme({
              pt: [4, 4, 5, 5],
              width: '100%',
              px: [2, 3, 0, 0]
            }),
            {
              '& > div, & > div > div:first-child': {
                width: '100%'
              }
            }
          ]}
        >
          <MultiCodeEditorInteractive
            height={breakpoint === 0 ? 250 : 180}
            mqlCode={{
              url: 'https://www.apple.com',
              screenshot: true
            }}
          />
        </Flex>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            gap: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            alignItems: 'center'
          })}
        >
          <Link
            href='/docs/guides/screenshot'
            css={theme({ fontSize: CTA_LINK_FONT_SIZE })}
          >
            Start now for free
          </Link>
        </Flex>
      </SectionInner>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
 * FAQ Section
 * --------------------------------------------------------------------------- */

const FAQSection = () => (
  <Faq
    css={theme({ py: 0 })}
    questions={FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))}
  />
)

/* ---------------------------------------------------------------------------
 * Head / SEO
 * --------------------------------------------------------------------------- */

export const Head = () => (
  <Meta
    title='Urlbox Alternative for Better Cost Per Render'
    description='Compare Microlink vs Urlbox on cost per render and broader browser workflows: 46,000 requests for $45 vs Urlbox Hi-Fi at 5,000 for $49, plus metadata, previews, and 44% faster average cold starts.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Urlbox Alternative for Better Cost Per Render | Microlink',
        description:
          'Compare Microlink and Urlbox when cost per render and broader browser workflows matter. Microlink is 44% faster on average, includes 46,000 requests at $45, and adds screenshots, PDF generation, metadata extraction, and more in one API.',
        url: 'https://microlink.io/alternative/urlbox',
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

const UrlboxPage = () => (
  <Layout>
    <Hero />
    <SpeedSection />
    <WhySwitchSection />
    <PricingSection />
    <CTASection />
    <ComparisonSection />
    <HonestySection />
    <TryItSection />
    <FAQSection />
  </Layout>
)

export default UrlboxPage
