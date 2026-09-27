import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/products.js'),
  'utf8'
)

const between = (start, end) =>
  source.slice(source.indexOf(start), source.indexOf(end))

describe('home products file conversion preview', () => {
  test('keeps the Microlink center node circular and icon-only', () => {
    const logoNode = between('const LogoNode', 'const INPUT_Y')

    expect(logoNode).toContain("width: '136px'")
    expect(logoNode).toContain("height: '136px'")
    expect(logoNode).toContain("borderRadius: '50%'")
    expect(logoNode).not.toMatch(/>\s*microlink\s*</)
  })

  test('keeps dashed paths free of middle circle artifacts', () => {
    const preview = between('const FileConversionPreview', 'const Products')

    expect(preview).not.toMatch(/<circle\b/)
    expect(preview).toContain("width='126'")
    expect(preview).toContain("minWidth: '980px'")
  })

  test('output pills reuse the catalog product icons', () => {
    expect(source).toContain(
      "const CONVERT_OUTPUTS = ['html', 'markdown', 'text', 'pdf']"
    )
    const preview = between('const FileConversionPreview', 'const Products')
    expect(preview).toContain('PRODUCTS[vertical]')
    expect(preview).toContain("<Icon width='22px' height='22px' />")
    expect(source).not.toContain('OUT_ICON')
  })
})
