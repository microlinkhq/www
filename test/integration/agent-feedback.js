import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const VERCEL_CONFIG = path.join(import.meta.dirname, '../../vercel.json')

const { rewrites } = JSON.parse(fs.readFileSync(VERCEL_CONFIG, 'utf8'))

describe('agent feedback discovery', () => {
  test('serves the feedback discovery document on microlink.io', () => {
    expect(rewrites).toContainEqual({
      source: '/.well-known/agent-feedback.json',
      destination:
        'https://feedback.microlink.io/.well-known/agent-feedback.json'
    })
  })
})
