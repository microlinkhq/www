import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import {
  GradientText,
  HIGHLIGHT_BG,
  ProseTable,
  Section,
  SectionHeader,
  TableCard
} from 'components/patterns/ProductStory'

import { PLAYWRIGHT_PAGE_API } from './shared'

const MappingRow = styled.tr`
  background: ${({ $highlight }) =>
    $highlight ? HIGHLIGHT_BG : 'transparent'};
`

const code = value => <code>{value}</code>

const MAPPING = {
  title: (
    <>
      Your Playwright calls, <GradientText>as parameters</GradientText>.
    </>
  ),
  caption: (
    <>
      Most of a Playwright screenshot or PDF script configures one page, then
      captures it. Each of those calls has a Microlink query parameter, so the
      script becomes one request. Steps that need real code go to{' '}
      <Link href='/function'>Function</Link>, which hands your code a Puppeteer
      page: Playwright locators and calls do not run there and have to be
      rewritten.
    </>
  ),
  columns: ['What the script does', 'Playwright', 'Microlink'],
  rows: [
    {
      id: 'full-page',
      need: 'Full-page screenshot',
      playwright: code('page.screenshot({ fullPage: true })'),
      microlink: 'screenshot.fullPage',
      href: '/docs/api/parameters/screenshot/fullPage',
      highlight: true
    },
    {
      id: 'element',
      need: 'Screenshot one element',
      playwright: code('locator.screenshot()'),
      microlink: 'screenshot.element',
      href: '/docs/api/parameters/screenshot/element'
    },
    {
      id: 'screenshot-format',
      need: 'JPEG, quality, transparency',
      playwright: code('type, quality, omitBackground'),
      microlink:
        'screenshot.type, screenshot.quality, screenshot.omitBackground',
      href: '/docs/api/parameters/screenshot/type'
    },
    {
      id: 'animations',
      need: 'Freeze animations',
      playwright: code("animations: 'disabled'"),
      microlink: 'animations',
      href: '/docs/api/parameters/animations'
    },
    {
      id: 'pdf',
      need: 'PDF in a paper size',
      playwright: code("page.pdf({ format: 'A4' })"),
      microlink: 'pdf.format',
      href: '/docs/api/parameters/pdf/format',
      highlight: true
    },
    {
      id: 'pdf-layout',
      need: 'PDF margins, scale, pages, orientation',
      playwright: code('margin, scale, pageRanges, landscape'),
      microlink: 'pdf.margin, pdf.scale, pdf.pageRanges, pdf.landscape',
      href: '/docs/api/parameters/pdf'
    },
    {
      id: 'media',
      need: 'Screen or print CSS, dark mode',
      playwright: code('page.emulateMedia({ media, colorScheme })'),
      microlink: 'mediaType, colorScheme',
      href: '/docs/api/parameters/mediaType'
    },
    {
      id: 'device',
      need: 'Emulate a phone',
      playwright: code("newContext(devices['iPhone 15 Pro'])"),
      microlink: "device: 'iPhone 15 Pro'",
      href: '/docs/api/parameters/device',
      highlight: true
    },
    {
      id: 'viewport',
      need: 'Custom viewport',
      playwright: code('page.setViewportSize()'),
      microlink: 'viewport',
      href: '/docs/api/parameters/viewport'
    },
    {
      id: 'wait-selector',
      need: 'Wait for an element',
      playwright: code('page.waitForSelector()'),
      microlink: 'waitForSelector',
      href: '/docs/api/parameters/waitForSelector'
    },
    {
      id: 'wait-until',
      need: 'Wait for a load event',
      playwright: code('page.goto(url, { waitUntil })'),
      microlink: 'waitUntil',
      href: '/docs/api/parameters/waitUntil'
    },
    {
      id: 'wait-timeout',
      need: 'Wait a fixed time',
      playwright: code('page.waitForTimeout()'),
      microlink: 'waitForTimeout',
      href: '/docs/api/parameters/waitForTimeout'
    },
    {
      id: 'headers',
      need: 'Send cookies or auth headers',
      playwright: code('page.setExtraHTTPHeaders()'),
      microlink: 'headers',
      href: '/docs/api/parameters/headers'
    },
    {
      id: 'adblock',
      need: 'Block ads, trackers, cookie banners',
      playwright: code('page.route() + route.abort()'),
      microlink: 'adblock (on by default)',
      href: '/docs/api/parameters/adblock',
      highlight: true
    },
    {
      id: 'interaction',
      need: 'Click, then scroll to a section',
      playwright: code('locator.click(), scrollIntoViewIfNeeded()'),
      microlink: 'click, scroll',
      href: '/docs/api/parameters/click'
    },
    {
      id: 'inject',
      need: 'Inject CSS or JavaScript',
      playwright: code('page.addStyleTag(), page.addScriptTag()'),
      microlink: 'styles, scripts, modules',
      href: '/docs/api/parameters/styles'
    },
    {
      id: 'javascript',
      need: 'Render without JavaScript',
      playwright: code('newContext({ javaScriptEnabled: false })'),
      microlink: 'javascript: false',
      href: '/docs/api/parameters/javascript'
    },
    {
      id: 'proxy',
      need: 'Route through a proxy',
      playwright: code('launch({ proxy })'),
      microlink: 'proxy, proxy.location',
      href: '/docs/api/parameters/proxy'
    },
    {
      id: 'timeout',
      need: 'Cap the time spent',
      playwright: code('page.setDefaultTimeout()'),
      microlink: 'timeout',
      href: '/docs/api/parameters/timeout'
    },
    {
      id: 'evaluate',
      need: 'Run custom code on the page',
      playwright: code('page.evaluate()'),
      microlink: 'function',
      href: '/docs/api/parameters/function'
    }
  ],
  footnote: (
    <>
      Playwright names come from the{' '}
      <Link href={PLAYWRIGHT_PAGE_API}>Page API reference</Link>, which marks{' '}
      <code>page.waitForSelector</code> and <code>page.waitForTimeout</code> as
      discouraged in tests. Defaults differ: Playwright prints PDFs on Letter,
      Microlink on A4, and Microlink disables animations unless asked.{' '}
      <code>headers</code> and <code>proxy</code> are Pro parameters.{' '}
      <code>waitUntil</code> takes <code>networkidle0</code> or{' '}
      <code>networkidle2</code> where Playwright takes <code>networkidle</code>.
      The <code>function</code> parameter receives a Puppeteer page, not a
      Playwright one.
    </>
  )
}

export const Mapping = () => (
  <Section id='call-mapping' bg='pinky'>
    <SectionHeader title={MAPPING.title} caption={MAPPING.caption} />

    <TableCard>
      <ProseTable>
        <thead>
          <tr>
            {MAPPING.columns.map(column => (
              <Text key={column} as='th' scope='col'>
                {column}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>
          {MAPPING.rows.map(
            ({ id, need, playwright, microlink, href, highlight }) => (
              <MappingRow key={id} $highlight={highlight}>
                <Text as='th' scope='row'>
                  {need}
                </Text>
                <td>{playwright}</td>
                <td>
                  <Link href={href}>{microlink}</Link>
                </td>
              </MappingRow>
            )
          )}
        </tbody>
      </ProseTable>
    </TableCard>

    <Box css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.normal })}>
      <Text css={theme({ fontSize: 0, color: 'black60', lineHeight: 2 })}>
        {MAPPING.footnote}
      </Text>
    </Box>
  </Section>
)
