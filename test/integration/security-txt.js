import fs from 'node:fs'
import path from 'node:path'
import GithubSlugger from 'github-slugger'
import { describe, expect, test } from 'vitest'

const FILE = path.join(process.cwd(), 'static/.well-known/security.txt')
const POLICY_PAGE = path.join(process.cwd(), 'src/content/security.md')
const POLICY_URL = /^https:\/\/microlink\.io\/security#(.+)$/

const DAY = 24 * 60 * 60 * 1000
const RENEWAL_LEAD_TIME = 30 * DAY
const MAX_LIFESPAN = 365 * DAY

const fields = fs
  .readFileSync(FILE, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const match = line.match(/^([A-Za-z-]+):\s*(.+?)\s*$/)
    if (match) acc.push({ name: match[1], value: match[2] })
    return acc
  }, [])

const valuesOf = name =>
  fields.filter(field => field.name === name).map(field => field.value)

const expiresAt = () => Date.parse(valuesOf('Expires')[0])

const headingAnchors = source => {
  const slugger = new GithubSlugger()
  return source
    .split('\n')
    .filter(line => /^#{1,6}\s/.test(line))
    .map(line => slugger.slug(line.replace(/^#+\s*/, '').trim()))
}

describe('security.txt', () => {
  test('declares the fields RFC 9116 requires', () => {
    expect(valuesOf('Contact').length).toBeGreaterThan(0)
    expect(valuesOf('Expires')).toHaveLength(1)
    expect(expiresAt()).not.toBeNaN()
  })

  test('expiry leaves time to renew before it lapses', () => {
    expect(expiresAt()).toBeGreaterThan(Date.now() + RENEWAL_LEAD_TIME)
  })

  test('expiry stays under the one year the RFC recommends', () => {
    expect(expiresAt()).toBeLessThan(Date.now() + MAX_LIFESPAN)
  })

  test('publishes a machine-readable policy and acknowledgments', () => {
    expect(valuesOf('Policy').length).toBeGreaterThan(0)
    expect(valuesOf('Acknowledgments').length).toBeGreaterThan(0)
  })

  test('every anchor it links to exists on the security page', () => {
    const anchors = headingAnchors(fs.readFileSync(POLICY_PAGE, 'utf8'))
    const linked = fields
      .map(field => field.value.match(POLICY_URL))
      .filter(Boolean)
      .map(([, anchor]) => anchor)

    expect(linked.length).toBeGreaterThan(0)
    for (const anchor of linked) expect(anchors).toContain(anchor)
  })
})
