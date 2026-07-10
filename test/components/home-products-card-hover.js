import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/products.js'),
  'utf8'
)

const between = (start, end) =>
  source.slice(source.indexOf(start), source.indexOf(end))

const card = between('const Card = styled(Link)', 'const IconTile')

describe('home products card hover', () => {
  test('pins the text color on hover so the link color never tints the previews', () => {
    expect(card).toContain("color: 'black'")
    expect(card).toContain("_hover: { color: 'black' }")
  })

  test('keeps border, lift and arrow as the only hover affordances', () => {
    expect(card).toMatch(/border-color: \$\{props => props\.\$accent\}/)
    expect(card).toContain('transform: translateY(-3px)')
    expect(card).toMatch(/&:hover \$\{Arrow\}/)
  })
})
