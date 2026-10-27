import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const gatsbyNode = read('gatsby-node.js')
const generateCallStart = gatsbyNode.indexOf('generateOgCards({')
const generateCall = gatsbyNode.slice(
  generateCallStart,
  gatsbyNode.indexOf('onError:', generateCallStart)
)

describe('og card generation', () => {
  test('queries post authors and the authors directory', () => {
    expect(gatsbyNode).toMatch(/frontmatter \{ authors \}/)
    expect(gatsbyNode).toMatch(
      /allAuthorsYaml \{ nodes \{ key name avatar \} \}/
    )
  })

  test('renders each card from the full card metadata', () => {
    expect(generateCall).toMatch(/metadata: ogCardMetadata/)
    expect(gatsbyNode).toMatch(/cardMetadata\(\{\s+html,\s+authors:/)
  })

  test('passes the site host so the card footer shows the page path', () => {
    expect(generateCall).toMatch(/host: OG_CARD_HOST/)
    expect(gatsbyNode).toMatch(/const OG_CARD_HOST = 'microlink\.io'/)
  })

  test('every blog author key resolves in data/authors.yaml', () => {
    const knownKeys = new Set(
      [...read('data/authors.yaml').matchAll(/^- key: (\S+)$/gm)].map(
        match => match[1]
      )
    )
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog')
    const postAuthorKeys = fs
      .readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .flatMap(file => {
        const [, frontmatter = ''] = fs
          .readFileSync(path.join(blogDir, file), 'utf8')
          .split(/^---$/m)
        const [, block = ''] =
          frontmatter.match(/^authors:\n((?: +- .+\n?)+)/m) || []
        return [...block.matchAll(/- (\S+)/g)].map(match => ({
          file,
          key: match[1]
        }))
      })
    expect(postAuthorKeys.length).toBeGreaterThan(0)
    expect(postAuthorKeys.filter(({ key }) => !knownKeys.has(key))).toEqual([])
  })

  test('warns when an author avatar cannot be inlined', () => {
    expect(gatsbyNode).toMatch(
      /inlineAvatars\([^)]+onError: \(author, error\) =>\s+reporter\.warn\(/
    )
  })

  test('keys each card by the inputs that change its picture', () => {
    expect(gatsbyNode).toMatch(
      /cardKey\(\[\s*OG_IMAGE_VERSION,\s*OG_CARD_HOST,\s*card\.pathname,\s*ogCardMetadata\(card\.pathname\)\s*\]\)/
    )
  })

  test('counts reused and rendered cards before failing the build', () => {
    expect(gatsbyNode).toMatch(
      /const ready = generated\.reused \+ generated\.rendered/
    )
    expect(gatsbyNode).toMatch(/if \(ready === 0 && expected > 0\)/)
    expect(gatsbyNode).toMatch(/if \(ready < expected\)/)
  })

  test('drops source maps on production webpack stages only', () => {
    expect(gatsbyNode).toMatch(
      /if \(stage === 'build-javascript' \|\| stage === 'build-html'\) \{/
    )
    expect(gatsbyNode).toMatch(/config\.devtool = false/)
    expect(gatsbyNode).toMatch(
      /if \(stage === 'develop' \|\| stage === 'develop-html'\) \{/
    )
    expect(gatsbyNode).toMatch(/config\.devtool = 'eval'/)
  })

  test('dates pages from frontmatter.modified before git', () => {
    expect(
      gatsbyNode.match(/contentLastModified\(node, getLastModifiedDate\)/g)
    ).toHaveLength(2)
  })

  test('shares one @microlink/og version with the card key and og:image', () => {
    expect(gatsbyNode).toMatch(
      /require\('\.\/src\/helpers\/og-image-version'\)/
    )
    expect(read('gatsby-config.js')).toMatch(
      /require\('\.\/src\/helpers\/og-image-version'\)/
    )
  })
})
