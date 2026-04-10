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
    apiflash: {
      name: 'ApiFlash',
      summary: {
        avgColdDuration: 9463.2,
        totalColdDuration: 66242.4
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 14232.91 },
        { url: 'https://example.com', coldDuration: 1819.86 },
        { url: 'https://stripe.com', coldDuration: 5900.18 },
        { url: 'https://screenshotone.com', coldDuration: 9802.49 },
        { url: 'https://news.ycombinator.com', coldDuration: 1967.53 },
        { url: 'https://github.com/trending', coldDuration: 5365.86 },
        { url: 'https://www.framer.com', coldDuration: 27153.57 }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  apiflash: colors.orange6
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
  { feature: 'Screenshot capture', microlink: true, apiflash: true },
  { feature: 'Full-page screenshots', microlink: true, apiflash: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    apiflash: true
  },
  {
    feature: 'Mobile screenshots / viewport control',
    microlink: true,
    apiflash: true
  },
  { feature: 'PNG / JPEG / WebP output', microlink: true, apiflash: true },
  { feature: 'Custom JS injection', microlink: true, apiflash: true },
  { feature: 'Custom HTTP headers', microlink: true, apiflash: true },
  { feature: 'Custom cookies', microlink: true, apiflash: true },
  { feature: 'Wait for selector', microlink: true, apiflash: true },
  { feature: 'Cookie banner blocking', microlink: true, apiflash: true },
  { feature: 'Ad blocking', microlink: true, apiflash: true },
  { feature: 'Built-in response cache', microlink: true, apiflash: true },
  { feature: 'Custom proxy support', microlink: true, apiflash: true },
  {
    feature: 'PDF generation',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'HTML rendering',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'Animated GIF output',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Video output (page content)',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Dark/light mode capture',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Device emulation presets',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Signed request URLs',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'MQL (structured data extraction)',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    apiflash: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    apiflash: false
  },
  { feature: 'Open-source core', microlink: true, apiflash: false },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    apiflash: false
  },
  { feature: '240+ CDN edge nodes', microlink: true, apiflash: false },
  { feature: 'MCP server', microlink: true, apiflash: false },
  { feature: 'Markdown conversion', microlink: true, apiflash: false },
  { feature: 'Lighthouse audits', microlink: true, apiflash: false },
  { feature: 'Technology detection', microlink: true, apiflash: false },
  { feature: 'Color palette extraction', microlink: true, apiflash: false },
  { feature: 'Typed SDKs (React/Vue/JS)', microlink: true, apiflash: false },
  {
    feature: 'S3 direct upload',
    microlink: false,
    apiflash: true
  },
  {
    feature: 'Managed proxies',
    microlink: true,
    apiflash: 'enterprise',
    note: 'ApiFlash lists managed proxies on its custom enterprise plan.'
  },
  {
    feature: 'Geolocation targeting',
    microlink: false,
    apiflash: 'enterprise',
    note: 'ApiFlash lists IP geolocation on its custom enterprise plan.'
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
            ApiFlash
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, apiflash, highlight, note }) => (
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
                <CellValue value={apiflash} />
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
    question: 'Why switch from ApiFlash to Microlink for production workloads?',
    answer: (
      <>
        <div>
          ApiFlash is a straightforward screenshot API. The moment you need more
          throughput, lower cold-start latency, PDFs, metadata, link previews,
          or built-in antibot handling, Microlink gives you more room to grow
          without stitching extra services together.
        </div>
        <div>
          That is the core difference: ApiFlash stays focused on screenshot
          capture, while Microlink covers screenshot workflows that usually
          spill into scraping, previews, automation, or AI pipelines.
        </div>
      </>
    ),
    text: 'ApiFlash is a straightforward screenshot API. The moment you need more throughput, lower cold-start latency, PDFs, metadata, link previews, or built-in antibot handling, Microlink gives you more room to grow without stitching extra services together. ApiFlash stays focused on screenshot capture, while Microlink covers screenshot workflows that usually spill into scraping, previews, automation, or AI pipelines.'
  },
  {
    question:
      'What does the benchmark say about Microlink vs ApiFlash latency?',
    answer: (
      <>
        <div>
          In the March&nbsp;2026 benchmark, Microlink averaged 4,111.84&nbsp;ms
          cold-start latency and ApiFlash averaged 9,463.20&nbsp;ms on the same
          7-URL test suite. That means Microlink cuts average cold-start latency
          by about 56%.
        </div>
        <div>
          The widest gap showed up on framer.com: ApiFlash took
          27,153.57&nbsp;ms while Microlink finished in 6,267.31&nbsp;ms, which
          is more than 4&times; faster on that run.
        </div>
      </>
    ),
    text: 'In the March 2026 benchmark, Microlink averaged 4,111.84 ms cold-start latency and ApiFlash averaged 9,463.20 ms on the same 7-URL test suite. That means Microlink cuts average cold-start latency by about 56%. The widest gap showed up on framer.com: ApiFlash took 27,153.57 ms while Microlink finished in 6,267.31 ms, which is more than 4× faster on that run.'
  },
  {
    question:
      'How does Microlink pricing compare to ApiFlash at higher volume?',
    answer: (
      <>
        <div>
          ApiFlash Medium is $35/month for 10,000 screenshots. Microlink's
          comparison tier is $39/month for 46,000 requests. That is 4.6&times;
          more volume for $4 more per month.
        </div>
        <div>
          On a per-request basis, that works out to about $0.0035 for ApiFlash
          Medium versus about $0.00085 for Microlink's $39 tier.
        </div>
      </>
    ),
    text: "ApiFlash Medium is $35/month for 10,000 screenshots. Microlink's comparison tier is $39/month for 46,000 requests. That is 4.6× more volume for $4 more per month. On a per-request basis, that works out to about $0.0035 for ApiFlash Medium versus about $0.00085 for Microlink's $39 tier."
  },
  {
    question: 'Can I migrate from ApiFlash urltoimage to Microlink quickly?',
    answer: (
      <>
        <div>
          Usually, yes. ApiFlash uses a `urltoimage` endpoint with parameters
          like `url`, `full_page`, `format`, `wait_for`, `headers`, and
          `cookies`. Microlink supports the same capture concepts, even though
          some parameter names differ.
        </div>
        <div>
          In practice, most migrations are endpoint-and-parameter mapping work,
          not a full rewrite. Start from the{' '}
          <Link href='/docs/api/parameters/screenshot'>screenshot docs</Link>{' '}
          and adapt your existing request shape.
        </div>
      </>
    ),
    text: 'Usually, yes. ApiFlash uses a urltoimage endpoint with parameters like url, full_page, format, wait_for, headers, and cookies. Microlink supports the same capture concepts, even though some parameter names differ. In practice, most migrations are endpoint-and-parameter mapping work, not a full rewrite.'
  },
  {
    question: 'What if I depend on ApiFlash S3 export?',
    answer: (
      <>
        <div>
          That is one of the clearest cases where ApiFlash may still fit better.
          ApiFlash includes Export to S3 on its plans, while Microlink does not
          offer native S3 or cloud-storage upload.
        </div>
        <div>
          If your current workflow is "capture and push straight to S3", you
          would need to add that storage step yourself after the Microlink
          response.
        </div>
      </>
    ),
    text: 'That is one of the clearest cases where ApiFlash may still fit better. ApiFlash includes Export to S3 on its plans, while Microlink does not offer native S3 or cloud-storage upload. If your current workflow is capture and push straight to S3, you would need to add that storage step yourself after the Microlink response.'
  },
  {
    question: 'Does Microlink handle bot-protected pages better than ApiFlash?',
    answer: (
      <>
        <div>
          ApiFlash says some strict bot protections may still block access and
          recommends supplying your own proxy through the `proxy` parameter.
          That can work well, but it leaves proxy sourcing and tuning on you.
        </div>
        <div>
          Microlink includes a built-in proxy layer plus antibot detection for
          30+ providers. If protected pages are already part of your workload,
          Microlink removes more operational work from the capture pipeline.
        </div>
      </>
    ),
    text: 'ApiFlash says some strict bot protections may still block access and recommends supplying your own proxy through the proxy parameter. That can work well, but it leaves proxy sourcing and tuning on you. Microlink includes a built-in proxy layer plus antibot detection for 30+ providers, which removes more operational work from the capture pipeline.'
  },
  {
    question:
      'Is Microlink overkill if I only need simple website screenshots?',
    answer: (
      <>
        <div>
          Possibly. If all you need is a focused screenshot API with PNG, JPEG,
          or WebP output plus full-page and mobile captures, ApiFlash is simpler
          and clearly optimized for that narrow use case.
        </div>
        <div>
          Microlink becomes more compelling when screenshot capture is only one
          part of the workflow and you want the same API to cover metadata, PDF,
          previews, remote JS, or anti-bot-heavy URLs.
        </div>
      </>
    ),
    text: 'Possibly. If all you need is a focused screenshot API with PNG, JPEG, or WebP output plus full-page and mobile captures, ApiFlash is simpler and clearly optimized for that narrow use case. Microlink becomes more compelling when screenshot capture is only one part of the workflow and you want the same API to cover metadata, PDF, previews, remote JS, or anti-bot-heavy URLs.'
  },
  {
    question: 'Does Microlink have a more generous free plan than ApiFlash?',
    answer: (
      <>
        <div>
          Yes. ApiFlash offers 100 screenshots per month on its free plan.
          Microlink gives you 50 requests per day with no credit card and no
          expiry, which adds up to far more room for testing over a month.
        </div>
        <div>
          If you are evaluating an ApiFlash replacement gradually, Microlink's
          daily-reset model is easier to test in real usage instead of burning a
          single monthly pool.
        </div>
      </>
    ),
    text: "Yes. ApiFlash offers 100 screenshots per month on its free plan. Microlink gives you 50 requests per day with no credit card and no expiry, which adds up to far more room for testing over a month. If you are evaluating an ApiFlash replacement gradually, Microlink's daily-reset model is easier to test in real usage instead of burning a single monthly pool."
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
        The <GradientText>ApiFlash</GradientText> alternative
        <br />
        for production workloads
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
        <b>ApiFlash</b> is a focused screenshot API. When you need lower
        latency, more monthly volume, and fewer moving parts around blocked
        pages, <b>Microlink</b> gives you a bigger production envelope and cuts
        average cold-start latency by <b>56%</b>.
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
        <RaceHero aria-label='Live benchmark race: Microlink vs ApiFlash screenshot speed'>
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
          <GradientText>Up to 4&times; faster</GradientText> cold starts
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
          Averaged over 10&nbsp;runs from a New York server, Microlink cuts
          average cold-start latency by 56%. The biggest gap in this benchmark
          was on framer.com, where Microlink completed the same job more than
          4&times; faster. All providers were triggered simultaneously across
          7&nbsp;real-world URLs with true cold starts and the single slowest
          run removed.
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
                          let cellContent = formatMs(times[i])

                          if (isMin) {
                            cellContent = (
                              <CellHighlight>
                                {formatMs(times[i])}
                              </CellHighlight>
                            )
                          } else if (isMax) {
                            cellContent = (
                              <CellLoser>{formatMs(times[i])}</CellLoser>
                            )
                          }

                          return <td key={key}>{cellContent}</td>
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
        The top reasons teams move from ApiFlash to Microlink.
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
            title: 'Less waiting in the critical path',
            description:
              'ApiFlash averaged 9.46 seconds in the benchmark. Microlink averaged 4.11 seconds. That is about 56% less cold-start latency on average and more than 4× faster on the slowest benchmark gap.'
          },
          {
            number: '02',
            title: '4.6× more monthly volume for $4 more',
            description:
              'ApiFlash Medium is $35 for 10,000 screenshots. Microlink is $39 for 46,000 requests. If your workload is already moving beyond hobby usage, that price curve changes the economics fast.'
          },
          {
            number: '03',
            title: 'No second tool when requirements grow',
            description:
              'ApiFlash stays focused on screenshots. Microlink also gives you PDFs, metadata extraction, link previews, remote JS, and more from the same integration instead of forcing a second service later.'
          },
          {
            number: '04',
            title: 'Built for blocked pages, not just happy paths',
            description:
              'ApiFlash documents a BYO-proxy approach when stricter bot protection gets in the way. Microlink includes a built-in proxy layer and antibot detection so protected pages need less infrastructure around them.'
          },
          {
            number: '05',
            title: 'A free tier you can actually live in',
            description:
              'ApiFlash offers 100 free screenshots per month. Microlink resets daily with 50 free requests every day, so you can test real traffic patterns instead of burning a single monthly pool in one afternoon.'
          },
          {
            number: '06',
            title: 'Open-source core, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT licensed. Read the code, fork it, or self-host it. If auditable infrastructure matters to your team, Microlink is much easier to inspect than a closed screenshot service.'
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
 * Where ApiFlash Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='apiflash-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>ApiFlash</GradientText>
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
            title: 'You only need a simple screenshot API',
            description:
              'ApiFlash is built around one job: render a page in Chrome and return an image. If you are not looking for PDF, metadata, previews, or broader browser workflows, that narrower scope can be appealing.'
          },
          {
            title: 'You want S3 export built in',
            description:
              'ApiFlash includes Export to S3 on its plans. Microlink does not provide native S3 or cloud-storage upload, so you would need to add that storage step yourself.'
          },
          {
            title: 'A $7 paid plan matters more than platform depth',
            description:
              'ApiFlash starts at $7/month for 1,000 screenshots. If your need is light, paid, and screenshot-only, that entry point is lower than moving directly onto a fuller platform.'
          },
          {
            title: 'You prefer its AWS Lambda + isolated Chrome model',
            description:
              'ApiFlash emphasizes AWS Lambda-backed scaling and says each screenshot runs in a brand-new isolated Chrome instance that is destroyed after capture. For some teams, that operational model is reassuring.'
          },
          {
            title:
              'You need vendor-managed proxies or geolocation on enterprise',
            description:
              'ApiFlash lists managed proxies and IP geolocation on its custom enterprise plan. If those exact enterprise controls match your buying process, that may be a simpler fit than changing providers.'
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

/* Pricing sources:
 * ApiFlash pricing: https://apiflash.com/
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More volume. <br />
        <GradientText>Nearly the same spend.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Get <b>4.6&times; more</b> monthly volume for $4&nbsp;more.
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
                'Screenshots, PDF, metadata, link previews, remote JS',
                'Free: 50 requests/day, no credit card, no expiry',
                'No per-minute cap on paid plans',
                '240+ edge nodes, 99.9% SLA',
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
            ApiFlash
          </Badge>
          <PriceAmount>
            $35
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
            10,000&nbsp;screenshots/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'PNG / JPEG / WebP screenshots',
              'Export to S3',
              '20 req/s leaky-bucket rate limit, burst 400',
              'Priority support on this tier',
              '~$0.0035/request on this tier'
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
        This is the cleanest apples-to-apples comparison we found: ApiFlash's
        Medium plan versus Microlink's $39 tier. The gap is small on monthly
        spend and large on available volume, which is why this page focuses on
        production workloads instead of hobby usage.
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
        Harden your screenshot pipeline before it bottlenecks
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
        Move latency-sensitive or proxy-heavy jobs first. Keep the rest of your
        workflow steady while you compare real production traffic.
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
    title='ApiFlash Alternative for Production Screenshot Workloads'
    description='Microlink cuts average cold-start latency by 56% vs ApiFlash, gives you 46,000 requests for $39 vs 10,000 for $35, and adds PDF, metadata, previews, and built-in antibot tooling.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ApiFlash Alternative for Production Screenshot Workloads',
        description:
          'Compare Microlink and ApiFlash for production screenshot workloads. Microlink cuts average cold-start latency by 56%, gives you 46,000 requests for $39 versus 10,000 screenshots for $35, and covers screenshots, PDF, metadata, previews, and remote JS from one API.',
        url: 'https://microlink.io/alternative/apiflash',
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

const ApiFlashPage = () => (
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

export default ApiFlashPage
