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
  timestamp: '2026-04-16T15:09:25.379Z',
  testUrls: [
    {
      url: 'https://vercel.com',
      width: 1920,
      height: 1080,
      fullPage: true,
      format: 'jpeg',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://example.com',
      width: 1280,
      height: 800,
      fullPage: false,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://stripe.com',
      width: 393,
      height: 852,
      fullPage: false,
      format: 'jpeg',
      deviceScaleFactor: 2,
      adblock: true
    },
    {
      url: 'https://screenshotone.com',
      width: 1920,
      height: 1080,
      fullPage: true,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://news.ycombinator.com',
      width: 1440,
      height: 1080,
      fullPage: true,
      format: 'jpeg',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://github.com/trending',
      width: 768,
      height: 1024,
      fullPage: false,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 4077.0,
        totalColdDuration: 24461.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6362.6325
        },
        {
          url: 'https://example.com',
          coldDuration: 1189.0359579999995
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3159.544583000001
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 5549.680625000001
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3744.222084000001
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4456.877667000001
        }
      ]
    },
    screenshotlayer: {
      name: 'Screenshotlayer',
      summary: {
        avgColdDuration: 8083.59,
        totalColdDuration: 48501.53
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 9820.394290999999
        },
        {
          url: 'https://example.com',
          coldDuration: 6413.815875
        },
        {
          url: 'https://stripe.com',
          coldDuration: 7420.940957999992
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 9278.437207999988
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 6903.8293330000015
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 8664.116000000038
        }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotlayer: colors.indigo6
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

const SCREENSHOTLAYER_PRO_PRICE = 59.99
const SCREENSHOTLAYER_PRO_REQUESTS = 30000
const SCREENSHOTLAYER_FREE_REQUESTS = 100
const SCREENSHOTLAYER_OVERAGE_PER_10K = 79.99
const MICROLINK_PRICE = 45
const MICROLINK_REQUESTS = 46000
const MICROLINK_FREE_MONTHLY_EQUIVALENT = 1500
const VOLUME_ADVANTAGE_PCT = Math.floor(
  ((MICROLINK_REQUESTS - SCREENSHOTLAYER_PRO_REQUESTS) /
    SCREENSHOTLAYER_PRO_REQUESTS) *
    100
)
const PRICE_REDUCTION_PCT = Math.floor(
  ((SCREENSHOTLAYER_PRO_PRICE - MICROLINK_PRICE) / SCREENSHOTLAYER_PRO_PRICE) *
    100
)
const AVERAGE_LATENCY_LOWER_PCT = Math.floor(
  ((BENCHMARK_DATA.results.screenshotlayer.summary.avgColdDuration -
    BENCHMARK_DATA.results.microlink.summary.avgColdDuration) /
    BENCHMARK_DATA.results.screenshotlayer.summary.avgColdDuration) *
    100
)

const FAQ_ITEMS = [
  {
    question:
      'Is there a free Screenshotlayer alternative with more room to test?',
    answer: (
      <>
        <div>
          Yes. Microlink gives you <b>50&nbsp;requests/day</b> with no credit
          card and no expiry, which works out to roughly{' '}
          <b>
            {MICROLINK_FREE_MONTHLY_EQUIVALENT.toLocaleString()} requests/month
          </b>{' '}
          if you use it regularly.
        </div>
        <div>
          Screenshotlayer's free plan is <b>100 screenshots per month</b>. That
          is useful for light evaluation, but Microlink gives you much more room
          to test with real traffic patterns instead of one small monthly pool.
        </div>
      </>
    ),
    text: `Yes. Microlink gives you 50 requests per day with no credit card and no expiry, which works out to roughly ${MICROLINK_FREE_MONTHLY_EQUIVALENT.toLocaleString()} requests per month if you use it regularly. Screenshotlayer's free plan is 100 screenshots per month, so Microlink gives you much more room to test with real traffic patterns.`
  },
  {
    question: 'Why does this benchmark exclude framer.com?',
    answer: (
      <>
        <div>
          Because Screenshotlayer returned <b>400 Bad Request</b> on the
          framer.com request in the benchmark data supplied for this page.
        </div>
        <div>
          To keep the comparison honest, this page only compares the{' '}
          <b>6 URLs both providers completed successfully</b>. That still leaves
          Microlink ahead on every shared URL in the dataset.
        </div>
      </>
    ),
    text: 'This page excludes framer.com because Screenshotlayer returned 400 Bad Request on that request in the benchmark data supplied for this page. To keep the comparison honest, the benchmark section only compares the 6 URLs both providers completed successfully.'
  },
  {
    question:
      'How do Microlink and Screenshotlayer differ on rate limits and concurrency?',
    answer: (
      <>
        <div>
          Screenshotlayer publishes explicit per-minute caps:{' '}
          <b>2 requests/minute on Free</b>, <b>30/minute on Basic</b>, and{' '}
          <b>45/minute on Professional and Enterprise</b>. The docs also
          recommend limiting paid plans to about{' '}
          <b>1 request every 2 seconds</b> for best performance.
        </div>
        <div>
          Microlink's paid plans do <b>not</b> have a per-minute cap. If your
          screenshot traffic comes in bursts, that difference matters more than
          a marketing headline about “workers”.
        </div>
      </>
    ),
    text: 'Screenshotlayer publishes explicit per-minute caps: 2 requests per minute on Free, 30 per minute on Basic, and 45 per minute on Professional and Enterprise. The docs also recommend limiting paid plans to about 1 request every 2 seconds for best performance. Microlink paid plans do not have a per-minute cap.'
  },
  {
    question: 'How does pricing compare once I outgrow the free plan?',
    answer: (
      <>
        <div>
          Screenshotlayer's highlighted Professional plan is{' '}
          <b>$59.99/month for 30,000 snapshots</b>. Microlink is{' '}
          <b>$45/month for 46,000 requests</b>.
        </div>
        <div>
          That means Microlink gives you <b>{VOLUME_ADVANTAGE_PCT}% more</b>{' '}
          monthly volume for <b>{PRICE_REDUCTION_PCT}% less</b>.
          Screenshotlayer's published overages are also steep: roughly{' '}
          <b>${SCREENSHOTLAYER_OVERAGE_PER_10K.toFixed(2)} per extra 10,000</b>{' '}
          on Professional.
        </div>
      </>
    ),
    text: `Screenshotlayer's highlighted Professional plan is $59.99 per month for 30,000 snapshots. Microlink is $45 per month for 46,000 requests. That means Microlink gives you ${VOLUME_ADVANTAGE_PCT}% more monthly volume for ${PRICE_REDUCTION_PCT}% less, and Screenshotlayer's published overages are roughly $${SCREENSHOTLAYER_OVERAGE_PER_10K.toFixed(
      2
    )} per extra 10,000 on Professional.`
  },
  {
    question:
      'Can I migrate from Screenshotlayer signed URLs to Microlink easily?',
    answer: (
      <>
        <div>
          Usually, yes. Screenshotlayer already uses a simple URL-based request
          model with parameters like <i>url</i>, <i>viewport</i>,{' '}
          <i>fullpage</i>, <i>format</i>, and <i>css_url</i>. Microlink supports
          the same core screenshot intent, even if some parameter names differ.
        </div>
        <div>
          In practice, most migrations are endpoint-and-parameter mapping work,
          not a full rewrite. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot guide</Link> and adapt
          your existing request builder around Microlink's query shape.
        </div>
      </>
    ),
    text: 'Usually, yes. Screenshotlayer already uses a simple URL-based request model with parameters like url, viewport, fullpage, format, and css_url. Microlink supports the same core screenshot intent, so most migrations are endpoint-and-parameter mapping work rather than a full rewrite.'
  },
  {
    question: 'What if I rely on Screenshotlayer S3 export?',
    answer: (
      <>
        <div>
          That is one of Screenshotlayer's clearest official strengths.
          Screenshotlayer documents direct export to <b>AWS S3 or FTP</b> on its
          Professional and Enterprise plans.
        </div>
        <div>
          Microlink does not offer native storage export, so if your current
          workflow is “capture and push straight to S3 or FTP”, you would need
          to add that storage step yourself after the API response.
        </div>
      </>
    ),
    text: 'That is one of Screenshotlayer’s clearest official strengths. Screenshotlayer documents direct export to AWS S3 or FTP on its Professional and Enterprise plans. Microlink does not offer native storage export, so you would need to add that storage step yourself after the API response.'
  },
  {
    question:
      'Does Microlink still cover Screenshotlayer basics like full-page and CSS injection?',
    answer: (
      <>
        <div>
          Yes. Both products cover the core screenshot controls most teams
          expect: full-page capture, custom CSS, signed URLs, caching, and
          simple direct image delivery.
        </div>
        <div>
          The bigger difference is what happens when the workload gets harder.
          Microlink adds PDFs, metadata, previews, browser automation, and
          blocked-page tooling on top of those screenshot basics.
        </div>
      </>
    ),
    text: 'Yes. Both products cover the core screenshot controls most teams expect: full-page capture, custom CSS, signed URLs, caching, and direct image delivery. Microlink adds PDFs, metadata, previews, browser automation, and blocked-page tooling on top of those basics.'
  },
  {
    question:
      'Is Screenshotlayer still fine if I only need simple screenshot URLs?',
    answer: (
      <>
        <div>
          Yes. If your use case is strictly screenshot-first and you like a very
          simple signed URL model, Screenshotlayer is still a reasonable option.
          Its lower-priced entry plan, dedicated worker model, and built-in S3
          or FTP export can make sense for some teams.
        </div>
        <div>
          Microlink becomes more compelling when screenshot capture is no longer
          isolated and starts touching metadata, PDFs, previews, anti-bot
          handling, or bursty traffic that runs into plan caps.
        </div>
      </>
    ),
    text: 'Yes. If your use case is strictly screenshot-first and you like a simple signed URL model, Screenshotlayer is still a reasonable option. Microlink becomes more compelling when screenshot capture starts touching metadata, PDFs, previews, anti-bot handling, or bursty traffic that runs into plan caps.'
  }
]

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
 * Comparison Table
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
  {
    feature: 'Screenshot capture',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Full-page screenshots',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Custom CSS injection',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Device emulation presets',
    microlink: true,
    screenshotlayer: 'partial',
    note: 'Screenshotlayer documents custom viewport sizes and common device dimensions rather than named device presets.'
  },
  {
    feature: 'Built-in response cache',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Signed request URLs',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Direct embed (no backend needed)',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'No per-minute cap on paid plans',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotlayer: false,
    highlight: true,
    note: 'Screenshotlayer documents PNG, JPG, GIF, and WebP output, not PDF generation.'
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'Arbitrary custom HTTP headers',
    microlink: true,
    screenshotlayer: 'partial',
    note: 'Screenshotlayer documents User-Agent and Accept-Language overrides, not arbitrary request headers.'
  },
  {
    feature: 'Custom cookies',
    microlink: true,
    screenshotlayer: 'not documented'
  },
  {
    feature: 'Click/scroll interactions',
    microlink: true,
    screenshotlayer: 'not documented'
  },
  {
    feature: 'Wait for selector',
    microlink: true,
    screenshotlayer: 'not documented'
  },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotlayer: false,
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'MCP server',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'S3 / FTP direct export',
    microlink: false,
    screenshotlayer: 'Professional+',
    note: 'Screenshotlayer documents direct export to AWS S3 or FTP on Professional and Enterprise.'
  }
]

const CellValue = ({ value }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  if (value === 'partial' || value === 'on demand') {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    return <Partial>{capitalized}</Partial>
  }

  return (
    <span css={theme({ display: 'block', textAlign: 'center' })}>{value}</span>
  )
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
            Screenshotlayer
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotlayer, highlight, note }) => (
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
                <CellValue value={screenshotlayer} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </FeatureTable>
  </Box>
)

/* ---------------------------------------------------------------------------
 * Speed Benchmark Table
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
        The <GradientText>Screenshotlayer</GradientText> alternative
        <br />
        for burstier screenshot pipelines
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
        <b>Screenshotlayer</b> is easy to start with, but its public plans still
        revolve around tight request caps, dedicated-worker math, and pricey
        overages. If your screenshot traffic comes in bursts, <b>Microlink</b>{' '}
        gives you <b>{VOLUME_ADVANTAGE_PCT}% more monthly volume</b> for{' '}
        <b>{PRICE_REDUCTION_PCT}% less</b>, no per-minute cap on paid plans, and{' '}
        <b>{AVERAGE_LATENCY_LOWER_PCT}% lower average cold-start latency</b> on
        the 6 shared benchmark URLs.
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
        <RaceHero aria-label='Live benchmark race: Microlink vs Screenshotlayer screenshot speed'>
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
        Last verified: April&nbsp;2026. Cells marked "not documented" mean we
        did not find that capability on Screenshotlayer's official pages.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Speed Section
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
          <GradientText>Almost 2&times; lower</GradientText> average cold-start
          latency
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
          Same request shape. Same URLs. Same output format.
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
          This comparison uses the 6 URLs both providers completed successfully
          from the supplied April&nbsp;2026 benchmark run.
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
                              {isMin ? (
                                <CellHighlight>
                                  {formatMs(times[i])}
                                </CellHighlight>
                              ) : isMax ? (
                                <CellLoser>{formatMs(times[i])}</CellLoser>
                              ) : (
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
                      microAvg > 0 ? Math.floor((delta / microAvg) * 100) : 0
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
                See the broader{' '}
                <Link href='/benchmarks/screenshot-api'>
                  Screenshot API Benchmark
                </Link>{' '}
                page for methodology and the wider competitive context.
              </Text>
              <Text
                css={theme({
                  pt: 4,
                  fontSize: 0,
                  color: 'black40',
                  fontFamily: 'mono',
                  lineHeight: 2
                })}
              >
                The{' '}
                <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
                  benchmark repo
                </Link>{' '}
                is open — run it yourself and see.
              </Text>
            </Box>
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
    title: '45 req/min caps arrive sooner than you think',
    description: (
      <>
        Screenshotlayer publishes <b>30&nbsp;req/min on Basic</b> and{' '}
        <b>45&nbsp;req/min on Professional</b>, then recommends keeping paid
        usage around <b>1 request every 2 seconds</b> for best performance.
        Microlink's paid plans have <b>no per-minute cap</b>, which matters more
        once traffic gets spiky.
      </>
    )
  },
  {
    number: '02',
    title: '53% more monthly volume for 25% less',
    description: (
      <>
        Screenshotlayer's highlighted Professional plan is{' '}
        <b>$59.99 for 30,000 snapshots</b>. Microlink is{' '}
        <b>$45 for 46,000 requests</b>. That is{' '}
        <b>{VOLUME_ADVANTAGE_PCT}% more included volume</b> while paying{' '}
        <b>{PRICE_REDUCTION_PCT}% less</b>.
      </>
    )
  },
  {
    number: '03',
    title: 'Overages turn spikes into invoices fast',
    description: (
      <>
        Screenshotlayer's published Professional overage is about{' '}
        <b>${SCREENSHOTLAYER_OVERAGE_PER_10K.toFixed(2)} per extra 10,000</b>. A
        traffic spike can cost more than your base plan faster than most teams
        expect. Microlink avoids that per-minute squeeze and gives you a larger
        monthly buffer upfront.
      </>
    )
  },
  {
    number: '04',
    title: 'A daily-reset free tier beats a tiny monthly pool',
    description: (
      <>
        Screenshotlayer's free plan is{' '}
        <b>{SCREENSHOTLAYER_FREE_REQUESTS} shots a month</b>. Microlink gives
        you <b>50 requests a day</b>, so you can test incrementally, in
        production-like bursts, instead of burning your entire evaluation budget
        in one session.
      </>
    )
  },
  {
    number: '05',
    title: 'One API key, not screenshot plus side tools',
    description: (
      <>
        Screenshotlayer stays focused on screenshot delivery. Microlink also
        gives you{' '}
        <b>PDF generation, metadata extraction, link previews, and remote JS</b>{' '}
        from the same integration, so your screenshot pipeline does not spill
        into extra vendors later.
      </>
    )
  },
  {
    number: '06',
    title: 'Harder pages need less manual setup',
    description: (
      <>
        Screenshotlayer documents a clean screenshot API, but not built-in proxy
        rotation or antibot tooling. Microlink includes{' '}
        <b>residential proxying</b> and{' '}
        <b>antibot detection for 30+ providers</b>, which removes work when
        targets stop being friendly public pages.
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
        What usually changes when a team outgrows Screenshotlayer.
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
 * Where Screenshotlayer Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: '100 free screenshots without a time limit',
    description:
      'The free plan is small, but it does not expire. If you only need occasional manual testing, 100 screenshots per month can still be enough to validate the basics.'
  },
  {
    title: 'S3 and FTP export built in',
    description:
      'Screenshotlayer documents direct export to AWS S3 or FTP on Professional and Enterprise. If your workflow is already built around pushing finished screenshots straight into storage, that is meaningful.'
  },
  {
    title: 'Dedicated-worker model',
    description:
      'Screenshotlayer publishes dedicated worker counts on paid plans. Some teams like that explicit concurrency framing because it makes the screenshot-only service model easy to reason about.'
  },
  {
    title: 'Simple signed image URL flow',
    description:
      'The product stays very screenshot-first: one URL, one image, one secret key if you need to secure it. If you do not want a broader browser platform, that simplicity is attractive.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotlayer-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Screenshotlayer</GradientText>
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
 * Screenshotlayer pricing: https://screenshotlayer.com/pricing
 * Screenshotlayer FAQ: https://screenshotlayer.com/faq
 * Screenshotlayer docs: https://screenshotlayer.com/documentation
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More headroom. <GradientText>Less cap math.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Compare Microlink's <b>46,000 requests for $45</b> with
        Screenshotlayer's highlighted Professional plan at{' '}
        <b>30,000 snapshots for $59.99</b>.
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
                'Screenshots + PDF + metadata + previews + remote JS',
                'Free tier: 50 requests/day, no credit card',
                'No per-minute cap on paid plans',
                '240+ edge nodes, 99.9% SLA',
                'Built-in proxy + antibot tooling',
                'Open-source core (MIT)'
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
            Screenshotlayer
          </Badge>
          <PriceAmount>
            $59.99
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
            30,000&nbsp;snapshots/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              '45 requests/minute on Professional',
              '~$79.99 per extra 10,000 screenshots',
              '20 dedicated workers',
              'WebP output with quality up to 100%',
              'Direct export to FTP or S3'
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
        This compares Screenshotlayer's highlighted Professional plan because it
        is the closest public tier to Microlink's $45 plan by buyer intent and
        monthly volume. That is also where Screenshotlayer's rate limits and
        overages become much harder to ignore.
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
        Stop budgeting around screenshot caps
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pt: 3,
          pb: [3, 3, 4, 4],
          maxWidth: layout.large,
          fontSize: 3
        })}
        titleize={false}
      >
        Start with{' '}
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day free</b> and
        keep same API surface when traffic gets less predictable.
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
 * Try It Section
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
          Ship <span css='color: #fa5252;'>harder</span> screenshots
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
          50&nbsp;requests/day free. Start with screenshots, then add metadata,
          PDF output, previews, or browser logic only when your workflow needs
          them.
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
    title='Screenshotlayer Alternative for Higher Throughput and Lower Overage Risk'
    description='Compare Microlink vs Screenshotlayer when plan caps, overages, and cold starts start to matter. Microlink gives you 46,000 requests for $45 versus Screenshotlayer 30,000 for $59.99, no per-minute cap, and lower average latency on the 6 shared benchmark URLs.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Screenshotlayer Alternative for Higher Throughput and Lower Overage Risk | Microlink',
        description:
          'Compare Microlink and Screenshotlayer when bursty screenshot workloads start running into plan caps, overages, and slower cold starts. Microlink gives you 46,000 requests for $45 versus Screenshotlayer 30,000 for $59.99, no per-minute cap on paid plans, and lower average cold-start latency on the 6 shared benchmark URLs.',
        url: 'https://microlink.io/alternative/screenshotlayer',
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

const ScreenshotlayerPage = () => (
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

export default ScreenshotlayerPage
