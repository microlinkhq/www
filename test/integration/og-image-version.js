import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { describe, expect, test, vi } from 'vitest'

const require = createRequire(import.meta.url)

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const installedOgVersion = JSON.parse(
  read('node_modules/@microlink/og/package.json')
).version

describe('og image version', () => {
  test('siteMetadata exposes the installed @microlink/og version', () => {
    for (const key of ['STRIPE_KEY', 'PAYMENT_API_KEY', 'PAYMENT_ENDPOINT']) {
      vi.stubEnv(key, process.env[key] || 'stub')
    }
    const { siteMetadata } = require(path.join(process.cwd(), 'gatsby-config'))
    expect(siteMetadata.ogImageVersion).toBe(installedOgVersion)
  })

  test('the site metadata query selects ogImageVersion', () => {
    expect(read('src/components/hook/use-site-meta.js')).toMatch(
      /^\s+ogImageVersion$/m
    )
  })

  test('Meta fingerprints the card with ogImageVersion', () => {
    expect(read('src/components/elements/Meta/Meta.js')).toMatch(
      /ogImageUrl\([^)]*version: ogImageVersion[^)]*\)/
    )
  })
})
