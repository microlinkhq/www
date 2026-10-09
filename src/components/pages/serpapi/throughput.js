import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import {
  FeatureTable,
  HIGHLIGHT_BG,
  Section,
  SectionHeader,
  TableCard
} from 'components/patterns/ProductStory'

import { THROUGHPUT } from './shared'

const PLAN_CELL = { '&&': { minWidth: '168px' } }
const NUMERIC_CELL = { '&&': { whiteSpace: 'nowrap', wordBreak: 'normal' } }

export const Throughput = () => (
  <Section id='throughput' bg='pinky'>
    <SectionHeader title={THROUGHPUT.title} caption={THROUGHPUT.caption} />

    <TableCard>
      <FeatureTable>
        <thead>
          <tr>
            {THROUGHPUT.columns.map((column, index) => (
              <Text
                key={column}
                as='th'
                scope='col'
                css={index === 0 ? null : theme({ textAlign: 'right' })}
              >
                {column}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>
          {THROUGHPUT.rows.map(({ plan, cells, highlight }) => (
            <tr
              key={plan}
              css={{ background: highlight ? HIGHLIGHT_BG : 'transparent' }}
            >
              <Text
                as='th'
                scope='row'
                css={[
                  theme({ fontWeight: highlight ? 'bold' : 'regular' }),
                  PLAN_CELL
                ]}
              >
                {plan}
              </Text>
              {cells.map((cell, index) => (
                <Text
                  key={THROUGHPUT.columns[index + 1]}
                  as='td'
                  css={[
                    theme(
                      index === 1
                        ? {
                            textAlign: 'right',
                            fontWeight: 'bold',
                            color: 'black'
                          }
                        : { textAlign: 'right', color: 'black60' }
                    ),
                    NUMERIC_CELL
                  ]}
                >
                  {cell}
                </Text>
              ))}
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {THROUGHPUT.footnote}
      </Text>
    </Box>
  </Section>
)
