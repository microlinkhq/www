import { textGradient, theme } from 'theme'
import React from 'react'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { Section, SectionHeader, SectionNote } from './section'
import {
  CellNote,
  CellValue,
  FeatureTable,
  HIGHLIGHT_BG,
  TableCard
} from './table'

const FEATURE_MIN_WIDTH = '240px'
const VALUE_MIN_WIDTH = '112px'

const ValueHeader = ({ children, gradient }) => (
  <Text
    as='th'
    scope='col'
    css={[
      theme({
        textAlign: 'center',
        ...(gradient ? null : { color: 'black60' })
      }),
      { minWidth: VALUE_MIN_WIDTH }
    ]}
  >
    {gradient ? <span css={textGradient}>{children}</span> : children}
  </Text>
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

    <TableCard>
      <FeatureTable>
        <thead>
          <tr>
            <Text as='th' scope='col' css={{ minWidth: FEATURE_MIN_WIDTH }}>
              Capability
            </Text>
            <ValueHeader gradient>{columns[0]}</ValueHeader>
            <ValueHeader>{columns[1]}</ValueHeader>
          </tr>
        </thead>
        <tbody>
          {rows.map(
            ({ feature, href, microlink, note: rowNote, highlight, ...row }) => (
              <tr
                key={feature}
                css={{ background: highlight ? HIGHLIGHT_BG : 'transparent' }}
              >
                <Text as='th' scope='row' css={theme({ fontWeight: 'bold' })}>
                  {href ? <Link href={href}>{feature}</Link> : feature}
                  {rowNote && <CellNote>{rowNote}</CellNote>}
                </Text>
                <td>
                  <CellValue value={microlink} />
                </td>
                <td>
                  <CellValue value={row[competitorKey]} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </FeatureTable>
    </TableCard>

    <SectionNote>{note}</SectionNote>
  </Section>
)
