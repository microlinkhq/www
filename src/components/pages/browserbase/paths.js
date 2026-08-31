import React from 'react'
import { textGradient, theme } from 'theme'

import Text from 'components/elements/Text'

import {
  ProseTable,
  Section,
  SectionHeader,
  SectionNote,
  TableCard
} from 'components/patterns/ProductStory'

import { PATHS } from './shared'

const OUTPUT_MIN_WIDTH = '200px'
const PATH_MIN_WIDTH = '260px'

export const Paths = () => (
  <Section id='paths' bg='gray0'>
    <SectionHeader title={PATHS.title} caption={PATHS.caption} />

    <TableCard>
      <ProseTable>
        <thead>
          <tr>
            <Text as='th' scope='col' css={{ minWidth: OUTPUT_MIN_WIDTH }}>
              {PATHS.columns.output}
            </Text>
            <Text
              as='th'
              scope='col'
              css={[theme({ color: 'black60' }), { minWidth: PATH_MIN_WIDTH }]}
            >
              {PATHS.columns.browserbase}
            </Text>
            <Text as='th' scope='col' css={{ minWidth: PATH_MIN_WIDTH }}>
              <span css={textGradient}>{PATHS.columns.microlink}</span>
            </Text>
          </tr>
        </thead>
        <tbody>
          {PATHS.rows.map(({ output, browserbase, microlink }) => (
            <tr key={output}>
              <Text as='th' scope='row'>
                {output}
              </Text>
              <td>{browserbase}</td>
              <Text as='td' css={theme({ color: 'black' })}>
                {microlink}
              </Text>
            </tr>
          ))}
        </tbody>
      </ProseTable>
    </TableCard>

    <SectionNote>{PATHS.footnote}</SectionNote>
  </Section>
)
