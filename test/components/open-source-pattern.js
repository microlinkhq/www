import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const OSS_PATH = path.join(process.cwd(), 'data/oss.json')
const ossData = fs.existsSync(OSS_PATH)
  ? JSON.parse(fs.readFileSync(OSS_PATH, 'utf8'))
  : null
const OSS_NAMES = new Set((ossData ?? []).map(({ name }) => name))

const PAGES = [
  'src/pages/embed/index.js',
  'src/pages/screenshot.js',
  'src/pages/pdf.js',
  'src/pages/markdown.js',
  'src/pages/metadata.js',
  'src/pages/link-preview.js'
]

const HOME_REPOS = ['metascraper', 'browserless', 'unavatar']

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
    expect(
      repoSlugs(source).length,
      `${page} REPOS slug list`
    ).toBeGreaterThanOrEqual(3)
  })

  test('homepage renders the shared section', () => {
    const home = read('src/components/pages/home/open-source.js')
    expect(home).toContain(
      "import OpenSourcePattern, { OSS_STATS } from 'components/patterns/OpenSource'"
    )
    expect(home).toContain(
      `repos={[${HOME_REPOS.map(s => `'${s}'`).join(', ')}]}`
    )
    expect(home).toContain("accent='gradient'")
    expect(home).toContain("Open source isn't just something we use:")
    expect(home).toContain(
      'technologies behind Microlink are developed in public'
    )
    expect(home).toContain('Math.floor(OSS_STATS.repos / 10) * 10')
    expect(home).not.toContain('Every Microlink API is powered by open source')
    expect(home).toContain("ctaHref='/open-source'")

    const index = read('src/pages/index.js')
    expect(index).toContain(
      "import OpenSource from 'components/pages/home/open-source'"
    )
    expect(index).toContain('<OpenSource />')
  })

  test.skipIf(!ossData)('every repo slug exists in data/oss.json', () => {
    const slugs = new Set(
      PAGES.flatMap(page => repoSlugs(read(page))).concat(HOME_REPOS)
    )
    for (const slug of slugs) {
      expect(OSS_NAMES.has(slug), `${slug} missing from data/oss.json`).toBe(
        true
      )
    }
    expect(Math.floor(ossData.length / 10) * 10).toBeGreaterThanOrEqual(50)
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
