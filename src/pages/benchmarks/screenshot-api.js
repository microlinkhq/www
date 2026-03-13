import { borders, layout, colors, space, theme } from 'theme'
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
import RaceContainer from 'components/patterns/RaceContainer/RaceContainer'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import { extractDomain } from 'helpers/extract-domain'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

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
      name: 'ApiFlash',
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
      name: 'Microlink',
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
      name: 'ScreenshotAPI',
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
      name: 'ScreenshotMachine',
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
      name: 'ScreenshotOne',
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
      name: 'Urlbox',
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
  microlink: 'rgba(253, 73, 74, 0.5)',
  apiflash: 'rgba(99, 102, 241, 0.5)',
  screenshotapi: 'rgba(245, 158, 11, 0.5)',
  screenshotmachine: 'rgba(16, 185, 129, 0.5)',
  screenshotone: 'rgba(139, 92, 246, 0.5)',
  urlbox: 'rgba(6, 182, 212, 0.5)'
}

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })
const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const MONO_FONT =
  "'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo, monospace"

const ComparisonTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: 10px 14px;
    text-align: left;
    font-size: 14px;
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: 600px) {
      padding: 8px 10px;
      font-size: 12px;
    }
  }

  th {
    font-family: ${MONO_FONT};
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${colors.black50};
    border-bottom: ${borders[2]} ${colors.black10};
  }

  td {
    font-family: ${MONO_FONT};
    color: ${colors.black80};
  }

  th:last-child,
  td:last-child {
    @media (max-width: 480px) {
      display: none;
    }
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: ${colors.black025};
  }
`

const WinnerTag = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${MONO_FONT};
  font-size: 10px;
  font-weight: 700;
  color: #16a34a;
  background: rgba(22, 163, 74, 0.08);
  border: 1px solid rgba(22, 163, 74, 0.2);
  border-radius: 4px;
  padding: 2px 6px;
  margin-left: 6px;
  vertical-align: middle;
`

const PerUrlTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  @media (max-width: 767px) {
    display: none;
  }

  th,
  td {
    padding: 8px 12px;
    text-align: right;
    font-size: 12px;
    border-bottom: ${borders[1]} ${colors.black05};
    font-family: ${MONO_FONT};
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${colors.black50};
    border-bottom: ${borders[2]} ${colors.black10};
    font-size: 10px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
    font-weight: 500;
    color: ${colors.black60};
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: ${colors.black025};
  }
`

const MobileCards = styled('div')`
  display: none;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 767px) {
    display: flex;
  }
`

const MobileCard = styled('div')`
  border: 1px solid ${colors.black10};
  border-radius: 8px;
  overflow: hidden;
  background: ${colors.white};
`

const MobileCardHeader = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 13px;
  font-weight: 600;
  color: ${colors.black80};
  padding: 10px 14px;
  background: ${colors.black025};
  border-bottom: 1px solid ${colors.black10};
`

const MobileCardRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  font-family: ${MONO_FONT};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  border-bottom: 1px solid ${colors.black05};

  &:last-child {
    border-bottom: 0;
  }
`

const MobileCardName = styled('span')`
  color: ${colors.black60};
  font-weight: 500;
`

const MobileCardTime = styled('span')`
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  color: ${({ $isMin, $isMax, $isSecond }) =>
    $isMin
      ? '#16a34a'
      : $isMax
        ? '#dc2626'
        : $isSecond
          ? '#d97706'
          : colors.black80};
`

const CellHighlight = styled('span')`
  font-weight: 700;
  color: #16a34a;
`

const CellLoser = styled('span')`
  font-weight: 700;
  color: #dc2626;
`

const CellRunnerUp = styled('span')`
  font-weight: 600;
  color: #d97706;
`

const Hero = () => (
  <section
    css={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
    }}
  >
    <div
      css={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, #e7e5e4 1px, transparent 1px),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 0',
        maskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        WebkitMaskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in'
      }}
    />

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
          forwardedAs='h1'
          variant='gradient'
          css={theme({
            fontSize: ['28px', '36px', '48px', '52px'],
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
            color: 'black60',
            textAlign: 'center',
            width: '100%',
            fontSize: [1, 1, 2, '22px'],
            px: [4, 4, 4, 0],
            maxWidth: layout.normal
          })}
        >
          Cold-start latency across 6&nbsp;providers and 7&nbsp;URLs.
          Zero&nbsp;caching.
        </Caption>
      </Flex>

      <RaceContainer
        benchmarkData={BENCHMARK_DATA}
        serviceColors={SERVICE_COLORS}
        highlightKey='microlink'
      />
    </Flex>
  </section>
)

const MethodologyList = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${space[3]};
`

const MethodologyItem = styled('li')`
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.close};
  }

  @media (max-width: 767px) {
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`

const Methodology = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      bg: 'pinky',
      pt: [5, 5, 6, 6],
      pb: [4, 4, 5, 5]
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
          fontSize: ['28px', '32px', '40px', '44px'],
          textAlign: 'left'
        })}
      >
        Benchmark methodology &amp; testing architecture
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        To ensure a strictly objective baseline, we built a reproducible testing
        suite targeting 6 screenshot API providers (Microlink, ApiFlash,
        ScreenshotAPI, ScreenshotMachine, ScreenshotOne, and Urlbox) against
        7&nbsp;real-world URLs.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
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
              color: 'black70',
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
              color: 'black70',
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
              color: 'black70',
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
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Heavy Browser Workloads:</strong> We didn't just test simple
            viewport captures. The payload configurations forced high device
            scale factors (Retina/2&times; resolution), full-page scrolling, and
            active ad-blocking across a mix of static HTML and heavy
            React&nbsp;SPAs.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
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
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Final Aggregation:</strong> After cleaning the dataset, we
            calculated the strict avgColdDuration per URL, and summed them to
            find the totalColdDuration to determine the fastest
            overall&nbsp;provider.
          </Text>
        </MethodologyItem>
      </MethodologyList>
      <CalloutBox>
        <CalloutLabel>Transparency note</CalloutLabel>
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3
          })}
        >
          <strong>Regarding ApiFlash:</strong> During our testing, ApiFlash
          consistently struggled with the framer.com payload, returning response
          times approaching 30&nbsp;seconds. Because this metric was a
          significant outlier, we paused the benchmark publication and re-ran
          this specific configuration multiple times across different days and
          server locations. The response times remained consistently slow.
        </Text>
        <br />
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3
          })}
        >
          In the interest of absolute transparency and fairness to the other
          providers who successfully handled the complex DOM, we have chosen to
          publish the raw, unedited data exactly as it was&nbsp;recorded.
        </Text>
        <br />
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3,
            mt: 2
          })}
        >
          For context: if framer.com were excluded from the dataset, ApiFlash's
          average cold duration would drop from{' '}
          <span css={{ fontFamily: MONO_FONT }}>9,702.57&thinsp;ms</span> to{' '}
          <span css={{ fontFamily: MONO_FONT }}>6,731.14&thinsp;ms</span>,
          moving it from last place to <strong>4th in average latency</strong>{' '}
          (behind Microlink, ScreenshotAPI, and ScreenshotMachine). Its total
          cold duration would fall to{' '}
          <span css={{ fontFamily: MONO_FONT }}>40,386.86&thinsp;ms</span>,
          ranking <strong>4th overall</strong> — right
          behind&nbsp;ScreenshotMachine.
        </Text>
      </CalloutBox>
      <Text
        css={theme({
          fontSize: [0, 0, 1, 1],
          color: 'black50',
          lineHeight: 3
        })}
      >
        The complete testing architecture is{' '}
        <Link href='https://github.com/microlinkhq/benchmarks/tree/main/screenshot'>
          open source on GitHub
        </Link>
        . Last run:{' '}
        <span
          css={{
            fontFamily: MONO_FONT,
            fontSize: '15px',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          March,&nbsp;2026
        </span>
        .
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
        pb: [5, 5, 6, 6]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          maxWidth: layout.large,
          px: [4, 4, 4, 0],
          mx: 'auto',
          gap: ['24px', '24px', '32px', '32px']
        })}
      >
        <Subhead
          css={theme({
            fontSize: ['28px', '32px', '40px', '44px'],
            textAlign: 'left'
          })}
        >
          Screenshot API speed comparison by provider
        </Subhead>

        <Text
          css={{
            fontFamily: MONO_FONT,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.black50,
            marginBottom: '-16px'
          }}
        >
          Average cold-start latency per provider
        </Text>
        <Box
          css={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            border: `${borders[1]} ${colors.black10}`,
            background: colors.white
          }}
        >
          <ComparisonTable>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Avg Cold Duration</th>
                <th>vs.&nbsp;Microlink</th>
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
                  ? '#16a34a'
                  : isRunnerUp
                    ? '#d97706'
                    : colors.black80
                const timeColor = isMicrolink
                  ? '#16a34a'
                  : isRunnerUp
                    ? '#d97706'
                    : undefined

                return (
                  <tr key={key}>
                    <td>
                      <span
                        style={{
                          fontWeight: isMicrolink || isRunnerUp ? 700 : 400,
                          color: nameColor
                        }}
                      >
                        {svc.name}
                      </span>
                      {isMicrolink && <WinnerTag>Fastest</WinnerTag>}
                    </td>
                    <td
                      style={{
                        fontWeight: isMicrolink || isRunnerUp ? 700 : 400,
                        color: timeColor
                      }}
                    >
                      {formatMsDecimal(avg)}&thinsp;ms
                    </td>
                    <td
                      style={{
                        color: isMicrolink ? '#16a34a' : colors.black50
                      }}
                    >
                      {isMicrolink ? '—' : `+${pctSlower}% slower`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </ComparisonTable>
        </Box>

        <Text
          css={{
            fontFamily: MONO_FONT,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.black50,
            marginBottom: '-16px'
          }}
        >
          Cold-start latency breakdown by URL
        </Text>
        <Box
          css={theme({
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            border: `${borders[1]} ${colors.black10}`,
            background: colors.white,
            display: ['none', 'none', 'block']
          })}
        >
          <PerUrlTable>
            <thead>
              <tr>
                <th css={{ textAlign: 'left' }}>URL</th>
                {SORTED_SERVICES.map(key => (
                  <th
                    key={key}
                    css={{
                      color: key === 'microlink' ? '#16a34a' : colors.black50
                    }}
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
                      css={{
                        fontWeight: 700,
                        color: colors.black80,
                        borderTop: `${borders[2]} ${colors.black10}`
                      }}
                    >
                      Total
                    </td>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = totals[i] === minTotal
                      const isMax = totals[i] === maxTotal
                      return (
                        <td
                          key={key}
                          css={{
                            fontWeight: 700,
                            borderTop: `${borders[2]} ${colors.black10}`,
                            color: isMin
                              ? '#16a34a'
                              : isMax
                                ? '#dc2626'
                                : colors.black80
                          }}
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
                <MobileCardHeader css={{ fontWeight: 700 }}>
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
          css={{
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontFamily: MONO_FONT,
            fontSize: '11px',
            color: colors.black50,
            marginTop: '-12px'
          }}
        >
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#16a34a',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>Fastest</span>
          </Flex>
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#d97706',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>2nd fastest</span>
          </Flex>
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#dc2626',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>Slowest</span>
          </Flex>
          <span css={{ color: colors.black40 }}>·</span>
          <span css={{ marginTop: '3px' }}>
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
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mt: [4, 4, 5, 5],
                mb: [2, 2, 3, 3]
              })}
            >
              Urlbox alternative: speed &amp; latency
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              When evaluating a Urlbox alternative, cold-start latency is a
              primary concern. In our tests, Urlbox averaged{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.urlbox.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              per request. Microlink processed the same suite at an average of{' '}
              <strong css={{ fontFamily: MONO_FONT, color: '#fd494a' }}>
                {formatMsDecimal(microAvg)}&thinsp;ms
              </strong>
              , making it roughly 44% faster overall. The performance gap is
              most noticeable on heavy DOMs; for instance, on vercel.com, Urlbox
              took nearly 15&nbsp;seconds to resolve and capture, whereas
              Microlink completed the task in 6.3&nbsp;seconds.
            </Text>
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ApiFlash alternative: response times
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ApiFlash demonstrated significant variance depending on the target
              URL. While it handled lightweight pages like example.com
              reasonably well (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMs(
                  BENCHMARK_DATA.results.apiflash.perUrl.find(
                    p => p.url === 'https://example.com'
                  )?.coldDuration || 0
                )}
                &thinsp;ms
              </span>
              ), it struggled with complex SPAs, resulting in the highest
              average cold duration in our test at{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
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
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ScreenshotAPI &amp; ScreenshotMachine performance
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ScreenshotAPI (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotapi.summary.avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) and ScreenshotMachine (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotmachine.summary
                    .avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) performed consistently, placing them in the middle of the pack.
              Both services handle standard web pages well, but still lag behind
              Microlink's optimized browser infrastructure. Microlink
              outperformed both services by roughly 30–32% on average,
              demonstrating consistently lower latency across all 7&nbsp;test
              URLs.
            </Text>
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ScreenshotOne comparison
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ScreenshotOne averaged{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotone.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              across the test suite. Interestingly, when capturing its own
              domain (screenshotone.com), it required over 12&nbsp;seconds to
              resolve the request. Microlink handled the same domain in
              5.4&nbsp;seconds. For teams already utilizing ScreenshotOne,
              switching to Microlink provides the same headless browser
              capabilities while cutting the average response time nearly
              in&nbsp;half.
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
      pt: [5, 5, 6, 6],
      pb: [4, 4, 5, 5]
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
          fontSize: ['28px', '32px', '40px', '44px'],
          textAlign: 'left'
        })}
      >
        Why latency matters for AI agents &amp; Puppeteer alternatives
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        When you transition from managing your own headless browser
        infrastructure (like Puppeteer or Playwright) to outsourcing it to a
        managed API, you introduce a network hop into your critical path. If
        your provider is slow, every downstream system inherits
        that&nbsp;latency.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: ['22px', '24px', '28px', '28px'],
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        The "observe" phase in agentic workflows
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        For multimodal AI agents and LLMs, browser latency compounds
        exponentially. Modern agents rely on both structured DOM extraction and
        visual grounding (screenshots) to observe web state and make decisions.
        When a single page capture takes 10–15&nbsp;seconds, a multi-step
        reasoning loop quickly stalls&nbsp;out.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Microlink is built to keep this cycle as tight as physically possible.
        It includes a built-in proxy layer that handles IP rotation and
        mitigates anti-bot blocking (403s, CAPTCHAs) out-of-the-box. This
        ensures your agents get reliable access to target URLs without you
        having to maintain complex, failing proxy&nbsp;pools.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: ['22px', '24px', '28px', '28px'],
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        Reducing architectural overhead
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Even a highly optimized Headless Chrome boot and SPA render takes
        3–4&nbsp;seconds. Because browser automation is inherently heavy, your
        infrastructure provider shouldn't add unnecessary network or routing
        overhead.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        When cold starts consistently stretch beyond 8&nbsp;seconds, you are
        forced to abandon synchronous code. Developers have to over-engineer
        workarounds: webhook callbacks, background job queues (Redis/Celery),
        and aggressive retry logic to handle timeouts. By minimizing cold-start
        latency, Microlink keeps response times within manageable synchronous
        limits, drastically simplifying your system&nbsp;architecture.
      </Text>
    </Flex>
  </Container>
)

const CalloutBox = styled('blockquote')`
  position: relative;
  margin: 0;
  padding: ${space[4]};
  background: ${colors.white};
  border: 1px solid ${colors.black10};
  border-left: 4px solid ${colors.close};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 600px) {
    padding: ${space[3]};
  }
`

const CalloutLabel = styled('span')`
  display: inline-block;
  font-family: ${MONO_FONT};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.close};
  background: rgba(253, 73, 74, 0.08);
  border: 1px solid rgba(253, 73, 74, 0.2);
  border-radius: 4px;
  padding: 2px 8px;
  margin-bottom: ${space[2]};
`

const BottomCta = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      pt: [4, 4, 5, 5],
      pb: 0
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        variant='gradient'
        css={theme({
          fontSize: ['40px', '48px', '52px', '58px'],
          textAlign: 'center'
        })}
      >
        Ship faster screenshots
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        50&nbsp;requests/day free — no account, no credit card. Start capturing
        screenshots at the speed your users&nbsp;deserve.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <Link
          href='/docs/api/parameters/screenshot'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
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
                color: 'black60',
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

export const Head = () => (
  <Meta
    title='Fastest Screenshot API: 2026 Speed Benchmark & Comparison'
    description='See the cold-start latency benchmark across 6 screenshot API providers (Microlink, Urlbox, ApiFlash, etc.) tested against 7 real-world URLs.'
    schemaType='Article'
    structured={{
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
    }}
  />
)

const ScreenshotApiBenchmarkPage = () => (
  <Layout css={{ marginTop: '0px' }}>
    <Hero />
    <CompetitorComparison />
    <Methodology />
    <WhyLatencyMatters />
    <BottomCta />
    {/* <StickyFooterCta /> */}
  </Layout>
)

export default ScreenshotApiBenchmarkPage
