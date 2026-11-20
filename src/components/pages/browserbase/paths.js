import React from 'react'

import Text from 'components/elements/Text'

import {
  FeatureTable,
  Section,
  SectionHeader,
  SectionNote,
  TableScroll
} from 'components/patterns/ProductStory'

import { PATHS } from './shared'

const OUTPUT_MIN_WIDTH = '200px'
const PATH_MIN_WIDTH = '260px'

export const Paths = () => (
  <Section id='paths' bg='gray0'>
    <SectionHeader title={PATHS.title} caption={PATHS.caption} />

    <TableScroll>
      <FeatureTable>
        <thead>
          <tr>
            <Text as='th' scope='col' css={{ minWidth: OUTPUT_MIN_WIDTH }}>
              {PATHS.columns.output}
            </Text>
            <Text as='th' scope='col' css={{ minWidth: PATH_MIN_WIDTH }}>
              {PATHS.columns.browserbase}
            </Text>
            <Text as='th' scope='col' css={{ minWidth: PATH_MIN_WIDTH }}>
              {PATHS.columns.microlink}
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
              <td>{microlink}</td>
            </tr>
          ))}
        </tbody>
      </FeatureTable>
    </TableScroll>

    <SectionNote>{PATHS.footnote}</SectionNote>
  </Section>
)
