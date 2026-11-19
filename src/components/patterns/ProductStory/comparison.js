import { breakpoints, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import { Link } from 'components/elements/Link'
import MicrolinkLogo from 'components/logos/Microlink'
import Text from 'components/elements/Text'

import { Section, SectionHeader, SectionNote } from './section'
import {
  CellNote,
  CellValue,
  FeatureTable,
  TableScroll
} from 'components/elements/Table/Table'

const FEATURE_MIN_WIDTH = '280px'
const VALUE_WIDTH = '22%'
const VALUE_MIN_WIDTH = '144px'
const MICROLINK_COLUMN = 2

const StyledComparisonTable = styled(FeatureTable)`
  th:nth-child(${MICROLINK_COLUMN}),
  td:nth-child(${MICROLINK_COLUMN}) {
    ${theme({ color: 'black' })}
  }

  thead th:nth-child(${MICROLINK_COLUMN}) {
    ${theme({ color: 'secondary' })}
  }

  @media (max-width: ${breakpoints[0]}) {
    tr {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: auto auto auto;
      ${theme({ py: 0 })}
    }

    tbody th {
      grid-column: 1 / -1;
      ${theme({ pt: 3, pb: 2 })}
    }

    td {
      display: grid;
      grid-row: 2 / span 2;
      grid-template-rows: subgrid;
      ${theme({
        justifyItems: 'center',
        alignItems: 'start',
        textAlign: 'center',
        rowGap: 1,
        py: 3,
        overflowWrap: 'break-word'
      })}
    }

    td:nth-child(${MICROLINK_COLUMN})::before {
      ${theme({ color: 'secondary' })}
    }
  }
`

const ValueHeader = ({ children }) => (
  <th
    scope='col'
    css={[
      theme({ textAlign: 'center' }),
      { width: VALUE_WIDTH, minWidth: VALUE_MIN_WIDTH }
    ]}
  >
    {children}
  </th>
)

const MicrolinkLabel = ({ children }) => (
  <Text
    as='span'
    css={theme({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      color: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    })}
  >
    <MicrolinkLogo
      alt=''
      aria-hidden='true'
      loading='eager'
      css={theme({ width: '1em', height: '1em' })}
    />
    {children}
  </Text>
)

export const ComparisonTable = ({
  columns,
  rows,
  competitorKey,
  featureLabel = 'Capability'
}) => (
  <TableScroll>
    <StyledComparisonTable>
      <thead>
        <tr>
          <th scope='col' css={{ minWidth: FEATURE_MIN_WIDTH }}>
            {featureLabel}
          </th>
          <ValueHeader>
            <MicrolinkLabel>{columns[0]}</MicrolinkLabel>
          </ValueHeader>
          <ValueHeader>{columns[1]}</ValueHeader>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ feature, href, note, ...row }) => (
          <tr key={feature}>
            <Text as='th' scope='row'>
              {href ? <Link href={href}>{feature}</Link> : feature}
              {note && <CellNote>{note}</CellNote>}
            </Text>
            <td data-label={columns[0]}>
              <CellValue value={row.microlink} />
            </td>
            <td data-label={columns[1]}>
              <CellValue value={row[competitorKey]} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledComparisonTable>
  </TableScroll>
)

export const ProductComparison = ({
  title,
  caption,
  columns,
  rows,
  note,
  competitorKey
}) => (
  <Section id='comparison' bordered>
    <SectionHeader title={title} caption={caption} />

    <ComparisonTable
      columns={columns}
      rows={rows}
      competitorKey={competitorKey}
    />

    <SectionNote>{note}</SectionNote>
  </Section>
)
