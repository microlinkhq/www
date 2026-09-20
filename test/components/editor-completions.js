import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { expect, test } from 'vitest'

import {
  GOOGLE_DTS,
  MICROLINK_DTS,
  PUPPETEER_DTS
} from '../../src/components/pages/editor/monaco-dts'
import {
  GOOGLE_TYPES,
  MICROLINK_TYPES,
  PUPPETEER_CORE_TYPES
} from '../../src/components/pages/editor/monaco-types'

const require = createRequire(import.meta.url)
const requireFromMicrolink = createRequire(require.resolve('microlink.io'))
const published = readFileSync(
  join(dirname(require.resolve('microlink.io')), 'index.d.ts'),
  'utf8'
)
const publishedGoogle = readFileSync(
  join(
    dirname(requireFromMicrolink.resolve('@microlink/google')),
    'index.d.ts'
  ),
  'utf8'
)
const publishedPuppeteer = readFileSync(
  join(dirname(require.resolve('microlink.io')), 'puppeteer-core.d.ts'),
  'utf8'
)

const clientMethods = [
  ...new Set(
    [
      ...published
        .match(/interface MicrolinkClient \{([\s\S]*?)\n\}/)[1]
        .matchAll(/^ {2}(\w+)(?:<| \(|:)/gm)
    ].map(match => match[1])
  )
]

const searchPages = [
  ...publishedGoogle
    .match(/interface TypeToPage \{([\s\S]*?)\}/)[1]
    .matchAll(/^\s+(\w+):/gm)
].map(match => match[1])

test('types every published microlink.io client method', () => {
  expect(MICROLINK_DTS).toBe(published)
  expect(clientMethods).toEqual([
    'metadata',
    'logo',
    'markdown',
    'html',
    'text',
    'video',
    'audio',
    'emails',
    'links',
    'images',
    'videos',
    'audios',
    'extract',
    'screenshot',
    'pdf',
    'embed',
    'technologies',
    'lighthouse',
    'search',
    'function'
  ])
  for (const method of clientMethods) {
    expect(MICROLINK_TYPES).toContain(method)
  }
  expect(MICROLINK_TYPES).toContain('export type { HTTPResponse, Page }')
  expect(MICROLINK_TYPES).toContain('page: Page')
  expect(MICROLINK_TYPES).toContain('response: HTTPResponse')
  expect(MICROLINK_TYPES).toContain('url: string')
  expect(MICROLINK_TYPES).toContain('code: FunctionInput')
  expect(MICROLINK_TYPES).toContain('interface Metadata')
  expect(MICROLINK_TYPES).toContain('interface ExtractRules')
  expect(MICROLINK_TYPES).toContain('interface Asset')
  expect(MICROLINK_TYPES).toContain('interface Embed')
  expect(MICROLINK_TYPES).toContain('interface FunctionResult')
  expect(MICROLINK_TYPES).toContain('search: GoogleClient')
  expect(MICROLINK_TYPES).toContain('metadata(): Promise<Metadata>')
  expect(MICROLINK_TYPES).toContain('extract(rules: ExtractRules)')
})

test('types every published search result page', () => {
  expect(GOOGLE_DTS).toBe(publishedGoogle)
  expect(searchPages).toEqual([
    'search',
    'news',
    'images',
    'videos',
    'places',
    'maps',
    'shopping',
    'scholar',
    'patents',
    'autocomplete'
  ])
  for (const page of searchPages) {
    expect(GOOGLE_TYPES).toContain(
      `${page}: ${page[0].toUpperCase()}${page.slice(1)}Page`
    )
  }
  expect(GOOGLE_TYPES).toContain('results: SearchResult[]')
})

test('types Puppeteer page methods from the published dts', () => {
  expect(PUPPETEER_DTS).toBe(publishedPuppeteer)
  for (const member of [
    'title()',
    'url()',
    '$eval<',
    '$$eval<',
    'evaluate<',
    'waitForSelector',
    'waitForNavigation',
    'click(',
    'content()',
    'abstract get keyboard'
  ]) {
    expect(PUPPETEER_CORE_TYPES).toContain(member)
  }
})
