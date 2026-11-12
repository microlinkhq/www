import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
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

import { MIGRATION } from './shared'

const MigrationRow = styled.tr`
  background: ${({ $highlight }) =>
    $highlight ? HIGHLIGHT_BG : 'transparent'};
`

const Snippet = ({ title, language, code }) => (
  <CodeEditor title={title} language={language} css={theme({ width: '100%' })}>
    {code}
  </CodeEditor>
)

const SnippetStack = () => (
  <Box
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      gap: [3, 3, 4, 4],
      mx: 'auto',
      pb: [4, 4, 5, 5],
      width: '100%',
      maxWidth: layout.normal
    })}
  >
    <Snippet {...MIGRATION.before} language='html' />
    <Snippet {...MIGRATION.after} language='html' />
    <Snippet {...MIGRATION.server} language='javascript' />
  </Box>
)

const MigrationTable = () => (
  <TableCard>
    <ProseTable>
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
        {MIGRATION.rows.map(({ id, need, clearbit, microlink, highlight }) => (
          <MigrationRow key={id} $highlight={highlight}>
            <Text as='th' scope='row'>
              {need}
            </Text>
            <td>{clearbit}</td>
            <td>{microlink}</td>
          </MigrationRow>
        ))}
      </tbody>
    </ProseTable>
  </TableCard>
)

export const Migration = () => (
  <Section id='migration' bg='pinky'>
    <SectionHeader title={MIGRATION.title} caption={MIGRATION.caption} />
    <SnippetStack />
    <MigrationTable />
    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {MIGRATION.footnote}
      </Text>
    </Box>
  </Section>
)
