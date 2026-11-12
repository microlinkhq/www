import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import {
  Section,
  SectionHeader
} from 'components/patterns/ProductStory/section'
import {
  HIGHLIGHT_BG,
  ProseTable,
  TableCard
} from 'components/patterns/ProductStory/table'

import { SHAPES } from './shared'

const ShapeRow = styled.tr`
  background: ${({ $highlight }) =>
    $highlight ? HIGHLIGHT_BG : 'transparent'};
`

export const Shapes = () => (
  <Section id='shapes' bg='pinky'>
    <SectionHeader title={SHAPES.title} caption={SHAPES.caption} />

    <TableCard>
      <ProseTable>
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
            <ShapeRow key={id} $highlight={highlight}>
              <Text as='th' scope='row'>
                {need}
              </Text>
              <td>{jina}</td>
              <td>{microlink}</td>
            </ShapeRow>
          ))}
        </tbody>
      </ProseTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {SHAPES.footnote}
      </Text>
    </Box>
  </Section>
)
