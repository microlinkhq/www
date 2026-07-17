import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const image = 'https://microlink.io/images/clients/handinger-preview.png'
const pagePath = 'src/pages/use-cases/handinger.js'
const localImagePath = 'static/images/clients/handinger-preview.png'

describe('Handinger Open Graph image', () => {
  test('uses the deployed Handinger preview asset', () => {
    const page = fs.readFileSync(path.join(process.cwd(), pagePath), 'utf8')
    const head = page.slice(page.indexOf('export const Head'))

    expect(head).toContain(`image='${image}'`)
    expect(head).not.toContain('handinger-web.png')
  })

  test('keeps the referenced asset in the static image bundle', () => {
    expect(fs.existsSync(path.join(process.cwd(), localImagePath))).toBe(true)
  })
})
