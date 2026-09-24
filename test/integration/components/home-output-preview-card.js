import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/output.js'),
  'utf8'
)

describe('home output link preview card', () => {
  test('reuses the HeroCard from the link-preview page', () => {
    expect(source).toContain(
      "import { HeroCard } from 'components/pages/embed/PreviewCards'"
    )
    expect(source).toContain('<HeroCard data=')
  })

  test('does not keep a bespoke preview card markup', () => {
    const card = source.slice(
      source.indexOf('const Card'),
      source.indexOf('const EmbedOutput')
    )

    expect(card).not.toContain("as='img'")
    expect(card).not.toContain('maxHeight')
    expect(card).toContain('HeroCard')
  })
})
