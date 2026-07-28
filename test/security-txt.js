import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const FILE = path.join(process.cwd(), 'static/.well-known/security.txt')

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
})
