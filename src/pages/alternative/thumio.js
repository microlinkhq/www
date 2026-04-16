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
  timestamp: '2026-04-15T18:19:27.744Z',
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
    },
    {
      url: 'https://www.framer.com',
      width: 1920,
      height: 1800,
      fullPage: false,
      format: 'jpeg',
      deviceScaleFactor: 2,
      adblock: true
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      website: 'https://microlink.io',
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 7851.3195000000005,
          imageSize: 553030,
          imageQuality: 1005.1851912097997,
          success: true,
          error: null
        },
        {
          url: 'https://example.com',
          coldDuration: 1214.3017909999999,
          imageSize: 16203,
          imageQuality: 323.9259376924314,
          success: true,
          error: null
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3253.5385829999996,
          imageSize: 127452,
          imageQuality: 1353.4169854193146,
          success: true,
          error: null
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 4989.000249999999,
          imageSize: 2065261,
          imageQuality: 1291.8271797525126,
          success: true,
          error: null
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3426.2449579999993,
          imageSize: 168951,
          imageQuality: 4776.754227201613,
          success: true,
          error: null
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3012.872292,
          imageSize: 136255,
          imageQuality: 2771.475739986613,
          success: true,
          error: null
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 5965.603333000003,
          imageSize: 1008610,
          imageQuality: 1224.2724297355865,
          success: true,
          error: null
        }
      ],
      summary: {
        totalTime: 29712.88,
        totalColdDuration: 29712.88,
        avgColdDuration: 4244.7,
        avgImageSize: 582252,
        avgImageQuality: 1820.98,
        successRate: 1,
        totalRequests: 7
      }
    },
    thumio: {
      name: 'Thum.io',
      website: 'https://www.thum.io',
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 34919.6895,
          imageSize: 1781571,
          imageQuality: 414.46681223326374,
          success: true,
          error: null
        },
        {
          url: 'https://example.com',
          coldDuration: 30688.288791,
          imageSize: 17440,
          imageQuality: 327.3619063307722,
          success: true,
          error: null
        },
        {
          url: 'https://stripe.com',
          coldDuration: 13062.827541000006,
          imageSize: 141532,
          imageQuality: 1585.236417539989,
          success: true,
          error: null
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 51775.59608300001,
          imageSize: 7162,
          imageQuality: 0,
          success: true,
          error: null
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 20816.988957999998,
          imageSize: 5932,
          imageQuality: 0,
          success: true,
          error: null
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4302.058332999994,
          imageSize: 124597,
          imageQuality: 2615.3637047615643,
          success: true,
          error: null
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 34930.73104100001,
          imageSize: 109666,
          imageQuality: 2533.4204149531142,
          success: true,
          error: null
        }
      ],
      summary: {
        totalTime: 190496.18,
        totalColdDuration: 190496.18,
        avgColdDuration: 27213.74,
        avgImageSize: 312557,
        avgImageQuality: 1067.98,
        successRate: 1,
        totalRequests: 7
      }
    }
  },
  winner: 'microlink'
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  thumio: colors.cyan6
}

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const formatMb = bytes => `${(bytes / 1000000).toFixed(2)} MB`

const SERVICES = Object.keys(BENCHMARK_DATA.results)
const SORTED_SERVICES = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.avgColdDuration -
    BENCHMARK_DATA.results[b].summary.avgColdDuration
)

const MICRO_AVG = BENCHMARK_DATA.results.microlink.summary.avgColdDuration
const THUMIO_AVG = BENCHMARK_DATA.results.thumio.summary.avgColdDuration
const AVERAGE_PCT_SLOWER = Math.floor(
  ((THUMIO_AVG - MICRO_AVG) / MICRO_AVG) * 100
)
const AVERAGE_MULTIPLIER = Math.floor(THUMIO_AVG / MICRO_AVG)
const IMAGE_COMPARISON_DATA = {
  microlink: {
    avgImageSize: 551548
  },
  thumio: {
    avgImageSize: 1019785
  }
}
const IMAGE_SIZE_ADVANTAGE_PCT = Math.floor(
  ((IMAGE_COMPARISON_DATA.thumio.avgImageSize -
    IMAGE_COMPARISON_DATA.microlink.avgImageSize) /
    IMAGE_COMPARISON_DATA.thumio.avgImageSize) *
    100
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
  { feature: 'Screenshot capture', microlink: true, thumio: true },
  {
    feature: 'Full-page screenshots',
    microlink: true,
    thumio: true,
    note: 'Thum.io documents full-page capture on a paid plan.'
  },
  {
    feature: 'Device emulation presets',
    microlink: true,
    thumio: true,
    note: 'Thum.io documents iPhone and Galaxy presets on a paid plan.'
  },
  { feature: 'Signed request URLs', microlink: true, thumio: true },
  {
    feature: 'Built-in response cache',
    microlink: true,
    thumio: true,
    note: 'Thum.io exposes cache freshness via maxAge and a prefetch cache workflow.'
  },
  {
    feature: 'Direct embed (no backend needed)',
    microlink: true,
    thumio: true
  },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    thumio: false,
    highlight: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    thumio: false,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, thumio: false },
  {
    feature: 'Custom JS/CSS injection',
    microlink: true,
    thumio: false,
    highlight: true
  },
  { feature: 'Custom HTTP headers', microlink: true, thumio: false },
  { feature: 'Custom cookies', microlink: true, thumio: false },
  {
    feature: 'Hide/remove elements (CSS selectors)',
    microlink: true,
    thumio: false,
    highlight: true
  },
  { feature: 'Click/scroll interactions', microlink: true, thumio: false },
  { feature: 'Wait for selector', microlink: true, thumio: false },
  { feature: 'Cookie banner blocking', microlink: true, thumio: false },
  { feature: 'Ad blocking', microlink: true, thumio: false },
  {
    feature: 'Built-in proxy',
    microlink: true,
    thumio: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    thumio: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    thumio: false,
    highlight: true
  },
  { feature: 'Link previews SDK', microlink: true, thumio: false },
  {
    feature: 'Open-source core',
    microlink: true,
    thumio: false,
    highlight: true
  },
  { feature: 'Remote JS execution', microlink: true, thumio: false },
  { feature: 'MCP server', microlink: true, thumio: false },
  {
    feature: 'Animated initial render',
    microlink: false,
    thumio: true,
    note: 'Thum.io streams an animated initial render while the final screenshot completes.'
  },
  {
    feature: 'Prefetch + callback batch workflow',
    microlink: false,
    thumio: true,
    note: 'Thum.io documents prefetch requests plus optional callbackUrl delivery.'
  },
  { feature: 'Image resizing API', microlink: false, thumio: true },
  { feature: 'PDF-to-image conversion', microlink: false, thumio: true }
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
          <th css={{ minWidth: '200px' }}>Feature</th>
          <th css={[theme({ textAlign: 'center' }), { minWidth: '120px' }]}>
            <span css={textGradient}>Microlink</span>
          </th>
          <th
            css={[
              theme({ textAlign: 'center', color: 'black60' }),
              { minWidth: '120px' }
            ]}
          >
            Thum.io
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, thumio, highlight, note }) => (
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
                <CellValue value={thumio} />
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
        The <GradientText>Thum.io</GradientText> alternative
        <br />
        for final screenshots
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
        <b>Thum.io</b> is clever for ultra-cheap streamed website thumbnails.
        When you need final screenshots, selectors, PDFs, metadata, and fewer
        workarounds around modern pages, <b>Microlink</b> gives you a broader
        API and{' '}
        <b>{AVERAGE_MULTIPLIER}&times; lower average cold-start latency</b>.
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
        <RaceHero aria-label='Live benchmark race: Microlink vs Thum.io screenshot speed'>
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
          <GradientText>{AVERAGE_MULTIPLIER}&times; lower</GradientText> average
          cold-start latency
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
          Same request shape. Same URLs. Measured at final screenshot
          completion.
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
          We tested 7&nbsp;real-world URLs with true cold starts (no caching)
          from a New York server. This comparison measures when the final
          screenshot was ready, not when a streamed loader first appeared.
          Thum.io did not finish ahead on any URL in this suite, and Microlink
          still finished the full suite{' '}
          <b>{AVERAGE_PCT_SLOWER}% faster on average</b>.
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
            <Text
              css={theme({
                mt: 4,
                fontSize: 2,
                fontWeight: 'bold',
                letterSpacing: 0,
                color: 'black',
                pb: 3
              })}
            >
              Average image size
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
                    <th css={theme({ textAlign: 'right' })}>Avg Image Size</th>
                  </tr>
                </thead>
                <tbody>
                  {['microlink', 'thumio'].map(key => {
                    const svc =
                      key === 'microlink'
                        ? { name: 'Microlink' }
                        : { name: 'Thum.io' }
                    const row = IMAGE_COMPARISON_DATA[key]
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
                          {formatMb(row.avgImageSize)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </FeatureTable>
            </Box>
          </Box>
        </Flex>
        <Box
          css={theme({
            mt: 4,
            width: '100%'
          })}
        >
          <Text
            css={theme({
              fontSize: [0, 0, 1, 1],
              color: 'black70',
              lineHeight: 2
            })}
          >
            Microlink images come out <b>{IMAGE_SIZE_ADVANTAGE_PCT}% smaller</b>{' '}
            on average while staying in a similar quality range. Smaller image
            size matters when screenshots need to load fast without looking
            obviously over-compressed.
          </Text>
        </Box>
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
    title: 'Final screenshot time matters more than loader time',
    description: (
      <>
        Thum.io's standout trick is streaming an animated initial render. That
        is useful for embeds. Our benchmark measured when the{' '}
        <b>final screenshot</b> was actually ready. On that metric, Microlink
        averaged <b>4,244.70&nbsp;ms</b> versus <b>27,213.74&nbsp;ms</b> for
        Thum.io.
      </>
    )
  },
  {
    number: '02',
    title: 'More control once pages stop being simple',
    description: (
      <>
        Thum.io's URL API focuses on <b>width</b>, <b>crop</b>, <b>fullpage</b>,{' '}
        <b>wait</b>, and a few device presets. Microlink adds selector capture,
        JS/CSS injection, cookies, custom headers, click/scroll interactions,
        and ad blocking when real browser state starts to matter.
      </>
    )
  },
  {
    number: '03',
    title: 'Built to stay fast under serious load',
    description: (
      <>
        Microlink is built for teams that need to handle{' '}
        <b>thousands of concurrent requests</b> and still keep latency
        predictable. It is shaped by both <b>enterprise workloads</b> and
        smaller developers who need a screenshot API they can trust to stay fast
        when traffic spikes.
      </>
    )
  },
  {
    number: '04',
    title: 'Cheaper per hit, narrower per request',
    description: (
      <>
        If all you need is <b>high-volume site preview thumbnails</b>, Thum.io
        is legitimately cheaper. Microlink becomes more attractive when one
        request needs to replace multiple browser or extraction tools instead of
        just returning an image.
      </>
    )
  },
  {
    number: '05',
    title: 'Built for harder pages',
    description: (
      <>
        Microlink includes <b>built-in residential proxying</b> and antibot
        detection for 30+ providers. If your targets sit behind Cloudflare,
        DataDome, or similar protections, that removes operational work from the
        screenshot pipeline.
      </>
    )
  },
  {
    number: '06',
    title: 'Auditable core, not a black box',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT-licensed</b>. You can audit
        the core pieces, self-host them, or fork them. Thum.io is proprietary,
        so the rendering internals are not inspectable.
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
        What usually changes when a team outgrows Thum.io.
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
 * Where Thum.io Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'Streaming initial render',
    description:
      'Thum.io streams an animated initial render immediately, which can make embeds feel responsive before the final screenshot is done. Microlink focuses on returning the completed capture.'
  },
  {
    title: 'Very cheap simple screenshot pricing',
    description:
      'Thum.io lists a paid screenshot tier at $1 per 10,000 screenshot hits with a $20 monthly minimum. If your workload is mostly simple website snapshots at scale, that raw per-hit pricing is hard to beat.'
  },
  {
    title: 'Free usage with almost no friction',
    description:
      'Thum.io says you can use up to 1,000 screenshot impressions per month for free without even signing up. That is a low-friction way to test basic website previews.'
  },
  {
    title: 'Path-based image embeds are extremely simple',
    description:
      'The product is designed around direct image URLs such as image.thum.io/get/... which makes it easy to drop screenshots into an img tag or CMS field without much application code.'
  },
  {
    title: 'Prefetch plus callback workflows',
    description:
      'Thum.io documents a prefetch endpoint with optional callback delivery when the image is ready. Microlink does not have native async callback workflows or webhooks.'
  },
  {
    title: 'Image resizing and PDF-to-image utilities',
    description:
      'Beyond screenshots, Thum.io also exposes direct image resizing and PDF-to-image conversion endpoints. If those utilities are central to your workflow, they are meaningful built-in extras.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='thumio-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Thum.io</GradientText>
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
 * Thum.io pricing: https://www.thum.io/
 * Thum.io URL API docs: https://www.thum.io/documentation/api/url
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Cheaper per screenshot.{' '}
        <GradientText>Broader per request.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        There is no perfect apples-to-apples plan match here. Thum.io prices
        simple website screenshot hits aggressively; Microlink charges more, but
        bundles a wider browser and data surface into each request.
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
                '50 requests/day free, no credit card required',
                'No requests-per-minute cap on paid plans',
                'Built-in proxy + antibot handling for harder targets',
                '240+ edge nodes, 99.9% SLA',
                'One request can replace multiple screenshot-side tools'
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
            Thum.io
          </Badge>
          <PriceAmount>
            $20
            <Text
              as='span'
              css={theme({
                fontSize: 1,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              /mo min
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
            $1 per 10,000&nbsp;screenshot hits
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'At 46,000 screenshots, this tier still bills its $20 monthly minimum',
              'Full-page screenshots and adjustable viewport width',
              'Animated initial render with unbranded loader options',
              'Queue priority on paid usage',
              'First 1,000 screenshot hits free',
              'Strong fit for cheap, high-volume website preview embeds'
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
        If your job is mostly <b>simple website snapshots at scale</b>, Thum.io
        wins raw pricing. If each screenshot request also needs metadata, PDF,
        browser logic, or antibot help, Microlink trades higher cost for a much
        broader request surface.
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
        Ready to move past streamed thumbnails?
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
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day free</b> and see
        whether your workload needs simple snapshots or a broader browser API.
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
          Ship <span css='color: #fa5252;'>final</span> screenshots faster
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
          PDF output, or browser automation only when your workflow needs it.
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

const FAQ_ITEMS = [
  {
    question: 'What is a good Thum.io alternative for final screenshot APIs?',
    answer: (
      <>
        <div>
          If your workload is moving beyond cheap embedded thumbnails, Microlink
          is a strong Thum.io alternative. It covers screenshots, PDF
          generation, metadata extraction, link previews, and remote JS from one
          platform.
        </div>
        <div>
          Thum.io stays compelling for ultra-cheap site preview images and
          streamed initial renders. Microlink is the better fit when the request
          needs to do more than return a simple snapshot.
        </div>
      </>
    ),
    text: 'If your workload is moving beyond cheap embedded thumbnails, Microlink is a strong Thum.io alternative. It covers screenshots, PDF generation, metadata extraction, link previews, and remote JS from one platform. Thum.io stays compelling for ultra-cheap site preview images and streamed initial renders. Microlink is the better fit when the request needs to do more than return a simple snapshot.'
  },
  {
    question: "Does this benchmark include Thum.io's streamed GIF behavior?",
    answer: (
      <>
        <div>
          No. This benchmark measures <b>final cold-start completion time</b>:
          when the requested screenshot payload was fully ready. It does not
          score how fast a loading spinner or animated initial render appears.
        </div>
        <div>
          That distinction matters with Thum.io because its main differentiator
          is perceived speed during streaming. For synchronous server-side
          screenshot workflows, the final completion time is usually the more
          important number.
        </div>
      </>
    ),
    text: 'No. This benchmark measures final cold-start completion time: when the requested screenshot payload was fully ready. It does not score how fast a loading spinner or animated initial render appears. That distinction matters with Thum.io because its main differentiator is perceived speed during streaming. For synchronous server-side screenshot workflows, the final completion time is usually the more important number.'
  },
  {
    question: 'How hard is it to migrate from Thum.io URLs to Microlink?',
    answer: (
      <>
        <div>
          Usually not very hard. Thum.io encodes options as readable path
          segments like <i>fullpage</i>, <i>viewportWidth</i>, <i>wait</i>, and
          device names. Microlink expresses the same capture intent through its
          own parameter model and screenshot guides.
        </div>
        <div>
          The migration is mostly about mapping screenshot intent, not rewriting
          your app from scratch. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot docs</Link>, then
          adapt any Thum.io-specific loader or prefetch logic separately.
        </div>
      </>
    ),
    text: 'Usually not very hard. Thum.io encodes options as readable path segments like fullpage, viewportWidth, wait, and device names. Microlink expresses the same capture intent through its own parameter model and screenshot guides. The migration is mostly about mapping screenshot intent, not rewriting your app from scratch. Start from the screenshot docs, then adapt any Thum.io-specific loader or prefetch logic separately.'
  },
  {
    question: 'When does Thum.io still make more sense than Microlink?',
    answer: (
      <>
        <div>
          Thum.io still makes a lot of sense when your main goal is cheap,
          high-volume website preview images, especially if you like its
          streamed initial render and direct image URL model.
        </div>
        <div>
          It also has built-in <b>prefetch + callback</b> workflows, image
          resizing, and PDF-to-image conversion. If those utilities are central
          to your pipeline, Thum.io has real advantages.
        </div>
      </>
    ),
    text: 'Thum.io still makes a lot of sense when your main goal is cheap, high-volume website preview images, especially if you like its streamed initial render and direct image URL model. It also has built-in prefetch plus callback workflows, image resizing, and PDF-to-image conversion. If those utilities are central to your pipeline, Thum.io has real advantages.'
  },
  {
    question:
      'Is Microlink better if I need metadata or PDF from same request?',
    answer: (
      <>
        <div>
          Yes. That is one of the clearest differences. Microlink covers
          screenshots, PDF generation, metadata extraction, link previews, and
          remote JS in one platform.
        </div>
        <div>
          Thum.io documents screenshots, image resizing, and PDF-to-image
          conversion, but not metadata extraction, webpage-to-PDF generation, or
          the broader browser workflow surface that Microlink exposes.
        </div>
      </>
    ),
    text: 'Yes. That is one of the clearest differences. Microlink covers screenshots, PDF generation, metadata extraction, link previews, and remote JS in one platform. Thum.io documents screenshots, image resizing, and PDF-to-image conversion, but not metadata extraction, webpage-to-PDF generation, or the broader browser workflow surface that Microlink exposes.'
  },
  {
    question: 'Which service is cheaper for simple thumbnail embeds?',
    answer: (
      <>
        <div>
          Thum.io is cheaper for that specific use case. Its paid screenshot
          tier is priced at <b>$1 per 10,000 screenshot hits</b> with a $20
          monthly minimum, and the product is clearly optimized for embedded
          website preview images.
        </div>
        <div>
          Microlink costs more, but each request can cover more work. If your
          workflow needs screenshot output plus metadata, browser logic, or
          blocked-page handling, price alone stops being the full story.
        </div>
      </>
    ),
    text: 'Thum.io is cheaper for that specific use case. Its paid screenshot tier is priced at $1 per 10,000 screenshot hits with a $20 monthly minimum, and the product is clearly optimized for embedded website preview images. Microlink costs more, but each request can cover more work. If your workflow needs screenshot output plus metadata, browser logic, or blocked-page handling, price alone stops being the full story.'
  },
  {
    question:
      'Do both Microlink and Thum.io support signed URLs and direct embeds?',
    answer: (
      <>
        <div>
          Yes. Thum.io documents signed requests and simple <i>img src</i>
          embeds. Microlink also supports signed request URLs and direct embed
          flows, so both products can power frontend-friendly image delivery.
        </div>
      </>
    ),
    text: 'Yes. Thum.io documents signed requests and simple img src embeds. Microlink also supports signed request URLs and direct embed flows, so both products can power frontend-friendly image delivery. The difference is what happens after the image request. Microlink keeps going into metadata, PDFs, proxies, selectors, and browser automation features that Thum.io does not document.'
  },
  {
    question: 'Can Microlink replace Thum.io prefetch and callback workflows?',
    answer: (
      <>
        <div>
          Not one-to-one. Thum.io documents a native prefetch endpoint with
          optional callbacks when the image is ready. Microlink does not expose
          native async callbacks or webhooks for screenshot completion.
        </div>
        <div>
          If that exact pattern is important, you would keep the async
          orchestration in your own app: request Microlink, store the result,
          then fire your own callback or queue event downstream.
        </div>
      </>
    ),
    text: 'Not one-to-one. Thum.io documents a native prefetch endpoint with optional callbacks when the image is ready. Microlink does not expose native async callbacks or webhooks for screenshot completion. If that exact pattern is important, you would keep the async orchestration in your own app: request Microlink, store the result, then fire your own callback or queue event downstream.'
  }
]

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
    title='Thum.io Alternative for Final Screenshots and Modern Browser Control'
    description='Thum.io is clever for ultra-cheap streamed thumbnails. Microlink is built for final screenshots, selectors, PDFs, metadata, and blocked-page workloads, with 6× lower average cold-start latency in our April 2026 benchmark.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Thum.io Alternative for Final Screenshots and Modern Browser Control | Microlink',
        description:
          'Compare Microlink and Thum.io when simple website thumbnails are no longer enough. Microlink delivers final screenshots, PDF generation, metadata extraction, and broader browser control with 6× lower average cold-start latency in our April 2026 benchmark.',
        url: 'https://microlink.io/alternative/thumio',
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

const ThumioPage = () => (
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

export default ThumioPage
