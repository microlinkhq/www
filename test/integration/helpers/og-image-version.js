import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { OG_IMAGE_VERSION } from '../../../src/helpers/og-image-version.js'

describe('OG_IMAGE_VERSION', () => {
  test('matches the installed @microlink/og package version', () => {
    const installed = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'node_modules/@microlink/og/package.json'),
        'utf8'
      )
    )
    expect(OG_IMAGE_VERSION).toBe(installed.version)
  })
})
