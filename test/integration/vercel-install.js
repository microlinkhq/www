import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

describe('vercel install', () => {
  test('skips the puppeteer browser download', () => {
    const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))
    expect(vercel.installCommand).toContain('PUPPETEER_SKIP_DOWNLOAD=true')
    expect(vercel.installCommand).toContain('NODE_ENV=development')
    expect(vercel.installCommand).toContain('npm install --legacy-peer-deps')
  })
})
