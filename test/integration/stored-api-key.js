import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { SRC, relative, walk } from '../utils/jsx-source'

const HELPER = 'src/helpers/clear-stored-api-key.js'

const sourcesMentioning = needle =>
  [...walk(SRC), path.join(process.cwd(), 'gatsby-browser.js')]
    .filter(file => fs.readFileSync(file, 'utf8').includes(needle))
    .map(relative)
    .sort()

describe('stored api key', () => {
  test('no page saves or reads the API key in browser storage', () => {
    expect(sourcesMentioning("'mql-api-key'")).toEqual([HELPER])
  })

  test('only the client entry uses the stored key name, to clear it', () => {
    expect(sourcesMentioning('STORED_API_KEY')).toEqual([HELPER])
    expect(sourcesMentioning('clearStoredApiKey')).toEqual([
      'gatsby-browser.js',
      HELPER
    ])
  })
})
