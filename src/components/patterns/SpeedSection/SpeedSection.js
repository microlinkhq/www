import { withTitle } from 'helpers/hoc/with-title'
import { extractDomain } from 'helpers/extract-domain'
import styled from 'styled-components'
import React from 'react'
import {
  borders,
  colors,
  layout,
  theme,
  space,
  radii,
  breakpoints
} from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CaptionBase from 'components/patterns/Caption/Caption'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_12 = `calc(${space[3]} - ${space[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

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

const urlTimes = (benchmark, services, url) =>
  services.map(
    key =>
      benchmark.results[key].perUrl.find(p => p.url === url)?.coldDuration || 0
  )

const ColdStartTable = ({ benchmark, services }) => (
  <PerUrlTable>
    <thead>
      <tr>
        <th css={theme({ textAlign: 'left' })}>URL</th>
        {services.map(key => (
          <th
            key={key}
            css={theme({
              color: key === 'microlink' ? colors.green7 : colors.black
            })}
          >
            {benchmark.results[key].name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {benchmark.testUrls.map(({ url }) => {
        const times = urlTimes(benchmark, services, url)
        const minTime = Math.min(...times)
        const maxTime = Math.max(...times)

        return (
          <tr key={url}>
            <td>{extractDomain(url)}</td>
            {services.map((key, i) => {
              const isMin = times[i] === minTime
              const isMax = times[i] === maxTime
              let cellContent = formatMs(times[i])

              if (isMin) {
                cellContent = (
                  <CellHighlight>{formatMs(times[i])}</CellHighlight>
                )
              } else if (isMax) {
                cellContent = <CellLoser>{formatMs(times[i])}</CellLoser>
              }

              return <td key={key}>{cellContent}</td>
            })}
          </tr>
        )
      })}
      {(() => {
        const totals = services.map(
          key => benchmark.results[key].summary.totalColdDuration
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
            {services.map((key, i) => {
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
)

const ColdStartCards = ({ benchmark, services }) => (
  <MobileCards>
    {benchmark.testUrls.map(({ url }) => {
      const times = urlTimes(benchmark, services, url)
      const minTime = Math.min(...times)
      const maxTime = Math.max(...times)

      return (
        <MobileCard key={url}>
          <MobileCardHeader>{extractDomain(url)}</MobileCardHeader>
          {services.map((key, i) => {
            const isMin = times[i] === minTime
            const isMax = times[i] === maxTime
            return (
              <MobileCardRow key={key}>
                <MobileCardName>{benchmark.results[key].name}</MobileCardName>
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
)

const AverageTable = ({ benchmark, services, floorPctSlower }) => {
  const microAvg = benchmark.results.microlink.summary.avgColdDuration

  return (
    <FeatureTable>
      <thead>
        <tr>
          <th>Provider</th>
          <th css={theme({ textAlign: 'right' })}>Avg Cold Duration</th>
          <th css={theme({ textAlign: 'right' })}>vs.&nbsp;Microlink</th>
        </tr>
      </thead>
      <tbody>
        {services.map(key => {
          const svc = benchmark.results[key]
          const avg = svc.summary.avgColdDuration
          const delta = avg - microAvg
          const pctSlower =
            microAvg > 0
              ? floorPctSlower
                ? Math.floor((delta / microAvg) * 100)
                : ((delta / microAvg) * 100).toFixed(0)
              : 0
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
  )
}

const Footnote = ({ children }) => (
  <Text
    css={theme({
      pt: 4,
      fontSize: 0,
      color: 'black40',
      fontFamily: 'mono',
      lineHeight: 2
    })}
  >
    {children}
  </Text>
)

const TableTitle = ({ children }) => (
  <Text
    css={theme({
      fontSize: 2,
      fontWeight: 'bold',
      letterSpacing: 0,
      color: 'black',
      pb: 3
    })}
  >
    {children}
  </Text>
)

const SpeedSection = ({
  title,
  subtitle,
  description,
  benchmark,
  floorPctSlower = false,
  note,
  footnote,
  footnoteInsideNote = false,
  aside,
  children
}) => {
  const services = Object.keys(benchmark.results).sort(
    (a, b) =>
      benchmark.results[a].summary.avgColdDuration -
      benchmark.results[b].summary.avgColdDuration
  )

  return (
    <Section
      as='section'
      id='speed'
      css={theme({ bg: 'white', pt: [3, 3, 4, 4] })}
    >
      <SectionInner>
        <Subhead css={theme({ pb: [2, 2, 3, 3] })} titleize={false}>
          {title}
        </Subhead>

        <Caption
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black80'
          })}
          titleize={false}
        >
          {subtitle}
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
          {description}
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
            <TableTitle>Cold-start latency by&nbsp;URL</TableTitle>
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
              <ColdStartTable benchmark={benchmark} services={services} />
            </Box>

            <ColdStartCards benchmark={benchmark} services={services} />
          </Box>

          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <TableTitle>Average cold-start latency</TableTitle>
            <Box
              css={theme({
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: 4,
                border: `${borders[1]} ${colors.black10}`,
                bg: 'white'
              })}
            >
              <AverageTable
                benchmark={benchmark}
                services={services}
                floorPctSlower={floorPctSlower}
              />
            </Box>
            {note && (
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
                  {note}
                </Text>
                {footnoteInsideNote && footnote && (
                  <Footnote>{footnote}</Footnote>
                )}
              </Box>
            )}
            {!footnoteInsideNote && footnote && <Footnote>{footnote}</Footnote>}
            {aside}
          </Box>
        </Flex>
        {children}
      </SectionInner>
    </Section>
  )
}

export default SpeedSection
