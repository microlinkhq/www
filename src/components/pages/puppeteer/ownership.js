import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import {
  FeatureTable,
  Section,
  SectionHeader,
  TableScroll
} from 'components/patterns/ProductStory'

import { OWNERSHIP } from './shared'

export const Ownership = () => (
  <Section id='ownership' bg='pinky'>
    <SectionHeader title={OWNERSHIP.title} caption={OWNERSHIP.caption} />

    <TableScroll>
      <FeatureTable>
        <thead>
          <tr>
            {OWNERSHIP.columns.map(column => (
              <th key={column} scope='col'>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {OWNERSHIP.rows.map(({ job, self, microlink }) => (
            <tr key={job}>
              <th scope='row'>{job}</th>
              <td>{self}</td>
              <td>{microlink}</td>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableScroll>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {OWNERSHIP.footnote}
      </Text>
    </Box>
  </Section>
)
