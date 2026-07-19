import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = process.cwd()
const analytics = fs.readFileSync(
  path.join(root, 'src/components/pages/home/analytics.js'),
  'utf8'
)

describe('home analytics band', () => {
  test('uses the supplied Fast Anywhere globe artwork', () => {
    expect(
      fs.existsSync(path.join(root, 'static/images/fast-anywhere.png'))
    ).toBe(true)
    expect(analytics).toContain(
      "backgroundImage: 'url(/images/fast-anywhere.png)'"
    )
  })

  test('keeps the production metrics legible across screen sizes', () => {
    expect(analytics).toContain(
      "<Subhead variant='gradient'>Fast Anywhere</Subhead>"
    )
    expect(analytics).toContain(
      "gridTemplateColumns: ['1fr', '1fr', 'repeat(4, minmax(0, 1fr))']"
    )
    expect(analytics).toContain('borderLeft: isFirst ? 0 : [0, 0, 1, 1]')
    expect(analytics).toContain("fontVariantNumeric: 'tabular-nums'")
  })
})
