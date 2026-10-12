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

import { SHAPES } from './shared'

export const Shapes = () => (
  <Section id='shapes' bg='pinky'>
    <SectionHeader title={SHAPES.title} caption={SHAPES.caption} />

    <TableCard>
      <FeatureTable>
        <thead>
          <tr>
            {SHAPES.columns.map(column => (
              <Text key={column} as='th' scope='col'>
                {column}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>
          {SHAPES.rows.map(({ id, need, jina, microlink, highlight }) => (
            <tr
              key={id}
              css={{ background: highlight ? HIGHLIGHT_BG : 'transparent' }}
            >
              <Text
                as='th'
                scope='row'
                css={theme({ fontWeight: highlight ? 'bold' : 'regular' })}
              >
                {need}
              </Text>
              <Text as='td' css={theme({ color: 'black60' })}>
                {jina}
              </Text>
              <Text as='td' css={theme({ fontWeight: 'bold', color: 'black' })}>
                {microlink}
              </Text>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {SHAPES.footnote}
      </Text>
    </Box>
  </Section>
)
