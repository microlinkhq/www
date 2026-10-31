import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const { redirects } = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
)

const redirectFrom = source => redirects.find(entry => entry.source === source)

describe('vercel redirects', () => {
  test('/business redirects to /enterprise with an explicit 301 or 302 and a lead ref', () => {
    const redirect = redirectFrom('/business')
    expect(redirect).toMatchObject({ destination: '/enterprise?ref=business' })
    expect([301, 302]).toContain(redirect.statusCode)
  })

  test('/tos and its markdown twin move permanently to /terms', () => {
    expect(redirectFrom('/tos')).toEqual({
      source: '/tos',
      destination: '/terms'
    })
    expect(redirectFrom('/tos.md')).toEqual({
      source: '/tos.md',
      destination: '/terms.md'
    })
  })
})
