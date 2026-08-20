import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { Section, SectionHeader, Scroller } from './section'
import { COMPARISON } from './shared'

const ComparisonTable = styled(Text)`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    ${theme({ p: 2, textAlign: 'left', verticalAlign: 'top' })}
  }

  th:first-child,
  td:first-child {
    ${theme({ pl: 0 })}
  }

  th:last-child,
  td:last-child {
    ${theme({ pr: 0 })}
  }

  thead th {
    ${theme({
      fontFamily: 'sans',
      fontSize: 1,
      fontWeight: 'bold',
      color: 'black',
      borderBottom: 1,
      borderBottomColor: 'black10',
      whiteSpace: 'nowrap'
    })}
  }

  tbody tr {
    ${theme({ borderBottom: 1, borderBottomColor: 'black05' })}
  }

  tbody tr:last-child {
    ${theme({ borderBottom: 0 })}
  }
`

const RowLabel = ({ children }) => (
  <Text
    as='th'
    scope='row'
    css={theme({
      fontFamily: 'sans',
      fontSize: 1,
      fontWeight: 'bold',
      color: 'black'
    })}
  >
    {children}
  </Text>
)

const MicrolinkValue = ({ value, href }) => (
  <Text
    as='td'
    css={theme({
      fontFamily: 'sans',
      fontSize: 1,
      color: 'black80'
    })}
  >
    {href ? <Link href={href}>{value}</Link> : value}
  </Text>
)

const CompetitorValue = ({ value }) => (
  <Text
    as='td'
    css={theme({
      fontFamily: 'sans',
      fontSize: 1,
      color: 'black60'
    })}
  >
    {value}
  </Text>
)

const ComparisonCard = ({ row, columns }) => (
  <Box
    as='li'
    css={theme({
      borderBottom: 1,
      borderBottomColor: 'black05',
      py: 3
    })}
  >
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: 1,
        fontWeight: 'bold',
        color: 'black',
        pb: 2
      })}
    >
      {row.label}
    </Text>
    <Box css={theme({ display: 'flex', flexDirection: 'column', gap: 2 })}>
      <Box>
        <Caps
          css={theme({
            display: 'block',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'secondary'
          })}
        >
          {columns[0]}
        </Caps>
        <Text css={theme({ fontSize: 1, color: 'black80', pt: 1 })}>
          {row.microlinkHref
            ? (
              <Link href={row.microlinkHref}>{row.microlink}</Link>
              )
            : (
                row.microlink
              )}
        </Text>
      </Box>
      <Box>
        <Caps
          css={theme({
            display: 'block',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black40'
          })}
        >
          {columns[1]}
        </Caps>
        <Text css={theme({ fontSize: 1, color: 'black60', pt: 1 })}>
          {row.scrapingbee}
        </Text>
      </Box>
    </Box>
  </Box>
)

export const Comparison = () => (
  <Section id='comparison'>
    <SectionHeader title={COMPARISON.title} caption={COMPARISON.caption} />

    <Box
      as='ul'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: ['block', 'block', 'none', 'none']
      })}
    >
      {COMPARISON.rows.map(row => (
        <ComparisonCard
          key={row.label}
          row={row}
          columns={COMPARISON.columns}
        />
      ))}
    </Box>

    <Box css={theme({ display: ['none', 'none', 'block', 'block'] })}>
      <Scroller>
        <ComparisonTable as='table'>
          <thead>
            <tr>
              <Text as='th' scope='col'>
                Capability
              </Text>
              {COMPARISON.columns.map(column => (
                <Text key={column} as='th' scope='col'>
                  {column}
                </Text>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map(row => (
              <tr key={row.label}>
                <RowLabel>{row.label}</RowLabel>
                <MicrolinkValue
                  value={row.microlink}
                  href={row.microlinkHref}
                />
                <CompetitorValue value={row.scrapingbee} />
              </tr>
            ))}
          </tbody>
        </ComparisonTable>
      </Scroller>
    </Box>
  </Section>
)
