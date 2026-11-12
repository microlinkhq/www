import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import {
  HIGHLIGHT_BG,
  ProseTable,
  Section,
  SectionHeader,
  TableCard
} from 'components/patterns/ProductStory'

import { OWNERSHIP } from './shared'

const OwnershipRow = styled.tr`
  background: ${({ $highlight }) =>
    $highlight ? HIGHLIGHT_BG : 'transparent'};
`

export const Ownership = () => (
  <Section id='ownership' bg='pinky'>
    <SectionHeader title={OWNERSHIP.title} caption={OWNERSHIP.caption} />

    <TableCard>
      <ProseTable>
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
          {OWNERSHIP.rows.map(({ job, self, microlink, highlight }) => (
            <OwnershipRow key={job} $highlight={highlight}>
              <Text as='th' scope='row' css={theme({ fontWeight: 'bold' })}>
                {job}
              </Text>
              <Text as='td' css={theme({ color: 'black60' })}>
                {self}
              </Text>
              <td>{microlink}</td>
            </OwnershipRow>
          ))}
        </tbody>
      </ProseTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {OWNERSHIP.footnote}
      </Text>
    </Box>
  </Section>
)
