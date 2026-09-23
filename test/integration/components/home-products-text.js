import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/products.js'),
  'utf8'
)

const between = (start, end) =>
  source.slice(source.indexOf(start), source.indexOf(end))

describe('home products text preview', () => {
  test('shows only the extracted document, no URL flow chrome', () => {
    const preview = between('const TextPreview', 'const ScreenshotPreview')

    expect(preview).toContain('<TextDocument>')
    expect(preview).not.toContain('<TextFlow')
    expect(preview).not.toContain('<CodeBox')
    expect(source).not.toContain('const TextFlow')
  })

  test('keeps the extracted text sample visible', () => {
    const preview = between('const TextPreview', 'const ScreenshotPreview')

    expect(preview).toContain('to extract clean,')
    expect(preview).toContain('just AI-ready content')
  })

  test('does not render shared benefit footers in product cards', () => {
    const feature = between('const Feature =', 'const CodeBox')

    expect(source).not.toContain('const BENEFITS')
    expect(source).not.toContain('const FeatureFooter')
    expect(feature).not.toContain('<FeatureFooter')
  })
})
