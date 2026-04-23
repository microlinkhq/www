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
    feature: 'Antibot detection (30+ providers)',
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
    feature: 'Scheduled screenshot workflows',
    microlink: false,
    screenshotapi: true,
    note: 'Official automation guides exist for Zapier, Make, and n8n workflows.'
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
        The <GradientText>ScreenshotAPI</GradientText> alternative
        <br />
        for broader browser workflows
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
        <b>ScreenshotAPI</b> already covers screenshots, PDFs, bulk capture, and
        scraping workflows. When you need metadata, link previews, and a broader
        browser API from the same key, <b>Microlink</b> covers all of that and
        is <b>33% faster than ScreenshotAPI on average</b>.
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
        <RaceHero aria-label='Live benchmark race: Microlink vs ScreenshotAPI screenshot speed'>
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
          from a New York server. All providers were triggered simultaneously,
          the benchmark ran 10&nbsp;times at different hours, the single slowest
          run was dropped to remove outliers, and non-200 responses were
          excluded. Averaged across the suite, Microlink is 33% faster; on
          lighter pages the gap reaches 4&times;.
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
    title: 'Latency compounds at scale',
    description: (
      <>
        At 100k screenshots/month, <b>1.9{'\u2009'}s saved per request</b> adds
        up to <b>53&nbsp;hours</b> of recovered pipeline time. Microlink is{' '}
        <b>33% faster on average</b>, up to 4× faster on simple pages.
      </>
    )
  },
  {
    number: '02',
    title: 'One API key, not five',
    description: (
      <>
        Screenshots, PDFs, metadata extraction, link previews, and remote JS in{' '}
        <b>one integration</b>. One bill, one set of docs, <b>no glue code</b>.
      </>
    )
  },
  {
    number: '03',
    title: '4.6× more requests for $16\u00a0more',
    description: (
      <>
        ScreenshotAPI Startup: 10,000 screenshots for <b>$29/month</b>.
        Microlink: <b>46,000 requests for $45</b>. Just $16&nbsp;more, 4.6× the
        volume, and every request covers screenshots, PDF, metadata, and more.
      </>
    )
  },
  {
    number: '04',
    title: 'Open source, fully auditable',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT-licensed</b> on GitHub.
        Read the code, fork it, or self-host. ScreenshotAPI is closed-source,
        with <b>no way to inspect</b> what runs against your&nbsp;URLs.
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
        {'\u2026'}) on every request. No middleware, no extra parameter — make a
        query and it just&nbsp;works.
      </>
    )
  },
  {
    number: '06',
    title: 'Marketing-ready screenshots in one call',
    description: (
      <>
        <b>screenshot.overlay</b> wraps any capture in a browser chrome frame
        with a custom gradient or image background.{' '}
        <b>Presentation-ready visuals</b> straight from the API, no
        Figma&nbsp;needed.
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
        The top reasons teams move from ScreenshotAPI to Microlink.
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
 * Where ScreenshotAPI Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'Scheduled screenshot workflows',
    description:
      'ScreenshotAPI has a dedicated scheduling surface and publishes official automation guides for Zapier, Make, and n8n. Microlink handles on-demand captures and does not include a built-in scheduler.'
  },
  {
    title: 'Bulk URL processing',
    description:
      'ScreenshotAPI accepts JSON payloads or CSV uploads for batch jobs, with pause, resume, and cancel controls, plus an email notification when the run finishes. Microlink does not have native bulk\u00a0processing.'
  },
  {
    title: 'Page-scroll video output',
    description:
      'ScreenshotAPI records a scrolling page as WebM, MP4, or GIF with configurable speed, direction, and duration across multiple viewports. Microlink does not produce scrolling video\u00a0captures.'
  },
  {
    title: 'Fine-grained resource control',
    description:
      'ScreenshotAPI lets you block JS, stylesheets, images, fonts, XHR, fetch, WebSockets, and more, each with its own toggle. Microlink covers ad blocking and CSS-selector hiding but not per-resource-type\u00a0controls.'
  },
  {
    title: 'Zapier, Make, or n8n integrations',
    description:
      'ScreenshotAPI publishes official integrations and workflow guides for Zapier, Make.com, n8n, Google Sheets, viaSocket, and Pipedream. Microlink has fewer no-code connectors today.'
  },
  {
    title: 'Screenshots sent to your own bucket',
    description:
      'ScreenshotAPI supports BYOB storage integrations for Amazon S3, Wasabi, and Google Cloud Storage. Microlink returns the image in the API response and does not include native storage upload.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotapi-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>ScreenshotAPI</GradientText>
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
 * ScreenshotAPI pricing: https://www.screenshotapi.net/pricing
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More requests. <GradientText>One broader API.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Get <b>4.6&times; more</b> for just $16&nbsp;more.
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
                'Screenshots, PDF, metadata, link previews, remote\u00a0JS',
                'Free: 50\u00a0requests/day, no credit card, no expiry',
                'No rate limit on any paid plan',
                '240+ edge nodes, 99.9%\u00a0SLA',
                'Open-source core (MIT licensed)',
                '~$0.00098/request \u2014 9\u00d7 cheaper than ScreenshotAPI\u00a0Essentials'
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
              'Screenshots, PDF, bulk capture, and scraping',
              'Official Zapier, Make, and n8n workflows',
              'BYOB storage (S3/Wasabi/GCS)'
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
        Bring richer browser outputs into the same integration
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
    questions={[
      {
        question: 'Is there a free ScreenshotAPI.net alternative?',
        answer: (
          <>
            <div>
              Yes. Microlink's <Link href='/pricing'>free tier</Link> gives you
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
              <Link href='/docs/guides/screenshot'>screenshot docs</Link> cover
              every parameter with examples.
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
              audits. ScreenshotAPI already handles screenshots, PDFs, bulk
              capture, and scraping workflows, but metadata extraction, link
              previews, and remote JS all still sit outside its core surface.
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
              cap. Microlink: $45/month for 46,000&nbsp;requests at ~$0.00098
              each, no per-minute cap.
            </div>
            <div>
              Per request, Microlink is 9&times; cheaper than ScreenshotAPI
              Essentials and 3&times; cheaper than Startup. Enterprise clients
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
    title='ScreenshotAPI Alternative for Metadata, Previews, and More'
    description='ScreenshotAPI already covers screenshots, PDFs, bulk capture, and scraping. Microlink adds metadata, link previews, and remote JS in the same API while benchmarking 33% faster on average.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotAPI Alternative for Metadata, Previews, and More | Microlink',
        description:
          'Compare Microlink and ScreenshotAPI when you want screenshots, PDFs, bulk capture, and scraping plus richer browser outputs. Microlink is 33% faster on average and adds metadata extraction, link previews, and remote JS in one API.',
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
              text: 'Microlink is a full headless browser API that consolidates screenshots, PDF generation, metadata extraction, link previews, and remote JS execution in one API with one key.'
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
              text: 'ScreenshotAPI Startup is $29/month for 10,000 screenshots with a 40 req/min cap. Microlink is $45/month for 46,000 requests at ~$0.00098 each, with no per-minute rate limit. That is 4.6× more volume for $16 more, and 9× cheaper per request than ScreenshotAPI Essentials.'
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
    <WhySwitchSection />
    <PricingSection />
    <CTASection />
    <ComparisonSection />
    <HonestySection />
    <TryItSection />
    <FAQSection />
  </Layout>
)

export default ScreenshotAPIPage
