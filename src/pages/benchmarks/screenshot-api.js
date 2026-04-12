import {
  borders,
  layout,
  colors,
  space,
  theme,
  fontSizes,
  radii,
  breakpoints
} from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Check as CheckIcon } from 'react-feather'
import CaptionBase from 'components/patterns/Caption/Caption'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import RaceContainer from 'components/patterns/RaceContainer/RaceContainer'
import FaqComponent from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { withTitle } from 'helpers/hoc/with-title'
import { extractDomain } from 'helpers/extract-domain'
import { useBreakpoint } from 'components/hook/use-breakpoint'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const PROVIDER_NAMES = {
  microlink: 'Microlink',
  apiflash: 'ApiFlash',
  screenshotapi: 'ScreenshotAPI',
  screenshotmachine: 'ScreenshotMachine',
  screenshotone: 'ScreenshotOne',
  urlbox: 'Urlbox'
}

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
    apiflash: {
      name: PROVIDER_NAMES.apiflash,
      summary: {
        avgColdDuration: 9463.2,
        totalColdDuration: 66242.4
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 14232.91
        },
        {
          url: 'https://example.com',
          coldDuration: 1819.86
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5900.18
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 9802.49
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 1967.53
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 5365.86
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 27153.57
        }
      ]
    },
    microlink: {
      name: PROVIDER_NAMES.microlink,
      summary: {
        avgColdDuration: 4111.84,
        totalColdDuration: 28782.87
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6361.22
        },
        {
          url: 'https://example.com',
          coldDuration: 967.96
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3217.22
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 5474.39
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3435.08
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3059.69
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6267.31
        }
      ]
    },
    screenshotapi: {
      name: PROVIDER_NAMES.screenshotapi,
      summary: {
        avgColdDuration: 5915.71,
        totalColdDuration: 41409.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6143.4
        },
        {
          url: 'https://example.com',
          coldDuration: 4987.8
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5613.77
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 6805.46
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 5384.65
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 6174.08
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6300.83
        }
      ]
    },
    screenshotmachine: {
      name: PROVIDER_NAMES.screenshotmachine,
      summary: {
        avgColdDuration: 6099.77,
        totalColdDuration: 42698.4
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 9790.6
        },
        {
          url: 'https://example.com',
          coldDuration: 1321.19
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3167.16
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 12403.69
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 4328.76
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3898.21
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 7788.79
        }
      ]
    },
    screenshotone: {
      name: PROVIDER_NAMES.screenshotone,
      summary: {
        avgColdDuration: 7711.14,
        totalColdDuration: 53977.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 12695.34
        },
        {
          url: 'https://example.com',
          coldDuration: 3134.84
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5677.9
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 12138.63
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 6857.3
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 6058.52
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 7415.46
        }
      ]
    },
    urlbox: {
      name: PROVIDER_NAMES.urlbox,
      summary: {
        avgColdDuration: 7334.22,
        totalColdDuration: 51339.56
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 14952.83
        },
        {
          url: 'https://example.com',
          coldDuration: 2331.45
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3678.79
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 14975.56
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 4748.08
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4266.84
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6386.01
        }
      ]
    }
  }
}

const SERVICES = Object.keys(BENCHMARK_DATA.results)
const SORTED_SERVICES = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.avgColdDuration -
    BENCHMARK_DATA.results[b].summary.avgColdDuration
)

const SERVICE_COLORS = {
  microlink: colors.red6,
  apiflash: colors.orange6,
  screenshotapi: colors.grape7,
  screenshotmachine: colors.blue6,
  screenshotone: colors.pink6,
  urlbox: colors.teal6
}

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const SPACE_6 = `calc(${space[2]} - ${radii[1]})`
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_12 = `calc(${space[3]} - ${space[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`
const SPACE_20 = `calc(${space[3]} + ${space[1]})`
const SPACE_24 = `calc(${space[3]} + ${space[2]})`
const OFFSET_3 = `calc(${space[1]} - ${radii[1]} / 2)`
const NEGATIVE_SPACE_12 = `calc(${space[3]} * -0.75)`
const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_MEDIUM_MAX = `calc(${breakpoints[1]} - ${radii[1]} / 2)`
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`
const HERO_TITLE_FONT_SIZE = [
  fontSizes[3],
  `calc(${fontSizes[3]} + ${space[2]})`,
  `calc(${fontSizes[4]} - ${space[1]})`,
  fontSizes[4]
]
const SECTION_TITLE_FONT_SIZE = [
  fontSizes[3],
  `calc(${fontSizes[3]} + ${space[1]})`,
  `calc(${fontSizes[3]} + ${space[3]} - ${space[1]})`,
  `calc(${fontSizes[3]} + ${space[3]})`
]
const CAPTION_FONT_SIZE = [
  fontSizes[1],
  fontSizes[1],
  fontSizes[2],
  `calc(${fontSizes[2]} + ${radii[1]})`
]
const SUBSECTION_TITLE_FONT_SIZE = [
  `calc(${fontSizes[2]} + ${radii[1]})`,
  `calc(${fontSizes[2]} + ${space[1]})`,
  fontSizes[3],
  fontSizes[3]
]
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
const COMPARISON_SECTION_LABEL_CSS = theme({
  fontSize: 2,
  fontWeight: 'bold',
  letterSpacing: 0,
  color: 'black'
})

const ComparisonTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: ${SPACE_10} ${SPACE_14};
    ${theme({ textAlign: 'left', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      padding: ${space[2]} ${SPACE_10};
      ${theme({ fontSize: 0 })};
    }
  }

  th {
    ${theme({ fontFamily: 'mono', fontSize: 0, color: 'black' })};
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: ${borders[1]} ${colors.black10};
  }

  td {
    ${theme({ fontFamily: 'mono', color: 'black' })};
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

const UI_TAG_VARIANTS = {
  success: {
    color: 'green7',
    bg: 'green0',
    borderColor: 'green2'
  },
  warning: {
    color: 'yellow8',
    bg: 'yellow0',
    borderColor: 'yellow3'
  }
}

const SquareBadge = styled(Text).attrs({ as: 'span' })`
  ${({ $variant = 'success' }) => {
    const { bg, borderColor, color } =
      UI_TAG_VARIANTS[$variant] || UI_TAG_VARIANTS.success

    return theme({
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'mono',
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing: 0,
      bg,
      borderRadius: 2,
      border: 1,
      borderColor,
      px: 1,
      textTransform: 'uppercase',
      color
    })
  }};
`

const ProviderNameWithTag = styled('span')`
  ${theme({ display: 'inline-flex', alignItems: 'center', gap: 1 })};
`

const PerUrlTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  @media (max-width: ${BREAKPOINT_MEDIUM_MAX}) {
    display: none;
  }

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

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`

const MobileCards = styled('div')`
  ${theme({ display: 'none', flexDirection: 'column' })};
  gap: ${SPACE_12};

  @media (max-width: ${BREAKPOINT_MEDIUM_MAX}) {
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
  color: ${colors.black};
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
  color: ${({ $isMin, $isMax, $isSecond }) =>
    $isMin
      ? colors.green7
      : $isMax
        ? colors.red8
        : $isSecond
          ? colors.orange7
          : colors.black};
`

const CellHighlight = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'green7' })};
`

const CellLoser = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'red8' })};
`

const CellRunnerUp = styled('span')`
  ${theme({ color: 'orange7' })};
  font-weight: 600;
`

const Hero = () => (
  <BluePrintBackground as='section'>
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: [4, 4, 5, 5],
        pb: [4, 4, 5, 5],
        px: 4,
        gap: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          gap: [2, 2, 3, 3],
          mb: [2, 2, 3, 3]
        })}
      >
        <Subhead
          variant='gradient'
          forwardedAs='h1'
          css={theme({
            fontSize: HERO_TITLE_FONT_SIZE,
            textAlign: 'center'
          })}
        >
          The Screenshot API
          <br />
          Performance Benchmark
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            color: 'black',
            textAlign: 'center',
            width: '100%',
            fontSize: CAPTION_FONT_SIZE,
            px: [4, 4, 4, 0],
            maxWidth: layout.normal
          })}
        >
          Cold-start latency across 6&nbsp;providers and 7&nbsp;URLs.
          Zero&nbsp;caching.
          <br />
          Which is the fastest screenshot API?
        </Caption>
      </Flex>

      <RaceContainer
        benchmarkData={BENCHMARK_DATA}
        serviceColors={SERVICE_COLORS}
        highlightKey='microlink'
        flat
      />
    </Flex>
  </BluePrintBackground>
)

const MethodologyList = styled('ul')`
  ${theme({
    listStyle: 'none',
    p: 0,
    m: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })};
`

const MethodologyItem = styled('li')`
  ${theme({ position: 'relative', pl: SPACE_20 })};

  &::before {
    content: '';
    ${theme({
      position: 'absolute',
      left: 0,
      top: SPACE_14,
      width: SPACE_6,
      height: SPACE_6,
      borderRadius: '50%',
      bg: 'black'
    })};
  }

  @media (max-width: ${BREAKPOINT_MEDIUM_MAX}) {
    ${theme({ pl: 0 })};

    &::before {
      ${theme({ display: 'none' })};
    }
  }
`

const Methodology = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      bg: 'pinky',
      py: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        maxWidth: layout.large,
        px: [4, 4, 4, 0],
        mx: 'auto',
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        variant='gradient'
        css={theme({
          fontSize: SECTION_TITLE_FONT_SIZE,
          textAlign: 'left'
        })}
      >
        Benchmark methodology &amp; testing architecture
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        To ensure a strictly objective baseline, we built a reproducible testing
        suite targeting 6 screenshot API providers (
        <Link href='/screenshot'>Microlink</Link>, ApiFlash, ScreenshotAPI,
        ScreenshotMachine, ScreenshotOne, and Urlbox) against 7&nbsp;real-world
        URLs.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        Here is exactly how the data was captured and&nbsp;aggregated:
      </Text>
      <MethodologyList>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>True Cold Starts:</strong> Every request bypassed edge
            caching and warm browser pools. We measured the total round-trip
            latency: HTTP request to Headless Chrome boot to DOM render to
            pixel&nbsp;capture.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Concurrent Execution:</strong> All 6 APIs were triggered
            simultaneously for each target URL. If a target website (e.g.,
            Vercel or Stripe) experienced a latency spike or routing bottleneck,
            every screenshot provider faced the exact same&nbsp;conditions.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>10&times; Global Polling:</strong> To account for AWS/GCP
            load balancing and natural internet traffic fluctuations, the
            benchmark was executed 10 separate times at different hours of
            the&nbsp;day.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Heavy Browser Workloads:</strong> We didn't just test simple
            viewport captures. The payload configurations forced high{' '}
            <Link href='/docs/api/parameters/viewport'>
              device scale factors
            </Link>{' '}
            (Retina/2&times; resolution),{' '}
            <Link href='/tools/website-screenshot/full-page'>
              full-page scrolling
            </Link>
            , and active ad-blocking across a mix of static HTML and heavy
            React&nbsp;SPAs.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Outlier &amp; Error Mitigation:</strong> Real-world networks
            occasionally drop packets. To prevent a single anomalous DNS timeout
            (e.g., a 25,000&thinsp;ms spike) from corrupting the dataset, we
            systematically dropped the single slowest execution out of the
            10&nbsp;runs. Any request returning a non-200 HTTP error was also
            isolated and&nbsp;removed.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Final Aggregation:</strong> After cleaning the dataset, we
            calculated the strict avg cold duration per URL, and summed them to
            find the total cold duration to determine the fastest
            overall&nbsp;provider.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Image Parity:</strong> All screenshots were captured at the
            same resolution and quality settings per URL. The compression
            algorithms used by each provider produce nearly identical output
            quality, with no visible difference between them. Because the
            variance was negligible, we chose not to include image-quality
            metrics in this benchmark. On the caching side, warm-cache
            performance is also comparable across providers, with a few
            exceptions we plan to document in a future&nbsp;update.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black',
              lineHeight: 3
            })}
          >
            <strong>Public Data:</strong> All raw metrics, scripts, and
            configurations are{' '}
            <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
              public on GitHub
            </Link>
            . Anyone can inspect, reproduce, or challenge the&nbsp;results.
          </Text>
        </MethodologyItem>
      </MethodologyList>
      <CalloutBox>
        <SquareBadge $variant='warning' css={theme({ mb: 3 })}>
          Transparency note
        </SquareBadge>
        <Text>
          <strong>Regarding ApiFlash:</strong> During our testing, ApiFlash
          consistently struggled with the framer.com payload, returning response
          times approaching 30&nbsp;seconds. Because this metric was a
          significant outlier, we paused the benchmark publication and re-ran
          this specific configuration multiple times across different days and
          server locations. The response times remained consistently slow.
        </Text>
        <br />
        <Text>
          In the interest of absolute transparency and fairness to the other
          providers who successfully handled the complex DOM, we have chosen to
          publish the raw, unedited data exactly as it was&nbsp;recorded.
        </Text>
        <br />
        <Text>
          For context: if framer.com were excluded from the dataset, ApiFlash's
          average cold duration would drop from{' '}
          <span css={theme({ fontFamily: 'mono' })}>9,702.57&thinsp;ms</span> to{' '}
          <span css={theme({ fontFamily: 'mono' })}>6,731.14&thinsp;ms</span>,
          moving it from last place to <strong>4th in average latency</strong>{' '}
          (behind Microlink, ScreenshotAPI, and ScreenshotMachine). Its total
          cold duration would fall to{' '}
          <span css={theme({ fontFamily: 'mono' })}>40,386.86&thinsp;ms</span>,
          ranking <strong>4th overall</strong> — right
          behind&nbsp;ScreenshotMachine.
        </Text>
      </CalloutBox>
      <Text
        css={theme({
          fontSize: [0, 0, 1, 1],
          color: 'black60'
        })}
      >
        The complete testing data is{' '}
        <Link href='https://github.com/microlinkhq/screenshot-benchmark/tree/main/runs/2026-03'>
          open source on GitHub
        </Link>
        . Last run: March,&nbsp;2026.
      </Text>
    </Flex>
  </Container>
)

const CompetitorComparison = () => {
  const micro = BENCHMARK_DATA.results.microlink
  const microAvg = micro.summary.avgColdDuration

  return (
    <Container
      as='section'
      css={theme({
        maxWidth: '100%',
        pt: [4, 4, 5, 5],
        pb: [4, 4, 5, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          maxWidth: layout.large,
          px: [4, 4, 4, 0],
          mx: 'auto',
          gap: [SPACE_24, SPACE_24, space[4], space[4]]
        })}
      >
        <Subhead
          css={theme({
            fontSize: SECTION_TITLE_FONT_SIZE,
            textAlign: 'left'
          })}
        >
          Screenshot API speed comparison
        </Subhead>

        <Text css={COMPARISON_SECTION_LABEL_CSS}>
          Average cold-start latency per provider
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
          <ComparisonTable>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Avg Cold Duration</th>
                <th>versus.&nbsp;Microlink</th>
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
                const isRunnerUp = rank === 1

                const nameColor = isMicrolink
                  ? colors.green7
                  : isRunnerUp
                    ? colors.orange7
                    : colors.black
                const timeColor = isMicrolink
                  ? colors.green7
                  : isRunnerUp
                    ? colors.orange7
                    : undefined

                return (
                  <tr key={key}>
                    <td>
                      <ProviderNameWithTag>
                        <span
                          css={theme({
                            fontWeight:
                              isMicrolink || isRunnerUp ? 'bold' : 'normal',
                            color: nameColor
                          })}
                        >
                          {svc.name}
                        </span>
                      </ProviderNameWithTag>
                    </td>
                    <td
                      css={theme({
                        fontWeight: isMicrolink ? 'bold' : 'normal',
                        color: timeColor
                      })}
                    >
                      {formatMsDecimal(avg)}&thinsp;ms
                    </td>
                    <td
                      css={theme({
                        color: isMicrolink ? colors.green7 : colors.black
                      })}
                    >
                      {isMicrolink ? '—' : `+${pctSlower}% slower`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </ComparisonTable>
        </Box>

        <Text css={COMPARISON_SECTION_LABEL_CSS}>
          Cold-start latency breakdown by URL
        </Text>
        <Box
          css={theme({
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 4,
            border: `${borders[1]} ${colors.black10}`,
            bg: 'white',
            display: ['none', 'none', 'block']
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
                const sorted = [...times].sort((a, b) => a - b)
                const minTime = sorted[0]
                const secondMin = sorted[1]
                const maxTime = sorted[sorted.length - 1]

                return (
                  <tr key={url}>
                    <td>{extractDomain(url)}</td>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = times[i] === minTime
                      const isSecond = !isMin && times[i] === secondMin
                      const isMax = times[i] === maxTime
                      return (
                        <td key={key}>
                          {isMin ? (
                            <CellHighlight>{formatMs(times[i])}</CellHighlight>
                          ) : isMax ? (
                            <CellLoser>{formatMs(times[i])}</CellLoser>
                          ) : isSecond ? (
                            <CellRunnerUp>{formatMs(times[i])}</CellRunnerUp>
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
            const sorted = [...times].sort((a, b) => a - b)
            const minTime = sorted[0]
            const secondMin = sorted[1]
            const maxTime = sorted[sorted.length - 1]

            return (
              <MobileCard key={url}>
                <MobileCardHeader>{extractDomain(url)}</MobileCardHeader>
                {SORTED_SERVICES.map((key, i) => {
                  const isMin = times[i] === minTime
                  const isSecond = !isMin && times[i] === secondMin
                  const isMax = times[i] === maxTime
                  return (
                    <MobileCardRow key={key}>
                      <MobileCardName>
                        {BENCHMARK_DATA.results[key].name}
                      </MobileCardName>
                      <MobileCardTime
                        $highlight={isMin || isMax || isSecond}
                        $isMin={isMin}
                        $isMax={isMax}
                        $isSecond={isSecond}
                      >
                        {formatMs(times[i])}&thinsp;ms
                      </MobileCardTime>
                    </MobileCardRow>
                  )
                })}
              </MobileCard>
            )
          })}
          {(() => {
            const totals = SORTED_SERVICES.map(
              key => BENCHMARK_DATA.results[key].summary.totalColdDuration
            )
            const minTotal = Math.min(...totals)
            const maxTotal = Math.max(...totals)

            return (
              <MobileCard>
                <MobileCardHeader css={theme({ fontWeight: 'bold' })}>
                  Total
                </MobileCardHeader>
                {SORTED_SERVICES.map((key, i) => {
                  const isMin = totals[i] === minTotal
                  const isMax = totals[i] === maxTotal
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
                        {(totals[i] / 1000).toFixed(1)}&thinsp;s
                      </MobileCardTime>
                    </MobileCardRow>
                  )
                })}
              </MobileCard>
            )
          })()}
        </MobileCards>

        <Flex
          css={[
            theme({
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontFamily: 'mono',
              fontSize: 0,
              color: 'black'
            }),
            {
              gap: SPACE_14,
              marginTop: NEGATIVE_SPACE_12
            }
          ]}
        >
          <Flex css={[theme({ alignItems: 'center' }), { gap: SPACE_6 }]}>
            <span
              css={[
                theme({ borderRadius: 1, bg: 'green7', flexShrink: 0 }),
                { width: SPACE_10, height: SPACE_10 }
              ]}
            />
            <span css={theme({ mt: OFFSET_3 })}>Fastest</span>
          </Flex>
          <Flex css={[theme({ alignItems: 'center' }), { gap: SPACE_6 }]}>
            <span
              css={[
                theme({ borderRadius: 1, bg: 'orange7', flexShrink: 0 }),
                { width: SPACE_10, height: SPACE_10 }
              ]}
            />
            <span css={theme({ mt: OFFSET_3 })}>2nd fastest</span>
          </Flex>
          <Flex css={[theme({ alignItems: 'center' }), { gap: SPACE_6 }]}>
            <span
              css={[
                theme({ borderRadius: 1, bg: 'red8', flexShrink: 0 }),
                { width: SPACE_10, height: SPACE_10 }
              ]}
            />
            <span css={theme({ mt: OFFSET_3 })}>Slowest</span>
          </Flex>
          <span
            css={[
              theme({ color: 'black' }),
              {
                [`@media (max-width: ${BREAKPOINT_MEDIUM_MAX})`]: {
                  display: 'none'
                }
              }
            ]}
          >
            ·
          </span>
          <span
            css={[
              theme({ mt: OFFSET_3 }),
              {
                [`@media (max-width: ${BREAKPOINT_MEDIUM_MAX})`]: {
                  display: 'none'
                }
              }
            ]}
          >
            Times in milliseconds (ms), totals in seconds&nbsp;(s)
          </span>
        </Flex>

        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [4, 4, 5, 5]
          })}
        >
          <Box>
            <Subhead
              forwardedAs='h2'
              css={theme({
                fontSize: SECTION_TITLE_FONT_SIZE,
                color: 'black',
                textAlign: 'left',
                mt: [4, 4, 5, 5],
                mb: [2, 2, 3, 3]
              })}
            >
              Provider-by-provider performance breakdown
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3
              })}
            >
              Below is a provider-by-provider breakdown of speed, latency,
              response time, and overall performance. Each comparison uses the
              same 7-URL test suite so the numbers are directly&nbsp;comparable.
            </Text>
          </Box>
          <Box>
            <Subhead
              titleize={false}
              forwardedAs='h3'
              css={theme({
                fontSize: SUBSECTION_TITLE_FONT_SIZE,
                color: 'black',
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              vs Urlbox
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3
              })}
            >
              When evaluating a Urlbox alternative, cold-start latency is a
              primary concern. In our tests, Urlbox averaged{' '}
              <strong css={theme({ fontFamily: 'mono' })}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.urlbox.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              per request. Microlink processed the same suite at an average of{' '}
              <strong css={theme({ fontFamily: 'mono', color: 'green7' })}>
                {formatMsDecimal(microAvg)}&thinsp;ms
              </strong>
              , making it roughly 44% faster overall. The performance gap is
              most noticeable on heavy DOMs; for instance, on vercel.com, Urlbox
              took nearly 15&nbsp;seconds to resolve and capture, whereas
              Microlink completed the task in 6.3&nbsp;seconds.
            </Text>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3,
                pt: 3
              })}
            >
              <Link href='/alternative/urlbox'>
                vs Urlbox in detail&nbsp;&rarr;
              </Link>
            </Text>
          </Box>

          <Box>
            <Subhead
              titleize={false}
              forwardedAs='h3'
              css={theme({
                fontSize: SUBSECTION_TITLE_FONT_SIZE,
                color: 'black',
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              vs ApiFlash
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3
              })}
            >
              ApiFlash demonstrated significant variance depending on the target
              URL. While it handled lightweight pages like example.com
              reasonably well (
              <span css={theme({ fontFamily: 'mono' })}>
                {formatMs(
                  BENCHMARK_DATA.results.apiflash.perUrl.find(
                    p => p.url === 'https://example.com'
                  )?.coldDuration || 0
                )}
                &thinsp;ms
              </span>
              ), it struggled with complex SPAs, resulting in the highest
              average cold duration in our test at{' '}
              <strong css={theme({ fontFamily: 'mono' })}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.apiflash.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>
              . On framer.com, ApiFlash took over 27&nbsp;seconds to return a
              payload. For developers seeking an ApiFlash alternative for
              latency-sensitive workloads, Microlink offers a much tighter
              performance baseline, handling the same URL in 6.2&nbsp;seconds.
            </Text>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3,
                pt: 3
              })}
            >
              <Link href='/alternative/apiflash'>
                vs ApiFlash in detail&nbsp;&rarr;
              </Link>
            </Text>
          </Box>

          <Box>
            <Subhead
              titleize={false}
              forwardedAs='h3'
              css={theme({
                fontSize: SUBSECTION_TITLE_FONT_SIZE,
                color: 'black',
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              vs ScreenshotAPI &amp; ScreenshotMachine
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3
              })}
            >
              ScreenshotAPI (
              <span css={theme({ fontFamily: 'mono' })}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotapi.summary.avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) and ScreenshotMachine (
              <span css={theme({ fontFamily: 'mono' })}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotmachine.summary
                    .avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) performed consistently, placing them in the middle of the pack.
              Both services handle standard web pages well, but still lag behind
              Microlink's optimized{' '}
              <Link href='/blog/browser-automation'>
                browser infrastructure
              </Link>
              . Microlink outperformed both services by roughly 30–32% on
              average, demonstrating consistently lower latency across all
              7&nbsp;test URLs.
            </Text>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3,
                pt: 3
              })}
            >
              <Link href='/alternative/screenshotapi'>
                vs ScreenshotAPI in detail&nbsp;&rarr;
              </Link>
              <Box as='span' css={theme({ display: 'block', pt: 2 })} />
              <Link href='/alternative/screenshotmachine'>
                vs Screenshot Machine in detail&nbsp;&rarr;
              </Link>
            </Text>
          </Box>

          <Box>
            <Subhead
              titleize={false}
              forwardedAs='h3'
              css={theme({
                fontSize: SUBSECTION_TITLE_FONT_SIZE,
                color: 'black',
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              vs ScreenshotOne
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3
              })}
            >
              ScreenshotOne averaged{' '}
              <strong css={theme({ fontFamily: 'mono' })}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotone.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              across the test suite. Interestingly, when capturing its own
              domain (screenshotone.com), it required over 12&nbsp;seconds to
              resolve the request. Microlink handled the same domain in
              5.4&nbsp;seconds. For teams already utilizing ScreenshotOne,
              switching to Microlink provides the same{' '}
              <Link href='/blog/what-is-a-headless-browser'>
                headless browser capabilities
              </Link>{' '}
              while cutting the average response time nearly in&nbsp;half.
            </Text>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black',
                lineHeight: 3,
                pt: 3
              })}
            >
              <Link href='/alternative/screenshotone'>
                vs ScreenshotOne in detail&nbsp;&rarr;
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

const WhyLatencyMatters = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      bg: 'white',
      py: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        maxWidth: layout.large,
        px: [4, 4, 4, 0],
        mx: 'auto',
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        css={theme({
          fontSize: SECTION_TITLE_FONT_SIZE,
          color: 'black',
          textAlign: 'left'
        })}
      >
        Why latency matters for AI agents &amp; Puppeteer alternatives
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        When you transition from managing your own headless browser
        infrastructure (like <Link href='https://pptr.dev/'>Puppeteer</Link> or{' '}
        <Link href='https://playwright.dev/'>Playwright</Link>) to outsourcing
        it to a managed API, you introduce a network hop into your critical
        path. If your provider is slow, every downstream system inherits
        that&nbsp;latency.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: SUBSECTION_TITLE_FONT_SIZE,
          color: 'black',
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        The "observe" phase in agentic workflows
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        For multimodal AI agents and LLMs, browser latency compounds
        exponentially. Modern agents rely on both structured DOM extraction and{' '}
        <Link href='/docs/guides/screenshot/embedding'>visual grounding</Link>{' '}
        (screenshots) to observe web state and make decisions. When a single
        page capture takes 10–15&nbsp;seconds, a multi-step reasoning loop
        quickly stalls&nbsp;out.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        <Link href='/screenshot'>Microlink</Link> is built to keep this cycle as
        tight as physically possible. It includes a built-in{' '}
        <Link href='/docs/api/parameters/proxy'>proxy layer</Link> that handles
        IP rotation and mitigates{' '}
        <Link href='/blog/antibot-detection-at-scale'>anti-bot blocking</Link>{' '}
        (403s, CAPTCHAs) out-of-the-box. This ensures your agents get reliable
        access to target URLs without you having to maintain complex, failing
        proxy&nbsp;pools.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: SUBSECTION_TITLE_FONT_SIZE,
          color: 'black',
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        Reducing architectural overhead
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        Even a highly optimized{' '}
        <Link href='/blog/what-is-a-headless-browser'>Headless Chrome</Link>{' '}
        boot and SPA render takes 3–4&nbsp;seconds. Because browser automation
        is inherently heavy, your infrastructure provider shouldn't add
        unnecessary network or routing overhead.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black',
          lineHeight: 3
        })}
      >
        When cold starts consistently stretch beyond 8&nbsp;seconds, you are
        forced to abandon synchronous code. Developers have to over-engineer
        workarounds: webhook callbacks, background job queues (Redis/Celery),
        and aggressive retry logic to handle timeouts. By minimizing cold-start
        latency, <Link href='/'>Microlink</Link> keeps response times within
        manageable synchronous limits, simplifying your
        system&nbsp;architecture.
      </Text>
    </Flex>
  </Container>
)

const CalloutBox = styled('blockquote')`
  ${theme({
    fontSize: 0,
    position: 'relative',
    m: 0,
    p: [3, 3, 4, 4],
    bg: 'white',
    borderRadius: 4,
    border: 1,
    borderColor: 'yellow6'
  })};

  div {
    ${theme({ fontSize: 0, color: 'black80' })}
  }
`

const FAQ_ITEMS = [
  {
    question: 'What is the fastest screenshot API in 2026?',
    answer: (
      <>
        <div>
          Based on our independent benchmark testing 7 real-world URLs with zero
          caching, <Link href='/screenshot'>Microlink</Link> is the fastest
          screenshot API with an average cold-start latency of
          4,111.84&thinsp;ms. The next closest provider averaged
          5,915.71&thinsp;ms, making Microlink roughly 30–44% faster than every
          competitor tested.
        </div>
      </>
    ),
    text: 'Based on our independent benchmark testing 7 real-world URLs with zero caching, Microlink is the fastest screenshot API with an average cold-start latency of 4,111.84\u2009ms. The next closest provider averaged 5,915.71\u2009ms, making Microlink roughly 30\u201344% faster than every competitor tested.'
  },
  {
    question: 'What is cold-start latency?',
    answer: (
      <>
        <div>
          Cold-start latency is the total time from sending an HTTP request to
          receiving the final screenshot, with no warm{' '}
          <Link href='/docs/guides/screenshot/caching-and-performance'>
            caches
          </Link>{' '}
          or pre-booted browsers. It measures the real-world worst case:
          Headless Chrome boot, DNS resolution, DOM render, and
          pixel&nbsp;capture.
        </div>
        <div>
          This metric matters because it determines whether your system can
          handle screenshots synchronously or needs complex async workarounds
          like webhook callbacks and job&nbsp;queues.
        </div>
      </>
    ),
    text: 'Cold-start latency is the total time from sending an HTTP request to receiving the final screenshot, with no warm caches or pre-booted browsers. It measures the real-world worst case: Headless Chrome boot, DNS resolution, DOM render, and pixel capture. This metric matters because it determines whether your system can handle screenshots synchronously or needs complex async workarounds like webhook callbacks and job queues.'
  },
  {
    question: 'Is there a free screenshot API?',
    answer: (
      <>
        <div>
          Yes. Microlink offers 50 free screenshot requests per day with no
          account, no login, and no credit card required. The free tier includes
          adblock, cookie banner removal, metadata extraction, and{' '}
          <Link href='/docs/guides/screenshot/browser-settings'>
            full browser control
          </Link>
          .
        </div>
        <div>
          For production workloads, the <Link href='/#pricing'>Pro plan</Link>{' '}
          starts at €39/month for 46,000 requests with automatic{' '}
          <Link href='/docs/api/parameters/proxy'>proxy resolution</Link> and
          antibot&nbsp;protection.
        </div>
      </>
    ),
    text: 'Yes. Microlink offers 50 free screenshot requests per day with no account, no login, and no credit card required. The free tier includes adblock, cookie banner removal, metadata extraction, and full browser control. For production workloads, the Pro plan starts at €39/month for 46,000 requests with automatic proxy resolution and antibot protection.'
  },
  {
    question: 'What is a screenshot API?',
    answer: (
      <>
        <div>
          A screenshot API is a managed service that captures visual snapshots
          of web pages by running a{' '}
          <Link href='/blog/what-is-a-headless-browser'>headless browser</Link>{' '}
          (typically Chrome) in the cloud. Instead of maintaining your own{' '}
          <Link href='https://pptr.dev/'>Puppeteer</Link> or{' '}
          <Link href='https://playwright.dev/'>Playwright</Link> infrastructure,
          you send an HTTP request with a URL and receive a rendered image.
        </div>
        <div>
          Screenshot APIs handle browser lifecycle, rendering,{' '}
          <Link href='/blog/edge-cdn'>caching</Link>, scaling, and anti-bot
          mitigation so developers can focus on their product.{' '}
          <Link href='/docs/guides/screenshot'>See how it works</Link>.
        </div>
      </>
    ),
    text: 'A screenshot API is a managed service that captures visual snapshots of web pages by running a headless browser (typically Chrome) in the cloud. Instead of maintaining your own Puppeteer or Playwright infrastructure, you send an HTTP request with a URL and receive a rendered image. Screenshot APIs handle browser lifecycle, rendering, scaling, and anti-bot mitigation so developers can focus on their product.'
  },
  {
    question: 'Can I try the screenshot API without signing up?',
    answer: (
      <>
        <div>
          Yes. The{' '}
          <Link href='/tools/website-screenshot'>screenshot playground</Link>{' '}
          lets you capture any URL directly from the browser — no API key, no
          account, no setup. Configure viewport, format, full-page mode, and
          device emulation, then preview the result&nbsp;instantly.
        </div>
        <div>
          If you need specific workflows like mobile device emulation, scrolling
          animations, or bulk URL processing, you can test them all for free on
          our <Link href='/tools'>developer tools page</Link>.
        </div>
      </>
    ),
    text: 'Yes. The screenshot playground lets you capture any URL directly from the browser — no API key, no account, no setup. Configure viewport, format, full-page mode, and device emulation, then preview the result instantly. If you need specific workflows like mobile device emulation, scrolling animations, or bulk URL processing, you can test them all for free on our developer tools page.'
  },
  {
    question: 'Can I use a screenshot API for AI agents?',
    answer: (
      <>
        <div>
          Yes, and speed is critical for this use case. AI agents rely on
          screenshots for visual grounding during multi-step reasoning loops.
          When a single capture takes 10-15&nbsp;seconds, the entire agent
          workflow stalls.
        </div>
        <div>
          Microlink is built to be the eyes of AI agents: sub-5-second cold
          starts, built-in{' '}
          <Link href='/docs/guides/common/proxy'>proxy rotation</Link> to bypass
          CAPTCHAs and anti-bot blocking, and{' '}
          <Link href='/metadata'>structured DOM extraction</Link> alongside
          visual&nbsp;capture.
        </div>
      </>
    ),
    text: 'Yes, and speed is critical for this use case. AI agents rely on screenshots for visual grounding during multi-step reasoning loops. When a single capture takes 10\u201315 seconds, the entire agent workflow stalls. Microlink is built to be the eyes of AI agents: sub-5-second cold starts, built-in proxy rotation to bypass CAPTCHAs and anti-bot blocking, and structured DOM extraction alongside visual capture.'
  },
  {
    question: 'Is Microlink open source?',
    answer: (
      <>
        <div>
          Yes. Microlink is powered by{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            browserless
          </Link>
          , an open-source headless Chrome/Chromium driver built on top of
          Puppeteer. The entire stack is available on GitHub under the
          microlinkhq organization.
        </div>
        <div>
          You can self-host it for full control, or use the{' '}
          <Link href='/#pricing'>managed API</Link> to skip infrastructure work
          and get automatic scaling, proxy rotation, and global
          edge&nbsp;deployment.
        </div>
      </>
    ),
    text: 'Yes. Microlink is powered by browserless, an open-source headless Chrome/Chromium driver built on top of Puppeteer. The entire stack is available on GitHub under the microlinkhq organization. You can self-host it for full control, or use the managed API to skip infrastructure work and get automatic scaling, proxy rotation, and global edge deployment.'
  },
  {
    question: 'How was this benchmark conducted?',
    answer: (
      <>
        <div>
          We tested 6 screenshot API providers against 7 real-world URLs using
          true cold starts (no caching). All providers were triggered
          simultaneously for each URL to ensure identical network conditions.
        </div>
        <div>
          The benchmark ran 10 times at different hours, the single slowest run
          was dropped to remove outliers, and non-200 responses were excluded.
          The full testing architecture is{' '}
          <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
            open source on GitHub
          </Link>
          .
        </div>
      </>
    ),
    text: 'We tested 6 screenshot API providers against 7 real-world URLs using true cold starts (no caching). All providers were triggered simultaneously for each URL to ensure identical network conditions. The benchmark ran 10 times at different hours, the single slowest run was dropped to remove outliers, and non-200 responses were excluded. The full testing architecture is open source on GitHub.'
  }
]

const Faq = () => (
  <FaqComponent
    title='Frequently Asked Questions'
    titleSize={[3, 3, 4, 4]}
    questions={FAQ_ITEMS}
    css={theme({ bg: 'pinky', maxWidth: '100%', py: [4, 4, 5, 5] })}
  />
)

const BottomCta = () => {
  const breakpoint = useBreakpoint()
  return (
    <Container
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'white',
        pt: [4, 4, 5, 5],
        pb: [5, 5, 6, 6]
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', layout.small, layout.small],
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: layout.normal,
          px: [2, 2, 4, 0],
          mx: 'auto'
        })}
      >
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
              screenshot: true,
              embed: 'screenshot'
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
        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            gap: [3, 3, 4, 4],
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          {['50 requests/day free', 'No login required', 'No credit card'].map(
            label => (
              <Flex
                key={label}
                css={theme({
                  alignItems: 'center',
                  gap: 1,
                  color: 'black',
                  fontSize: [0, 0, 1, 1]
                })}
              >
                <CheckIcon size={16} color={colors.close} />
                <Text as='span'>{label}</Text>
              </Flex>
            )
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export const Head = () => (
  <Meta
    title='Fastest Screenshot API: 2026 Speed Benchmark & Comparison'
    description='See the cold-start latency benchmark across 6 screenshot API providers (Microlink, Urlbox, ApiFlash, etc.) tested against 7 real-world URLs.'
    schemaType='Article'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://microlink.io/benchmarks/screenshot-api',
        headline: 'Fastest Screenshot API: 2026 Speed Benchmark & Comparison',
        description:
          'Independent performance benchmark comparing 6 screenshot API providers on cold-start latency across 7 real-world URLs.',
        url: 'https://microlink.io/benchmarks/screenshot-api',
        datePublished: '2026-03-10',
        dateModified: '2026-03-10',
        author: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Screenshot API',
            sameAs: 'https://en.wikipedia.org/wiki/Screenshot'
          },
          {
            '@type': 'Thing',
            name: 'Web Performance',
            sameAs: 'https://en.wikipedia.org/wiki/Web_performance'
          }
        ]
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

const ScreenshotApiBenchmarkPage = () => (
  <Layout css={theme({ mt: 0 })}>
    <Hero />
    <CompetitorComparison />
    <Methodology />
    <WhyLatencyMatters />
    <BottomCta />
    <Faq />
    {/* <StickyFooterCta /> */}
  </Layout>
)

export default ScreenshotApiBenchmarkPage
