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
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import FeatherIcon from 'components/icons/Feather'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Zap, Code, Gift, TrendingUp } from 'react-feather'
import { extractDomain } from 'helpers/extract-domain'

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
    screenshotapi: {
      name: 'ScreenshotAPI',
      summary: {
        avgColdDuration: 5915.71,
        totalColdDuration: 41409.99
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6143.4 },
        { url: 'https://example.com', coldDuration: 4987.8 },
        { url: 'https://stripe.com', coldDuration: 5613.77 },
        { url: 'https://screenshotone.com', coldDuration: 6805.46 },
        { url: 'https://news.ycombinator.com', coldDuration: 5384.65 },
        { url: 'https://github.com/trending', coldDuration: 6174.08 },
        { url: 'https://www.framer.com', coldDuration: 6300.83 }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotapi: colors.grape7
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

  th,
  td {
    padding: ${SPACE_10} ${SPACE_14};
    ${theme({ textAlign: 'left', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      padding: ${space[2]} ${SPACE_10};
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
    css={theme({ color: 'green7', fontFamily: 'mono', fontSize: 1 })}
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
      opacity: 0.7
    })}
    aria-label='No'
    role='img'
  >
    ✕
  </span>
)

const Partial = ({ children }) => (
  <span css={theme({ color: 'yellow7', fontFamily: 'mono', fontSize: 0 })}>
    {children || '~'}
  </span>
)

const COMPARISON_DATA = [
  { feature: 'Screenshot capture', microlink: true, screenshotapi: true },
  { feature: 'Full-page screenshots', microlink: true, screenshotapi: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    screenshotapi: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotapi: true,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, screenshotapi: true },
  { feature: 'Dark/light mode capture', microlink: true, screenshotapi: true },
  {
    feature: 'Device emulation presets',
    microlink: true,
    screenshotapi: true
  },
  { feature: 'Custom JS/CSS injection', microlink: true, screenshotapi: true },
  { feature: 'Custom HTTP headers', microlink: true, screenshotapi: true },
  { feature: 'Custom cookies', microlink: true, screenshotapi: true },
  {
    feature: 'Hide/remove elements (CSS selectors)',
    microlink: true,
    screenshotapi: true
  },
  {
    feature: 'Click interactions',
    microlink: true,
    screenshotapi: true
  },
  { feature: 'Wait for selector', microlink: true, screenshotapi: true },
  { feature: 'Cookie banner blocking', microlink: true, screenshotapi: true },
  { feature: 'Ad blocking', microlink: true, screenshotapi: true },
  { feature: 'Built-in response cache', microlink: true, screenshotapi: true },
  { feature: 'Custom proxy support', microlink: true, screenshotapi: true },
  {
    feature: 'Built-in proxy',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    screenshotapi: false
  },
  { feature: '240+ CDN edge nodes', microlink: true, screenshotapi: false },
  {
    feature: 'MQL (structured data extraction)',
    microlink: true,
    screenshotapi: false
  },
  { feature: 'MCP server', microlink: true, screenshotapi: false },
  { feature: 'Markdown conversion', microlink: true, screenshotapi: false },
  { feature: 'Lighthouse audits', microlink: true, screenshotapi: false },
  { feature: 'Technology detection', microlink: true, screenshotapi: false },
  {
    feature: 'Color palette extraction',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Typed SDKs (React/Vue/JS)',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Video output (page content)',
    microlink: true,
    screenshotapi: false
  },
  { feature: 'Animated screenshots', microlink: true, screenshotapi: true },
  {
    feature: 'Scheduled screenshots (cron)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Bulk screenshots (JSON/CSV)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'BYOB storage (S3/Wasabi/GCS)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Scrolling video capture (WebM/MP4/GIF)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Geolocation targeting',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Text/HTML extraction',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Granular resource blocking (15+ toggles)',
    microlink: 'partial',
    screenshotapi: true
  },
  {
    feature: 'No-code integrations (Zapier, Make, n8n\u2026)',
    microlink: 'partial',
    screenshotapi: true
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
            ScreenshotAPI
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotapi, highlight, note }) => (
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
                <CellValue value={screenshotapi} />
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
  ${theme({ display: 'none', flexDirection: 'column' })};
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
    color: 'black',
    fontWeight: 'bold',
    bg: 'black05'
  })};
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
        The <GradientText>ScreenshotAPI</GradientText> alternative that does
        more
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
        <b>ScreenshotAPI</b> covers screenshots well. The moment you need PDFs,
        metadata, or link previews, you are looking at a second service.{' '}
        <b>Microlink</b> covers all of it from one API key and is{' '}
        <b>33% faster than ScreenshotAPI on average</b>.
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
        <RaceHero>
          <RaceContainer
            benchmarkData={BENCHMARK_DATA}
            serviceColors={SERVICE_COLORS}
            highlightKey='microlink'
            flat
            compact
          />
        </RaceHero>
      </Flex>

      <Flex
        css={theme({
          pt: [2, 2, 3, 3],
          gap: [3, 5, 5, '80px'],
          flexWrap: 'wrap',
          justifyContent: ['space-between', 'space-between', 'center'],
          alignItems: 'center',
          width: '100%'
        })}
      >
        {[
          {
            icon: Zap,
            value: '33%',
            label: 'Faster on average'
          },
          {
            icon: Code,
            value: 'Open source',
            label: 'Fully auditable'
          },
          {
            icon: Gift,
            value: 'Free',
            label: '50\u00a0req/day, forever'
          },
          {
            icon: TrendingUp,
            value: '4.6\u00d7',
            label: 'more requests, $10\u00a0more'
          }
        ].map(({ icon, value, label }) => (
          <Flex
            key={label}
            css={theme({
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: '100px'
            })}
          >
            <Flex
              css={theme({
                flexDirection: 'column',
                alignItems: 'flex-start'
              })}
            >
              <Text
                css={theme({
                  fontSize: ['32px', '42px'],
                  fontWeight: 'bold',
                  lineHeight: 0,
                  textAlign: 'center'
                })}
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {value}
              </Text>
              <Flex
                css={theme({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                  pt: 1
                })}
              >
                <FeatherIcon icon={icon} size={1} color='blue8' />
                <Caps
                  css={theme({
                    fontSize: 1,
                    color: 'black50',
                    fontWeight: 'bold'
                  })}
                >
                  {label}
                </Caps>
              </Flex>
            </Flex>
          </Flex>
        ))}
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
        Last verified: March&nbsp;2026. See each product's docs for the latest.
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
      css={theme({ background: colors.gray0, paddingTop: [5, 5, 6, 6] })}
    >
      <SectionInner>
        <Subhead
          css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5] })}
          titleize={false}
        >
          <GradientText>Up to 4&times; faster</GradientText> response times
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
            fontSize: [1, 1, 2, 2],
            color: 'black',
            lineHeight: 3,
            maxWidth: layout.normal,
            mx: 'auto',
            pb: [3, 3, 4, 4]
          })}
        >
          Averaged over 10&nbsp;runs from a New York server, Microlink is 33%
          faster. On simple pages, the gap reaches 4&times;. Tested across
          7&nbsp;real-world URLs with true cold starts (no caching). All
          providers triggered simultaneously. Single slowest run dropped to
          remove outliers.
        </Text>

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
            bg: 'white',
            mb: [3, 3, 4, 4]
          })}
        >
          <FeatureTable>
            <thead>
              <tr>
                <th>Provider</th>
                <th css={theme({ textAlign: 'right' })}>Avg Cold Duration</th>
                <th css={theme({ textAlign: 'right' })}>vs.&nbsp;Microlink</th>
              </tr>
            </thead>
            <tbody>
              {SORTED_SERVICES.map((key, rank) => {
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
                      {isMicrolink ? '\u2014' : `+${pctSlower}% slower`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </FeatureTable>
        </Box>

        <Text
          css={theme({
            fontSize: 2,
            fontWeight: 'bold',
            letterSpacing: 0,
            color: 'black',
            pb: 3
          })}
        >
          Cold-start latency breakdown by&nbsp;URL
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
                      color: key === 'microlink' ? colors.green7 : colors.black
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
                    BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
                      ?.coldDuration || 0
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
                            <CellHighlight>{formatMs(times[i])}</CellHighlight>
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
                  key => BENCHMARK_DATA.results[key].summary.totalColdDuration
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

        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            pb: [3, 3, 4, 4],
            fontSize: [2, 2, 3, 3],
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          <ArrowLink href='https://github.com/microlinkhq/screenshot-benchmark'>
            See the full benchmark on&nbsp;GitHub
          </ArrowLink>
        </Flex>

        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            gap: [3, 3, 4, 4],
            justifyContent: 'center',
            width: '100%',
            maxWidth: layout.normal,
            mx: 'auto'
          })}
        >
          {[
            {
              icon: '\u26A1',
              title: 'No cold starts',
              description:
                'We fine-tune every layer of the stack to cut boot time. The browser is ready before your request lands.'
            },
            {
              icon: '\uD83C\uDF10',
              title: 'Edge proximity',
              description:
                '240+ Cloudflare nodes. The nearest browser is milliseconds away from your users, not seconds.'
            },
            {
              icon: '\uD83D\uDD12',
              title: 'Clean isolation',
              description:
                'No shared browser contexts. Every request gets a clean state, which also means no cross-request leakage.'
            }
          ].map(({ icon, title, description }) => (
            <Flex
              key={title}
              css={theme({
                flexDirection: 'column',
                p: [3, 3, 4, 4],
                borderRadius: 3,
                border: 1,
                borderColor: 'black10',
                flex: 1,
                bg: 'white'
              })}
            >
              <Text
                css={{ fontSize: '24px', lineHeight: 1, paddingBottom: '8px' }}
              >
                {icon}
              </Text>
              <Text css={theme({ fontWeight: 'bold', fontSize: 1, pb: 1 })}>
                {title}
              </Text>
              <Text
                css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}
              >
                {description}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Text
          css={theme({
            pt: 4,
            fontSize: 0,
            color: 'black40',
            textAlign: 'center',
            fontFamily: 'mono',
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          Averages from 10&nbsp;benchmark runs on a New York server, spread
          across different hours. The{' '}
          <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
            benchmark repo
          </Link>{' '}
          is public. Run it against your own URLs and see. Last run:
          March&nbsp;2026.
        </Text>
      </SectionInner>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
 * Why Developers Switch
 * --------------------------------------------------------------------------- */

const WhySwitchSection = () => (
  <Section
    as='section'
    id='why-switch'
    css={{
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
      borderBottom: `${borders[1]} ${colors.white20}`
    }}
  >
    <SectionInner>
      <Subhead
        css={theme({ color: 'white', pb: [1, 2, 2, 2] })}
        titleize={false}
      >
        Why Developers Switch
      </Subhead>
      <Caption
        css={theme({
          color: 'white90',
          pb: [4, 4, 5, 5],
          maxWidth: layout.normal
        })}
        titleize={false}
      >
        What actually changes once you make the switch.
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
            title: 'Latency compounds at scale',
            description:
              'At 100k screenshots/month, 1.9\u2009s saved per request adds up to 53\u00a0hours of recovered pipeline time. Microlink is 33% faster on average, up to 4\u00d7 faster on simple pages.'
          },
          {
            number: '02',
            title: 'One API key, not five',
            description:
              'Screenshots, PDFs, metadata extraction, link previews, and remote JS in one integration. One bill, one set of docs, no glue code.'
          },
          {
            number: '03',
            title: '4.6\u00d7 more requests for $10\u00a0more',
            description:
              'ScreenshotAPI Startup: 10,000 screenshots for $29/month. Microlink: 46,000 requests for $39. Same $10\u00a0more, 4.6\u00d7 the volume, and every request covers screenshots, PDF, metadata, and more.'
          },
          {
            number: '04',
            title: 'Open source, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed on GitHub. Read the code, fork it, or self-host. ScreenshotAPI is closed-source, with no way to inspect what runs against your\u00a0URLs.'
          },
          {
            number: '05',
            title: 'Drop screenshots anywhere, no backend',
            description:
              'embed=screenshot.url returns the image URL directly. Put it in an <img> tag, a CSS background-image, or Markdown. No storage layer, no server, no extra step.'
          },
          {
            number: '06',
            title: 'Marketing-ready screenshots in one call',
            description:
              'screenshot.overlay wraps any capture in a browser chrome frame with a custom gradient or image background. Presentation-ready visuals straight from the API, no Figma\u00a0needed.'
          }
        ].map(({ number, title, description }) => (
          <Flex
            key={number}
            css={theme({
              flexDirection: 'column',
              p: 4,
              borderRadius: 3,
              width: ['100%', '100%', 'calc(50% - 16px)', 'calc(50% - 16px)'],
              minWidth: '280px'
            })}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: '14px',
                color: 'white50',
                pb: 2
              })}
            >
              {number}
            </Text>
            <Text
              css={theme({
                fontWeight: 'bold',
                fontSize: [2, 2, 3, 3],
                color: 'white',
                pb: 2,
                lineHeight: 1
              })}
            >
              {title}
            </Text>
            <Text
              css={theme({ fontSize: '18px', color: 'white80', lineHeight: 2 })}
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
 * Where ScreenshotAPI Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotapi-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>ScreenshotAPI</GradientText> <br /> Might Be the
        Right Choice
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
            title: 'You need screenshots on a schedule',
            description:
              'ScreenshotAPI supports cron-based scheduling: hourly, daily, weekly, or any custom expression, straight from the dashboard. Microlink handles on-demand captures and does not include a built-in\u00a0scheduler.'
          },
          {
            title: 'You are processing URLs in bulk',
            description:
              'ScreenshotAPI accepts JSON payloads or CSV uploads for batch jobs, with pause, resume, and cancel controls, plus an email notification when the run finishes. Microlink does not have native bulk\u00a0processing.'
          },
          {
            title: 'You need page-scroll video output',
            description:
              'ScreenshotAPI records a scrolling page as WebM, MP4, or GIF with configurable speed, direction, and duration across multiple viewports. Microlink does not produce scrolling video\u00a0captures.'
          },
          {
            title: 'You need fine-grained resource control',
            description:
              'ScreenshotAPI lets you block JS, stylesheets, images, fonts, XHR, fetch, WebSockets, and more, each with its own toggle. Microlink covers ad blocking and CSS-selector hiding but not per-resource-type\u00a0controls.'
          },
          {
            title: 'You live in Zapier, Make, or n8n',
            description:
              'ScreenshotAPI ships first-class connectors for Zapier, Make.com, n8n, Google Sheets, viaSocket, and Pipedream. Microlink has fewer no-code connectors today (more on the\u00a0way).'
          },
          {
            title: 'You want screenshots sent to your own bucket',
            description:
              'Every paid ScreenshotAPI plan can push captures directly to Amazon S3, Wasabi, or Google Cloud Storage. Microlink returns the image in the API response and does not include native storage\u00a0upload.'
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
        4.6&times; the volume. <GradientText>Just $10&nbsp;more.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        ScreenshotAPI&nbsp;Startup is $29 for 10,000 screenshots. Microlink is
        $39 for 46,000 requests. <b>$10&nbsp;more. 4.6&times;&nbsp;more.</b>
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
                'No rate limit on any paid plan',
                '240+ edge nodes, 99.9%\u00a0SLA',
                'Open-source core (MIT licensed)',
                '$0.00085/request \u2014 10\u00d7 cheaper than ScreenshotAPI\u00a0Essentials'
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
            ScreenshotAPI
          </Badge>
          <PriceAmount>
            $29
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
              '40\u00a0req/min rate limit on Startup',
              '$0.008 per extra screenshot',
              'Screenshots and PDF only \u2014 no metadata, previews, or remote\u00a0JS',
              'No-code integrations (Zapier, Make, n8n)',
              'BYOB storage (S3/Wasabi/GCS, all paid plans)'
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
        Prices stay low because{' '}
        <Link href='/enterprise'>enterprise clients</Link> processing millions
        of requests a month cover the infrastructure. Indie devs and startups
        get the same 240+ edge network at a fraction of the cost.
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
      py: 5,
      background: `radial-gradient(ellipse at 65% 0%, rgba(140, 27, 171, 0.35) 0%, transparent 65%), ${colors.gray9}`,
      borderTop: `${borders[1]} ${colors.white10}`
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
        Make the switch in minutes
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
        <b css={theme({ color: 'white' })}>
          Swap the endpoint. Keep your code.
        </b>
        <br />
        <br />
        Change the host and the key, and your integration keeps working.
        <br />
        Your first{' '}
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day are free</b>, no
        credit card, no time limit.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <Button
          href='/screenshot'
          css={theme({ fontSize: 2, px: 5, py: 3 })}
          style={{
            background:
              'linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(192, 63, 162, 0.45)'
          }}
        >
          <Caps>Start Building Free</Caps>
        </Button>
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
    questions={[
      {
        question: 'Is there a free ScreenshotAPI.net alternative?',
        answer: (
          <>
            <div>
              Yes. Microlink's <Link href='/#pricing'>free tier</Link> gives you
              50&nbsp;requests/day with no credit card and no expiry date. Same
              API, same quality, same 240+ edge network as paid plans.
            </div>
            <div>
              ScreenshotAPI's free trial is 100&nbsp;screenshots that expire
              after 7&nbsp;days. After just 2&nbsp;days on Microlink's free
              tier, you've already passed that total, and the counter resets
              every morning.
            </div>
          </>
        )
      },
      {
        question:
          'Does Microlink produce the same screenshot quality as ScreenshotAPI?',
        answer: (
          <>
            <div>
              Both use Chromium under the hood. Microlink applies optimal
              compression by default so output quality is high without manual
              tuning. ScreenshotAPI also produces good results and supports
              retina 2&times; captures up to 5K&nbsp;resolution for pixel-dense
              output.
            </div>
          </>
        )
      },
      {
        question: 'How do I migrate from ScreenshotAPI to Microlink?',
        answer: (
          <>
            <div>
              ScreenshotAPI sends GET requests with query params: <i>token</i>,{' '}
              <i>url</i>, <i>width</i>, <i>height</i>, <i>output</i>,{' '}
              <i>full_page</i>. Microlink accepts the same concepts under its
              own parameter names. Change the host and the key, and most
              integrations keep working. The{' '}
              <Link href='/docs/api/parameters/screenshot'>
                screenshot docs
              </Link>{' '}
              cover every parameter with examples.
            </div>
            <div>
              Paste your existing code into any LLM and ask it to migrate to
              Microlink. Or email{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
              and we'll help directly.
            </div>
          </>
        )
      },
      {
        question: 'Does Microlink do more than screenshots?',
        answer: (
          <>
            <div>
              Yes. One API key gives you screenshots, PDF generation,
              Open&nbsp;Graph and metadata extraction, link previews (via the
              React/Vue/JS SDK), remote JavaScript execution, and Lighthouse
              audits. ScreenshotAPI covers screenshots and PDFs only. Anything
              else requires a separate service.
            </div>
          </>
        )
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
              <Link href='https://github.com/microlinkhq/mql'>MQL</Link> (query
              language), and{' '}
              <Link href='https://github.com/microlinkhq/browserless'>
                Browserless
              </Link>{' '}
              (headless browser). Read the code, fork it, or run it yourself.
            </div>
            <div>
              ScreenshotAPI is closed-source. There is no way to inspect the
              code that handles your URLs.
            </div>
          </>
        )
      },
      {
        question: 'How does ScreenshotAPI pricing compare to Microlink?',
        answer: (
          <>
            <div>
              ScreenshotAPI Essentials: $9/month for 1,000&nbsp;screenshots at
              $0.009 each. Startup: $29/month for 10,000 with a 40&nbsp;req/min
              cap. Microlink: $39/month for 46,000&nbsp;requests at $0.00085
              each, no per-minute cap.
            </div>
            <div>
              Per request, Microlink is 10.6&times; cheaper than ScreenshotAPI
              Essentials and 3.4&times; cheaper than Startup. Enterprise clients
              running millions of requests fund the infrastructure, which is how
              indie devs get the same global edge network at these prices.
            </div>
          </>
        )
      },
      {
        question: 'Does Microlink throttle requests?',
        answer: (
          <>
            <div>
              Paid plans have no requests-per-minute cap. Burst as high as your
              concurrency allows. The only limit is your monthly quota.
            </div>
            <div>
              ScreenshotAPI enforces rate limits on every plan: 20&nbsp;req/min
              on Essentials, 40 on Startup, 80 on Business. That cap can
              bottleneck batch jobs or high-traffic embed workflows.
            </div>
          </>
        )
      },
      {
        question: 'How does Microlink handle cookie banners and ads?',
        answer: (
          <>
            <div>
              Both Microlink and ScreenshotAPI block ads and remove cookie
              banners. ScreenshotAPI gives you 15+ resource-type toggles: block
              JS, stylesheets, fonts, XHR, fetch, WebSockets, and more,
              individually. Microlink uses the{' '}
              <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter
              and custom CSS/JS injection to dismiss consent dialogs before
              capture.
            </div>
            <div>
              Use{' '}
              <Link href='/docs/api/parameters/screenshot/hide'>
                screenshot.hide
              </Link>{' '}
              to remove any element by CSS selector, whether that's a sticky
              banner, a chat widget, or a promo overlay.
            </div>
          </>
        )
      },
      {
        question: 'What SLA does Microlink offer?',
        answer: (
          <>
            <div>
              Microlink guarantees 99.9% uptime with a formal SLA. Requests are
              served from 240+ Cloudflare edge nodes, so latency stays low
              regardless of where your users are located. ScreenshotAPI runs on
              Google Cloud Platform and does not publish a formal SLA or CDN
              edge distribution.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ---------------------------------------------------------------------------
 * Head / SEO
 * --------------------------------------------------------------------------- */

export const Head = () => (
  <Meta
    title='ScreenshotAPI.net Alternative | Microlink Screenshot API'
    description='Microlink is 33% faster than ScreenshotAPI on average, costs $0.00085/request (vs $0.009), and covers screenshots, PDF, metadata, and link previews in one API. Free tier, no credit card.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotAPI.net Alternative — Microlink Screenshot API',
        description:
          'Compare Microlink and ScreenshotAPI. Microlink is 33% faster on average, up to 4× faster on simple pages, and includes screenshots, PDF generation, metadata extraction, and link previews in one API at $0.00085 per request.',
        url: 'https://microlink.io/alternative/screenshotapi',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Microlink compare to ScreenshotAPI for screenshot quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services produce high-quality screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and is 33% faster on average — up to 4× faster on full-page captures — due to its 240+ edge node infrastructure.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best alternative to ScreenshotAPI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink is a full headless browser API that replaces ScreenshotAPI for screenshots and adds PDF generation, metadata extraction, link previews, and remote JS execution — all in one API with one key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from ScreenshotAPI to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. ScreenshotAPI uses GET with query params (token, url, width, height, output). Microlink accepts similar parameters. Most migrations involve updating the endpoint and key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a free ScreenshotAPI.net alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's free tier gives you 50 requests/day with no credit card and no expiry. ScreenshotAPI's free trial is 100 screenshots that expire after 7 days. After 2 days on Microlink's free tier you've already exceeded that total."
            }
          },
          {
            '@type': 'Question',
            name: 'How does ScreenshotAPI pricing compare to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ScreenshotAPI Startup is $29/month for 10,000 screenshots with a 40 req/min cap. Microlink is $39/month for 46,000 requests at $0.00085 each, with no per-minute rate limit. That is 4.6× more volume for $10 more, and 10.6× cheaper per request than ScreenshotAPI Essentials.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Microlink throttle requests?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paid plans have no requests-per-minute cap. The only limit is the monthly request quota. ScreenshotAPI enforces rate limits on every plan: 20 req/min on Essentials, 40 on Startup, 80 on Business.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I use the screenshot API without a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's embed mode returns a direct image URL you can put in an img tag, CSS background-image, or Markdown with no backend or storage layer needed."
            }
          },
          {
            '@type': 'Question',
            name: 'What output formats does Microlink support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PNG, JPEG, and WebP for still screenshots, animated GIF and MP4 video for motion captures, and PDF generation — all from the same API endpoint.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Microlink handle cookie banners and ads?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services support ad blocking and cookie banner removal. ScreenshotAPI provides 15+ resource-type toggles. Microlink uses the adblock parameter, custom CSS/JS injection, and screenshot.hide to remove elements by CSS selector.'
            }
          },
          {
            '@type': 'Question',
            name: 'What SLA does Microlink offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink guarantees 99.9% uptime with a formal SLA, served from 240+ Cloudflare edge nodes. ScreenshotAPI runs on Google Cloud Platform and does not publish a formal SLA.'
            }
          }
        ]
      }
    ]}
  />
)

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

const ScreenshotAPIPage = () => (
  <Layout>
    <Hero />
    <SpeedSection />
    <ComparisonSection />
    <WhySwitchSection />
    <PricingSection />
    <HonestySection />
    <CTASection />
    <FAQSection />
  </Layout>
)

export default ScreenshotAPIPage
