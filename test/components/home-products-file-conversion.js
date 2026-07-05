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
  test('keeps the Microlink center node lockup', () => {
    const logoNode = between('const LogoNode', 'const INPUT_Y')

    expect(logoNode).toContain('microlink')
    expect(logoNode).toContain("width: '136px'")
    expect(logoNode).toContain("height: '136px'")
  })

  test('keeps dashed paths free of middle circle artifacts', () => {
    const preview = between(
      'const FileConversionPreview',
      'const ConversionIcon'
    )

    expect(preview).not.toMatch(/<circle\b/)
    expect(preview).toContain("width='126'")
    expect(preview).toContain("minWidth: '1080px'")
  })
})
