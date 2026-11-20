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
  breakpoints
} from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import {
  Cross,
  FeatureTable,
  TableScroll
} from 'components/elements/Table/Table'
import {
  breakableName,
  displayedTotal,
  formatDuration,
  isMeasured,
  microlinkDelta,
  relativeSpeed
} from './claims'

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`

const MICROLINK = 'microlink'

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
      fontSize: 1,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    })}
  }

  th {
    ${theme({ verticalAlign: 'bottom' })}
    text-wrap: balance;
  }

  th:first-child,
  td:first-child {
    ${theme({ pl: 0, textAlign: 'left', color: 'black' })}
  }

  th:last-child,
  td:last-child {
    ${theme({ pr: 0 })}

    @media (max-width: ${BREAKPOINT_COMPACT_MAX}) {
      display: none;
    }
  }
`

const AverageFeatureTable = styled(FeatureTable)`
  min-width: 0;

  th,
  td {
    ${theme({ fontSize: 1 })}
  }

  td {
    ${theme({ fontVariantNumeric: 'tabular-nums' })}
  }
`

const TimeWithDelta = ({ children, delta }) => (
  <>
    {children}
    {delta && ` (${delta})`}
  </>
)

const MobileCards = styled('div')`
  ${theme({
    display: 'none',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'sans'
  })};
  gap: ${space[4]};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ display: 'flex' })};
  }
`

const MobileCardHeader = styled('div')`
  ${theme({
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    py: 2,
    borderBottom: 1,
    borderBottomColor: 'black10'
  })};
`

const MobileCardRow = styled('div')`
  ${theme({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 1,
    py: 2,
    borderBottom: 1,
    borderBottomColor: 'black05'
  })};
  font-variant-numeric: tabular-nums;

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
    color: 'black',
    textAlign: 'right'
  })};
`

const MobileCardTime = styled('span')`
  ${theme({ color: 'black', textAlign: 'right' })};
`

const urlTimes = (benchmark, services, url) =>
  services.map(
    key =>
      benchmark.results[key].perUrl.find(p => p.url === url)?.coldDuration ??
      null
  )

const NOT_MEASURED = '-'

const timeLabel = (ms, format) => (isMeasured(ms) ? format(ms) : NOT_MEASURED)

const averageComparison = (avg, microAvg) =>
  isMeasured(avg) && isMeasured(microAvg) ? relativeSpeed(avg, microAvg) : null

const ColdStartTable = ({ benchmark, services }) => (
  <PerUrlTable>
    <thead>
      <tr>
        <th css={theme({ textAlign: 'left' })}>URL</th>
        {services.map(key => (
          <th key={key}>{breakableName(benchmark.results[key].name)}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {benchmark.testUrls.map(({ url }) => {
        const times = urlTimes(benchmark, services, url)
        const delta = microlinkDelta(times, services)

        return (
          <tr key={url}>
            <td>{extractDomain(url)}</td>
            {services.map((key, i) => (
              <td key={key}>
                <TimeWithDelta delta={key === MICROLINK && delta}>
                  {timeLabel(times[i], formatMs)}
                </TimeWithDelta>
              </td>
            ))}
          </tr>
        )
      })}
      {(() => {
        const totals = services.map(key =>
          displayedTotal(benchmark.results[key].perUrl)
        )
        const delta = microlinkDelta(totals, services)

        return (
          <tr>
            <td
              css={theme({
                color: 'black',
                borderTop: `${borders[1]} ${colors.black10}`
              })}
            >
              Total
            </td>
            {services.map((key, i) => (
              <td
                key={key}
                css={theme({ borderTop: `${borders[1]} ${colors.black10}` })}
              >
                <TimeWithDelta delta={key === MICROLINK && delta}>
                  {timeLabel(totals[i], formatMs)}
                </TimeWithDelta>
              </td>
            ))}
          </tr>
        )
      })()}
    </tbody>
  </PerUrlTable>
)

const TimingCard = ({ title, rows, showDelta = false }) => {
  const keys = rows.map(({ key }) => key)
  const delta =
    showDelta &&
    microlinkDelta(
      rows.map(({ ms }) => ms),
      keys
    )

  return (
    <div>
      <MobileCardHeader>{title}</MobileCardHeader>
      {rows.map(({ key, name, ms, suffix }) => (
        <MobileCardRow key={key}>
          <MobileCardName>{name}</MobileCardName>
          <MobileCardTime>
            <TimeWithDelta delta={key === MICROLINK && delta}>
              {timeLabel(ms, formatDuration)}
            </TimeWithDelta>
            {suffix && <MobileCardSuffix>{suffix}</MobileCardSuffix>}
          </MobileCardTime>
        </MobileCardRow>
      ))}
    </div>
  )
}

const ColdStartCards = ({ benchmark, services }) => (
  <MobileCards>
    {benchmark.testUrls.map(({ url }) => {
      const times = urlTimes(benchmark, services, url)
      return (
        <TimingCard
          key={url}
          showDelta
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
      showDelta
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
            suffix: key === MICROLINK ? null : averageComparison(avg, microAvg)
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
          const isMicrolink = key === MICROLINK

          return (
            <tr key={key}>
              <td>{svc.name}</td>
              <td css={theme({ textAlign: 'right' })}>
                {timeLabel(avg, formatDuration)}
              </td>
              <td css={theme({ textAlign: 'right' })}>
                {isMicrolink
                  ? (
                    <Cross />
                    )
                  : (
                      averageComparison(avg, microAvg) || NOT_MEASURED
                    )}
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
            color: 'black'
          })}
        >
          {subtitle}
        </Caption>

        <Text
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black',
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
            <TableScroll css={theme({ display: ['none', 'block'] })}>
              <ColdStartTable benchmark={benchmark} services={services} />
            </TableScroll>

            <ColdStartCards benchmark={benchmark} services={services} />
          </Box>

          <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
            <TableTitle>Average cold-start latency</TableTitle>
            <TableScroll css={theme({ display: ['none', 'block'] })}>
              <AverageTable benchmark={benchmark} services={services} />
            </TableScroll>

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
                    color: 'black',
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
