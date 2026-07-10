import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/products.js'),
  'utf8'
)

const between = (start, end) =>
  source.slice(source.indexOf(start), source.indexOf(end))

describe('home products PDF preview', () => {
  test('keeps the URL to PDF flow visible before the document sheet', () => {
    const preview = between('const PdfPreview', 'const LOGO_URI')

    expect(preview).toContain('https://microlink.io')
    expect(preview).toContain("display: ['none', 'block']")
    expect(preview).toContain('<PdfOutput>')
    expect(preview).not.toContain("margin: '22px -28px -28px 20px'")
  })

  test('keeps the generated sheet contained with a folded corner', () => {
    const sheet = between('const PdfSheet', 'const PdfBadge')
    const preview = between('const PdfPreview', 'const LOGO_URI')

    expect(sheet).toContain("bg: 'white'")
    expect(sheet).toContain("borderColor: 'gray2'")
    expect(sheet).toContain("overflow: 'hidden'")
    expect(sheet).not.toContain("position: 'absolute'")
    expect(preview).toContain('<PdfFold />')
    expect(preview).toContain('Microlink')
    expect(preview).toContain('API Reference')
  })
})
