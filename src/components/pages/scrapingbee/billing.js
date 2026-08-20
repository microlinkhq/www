import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import { Section, SectionHeader, Scroller } from './section'
import { BILLING } from './shared'

const BillingTable = styled(Text)`
  width: 100%;
  border-collapse: collapse;
  ${theme({ fontVariantNumeric: 'tabular-nums' })}

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

const Cell = ({ children, mono = false, strong = false }) => (
  <Text
    as='td'
    css={theme({
      fontFamily: mono ? 'mono' : 'sans',
      fontSize: 1,
      color: strong ? 'black' : 'black80'
    })}
  >
    {children}
  </Text>
)

export const Billing = () => (
  <Section id='billing' bg='pinky'>
    <SectionHeader title={BILLING.title} caption={BILLING.caption} />

    <Scroller>
      <BillingTable as='table'>
        <thead>
          <tr>
            {BILLING.columns.map(column => (
              <Text key={column} as='th' scope='col'>
                {column}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>
          {BILLING.rows.map(row => (
            <tr key={row.config}>
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
                {row.config}
              </Text>
              <Cell mono>{row.credits}</Cell>
              <Cell strong>{row.pages}</Cell>
            </tr>
          ))}
        </tbody>
      </BillingTable>
    </Scroller>

    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Text css={theme({ fontSize: 1, color: 'black60' })}>
        {BILLING.footnote}
      </Text>
    </Box>
  </Section>
)
