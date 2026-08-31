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
import { COMPARISON } from './shared'

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

export const Comparison = () => (
  <Section id='comparison' bordered>
    <SectionHeader title={COMPARISON.title} caption={COMPARISON.caption} />

    <TableCard>
      <FeatureTable>
        <thead>
          <tr>
            <Text as='th' scope='col' css={{ minWidth: FEATURE_MIN_WIDTH }}>
              Capability
            </Text>
            <ValueHeader gradient>{COMPARISON.columns[0]}</ValueHeader>
            <ValueHeader>{COMPARISON.columns[1]}</ValueHeader>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.rows.map(
            ({ feature, href, microlink, scrapingbee, note, highlight }) => (
              <tr
                key={feature}
                css={{ background: highlight ? HIGHLIGHT_BG : 'transparent' }}
              >
                <Text as='th' scope='row' css={theme({ fontWeight: 'bold' })}>
                  {href ? <Link href={href}>{feature}</Link> : feature}
                  {note && <CellNote>{note}</CellNote>}
                </Text>
                <td>
                  <CellValue value={microlink} />
                </td>
                <td>
                  <CellValue value={scrapingbee} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </FeatureTable>
    </TableCard>

    <SectionNote>{COMPARISON.note}</SectionNote>
  </Section>
)
