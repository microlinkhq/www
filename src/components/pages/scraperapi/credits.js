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
import { CREDITS } from './shared'

export const Credits = () => (
  <Section id='credits' bg='pinky'>
    <SectionHeader title={CREDITS.title} caption={CREDITS.caption} />

    <TableCard>
      <FeatureTable>
        <thead>
          <tr>
            {CREDITS.columns.map((column, index) => (
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
          {CREDITS.rows.map(({ config, credits, pages, highlight }) => (
            <tr
              key={config}
              css={{ background: highlight ? HIGHLIGHT_BG : 'transparent' }}
            >
              <Text
                as='th'
                scope='row'
                css={theme({ fontWeight: highlight ? 'bold' : 'regular' })}
              >
                {config}
              </Text>
              <Text
                as='td'
                css={[
                  theme({ textAlign: 'right', color: 'black60' }),
                  { whiteSpace: 'nowrap' }
                ]}
              >
                {credits}
              </Text>
              <Text
                as='td'
                css={[
                  theme({
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: 'black'
                  }),
                  { whiteSpace: 'nowrap' }
                ]}
              >
                {pages}
              </Text>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {CREDITS.footnote}
      </Text>
    </Box>
  </Section>
)
