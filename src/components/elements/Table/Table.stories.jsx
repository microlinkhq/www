import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { ComparisonTable } from 'components/patterns/ProductStory/comparison'
import { Story } from 'story'

import {
  CellNote,
  CellValue,
  FeatureTable,
  HIGHLIGHT_BG,
  ProseTable,
  TableCard
} from './Table'

const COMPARISON_ROWS = [
  { feature: 'Screenshot capture', microlink: true, acme: true },
  {
    feature: 'Built-in proxy',
    href: '/docs/api/parameters/proxy',
    note: 'Residential pool, rotated per request.',
    microlink: true,
    acme: false,
    highlight: true
  },
  { feature: 'Response caching', microlink: '1 minute to 31 days', acme: 'Your code' },
  { feature: 'Ad blocking', microlink: 'Blocked by default', acme: 'Partial' },
  {
    feature: 'Firefox',
    note: 'The other tool wins here, and the table says so.',
    microlink: false,
    acme: true
  }
]

const PROSE_ROWS = [
  {
    job: 'The browser binary',
    self: 'Chrome downloads on install: about 170 MB on macOS, 282 MB on Linux.',
    microlink: 'Nothing to download. Your code makes an HTTP call.'
  },
  {
    job: 'Serverless packaging',
    self: 'Lambda caps a zip deployment at 250 MB unzipped, layers included.',
    microlink: 'No layer, no package budget to fit.',
    highlight: true
  },
  {
    job: 'Zombie processes',
    self: 'Reap leftover Chrome processes with dumb-init or docker --init.',
    microlink: 'A fresh browser per call, destroyed after the response.'
  }
]

const DATA_ROWS = [
  { request: 'Standard domain, no flags', credits: '1 credit', pages: '100,000 pages' },
  { request: 'JavaScript rendering', credits: '10 credits', pages: '10,000 pages' },
  { request: 'Microlink, any of the above', credits: '1 request', pages: '46,000 pages', highlight: true }
]

const VALUES = [
  ['true', true],
  ['false', false],
  ['string', 'One parameter'],
  ['long string', 'createBrowserContext() per job']
]

const Label = ({ children }) => (
  <Text css={theme({ pb: 2, fontFamily: 'mono', fontSize: 0, color: 'black60' })}>
    {children}
  </Text>
)

const Frame = ({ children }) => (
  <Box css={theme({ width: '100%', maxWidth: '960px' })}>{children}</Box>
)

const rowStyle = highlight =>
  highlight ? { background: HIGHLIGHT_BG } : undefined

const comparisonCode = `
import { ComparisonTable } from 'components/patterns/ProductStory'

export default () => (
  <ComparisonTable
    columns={['Microlink', 'Acme']}
    competitorKey='acme'
    rows={[
      { feature: 'Screenshot capture', microlink: true, acme: true },
      { feature: 'Built-in proxy', note: 'Residential pool.', microlink: true, acme: false, highlight: true },
      { feature: 'Response caching', microlink: '1 minute to 31 days', acme: 'Your code' }
    ]}
  />
)
`

const proseCode = `
import { ProseTable, TableCard, HIGHLIGHT_BG } from 'components/elements/Table/Table'

export default () => (
  <TableCard>
    <ProseTable>
      <thead>
        <tr>
          <th scope='col'>The job</th>
          <th scope='col'>Running it yourself</th>
          <th scope='col'>Microlink</th>
        </tr>
      </thead>
      <tbody>
        <tr css={{ background: HIGHLIGHT_BG }}>
          <th scope='row'>Serverless packaging</th>
          <td>Lambda caps a zip deployment at 250 MB.</td>
          <td>No layer, no package budget to fit.</td>
        </tr>
      </tbody>
    </ProseTable>
  </TableCard>
)
`

const dataCode = `
import { FeatureTable, TableCard } from 'components/elements/Table/Table'

export default () => (
  <TableCard>
    <FeatureTable>
      <thead>
        <tr>
          <th scope='col'>Request</th>
          <th scope='col'>Credits</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>Standard domain, no flags</th>
          <td>1 credit</td>
        </tr>
      </tbody>
    </FeatureTable>
  </TableCard>
)
`

export default {
  title: 'Elements/Table'
}

export const Comparison = () => (
  <Story name='ComparisonTable' code={comparisonCode}>
    <Frame>
      <ComparisonTable
        columns={['Microlink', 'Acme']}
        rows={COMPARISON_ROWS}
        competitorKey='acme'
      />
    </Frame>
  </Story>
)

export const Prose = () => (
  <Story name='ProseTable' code={proseCode}>
    <Frame>
      <TableCard>
        <ProseTable>
          <thead>
            <tr>
              <th scope='col'>The job</th>
              <th scope='col'>Running it yourself</th>
              <th scope='col'>Microlink</th>
            </tr>
          </thead>
          <tbody>
            {PROSE_ROWS.map(({ job, self, microlink, highlight }) => (
              <tr key={job} css={rowStyle(highlight)}>
                <th scope='row'>{job}</th>
                <td>{self}</td>
                <td>{microlink}</td>
              </tr>
            ))}
          </tbody>
        </ProseTable>
      </TableCard>
    </Frame>
  </Story>
)

export const Data = () => (
  <Story name='FeatureTable' code={dataCode}>
    <Frame>
      <TableCard>
        <FeatureTable>
          <thead>
            <tr>
              <th scope='col'>Request</th>
              <th scope='col'>Credits</th>
              <th scope='col'>Pages for $49</th>
            </tr>
          </thead>
          <tbody>
            {DATA_ROWS.map(({ request, credits, pages, highlight }) => (
              <tr key={request} css={rowStyle(highlight)}>
                <th scope='row'>{request}</th>
                <td>{credits}</td>
                <td>{pages}</td>
              </tr>
            ))}
          </tbody>
        </FeatureTable>
      </TableCard>
    </Frame>
  </Story>
)

export const Values = () => (
  <Story name='CellValue'>
    <Frame>
      <TableCard>
        <FeatureTable>
          <thead>
            <tr>
              <th scope='col'>Value</th>
              <th scope='col'>Rendered</th>
            </tr>
          </thead>
          <tbody>
            {VALUES.map(([name, value]) => (
              <tr key={name}>
                <th scope='row'>
                  {name}
                  <CellNote>value={JSON.stringify(value)}</CellNote>
                </th>
                <td>
                  <CellValue value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </FeatureTable>
      </TableCard>
      <Box css={theme({ pt: 3 })}>
        <Label>
          true renders a check, false a dash, anything else as centered text.
        </Label>
      </Box>
    </Frame>
  </Story>
)
