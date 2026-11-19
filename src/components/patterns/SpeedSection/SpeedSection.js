import { extractDomain } from 'helpers/extract-domain'
import styled from 'styled-components'
import React from 'react'
import {
  borders,
  colors,
  layout,
  SECTION_VERTICAL_SPACING,
  theme,
  space,
  radii,
  breakpoints
} from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import { Cross, FeatureTable, TableCard } from 'components/elements/Table/Table'
import {
  breakableName,
  displayedTotal,
  formatDuration,
  relativeSpeed
} from './claims'

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_12 = `calc(${space[3]} - ${space[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

const Section = styled(Box)`
  ${theme({
    py: SECTION_VERTICAL_SPACING,
    px: [3, 3, 4, 4]
  })}
`

const SectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0,
    px: 0
  })}
`

const PerUrlTable = styled(FeatureTable)`
  min-width: 0;

  th,
  td {
    ${theme({
      px: 2,
      textAlign: 'right',
      whiteSpace: 'nowrap',
      fontVariantNumeric: 'tabular-nums'
    })}
  }

  th {
    ${theme({ whiteSpace: 'normal', verticalAlign: 'bottom' })}
    text-wrap: balance;
  }

  th:first-child,
  td:first-child {
    ${theme({ pl: 3, textAlign: 'left', color: 'black' })}
  }

  th:last-child,
  td:last-child {
    ${theme({ pr: 3 })}
  }

  th:last-child,
  td:last-child {
    @media (max-width: ${BREAKPOINT_COMPACT_MAX}) {
      display: none;
    }
  }
`

const AverageFeatureTable = styled(FeatureTable)`
  min-width: 0;

  td {
    ${theme({ fontVariantNumeric: 'tabular-nums' })}
  }
`

const CellHighlight = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'secondary' })};
`

const CellLoser = styled('span')`
  ${theme({ color: 'black50' })};
`

const MobileCards = styled('div')`
  ${theme({
    display: 'none',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'sans'
  })};
  gap: ${SPACE_12};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ display: 'flex' })};
  }
`

const MobileCard = styled('div')`
  ${theme({ borderRadius: 3, bg: 'white' })};
  border: ${borders[1]} ${colors.black10};
  overflow: hidden;
`

const MobileCardHeader = styled('div')`
  ${theme({
    fontSize: 1,
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
    fontSize: 1
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

const MobileCardSuffix = styled('span')`
  ${theme({
    display: 'block',
    fontWeight: 'normal',
    color: 'black60',
    textAlign: 'right'
  })};
`

const MobileCardTime = styled('span')`
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  color: ${({ $isMin, $isMax }) =>
    $isMin ? colors.secondary : $isMax ? colors.black50 : colors.black};
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
              color: key === 'microlink' ? colors.secondary : colors.black
            })}
          >
            {breakableName(benchmark.results[key].name)}
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
        const totals = services.map(key =>
          displayedTotal(benchmark.results[key].perUrl)
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
                      ? colors.secondary
                      : isMax
                        ? colors.black50
                        : colors.black
                  })}
                >
                  {formatDuration(totals[i])}
                </td>
              )
            })}
          </tr>
        )
      })()}
    </tbody>
  </PerUrlTable>
)

const TimingCard = ({ title, rows }) => {
  const times = rows.map(({ ms }) => ms)
  const minTime = Math.min(...times)
  const maxTime = Math.max(...times)

  return (
    <MobileCard>
      <MobileCardHeader>{title}</MobileCardHeader>
      {rows.map(({ key, name, ms, suffix }) => {
        const isMin = ms === minTime
        const isMax = ms === maxTime
        return (
          <MobileCardRow key={key}>
            <MobileCardName>{name}</MobileCardName>
            <MobileCardTime
              $highlight={isMin || isMax}
              $isMin={isMin}
              $isMax={isMax}
            >
              {formatDuration(ms)}
              {suffix && <MobileCardSuffix>{suffix}</MobileCardSuffix>}
            </MobileCardTime>
          </MobileCardRow>
        )
      })}
    </MobileCard>
  )
}

const ColdStartCards = ({ benchmark, services }) => (
  <MobileCards>
    {benchmark.testUrls.map(({ url }) => {
      const times = urlTimes(benchmark, services, url)
      return (
        <TimingCard
          key={url}
          title={extractDomain(url)}
          rows={services.map((key, i) => ({
            key,
            name: benchmark.results[key].name,
            ms: times[i]
          }))}
        />
      )
    })}
    <TimingCard
      title='Total'
      rows={services.map(key => ({
        key,
        name: benchmark.results[key].name,
        ms: displayedTotal(benchmark.results[key].perUrl)
      }))}
    />
  </MobileCards>
)

const AverageCards = ({ benchmark, services }) => {
  const microAvg = benchmark.results.microlink.summary.avgColdDuration
  return (
    <MobileCards>
      <TimingCard
        title='Average per URL'
        rows={services.map(key => {
          const avg = benchmark.results[key].summary.avgColdDuration
          return {
            key,
            name: benchmark.results[key].name,
            ms: avg,
            suffix: key === 'microlink' ? null : relativeSpeed(avg, microAvg)
          }
        })}
      />
    </MobileCards>
  )
}

const AverageTable = ({ benchmark, services }) => {
  const microAvg = benchmark.results.microlink.summary.avgColdDuration

  return (
    <AverageFeatureTable>
      <thead>
        <tr>
          <th>Provider</th>
          <th css={theme({ textAlign: 'right' })}>Avg Cold&nbsp;Duration</th>
          <th css={theme({ textAlign: 'right' })}>vs.&nbsp;Microlink</th>
        </tr>
      </thead>
      <tbody>
        {services.map(key => {
          const svc = benchmark.results[key]
          const avg = svc.summary.avgColdDuration
          const isMicrolink = key === 'microlink'

          return (
            <tr key={key}>
              <td>
                <span
                  css={theme({
                    fontWeight: isMicrolink ? 'bold' : 'normal',
                    color: isMicrolink ? colors.secondary : 'black'
                  })}
                >
                  {svc.name}
                </span>
              </td>
              <td
                css={theme({
                  textAlign: 'right',
                  fontWeight: isMicrolink ? 'bold' : 'normal',
                  color: isMicrolink ? colors.secondary : undefined
                })}
              >
                {formatDuration(avg)}
              </td>
              <td
                css={theme({
                  textAlign: 'right',
                  color: isMicrolink ? colors.secondary : 'black'
                })}
              >
                {isMicrolink ? <Cross /> : relativeSpeed(avg, microAvg)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </AverageFeatureTable>
  )
}

const Footnote = ({ children }) => (
  <Text
    css={theme({
      pt: 4,
      fontSize: 0,
      color: 'black60',
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
    <Section as='section' id='speed' css={theme({ bg: 'white' })}>
      <SectionInner>
        <Subhead css={theme({ pb: [2, 2, 3, 3] })}>{title}</Subhead>

        <Caption
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black80'
          })}
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
            flexDirection: ['column', 'column', 'column', 'row'],
            gap: [3, 3, 4, 4],
            alignItems: 'flex-start',
            width: '100%'
          })}
        >
          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <TableTitle>Cold-start latency by&nbsp;URL</TableTitle>
            <TableCard css={theme({ display: ['none', 'block'] })}>
              <ColdStartTable benchmark={benchmark} services={services} />
            </TableCard>

            <ColdStartCards benchmark={benchmark} services={services} />
          </Box>

          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <TableTitle>Average cold-start latency</TableTitle>
            <TableCard css={theme({ display: ['none', 'block'] })}>
              <AverageTable benchmark={benchmark} services={services} />
            </TableCard>

            <AverageCards benchmark={benchmark} services={services} />
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
