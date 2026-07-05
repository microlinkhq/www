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
  test('shows the URL to text extraction flow before the document output', () => {
    const preview = between('const TextPreview', 'const ScreenshotPreview')

    expect(preview).toContain('<TextFlowInput>')
    expect(preview).toContain('https://microlink.io')
    expect(preview).toContain('<TextFlowArrow')
    expect(preview).toContain('<TextFlowOutput>')
    expect(preview).toContain('<TextDocument>')
    expect(preview).not.toContain('<CodeBox')
  })

  test('keeps the extracted text and clean output proof visible', () => {
    const preview = between('const TextPreview', 'const ScreenshotPreview')
    const benefits = between('const BENEFITS', 'const Sparkle')

    expect(preview).toContain('to extract clean,')
    expect(preview).toContain('just AI-ready content')
    expect(benefits).toContain("title: 'Clean text output'")
    expect(benefits).toContain("copy: 'Extracts the main content")
  })

  test('renders one shared benefit footer for every product card', () => {
    const feature = between('const Feature =', 'const FeatureFooter')
    const footer = between('const FeatureFooter', 'const Footer =')
    const products = between('const Products =', 'export default Products')
    const featureCount = [...products.matchAll(/<Feature\s/g)].length
    const benefitCount = [
      ...between('const BENEFITS', 'const Sparkle').matchAll(/title:/g)
    ].length

    expect(feature).toContain('<FeatureFooter benefit={benefit} />')
    expect(footer).toContain('<FooterTitle>{benefit.title}</FooterTitle>')
    expect(footer).toContain('<FooterCopy>{benefit.copy}</FooterCopy>')
    expect(benefitCount).toBe(featureCount)
  })
})
