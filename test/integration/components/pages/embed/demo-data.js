import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const DEMO_DATA_FILES = [
  'src/components/pages/embed/PreviewCards.js',
  'src/components/pages/embed/InteractiveExample.js'
]

const API_ASSET_URL = /https:\/\/api\.microlink\.io\/\?[^'"`\s]*embed=/

describe('/embed demo data', () => {
  test.each(DEMO_DATA_FILES)(
    '%s points images at their real URLs, never the keyless API',
    file => {
      const source = readFileSync(path.join(process.cwd(), file), 'utf8')
      expect(source).not.toMatch(API_ASSET_URL)
    }
  )
})
