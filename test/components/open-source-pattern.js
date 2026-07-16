import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import ossData from '../../data/oss.json'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const PAGES = [
  'src/pages/embed/index.js',
  'src/pages/screenshot.js',
  'src/pages/pdf.js',
  'src/pages/markdown.js',
  'src/pages/metadata.js',
  'src/pages/link-preview.js'
]

const OSS_NAMES = new Set(ossData.map(({ name }) => name))
const component = read('src/components/patterns/OpenSource/OpenSource.js')

const repoSlugs = source => {
  const match = source.match(/const REPOS = \[([^\]]+)\]/)
  return match ? [...match[1].matchAll(/'([^']+)'/g)].map(([, s]) => s) : []
}

describe('OpenSource pattern', () => {
  test('exports the section component and the stars helper', () => {
    expect(component).toContain('export default OpenSource')
    expect(component).toContain('export const getRepoStars')
    expect(read('src/components/patterns/OpenSource/index.js')).toContain(
      "export { default, getRepoStars, OSS_STATS } from './OpenSource'"
    )
  })

  test('owns the repo data, resolved from data/oss.json', () => {
    expect(component).toContain(
      "import ossData from '../../../../data/oss.json'"
    )
    expect(component).toContain('REPOS_BY_NAME.get(name)')
  })

  test.each(PAGES)('%s renders the shared section from repo slugs', page => {
    const source = read(page)
    expect(source).toContain(
      "import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'"
    )
    expect(source).toMatch(/<OpenSource\n/)
    expect(source).toContain('repos={REPOS}')
    expect(source).toContain('accent={')
    expect(source).toContain('caption=')

    const slugs = repoSlugs(source)
    expect(slugs.length, `${page} REPOS slug list`).toBeGreaterThanOrEqual(3)
    for (const slug of slugs) {
      expect(OSS_NAMES.has(slug), `${slug} missing from data/oss.json`).toBe(
        true
      )
    }
  })

  test('homepage renders the shared section', () => {
    const home = read('src/components/pages/home/open-source.js')
    expect(home).toContain(
      "import OpenSourcePattern from 'components/patterns/OpenSource'"
    )
    expect(home).toContain("repos={['metascraper', 'browserless', 'unavatar']}")
    expect(home).toContain('accent={colors.link}')
    expect(home).toContain(
      'Microlink is committed to the principles of open source development:'
    )
    expect(home).toContain('engineers work together and share their solutions.')
    expect(home).toContain('projects we maintain in the open.')
    expect(home).not.toContain('Every Microlink API is powered by open source')
    expect(home).toContain("ctaHref='/oss'")
    for (const slug of ['metascraper', 'browserless', 'unavatar']) {
      expect(OSS_NAMES.has(slug), `${slug} missing from data/oss.json`).toBe(
        true
      )
    }

    const index = read('src/pages/index.js')
    expect(index).toContain(
      "import OpenSource from 'components/pages/home/open-source'"
    )
    expect(index).toContain('<OpenSource />')
  })

  test.each(PAGES)('%s does not re-declare the pattern locally', page => {
    const source = read(page)
    for (const local of [
      'const OpenSource',
      'const RepoCard',
      'const RepoMeta',
      'const LanguageDot',
      'const GithubMarkPath',
      'const OSS_STARS_BY_NAME',
      'const COMPACT_NUMBER_FORMATTER',
      'languageColor',
      'Built on'
    ]) {
      expect(source, `${page} re-declares ${local}`).not.toContain(local)
    }
  })
})
