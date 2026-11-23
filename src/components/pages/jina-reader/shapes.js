import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import {
  Section,
  SectionHeader
} from 'components/patterns/ProductStory/section'
import { FeatureTable, TableScroll } from 'components/elements/Table/Table'

import { SHAPES } from './shared'

export const Shapes = () => (
  <Section id='shapes' bg='pinky'>
    <SectionHeader title={SHAPES.title} caption={SHAPES.caption} />

    <TableScroll>
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
          {SHAPES.rows.map(({ id, need, jina, microlink }) => (
            <tr key={id}>
              <Text as='th' scope='row'>
                {need}
              </Text>
              <td>{jina}</td>
              <td>{microlink}</td>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableScroll>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {SHAPES.footnote}
      </Text>
    </Box>
  </Section>
)
