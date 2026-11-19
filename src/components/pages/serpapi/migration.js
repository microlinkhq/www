import { theme } from 'theme'
import React from 'react'

import Text from 'components/elements/Text'

import {
  FeatureTable,
  Section,
  SectionHeader,
  SectionNote,
  TableScroll
} from 'components/patterns/ProductStory'

import { MIGRATION } from './shared'

export const Migration = () => (
  <Section id='migration' bordered>
    <SectionHeader title={MIGRATION.title} caption={MIGRATION.caption} />

    <TableScroll>
      <FeatureTable>
        <thead>
          <tr>
            {MIGRATION.columns.map(column => (
              <Text key={column} as='th' scope='col'>
                {column}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>
          {MIGRATION.rows.map(({ id, serpapi, microlink }) => (
            <tr key={id}>
              <Text as='td' css={theme({ color: 'black60' })}>
                {serpapi}
              </Text>
              <td>{microlink}</td>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableScroll>

    <SectionNote>{MIGRATION.note}</SectionNote>
  </Section>
)
