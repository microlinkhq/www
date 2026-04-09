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
    screenshotone: {
      name: 'ScreenshotOne',
      summary: {
        avgColdDuration: 7711.14,
        totalColdDuration: 53977.99
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 12695.34 },
        { url: 'https://example.com', coldDuration: 3134.84 },
        { url: 'https://stripe.com', coldDuration: 5677.9 },
        { url: 'https://screenshotone.com', coldDuration: 12138.63 },
        { url: 'https://news.ycombinator.com', coldDuration: 6857.3 },
        { url: 'https://github.com/trending', coldDuration: 6058.52 },
        { url: 'https://www.framer.com', coldDuration: 7415.46 }
      ]
    }
  }
}

const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotone: colors.pink6
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
  { feature: 'Screenshot capture', microlink: true, screenshotone: true },
  { feature: 'Full-page screenshots', microlink: true, screenshotone: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    screenshotone: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotone: true,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, screenshotone: true },
  { feature: 'Animated GIF output', microlink: true, screenshotone: true },
  { feature: 'Video output', microlink: true, screenshotone: true },
  { feature: 'Dark/light mode capture', microlink: true, screenshotone: true },
  { feature: 'Device emulation presets', microlink: true, screenshotone: true },
  { feature: 'Custom JS/CSS injection', microlink: true, screenshotone: true },
  { feature: 'Custom HTTP headers', microlink: true, screenshotone: true },
  { feature: 'Custom cookies', microlink: true, screenshotone: true },
  {
    feature: 'Hide elements (CSS selectors)',
    microlink: true,
    screenshotone: true
  },
  {
    feature: 'Click/scroll interactions',
    microlink: true,
    screenshotone: true
  },
  { feature: 'Wait for selector', microlink: true, screenshotone: true },
  { feature: 'Cookie banner blocking', microlink: true, screenshotone: true },
  { feature: 'Ad blocking', microlink: true, screenshotone: true },
  { feature: 'Signed request URLs', microlink: true, screenshotone: true },
  { feature: 'Built-in response cache', microlink: true, screenshotone: true },
  { feature: 'MCP server', microlink: true, screenshotone: true },
  { feature: 'Markdown rendering', microlink: true, screenshotone: true },
  { feature: 'Custom proxy support', microlink: true, screenshotone: true },
  {
    feature: 'Built-in proxy',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  { feature: 'Remote JS execution', microlink: true, screenshotone: false },
  { feature: '240+ CDN edge nodes', microlink: true, screenshotone: false },
  { feature: 'GPU rendering', microlink: 'on demand', screenshotone: true },
  {
    feature: 'No-code integrations (Zapier, Make\u2026)',
    microlink: 'partial',
    screenshotone: true
  },
  { feature: 'Async + webhooks', microlink: false, screenshotone: true },
  { feature: 'S3 direct upload', microlink: false, screenshotone: true },
  { feature: 'Bulk screenshots', microlink: false, screenshotone: true },
  { feature: 'Geolocation targeting', microlink: false, screenshotone: true },
  {
    feature: 'OpenAI Vision integration',
    microlink: false,
    screenshotone: true
  },
  {
    feature: 'Team organizations / roles',
    microlink: false,
    screenshotone: true
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
            ScreenshotOne
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotone, highlight, note }) => (
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
                <CellValue value={screenshotone} />
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
        The fastest <GradientText>Screenshot One</GradientText> alternative
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
        <b>ScreenshotOne</b> does one thing: render screenshots.{' '}
        <b>Microlink</b> does many things. That's exactly why it's been
        battle-tested across enough edge cases to make its screenshot engine{' '}
        <b>88% faster on average</b>.
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
      css={theme({ bg: 'white', pt: [3, 3, 4, 4] })}
    >
      <SectionInner>
        <Subhead
          css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4] })}
          titleize={false}
        >
          <GradientText>Up to 2&times; faster</GradientText> response times
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

        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            gap: [3, 3, 4, 4],
            alignItems: 'flex-start',
            width: '100%'
          })}
        >
          <Box css={theme({ flex: 1, minWidth: 0 })}>
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

          <Box css={theme({ flex: 1, minWidth: 0 })}>
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
                pt: 3,
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

      <Flex
        css={theme({
          pt: [5, 5, 6, 6],
          pb: [2, 2, 3, 3],
          px: 4,
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
            value: '88%',
            label: 'Faster on average'
          },
          {
            icon: Code,
            value: 'Open source',
            label: 'Transparent & auditable'
          },
          {
            icon: Gift,
            value: 'Free',
            label: 'To start'
          },
          {
            icon: TrendingUp,
            value: '4\u00d7 requests',
            label: 'for half the price'
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
        Why Developers Switch
      </Subhead>
      <Caption
        css={theme({
          color: 'black60',
          pb: [4, 4, 5, 5],
          maxWidth: layout.normal
        })}
        titleize={false}
      >
        The top reasons teams move from ScreenshotOne to Microlink.
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
            title: 'API latency compounds at scale',
            description:
              'At 100k screenshots/month, saving ~2\u2009s per request recovers over 55\u00a0hours of pipeline time. Microlink is 88% faster on average — and up to 2\u00d7 faster on complex, full-page captures.'
          },
          {
            number: '02',
            title: 'One API key, not five',
            description:
              'Microlink handles screenshots, PDFs, metadata extraction, link previews, and remote JS in a single integration. One bill, one set of docs, no glue code between services.'
          },
          {
            number: '03',
            title: '4.6\u00d7 more requests for nearly half the price',
            description:
              'ScreenshotOne\u2019s recommended plan: 10,000 screenshots for $79/month. Microlink: 46,000 requests for $45. That\u2019s the volume ScreenshotOne charges $259\u00a0for.'
          },
          {
            number: '04',
            title: 'Open-source, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed. Inspect the core engine, fork it, or self-host. No black boxes, no vendor lock-in — just code you can read.'
          },
          {
            number: '05',
            title: 'Drop screenshots anywhere — no backend',
            description:
              'embed=screenshot.url returns the image URL directly. Drop it in an <img> tag, a CSS background-image, or Markdown. No storage layer, no server, no extra step.'
          },
          {
            number: '06',
            title: 'Presentation-ready screenshots in one call',
            description:
              'screenshot.overlay wraps any capture in a browser chrome frame with a custom gradient or image background. Marketing-ready visuals straight from the API — no Figma, no design tools.'
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
 * Where ScreenshotOne Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotone-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Screenshot One</GradientText> <br /> Might Be the
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
            title: 'You need S3 direct upload with webhooks',
            description:
              'ScreenshotOne can upload screenshots directly to S3-compatible storage and notify you via webhook when done. Microlink does not have native S3\u00a0upload.'
          },
          {
            title: 'GPU rendering is a requirement',
            description:
              'ScreenshotOne offers opt-in GPU rendering for sites that rely on WebGL or heavy canvas operations. Microlink does not currently support GPU\u00a0rendering.'
          },
          {
            title: 'You want built-in OpenAI Vision analysis',
            description:
              'ScreenshotOne integrates with GPT-4V natively — capture and analyze a screenshot in one API call. Microlink does not have this\u00a0integration.'
          },
          {
            title: 'No-code integrations are critical',
            description:
              'ScreenshotOne has first-class integrations with Make, Zapier, n8n, Bubble, and Clay. Microlink has fewer no-code connectors (coming soon\u2026 we\u00a0promise!).'
          },
          {
            title: 'Team access control',
            description:
              'ScreenshotOne supports organizations with role-based access. Microlink does not have a team/organization\u00a0feature.'
          },
          {
            title: 'Scheduled or recurring captures',
            description:
              'ScreenshotOne lets you schedule screenshots to run on a recurring basis straight from the dashboard. Microlink focuses on on-demand captures and does not include a built-in\u00a0scheduler.'
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
        More requests. <GradientText>Half the price.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Get <b>4.6&times; more</b> for nearly half the price.
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
                'Equivalent to ScreenshotOne\u2019s $259 plan by\u00a0volume'
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
            ScreenshotOne
          </Badge>
          <PriceAmount>
            $79
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
              '80\u00a0requests per minute cap',
              '$0.006 per extra screenshot',
              'Screenshots only — no PDF, metadata, or previews',
              'GPU rendering (opt-in)',
              'S3 upload + webhooks'
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
      borderBottom: `${borders[1]} ${colors.white20}`,
      ...theme({ py: 5 })
    }}
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
        Replace your ScreenshotOne endpoint. Keep your code.
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
        question: 'Is there a free ScreenshotOne alternative?',
        answer: (
          <>
            <div>
              Yes. Microlink's <Link href='/#pricing'>free tier</Link> includes
              50&nbsp;requests/day with no credit card and no time limit. You
              get the same API, the same quality, and the same 240+ edge network
              as paid plans.
            </div>
            <div>
              ScreenshotOne also offers a free tier, but it's limited to
              100&nbsp;screenshots with no daily renewal — once they're gone,
              you need a paid plan.
            </div>
          </>
        )
      },
      {
        question:
          'How does Microlink compare to ScreenshotOne for screenshot quality?',
        answer: (
          <>
            <div>
              Both services produce high-quality screenshots using Chromium.
              Microlink serves maximum quality with optimal compression by
              default — no manual parameter tuning needed. ScreenshotOne also
              delivers good quality, with optional GPU rendering for WebGL-heavy
              sites.
            </div>
          </>
        )
      },
      {
        question: 'Can I migrate from ScreenshotOne to Microlink easily?',
        answer: (
          <>
            <div>
              Yes. Microlink's screenshot API accepts similar parameters (URL,
              viewport, format, full-page, selectors). Most migrations involve
              updating the API endpoint and key. The{' '}
              <Link href='/docs/api/parameters/screenshot'>
                screenshot docs
              </Link>{' '}
              include examples for every parameter.
            </div>
            <div>
              Just ask to your favorite LLM client to migrate your code. Or, if
              you need help migrating, contact{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      },
      {
        question:
          'What does \u201Cplatform vs. point solution\u201D mean in practice?',
        answer: (
          <>
            <div>
              With Microlink, one API key and one integration gives you
              screenshots, PDF generation, metadata/Open Graph extraction, link
              previews (via SDK), remote JavaScript execution, and Lighthouse
              audits.
            </div>
          </>
        )
      },
      {
        question: 'Is Microlink really open source?',
        answer: (
          <>
            <div>
              The core engine components are MIT-licensed and available on
              GitHub:{' '}
              <Link href='https://github.com/microlinkhq/metascraper'>
                Metascraper
              </Link>{' '}
              (metadata extraction),{' '}
              <Link href='https://github.com/microlinkhq/mql'>MQL</Link>{' '}
              (Microlink Query Language), and{' '}
              <Link href='https://github.com/microlinkhq/browserless'>
                Browserless
              </Link>{' '}
              (headless browser). Enterprise teams can audit, fork, and
              contribute.
            </div>
            <div>
              ScreenshotOne is closed-source. There is no way to inspect or
              audit the engine processing your requests.
            </div>
            <div>
              We know for sure that some of our competitors are using our code
              to run similar services. We're glad to see that our work is
              helping the community.
            </div>
          </>
        )
      },
      {
        question: 'How much does ScreenshotOne cost compared to Microlink?',
        answer: (
          <>
            <div>
              ScreenshotOne's recommended plan is $79/month for
              10,000&nbsp;screenshots with an 80&nbsp;requests-per-minute cap.
              Microlink's comparable plan is $45/month for 46,000&nbsp;requests
              — 4.6\u00d7 more volume for nearly half the price — with no
              per-minute rate limit.
            </div>
            <div>
              Microlink can offer lower prices because enterprise clients
              running millions of requests a month cover the infrastructure
              cost. Indie devs and startups benefit from the same global edge
              network without the enterprise price tag.
            </div>
          </>
        )
      },
      {
        question: 'Does Microlink have rate limits?',
        answer: (
          <>
            <div>
              Paid plans have no requests-per-minute cap — you can burst as high
              as your concurrency allows. The only limit is your monthly request
              quota.
            </div>
            <div>
              ScreenshotOne enforces a per-minute rate limit (80&nbsp;req/min on
              the $79 plan), which can bottleneck batch pipelines or
              high-traffic embed scenarios.
            </div>
          </>
        )
      },
      {
        question: 'How does Microlink handle sites with cookie banners or ads?',
        answer: (
          <>
            <div>
              Both Microlink and ScreenshotOne support ad blocking and cookie
              banner removal. In Microlink you enable them with{' '}
              <Link href='/docs/api/parameters/adblock'>adblock</Link> and
              custom CSS/JS injection to dismiss consent dialogs before the
              screenshot is taken.
            </div>
            <div>
              You can also use{' '}
              <Link href='/docs/api/parameters/screenshot/hide'>
                screenshot.hide
              </Link>{' '}
              to remove specific elements by CSS selector — useful for sticky
              banners, chat widgets, or any overlay that clutters the capture.
            </div>
          </>
        )
      },
      {
        question: 'What uptime and SLA does Microlink guarantee?',
        answer: (
          <>
            <div>
              Microlink guarantees 99.9% uptime backed by a formal SLA. Requests
              are served from 240+ Cloudflare edge nodes worldwide, so latency
              and availability stay consistent regardless of where the caller is
              located.
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
    title='ScreenshotOne Alternative'
    description='Microlink captures screenshots up to 2× faster than ScreenshotOne — 88% faster on average — plus PDF, metadata, and link previews in one API. Free to start.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotOne Alternative — Microlink Screenshot API',
        description:
          'Compare Microlink and ScreenshotOne screenshot APIs. Microlink is 88% faster on average — up to 2× faster on full-page captures — with screenshots, PDF generation, metadata extraction, and more in one API.',
        url: 'https://microlink.io/alternative/screenshotone',
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
            name: 'How does Microlink compare to ScreenshotOne for screenshot quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services produce high-quality screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and is 88% faster on average — up to 2× faster on full-page captures — due to its 240+ edge node infrastructure.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best alternative to ScreenshotOne?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink is a full headless browser API that replaces ScreenshotOne for screenshots and adds PDF generation, metadata extraction, link previews, and remote JS execution — all in one API with one key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from ScreenshotOne to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Microlink accepts similar parameters. Most migrations involve updating the API endpoint and key. SDKs are available for JavaScript, Python, Ruby, PHP, and Go.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a free ScreenshotOne alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's free tier includes 50 requests/day with no credit card and no time limit — the same API, quality, and 240+ edge network as paid plans."
            }
          },
          {
            '@type': 'Question',
            name: 'How much does ScreenshotOne cost compared to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "ScreenshotOne's recommended plan is $79/month for 10,000 screenshots with an 80 req/min cap. Microlink offers 46,000 requests for $45/month with no per-minute rate limit — 4.6× more volume for nearly half the price."
            }
          },
          {
            '@type': 'Question',
            name: 'Does Microlink have rate limits?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paid plans have no requests-per-minute cap. The only limit is the monthly request quota. ScreenshotOne enforces a per-minute rate limit which can bottleneck batch pipelines.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I use the screenshot API without running my own server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's embed mode returns a direct image URL you can drop into an <img> tag, CSS background-image, or Markdown — no backend or storage layer needed."
            }
          },
          {
            '@type': 'Question',
            name: 'What output formats does the Microlink screenshot API support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink supports PNG, JPEG, and WebP for still screenshots, animated GIF and video (MP4) for motion captures, and PDF generation — all from the same API endpoint.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Microlink handle sites with cookie banners or ads?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink supports ad blocking and cookie banner removal via the adblock parameter and custom CSS/JS injection. You can also hide specific elements by CSS selector using screenshot.hide.'
            }
          },
          {
            '@type': 'Question',
            name: 'What uptime and SLA does Microlink guarantee?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are served from 240+ Cloudflare edge nodes worldwide for consistent latency and availability.'
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

const ScreenshotOnePage = () => (
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

export default ScreenshotOnePage
